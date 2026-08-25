import { track as trackVercelAnalytics } from "@vercel/analytics/react";
import { effectivePrice, type Ebook } from "@/data/ebooks";
import * as metaPixel from "@/lib/meta-pixel";
import * as openaiPixel from "@/lib/openai-pixel";
import { logFunnelEvent } from "@/lib/funnel-analytics";
import { parsePriceBRL } from "@/lib/utils";

/**
 * Sinaliza que o visitante abriu a página do produto — segundo degrau do
 * funil, antes de clicar em comprar. Dispara em 4 sistemas: Meta Pixel e
 * OpenAI Ads Pixel (Ads Manager de cada plataforma), Vercel Analytics, e o
 * funil interno (src/routes/admin.tsx).
 */
export function reportProductView(ebook: Ebook) {
  const value = parsePriceBRL(effectivePrice(ebook));
  metaPixel.trackViewContent({ contentName: ebook.title, contentId: ebook.slug, value });
  openaiPixel.trackViewContent({ value });
  trackVercelAnalytics("view_ebook", { slug: ebook.slug, category: ebook.category, value });
  logFunnelEvent("view_ebook", { slug: ebook.slug, category: ebook.category, value });
}

/** Sinaliza que o visitante saiu para o checkout da Cakto — último degrau antes da compra. */
export function reportCheckoutIntent(ebook: Ebook) {
  const value = parsePriceBRL(effectivePrice(ebook));
  metaPixel.trackInitiateCheckout({ contentName: ebook.title, contentId: ebook.slug, value });
  openaiPixel.trackCheckoutStarted();
  trackVercelAnalytics("initiate_checkout", { slug: ebook.slug, category: ebook.category, value });
  logFunnelEvent("initiate_checkout", { slug: ebook.slug, category: ebook.category, value });
}
