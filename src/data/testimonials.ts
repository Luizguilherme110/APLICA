/**
 * Depoimentos de clientes reais.
 *
 * REGRA: só entra aqui o que um cliente de verdade escreveu e autorizou publicar.
 * Depoimento inventado é publicidade enganosa (art. 37 do CDC) e o risco não
 * compensa: além da multa, um comprador que descobre nunca mais volta.
 *
 * Veja DEPOIMENTOS.md para como coletar novos e como preencher cada campo.
 */

export type Testimonial = {
  /** Frase curta de destaque, exibida em negrito acima do depoimento. */
  headline?: string;
  /** O texto do cliente, nas palavras dele. Não reescreva. */
  quote: string;
  /**
   * Como o cliente autorizou ser identificado. "Marina S." é aceitável;
   * inicial sozinha ("M.") passa impressão de inventado.
   */
  name: string;
  /**
   * O contexto é o que dá credibilidade — tipo de negócio e cidade.
   * Ex.: "Pet shop · Contagem, MG". Deixe de fora se o cliente não autorizou.
   */
  context?: string;
  /** Slug do ebook a que o depoimento se refere (veja src/data/ebooks.ts). */
  ebookSlug: string;
  /** Nota inteira de 1 a 5 que o cliente deu. Omita se ele não deu nota. */
  rating?: number;
  /**
   * true SOMENTE se você confirmou a compra no painel da Cakto.
   * É esse campo que exibe o selo "Compra verificada" no site.
   */
  verifiedPurchase?: boolean;
  /** Data (AAAA-MM-DD) em que o cliente autorizou o uso. Guarde o print. */
  authorizedAt?: string;
};

export const testimonials: Testimonial[] = [
  // Vazio de propósito: zero vendas até agora, então zero depoimento real.
  // Assim que houver print de WhatsApp autorizado por um comprador de verdade, cadastre aqui.
];

/** Depoimentos de um ebook específico, ou todos se nenhum slug for passado. */
export function getTestimonials(ebookSlug?: string): Testimonial[] {
  if (!ebookSlug) return testimonials;
  return testimonials.filter((t) => t.ebookSlug === ebookSlug);
}

/** Média das notas dadas. Retorna null se ninguém avaliou ainda. */
export function getAverageRating(items: Testimonial[]): number | null {
  const rated = items.filter((t) => typeof t.rating === "number");
  if (rated.length === 0) return null;
  return rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length;
}
