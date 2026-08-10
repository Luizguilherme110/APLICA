/**
 * Prints de conversa (WhatsApp) autorizados por clientes reais.
 *
 * REGRA: só entra aqui print real de cliente que autorizou o uso — mesma
 * regra de src/data/testimonials.ts. Veja DEPOIMENTOS.md.
 */

import cavaporcliente from "@/assets/testimonials/depoimento-cliente-na-porta.png";
import depoimentoIa from "@/assets/testimonials/depoimento-ia-para-iniciantes.png";
import depoimentoCao from "@/assets/testimonials/depoimento-cao-educado.png";
import depoimentoCelular from "@/assets/testimonials/depoimento-celular-sem-medo.png";

export type TestimonialScreenshot = {
  src: string;
  alt: string;
  /** Trecho exato (não parafraseado) que aparece no print, para legenda do card. */
  quote: string;
  /** Slug do ebook a que o print se refere (veja src/data/ebooks.ts). */
  ebookSlug: string;
};

export const testimonialScreenshots: TestimonialScreenshot[] = [
  {
    src: cavaporcliente,
    alt: "Print de conversa no WhatsApp: cliente contando que o movimento no Instagram da loja triplicou depois de aplicar o guia Cliente na Porta.",
    quote: "O movimento no Instagram da loja triplicou, sério!",
    ebookSlug: "cliente-na-porta",
  },
  {
    src: depoimentoIa,
    alt: "Print de conversa no WhatsApp: cliente contando que os prompts prontos do guia 101 Maneiras de Usar IA economizam uma hora do dia dele.",
    quote: "Os prompts prontos já economizam facilmente 1 hora do meu dia",
    ebookSlug: "ia-para-iniciantes",
  },
  {
    src: depoimentoCao,
    alt: "Print de conversa no WhatsApp: cliente contando que o cachorro aprendeu a sentar e ficar no lugar com o guia Cão Educado.",
    quote: "Em poucos dias ele já senta e fica no lugar 🐶",
    ebookSlug: "cao-educado",
  },
  {
    src: depoimentoCelular,
    alt: "Print de conversa no WhatsApp: cliente contando que o pai idoso passou a mandar mensagem e fazer videochamada sozinho com o guia Celular Sem Medo.",
    quote: "Ele hoje manda mensagem e faz videochamada sozinho",
    ebookSlug: "celular-sem-medo",
  },
];

/** Prints de um ebook específico, ou todos se nenhum slug for passado. */
export function getTestimonialScreenshots(ebookSlug?: string): TestimonialScreenshot[] {
  if (!ebookSlug) return testimonialScreenshots;
  return testimonialScreenshots.filter((t) => t.ebookSlug === ebookSlug);
}
