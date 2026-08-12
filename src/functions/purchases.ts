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
