import { track as trackVercelAnalytics } from "@vercel/analytics/react";
import { effectivePrice, type Ebook } from "@/data/ebooks";
import { trackInitiateCheckout, trackViewContent } from "@/lib/meta-pixel";
import { logFunnelEvent } from "@/lib/funnel-analytics";
import { parsePriceBRL } from "@/lib/utils";

/**
 * Sinaliza que o visitante abriu a página do produto — segundo degrau do
 * funil, antes de clicar em comprar. Dispara em 3 sistemas: Meta Pixel (Ads
 * Manager), Vercel Analytics, e o funil interno (src/routes/admin.tsx).
 */
export function reportProductView(ebook: Ebook) {
  const value = parsePriceBRL(effectivePrice(ebook));
  trackViewContent({ contentName: ebook.title, contentId: ebook.slug, value });
  trackVercelAnalytics("view_ebook", { slug: ebook.slug, category: ebook.category, value });
  logFunnelEvent("view_ebook", { slug: ebook.slug, category: ebook.category, value });
}

/** Sinaliza que o visitante saiu para o checkout da Cakto — último degrau antes da compra. */
export function reportCheckoutIntent(ebook: Ebook) {
  const value = parsePriceBRL(effectivePrice(ebook));
  trackInitiateCheckout({ contentName: ebook.title, contentId: ebook.slug, value });
  trackVercelAnalytics("initiate_checkout", { slug: ebook.slug, category: ebook.category, value });
  logFunnelEvent("initiate_checkout", { slug: ebook.slug, category: ebook.category, value });
}
