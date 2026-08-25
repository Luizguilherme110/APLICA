/**
 * OpenAI (ChatGPT) Ads Pixel.
 * Roda em paralelo ao Meta Pixel (src/lib/meta-pixel.ts) — não substitui.
 */

export const OPENAI_PIXEL_ID = "7RcoJcygh8svFp1yEuQtEk";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

/** Snippet oficial da OpenAI inicializando o Pixel. */
export const openaiPixelSnippet = `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}"});`;

function measure(event: string, amount: number): void {
  if (typeof window === "undefined") return;
  window.oaiq?.("measure", event, {
    type: "customer_action",
    amount,
    currency: "BRL",
  });
}

export function trackViewContent(params: { value: number }): void {
  measure("view_content", params.value);
}

/** Payload exato fornecido pela OpenAI Ads pro evento "checkout_started". */
export function trackCheckoutStarted(): void {
  if (typeof window === "undefined") return;
  window.oaiq?.("measure", "checkout_started", { type: "contents" });
}

export function trackDownloadSample(): void {
  measure("download_sample", 0);
}

export function trackContact(): void {
  measure("contact", 0);
}
