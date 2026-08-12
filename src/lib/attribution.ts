/**
 * De onde o visitante veio (UTM) e em que tipo de aparelho — capturado uma
 * vez na primeira página que ele abre (first-touch) e reusado em toda a
 * sessão, inclusive levado pro link de checkout da Cakto.
 *
 * "src", "sck" e "utm_*" são os parâmetros que a Cakto reconhece:
 * https://ajuda.cakto.com.br/pt/article/como-passar-parametros-de-rastreamento-na-url-do-checkout-src-utm-tags-entre-outros-olyk0h/
 */

const STORAGE_KEY = "aplica_attribution";

export type Attribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

function readStored(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Lê os UTM da URL atual e persiste como first-touch: se a sessão já tinha
 * atribuição salva, a URL nova não sobrescreve — quem entrou pelo anúncio X e
 * depois voltou direto continua contado como tendo vindo do anúncio X.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (readStored()) return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? params.get("src");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign") ?? params.get("sck");

  if (!utmSource && !utmMedium && !utmCampaign) return;

  const attribution: Attribution = {
    utmSource,
    utmMedium,
    utmCampaign,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage indisponível (modo privado, quota) — segue sem atribuição.
  }
}

export function getAttribution(): Attribution {
  return readStored() ?? { utmSource: null, utmMedium: null, utmCampaign: null };
}

/** "mobile" ou "desktop", pela largura da tela — mais estável que ler o user agent na mão. */
export function getDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

/**
 * Anexa os UTM guardados na URL de checkout da Cakto — é assim que eles
 * chegam no campo "checkoutUrl" do webhook de venda, dando uma chance
 * (best-effort, não documentado pela Cakto) de saber qual campanha vendeu,
 * não só qual campanha trouxe clique.
 */
export function withAttribution(url: string): string {
  if (url === "#checkout-pendente") return url;
  const attribution = getAttribution();
  const params = new URLSearchParams();
  if (attribution.utmSource) params.set("utm_source", attribution.utmSource);
  if (attribution.utmMedium) params.set("utm_medium", attribution.utmMedium);
  if (attribution.utmCampaign) params.set("utm_campaign", attribution.utmCampaign);
  const query = params.toString();
  if (!query) return url;
  return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
}
