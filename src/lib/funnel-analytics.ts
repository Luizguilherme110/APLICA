import { logEvent, type FunnelEventName } from "@/functions/analytics";
import { getAttribution, getDevice } from "@/lib/attribution";

const SESSION_KEY = "aplica_session_id";

/** ID de sessão anônimo, persistido no localStorage. Reusado pelo SampleModal. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * Dispara um evento do funil pro dashboard interno (src/routes/admin.tsx).
 * Silencioso em caso de erro — analytics nunca pode quebrar a navegação.
 */
export function logFunnelEvent(
  event: FunnelEventName,
  extra?: { slug?: string; category?: string; value?: number },
): void {
  if (typeof window === "undefined") return;
  const attribution = getAttribution();
  logEvent({
    data: {
      event,
      sessionId: getSessionId(),
      path: window.location.pathname,
      device: getDevice(),
      utmSource: attribution.utmSource ?? undefined,
      utmMedium: attribution.utmMedium ?? undefined,
      utmCampaign: attribution.utmCampaign ?? undefined,
      ...extra,
    },
  }).catch(() => {});
}
