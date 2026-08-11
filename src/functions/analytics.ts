import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";

export type FunnelEventName = "page_view" | "view_ebook" | "initiate_checkout";

type LogEventInput = {
  event: FunnelEventName;
  sessionId: string;
  slug?: string;
  category?: string;
  value?: number;
  path?: string;
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
        INSERT INTO funnel_events (event_name, slug, category, value, session_id, path)
        VALUES (${data.event}, ${data.slug ?? null}, ${data.category ?? null}, ${data.value ?? null}, ${data.sessionId}, ${data.path ?? null})
      `;
    } catch (err) {
      console.error("[analytics] falha ao gravar evento:", err);
    }
    return { ok: true };
  });
