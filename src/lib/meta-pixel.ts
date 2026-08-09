/**
 * Meta Pixel (Facebook).
 *
 * O snippet base é injetado no <head> pelo RootShell em src/routes/__root.tsx.
 * Como este site é uma SPA, o "PageView" automático do snippet só dispara no
 * primeiro carregamento — a navegação entre rotas é feita no cliente, sem
 * recarregar a página. Por isso o RootComponent também dispara trackPageView()
 * a cada troca de rota.
 */

export const META_PIXEL_ID = "1373667820810432";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Snippet oficial da Meta, com o ID já preenchido. */
export const metaPixelSnippet = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export const metaPixelNoscriptSrc = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;

/**
 * Conteúdo do <noscript> como HTML cru, de propósito.
 *
 * Com o JS ligado o navegador NÃO parseia o interior de um <noscript>: ele
 * guarda tudo como um único nó de texto. Se passarmos <img> como filho JSX, o
 * React espera encontrar um elemento na hidratação, acha texto, e derruba a
 * árvore com o erro #418. Entregando a mesma string dos dois lados, servidor e
 * cliente batem.
 */
export const metaPixelNoscriptHtml = `<img height="1" width="1" style="display:none" alt="" src="${metaPixelNoscriptSrc}" />`;

/** Dispara um PageView. Seguro chamar antes de o script carregar (a fila do fbq segura). */
export function trackPageView(): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "PageView");
}

/**
 * Dispara InitiateCheckout ao mandar o visitante para o checkout da Cakto.
 * O evento Purchase NÃO pode ser disparado aqui: a compra se completa no
 * domínio da Cakto, então ele precisa ser configurado no painel deles.
 */
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
