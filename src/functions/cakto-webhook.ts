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
    customer?: { email?: string };
    product?: { id?: string; name?: string };
  };
};

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

  try {
    const sql = getSql();
    await sql`
      INSERT INTO purchases
        (cakto_id, event, status, product_id, product_name, amount, customer_email, payment_method, raw)
      VALUES (
        ${data.id},
        ${event},
        ${data.status ?? null},
        ${data.product?.id ?? null},
        ${data.product?.name ?? null},
        ${data.amount ?? null},
        ${data.customer?.email ?? null},
        ${data.paymentMethod ?? null},
        ${JSON.stringify(payload)}
      )
      ON CONFLICT (cakto_id) DO NOTHING
    `;
  } catch (err) {
    console.error("[cakto-webhook] falha ao gravar:", err);
    // 500 de propósito: erro transitório de banco, a Cakto deve tentar de novo.
    return new Response("internal error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
