import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";
import { adminSessionOrThrow } from "@/functions/admin-guard";

export type StatsRange = "today" | "7d" | "30d" | "all";

/** Reusado por src/functions/purchases.ts pra manter o mesmo recorte de período. */
export function rangeToSince(range: StatsRange): Date | null {
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
  samples: number;
  checkouts: number;
};

export type ScrollDepthRow = { milestone: number; uniq: number };
export type OriginRow = { origin: string; visitors: number; checkouts: number };
export type DeviceRow = { device: string; visitors: number; checkouts: number };

export type FunnelStats = {
  stages: FunnelStageRow[];
  products: ProductRow[];
  scrollDepth: ScrollDepthRow[];
  origins: OriginRow[];
  devices: DeviceRow[];
  totalEvents: number;
  rangeLabel: string;
};

const STAGE_ORDER: Record<string, number> = {
  page_view: 0,
  view_ebook: 1,
  download_sample: 2,
  initiate_checkout: 3,
};

export const getFunnelStats = createServerFn({ method: "GET" })
  .validator((data: { range: StatsRange }) => data)
  .handler(async ({ data }): Promise<FunnelStats> => {
    await adminSessionOrThrow();

    const sql = getSql();
    const since = rangeToSince(data.range);

    // origin/device dependem de colunas novas (utm_source, device). Se a
    // migração ainda não rodou no banco, essas duas falham — e não podem
    // derrubar o resto do painel, que não depende delas.
    async function safeQuery(fn: () => Promise<unknown>): Promise<unknown[]> {
      try {
        return (await fn()) as unknown[];
      } catch (err) {
        console.error("[admin-stats] query falhou:", err);
        return [];
      }
    }

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
            COUNT(DISTINCT CASE WHEN event_name = 'download_sample' THEN session_id END)::int AS samples,
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
            COUNT(DISTINCT CASE WHEN event_name = 'download_sample' THEN session_id END)::int AS samples,
            COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
          FROM funnel_events
          WHERE slug IS NOT NULL
          GROUP BY slug
          ORDER BY views DESC
        `;

    const scrollRaw = since
      ? await sql`
          SELECT value::int AS milestone, COUNT(DISTINCT session_id)::int AS uniq
          FROM funnel_events
          WHERE event_name = 'scroll_depth' AND created_at >= ${since.toISOString()}
          GROUP BY value
          ORDER BY value
        `
      : await sql`
          SELECT value::int AS milestone, COUNT(DISTINCT session_id)::int AS uniq
          FROM funnel_events
          WHERE event_name = 'scroll_depth'
          GROUP BY value
          ORDER BY value
        `;

    const originsRaw = await safeQuery(() =>
      since
        ? sql`
            SELECT
              COALESCE(utm_source, 'Direto / orgânico') AS origin,
              COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN session_id END)::int AS visitors,
              COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
            FROM funnel_events
            WHERE created_at >= ${since.toISOString()}
            GROUP BY COALESCE(utm_source, 'Direto / orgânico')
            ORDER BY visitors DESC
          `
        : sql`
            SELECT
              COALESCE(utm_source, 'Direto / orgânico') AS origin,
              COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN session_id END)::int AS visitors,
              COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
            FROM funnel_events
            GROUP BY COALESCE(utm_source, 'Direto / orgânico')
            ORDER BY visitors DESC
          `,
    );

    const devicesRaw = await safeQuery(() =>
      since
        ? sql`
            SELECT
              COALESCE(device, 'desconhecido') AS device,
              COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN session_id END)::int AS visitors,
              COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
            FROM funnel_events
            WHERE created_at >= ${since.toISOString()}
            GROUP BY COALESCE(device, 'desconhecido')
            ORDER BY visitors DESC
          `
        : sql`
            SELECT
              COALESCE(device, 'desconhecido') AS device,
              COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN session_id END)::int AS visitors,
              COUNT(DISTINCT CASE WHEN event_name = 'initiate_checkout' THEN session_id END)::int AS checkouts
            FROM funnel_events
            GROUP BY COALESCE(device, 'desconhecido')
            ORDER BY visitors DESC
          `,
    );

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
      scrollDepth: scrollRaw as ScrollDepthRow[],
      origins: originsRaw as OriginRow[],
      devices: devicesRaw as DeviceRow[],
      totalEvents: stages.reduce((sum, s) => sum + s.total, 0),
      rangeLabel,
    };
  });
