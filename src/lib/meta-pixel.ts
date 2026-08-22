/**
 * Meta Pixel (Facebook).
 * Suporte a múltiplos Pixels ativos ao mesmo tempo.
 */

// Adicione quantos Pixels precisar no array:
export const META_PIXEL_IDS = [
  "1584126873441155",
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Snippet oficial da Meta inicializando AMBOS os Pixels */
export const metaPixelSnippet = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
${META_PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join("\n")}
fbq('track', 'PageView');`;

/** Gera as tags <img> de noscript para todos os Pixels configurados */
export const metaPixelNoscriptHtml = META_PIXEL_IDS.map(
  (id) =>
    `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1" />`
).join("");

/* ==========================================================================
   Funções de evento (NÃO MUDAM NADA)
   O fbq('track') envia automaticamente para TODOS os Pixels inicializados.
   ========================================================================== */

export function trackPageView(): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "PageView");
}

export function trackViewContent(params: {
  contentName: string;
  contentId: string;
  value: number;
}): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", {
    content_name: params.contentName,
    content_ids: [params.contentId],
    content_type: "product",
    value: params.value,
    currency: "BRL",
  });
}

export function trackInitiateCheckout(params: {
  contentName: string;
  contentId: string;
  value: number;
}): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", {
    content_name: params.contentName,
    content_ids: [params.contentId],
    content_type: "product",
    value: params.value,
    currency: "BRL",
  });
}

export function trackDownloadSample(params: { contentName: string; contentId: string }): void {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", "DownloadSample", {
    content_name: params.contentName,
    content_ids: [params.contentId],
    content_type: "product",
  });
}

export function trackScrollDepth(milestone: number): void {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", "ScrollDepth", { milestone });
}

export function trackContact(): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact");
}