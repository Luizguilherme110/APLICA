import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";
import { adminSessionOrThrow } from "@/functions/admin-guard";
import { getCaktoAccessToken, caktoApiFetch } from "@/functions/cakto-client";
import { getEbook, getOfferId, type PriceOverrideMap } from "@/data/ebooks";

type PriceOverrideRow = { slug: string; price_cents: number; original_price_cents: number | null };

/** Preços editados no admin, sobrepostos ao padrão do catálogo — chamado no loader raiz, uma vez por request. */
export const getPriceOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<PriceOverrideMap> => {
    const sql = getSql();
    const rows = (await sql`
      SELECT slug, price_cents, original_price_cents FROM product_price_overrides
    `) as PriceOverrideRow[];

    const map: PriceOverrideMap = {};
    for (const row of rows) {
      map[row.slug] = { priceCents: row.price_cents, originalPriceCents: row.original_price_cents };
    }
    return map;
  },
);

type UpdatePriceInput = { slug: string; priceCents: number; originalPriceCents: number | null };
type UpdatePriceResult = { ok: true } | { ok: false; error: string };

/**
 * Muda o preço num lugar só: atualiza a oferta na Cakto primeiro (é o que
 * decide quanto o cliente paga de verdade) e só grava o override local se a
 * Cakto confirmar — nunca deixa o site mostrar um preço que o checkout não
 * vai cobrar.
 */
export const updateProductPrice = createServerFn({ method: "POST" })
  .validator((data: UpdatePriceInput) => data)
  .handler(async ({ data }): Promise<UpdatePriceResult> => {
    await adminSessionOrThrow();

    const ebook = getEbook(data.slug);
    if (!ebook) return { ok: false, error: "Produto não encontrado no catálogo." };

    if (data.priceCents < 500) {
      return { ok: false, error: "Preço mínimo da Cakto é R$ 5,00." };
    }

    let offerId: string;
    try {
      offerId = getOfferId(ebook);
    } catch {
      return { ok: false, error: "Não consegui identificar a oferta desse produto na Cakto." };
    }

    try {
      const token = await getCaktoAccessToken();
      const result = await caktoApiFetch(`/offers/${offerId}/`, token.access_token, {
        method: "PUT",
        body: JSON.stringify({ price: data.priceCents / 100 }),
      });

      if (!result.ok) {
        return { ok: false, error: `Cakto recusou a mudança (status ${result.status}).` };
      }
    } catch (err) {
      return {
        ok: false,
        error: `Falha ao falar com a Cakto: ${err instanceof Error ? err.message : String(err)}`,
      };
    }

    const sql = getSql();
    await sql`
      INSERT INTO product_price_overrides (slug, price_cents, original_price_cents, updated_at)
      VALUES (${data.slug}, ${data.priceCents}, ${data.originalPriceCents}, now())
      ON CONFLICT (slug) DO UPDATE SET
        price_cents = EXCLUDED.price_cents,
        original_price_cents = EXCLUDED.original_price_cents,
        updated_at = now()
    `;

    return { ok: true };
  });
