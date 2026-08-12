import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";

export type FunnelEventName =
  | "page_view"
  | "view_ebook"
  | "download_sample"
  | "initiate_checkout"
  | "scroll_depth"
  | "click_whatsapp";

type LogEventInput = {
  event: FunnelEventName;
  sessionId: string;
  slug?: string | undefined;
  category?: string | undefined;
  value?: number | undefined;
  path?: string | undefined;
  device?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
};

/**
 * Grava um evento do funil no Postgres. Nunca deve derrubar a navegação do
 * visitante — qualquer erro de banco é só logado no servidor.
 */
export const logEvent = createServerFn({ method: "POST" })
  .validator((data: LogEventInput) => data)
  .handler(async ({ data }) => {
    try {
      const sql = getSql();
      await sql`
        INSERT INTO funnel_events
          (event_name, slug, category, value, session_id, path, device, utm_source, utm_medium, utm_campaign)
        VALUES (
          ${data.event}, ${data.slug ?? null}, ${data.category ?? null}, ${data.value ?? null},
          ${data.sessionId}, ${data.path ?? null}, ${data.device ?? null},
          ${data.utmSource ?? null}, ${data.utmMedium ?? null}, ${data.utmCampaign ?? null}
        )
      `;
    } catch (err) {
      console.error("[analytics] falha ao gravar evento:", err);
    }
    return { ok: true };
  });
