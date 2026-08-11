import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";
import { adminSessionOrThrow } from "@/functions/admin-guard";

export type StatsRange = "today" | "7d" | "30d" | "all";

function rangeToSince(range: StatsRange): Date | null {
  const now = new Date();
  if (range === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (range === "7d") return new Date(now.getTime() - 7 * 86_400_000);
  if (range === "30d") return new Date(now.getTime() - 30 * 86_400_000);
  return null;
}

export type FunnelStageRow = { event_name: string; total: number; uniq: number };
export type ProductRow = {
  slug: string;
  category: string | null;
  views: number;
  checkouts: number;
};

export type FunnelStats = {
  stages: FunnelStageRow[];
  products: ProductRow[];
  totalEvents: number;
  rangeLabel: string;
};

const STAGE_ORDER: Record<string, number> = {
  page_view: 0,
  view_ebook: 1,
  initiate_checkout: 2,
};

export const getFunnelStats = createServerFn({ method: "GET" })
  .validator((data: { range: StatsRange }) => data)
  .handler(async ({ data }): Promise<FunnelStats> => {
    await adminSessionOrThrow();

    const sql = getSql();
    const since = rangeToSince(data.range);

    const stagesRaw = since
      ? await sql`
          SELECT event_name, COUNT(*)::int AS total, COUNT(DISTINCT session_id)::int AS uniq
          FROM funnel_events
          WHERE created_at >= ${since.toISOString()}
          GROUP BY event_name
        `
      : await sql`
          SELECT event_name, COUNT(*)::int AS total, COUNT(DISTINCT session_id)::int AS uniq
          FROM funnel_events
          GROUP BY event_name
        `;

    const productsRaw = since
      ? await sql`
          SELECT
            slug,
            max(category) AS category,
            COUNT(DISTINCT CASE WHEN event_name = 'view_ebook' THEN session_id END)::int AS views,
            COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
          FROM funnel_events
          WHERE slug IS NOT NULL AND created_at >= ${since.toISOString()}
          GROUP BY slug
          ORDER BY views DESC
        `
      : await sql`
          SELECT
            slug,
            max(category) AS category,
            COUNT(DISTINCT CASE WHEN event_name = 'view_ebook' THEN session_id END)::int AS views,
            COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
          FROM funnel_events
          WHERE slug IS NOT NULL
          GROUP BY slug
          ORDER BY views DESC
        `;

    const stages = (stagesRaw as FunnelStageRow[]).sort(
      (a, b) => (STAGE_ORDER[a.event_name] ?? 99) - (STAGE_ORDER[b.event_name] ?? 99),
    );

    const rangeLabel =
      data.range === "today"
        ? "Hoje"
        : data.range === "7d"
          ? "7 dias"
          : data.range === "30d"
            ? "30 dias"
            : "Tudo";

    return {
      stages,
      products: productsRaw as ProductRow[],
      totalEvents: stages.reduce((sum, s) => sum + s.total, 0),
      rangeLabel,
    };
  });
