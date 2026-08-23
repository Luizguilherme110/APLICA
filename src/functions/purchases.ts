import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";
import { adminSessionOrThrow } from "@/functions/admin-guard";
import { rangeToSince, type StatsRange } from "@/functions/admin-stats";

export type PurchaseProductRow = { product_name: string | null; count: number; revenue: number };

export type PurchaseStats = {
  count: number;
  revenue: number;
  byProduct: PurchaseProductRow[];
};

/** Vendas confirmadas (evento purchase_approved), gravadas pelo webhook da Cakto. */
export const getPurchaseStats = createServerFn({ method: "GET" })
  .validator((data: { range: StatsRange }) => data)
  .handler(async ({ data }): Promise<PurchaseStats> => {
    await adminSessionOrThrow();

    const sql = getSql();
    const since = rangeToSince(data.range);

    const totalsRaw = since
      ? await sql`
          SELECT COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::float AS revenue
          FROM purchases
          WHERE event = 'purchase_approved' AND created_at >= ${since.toISOString()}
        `
      : await sql`
          SELECT COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::float AS revenue
          FROM purchases
          WHERE event = 'purchase_approved'
        `;

    const byProductRaw = since
      ? await sql`
          SELECT product_name, COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::float AS revenue
          FROM purchases
          WHERE event = 'purchase_approved' AND created_at >= ${since.toISOString()}
          GROUP BY product_name
          ORDER BY revenue DESC
        `
      : await sql`
          SELECT product_name, COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::float AS revenue
          FROM purchases
          WHERE event = 'purchase_approved'
          GROUP BY product_name
          ORDER BY revenue DESC
        `;

    const totals = (totalsRaw as { count: number; revenue: number }[])[0];

    return {
      count: totals?.count ?? 0,
      revenue: totals?.revenue ?? 0,
      byProduct: byProductRaw as PurchaseProductRow[],
    };
  });

export type CheckoutEventCountRow = { event: string; count: number };
export type CheckoutActivityRow = {
  cakto_id: string;
  event: string;
  status: string | null;
  product_name: string | null;
  amount: number | null;
  payment_method: string | null;
  customer_email: string | null;
  created_at: string;
};

export type CheckoutActivity = {
  eventCounts: CheckoutEventCountRow[];
  recent: CheckoutActivityRow[];
};

/**
 * Tudo que a Cakto reporta sobre o checkout, não só a venda aprovada:
 * pix/boleto/picpay gerado, abandono, recusa, reembolso, chargeback. Dá pra
 * ver onde o lead trava depois que sai do nosso site (ver cakto-webhook.ts).
 */
export const getCheckoutActivity = createServerFn({ method: "GET" })
  .validator((data: { range: StatsRange }) => data)
  .handler(async ({ data }): Promise<CheckoutActivity> => {
    await adminSessionOrThrow();

    const sql = getSql();
    const since = rangeToSince(data.range);

    const eventCountsRaw = since
      ? await sql`
          SELECT event, COUNT(*)::int AS count
          FROM purchases
          WHERE created_at >= ${since.toISOString()}
          GROUP BY event
          ORDER BY count DESC
        `
      : await sql`
          SELECT event, COUNT(*)::int AS count
          FROM purchases
          GROUP BY event
          ORDER BY count DESC
        `;

    const recentRaw = since
      ? await sql`
          SELECT cakto_id, event, status, product_name, amount, payment_method, customer_email, created_at
          FROM purchases
          WHERE created_at >= ${since.toISOString()}
          ORDER BY created_at DESC
          LIMIT 50
        `
      : await sql`
          SELECT cakto_id, event, status, product_name, amount, payment_method, customer_email, created_at
          FROM purchases
          ORDER BY created_at DESC
          LIMIT 50
        `;

    return {
      eventCounts: eventCountsRaw as CheckoutEventCountRow[],
      recent: recentRaw as CheckoutActivityRow[],
    };
  });
