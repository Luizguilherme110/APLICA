import { getSql } from "@/functions/db";

/**
 * Webhook da Cakto — fecha o funil com a venda de verdade.
 *
 * Payload documentado em https://cakto-dece4a15.mintlify.app/webhooks/pagamento-unico:
 *   { secret, event, data: { id, customer: { email }, product: { id, name },
 *     status, amount, paymentMethod, ... } }
 *
 * O "secret" é escolhido por nós ao cadastrar o webhook no painel da Cakto —
 * a Cakto ecoa esse mesmo valor em toda chamada, e é isso que garante que a
 * requisição é deles, não de qualquer um forjando a URL.
 */

type CaktoPayload = {
  secret?: string;
  event?: string;
  data?: {
    id?: string;
    status?: string;
    amount?: number;
    paymentMethod?: string;
    checkoutUrl?: string;
    customer?: { email?: string };
    product?: { id?: string; name?: string };
  };
};

/**
 * Melhor esforço, não documentado pela Cakto: o link de checkout que a
 * pessoa usou (src/lib/attribution.ts anexa utm_source/campaign nele) pode
 * vir de volta no campo "checkoutUrl" do payload. Se vier com a query
 * string, dá pra saber qual campanha gerou a VENDA, não só o clique. Se não
 * vier, os campos ficam null — não é motivo pra falhar o webhook.
 */
function extractUtmFromCheckoutUrl(checkoutUrl: string | undefined) {
  if (!checkoutUrl) return { utmSource: null, utmCampaign: null };
  try {
    const params = new URL(checkoutUrl).searchParams;
    return {
      utmSource: params.get("utm_source"),
      utmCampaign: params.get("utm_campaign"),
    };
  } catch {
    return { utmSource: null, utmCampaign: null };
  }
}

const CAKTO_EVENTS = new Set([
  "purchase_approved",
  "purchase_refused",
  "pix_gerado",
  "boleto_gerado",
  "picpay_gerado",
  "refund",
  "chargeback",
  "subscription_canceled",
  "subscription_renewed",
  "checkout_abandonment",
]);

export async function handleCaktoWebhook(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("method not allowed", { status: 405 });
  }

  const configuredSecret = process.env["CAKTO_WEBHOOK_SECRET"];
  if (!configuredSecret) {
    // Sem secret configurado, não há como validar a origem — recusa tudo em
    // vez de gravar qualquer POST que chegue nessa URL.
    console.error("[cakto-webhook] CAKTO_WEBHOOK_SECRET não configurada");
    return new Response("webhook not configured", { status: 503 });
  }

  let payload: CaktoPayload;
  try {
    payload = (await request.json()) as CaktoPayload;
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  if (payload.secret !== configuredSecret) {
    console.error("[cakto-webhook] secret inválido");
    return new Response("unauthorized", { status: 401 });
  }

  const event = payload.event;
  const data = payload.data;
  if (!event || !CAKTO_EVENTS.has(event) || !data?.id) {
    // Evento desconhecido ou sem id — a Cakto pode adicionar eventos novos no
    // futuro; melhor responder 200 e ignorar do que travar a integração deles.
    console.error("[cakto-webhook] payload inesperado:", JSON.stringify(payload).slice(0, 500));
    return new Response("ok", { status: 200 });
  }

  const { utmSource, utmCampaign } = extractUtmFromCheckoutUrl(data.checkoutUrl);

  let inserted = false;
  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO purchases
        (cakto_id, event, status, product_id, product_name, amount, customer_email, payment_method, raw, utm_source, utm_campaign)
      VALUES (
        ${data.id},
        ${event},
        ${data.status ?? null},
        ${data.product?.id ?? null},
        ${data.product?.name ?? null},
        ${data.amount ?? null},
        ${data.customer?.email ?? null},
        ${data.paymentMethod ?? null},
        ${JSON.stringify(payload)},
        ${utmSource},
        ${utmCampaign}
      )
      ON CONFLICT (cakto_id, event) DO NOTHING
      RETURNING cakto_id
    `;
    inserted = (rows as { cakto_id: string }[]).length > 0;
  } catch (err) {
    console.error("[cakto-webhook] falha ao gravar:", err);
    // 500 de propósito: erro transitório de banco, a Cakto deve tentar de novo.
    return new Response("internal error", { status: 500 });
  }

  // Reporta a venda pra OpenAI Ads (evento "Purchase Approved" / order_created,
  // configurado no painel). Só quando o insert foi novo — se a Cakto reenviar
  // o mesmo webhook, "inserted" vem false e não duplicamos o report.
  if (inserted && event === "purchase_approved") {
    reportPurchaseToOpenAiAds(data).catch((err) => {
      console.error("[cakto-webhook] falha ao reportar pra OpenAI Ads:", err);
    });
  }

  return new Response("ok", { status: 200 });
}

const OPENAI_ADS_PIXEL_ID = "7RcoJcygh8svFp1yEuQtEk";

async function reportPurchaseToOpenAiAds(data: NonNullable<CaktoPayload["data"]>): Promise<void> {
  const apiKey = process.env["OPENAI_ADS_API_KEY"];
  if (!apiKey) {
    console.error("[cakto-webhook] OPENAI_ADS_API_KEY não configurada, pulando report");
    return;
  }

  const res = await fetch(`https://bzr.openai.com/v1/events?pid=${OPENAI_ADS_PIXEL_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      validate_only: false,
      events: [
        {
          id: data.id,
          type: "order_created",
          timestamp_ms: Date.now(),
          source_url: data.checkoutUrl ?? "https://aplica.site",
          action_source: "web",
          data: {
            type: "contents",
            amount: Math.round((data.amount ?? 0) * 100),
            currency: "BRL",
            contents: [
              {
                id: data.product?.id ?? "unknown",
                name: data.product?.name ?? "unknown",
                content_type: "product",
                quantity: 1,
              },
            ],
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error("[cakto-webhook] OpenAI Ads respondeu", res.status, await res.text());
  }
}
