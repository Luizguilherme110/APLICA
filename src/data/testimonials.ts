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
  {
    headline: "Muda totalmente a relação com o cachorro!",
    quote:
      "Eu já estava no limite com o meu filhote mordendo minhas mãos e fazendo xixi no tapete da " +
      "sala. Tinha medo de estar fazendo tudo errado. O e-book me ensinou a lógica do reforço " +
      "positivo e a nunca mais esfregar o focinho dele na sujeira ou dar bronca atrasada. O " +
      "módulo de higiene e as dicas do marcador ('isso!') mudaram o jogo. Em menos de duas " +
      "semanas, usando só 5 minutos por dia, ele passou a ir direto no tapete higiênico. Vale " +
      "cada centavo!",
    name: "Mariana Souza",
    context: "Tutora de filhote de Golden Retriever",
    ebookSlug: "cao-educado",
    rating: 5,
  },
  {
    headline: "Passear finalmente virou um momento de paz",
    quote:
      "Achava que cão adulto não aprendia mais e que eu teria que usar enforcador para ele parar " +
      "de me arrastar na rua. A regra de ouro da 'guia frouxa' do Módulo 4 me salvou: guia " +
      "esticada faz parar, guia frouxa faz andar. Comecei aplicando os treinos de 5 minutos " +
      "dentro de casa antes de ir pra rua. Hoje o passeio é super tranquilo e sem puxões. O " +
      "plano de ação de 30 dias facilita demais a rotina.",
    name: "Ricardo Mendes",
    context: "Tutor de cão adulto (vira-lata)",
    ebookSlug: "cao-educado",
    rating: 5,
  },
  {
    headline: "Muito prático e direto ao ponto",
    quote:
      "O que mais gostei é que não tem enrolação teórica. O guia ensina o kit básico necessário, " +
      "como 'carregar o marcador' em poucos minutos e como aplicar os '3 Ds' (distância, duração " +
      "e distração) nos comandos de senta, deita e fica. Meu cão latia por qualquer coisa e " +
      "pulava em todas as visitas; com a técnica de ignorar o pulo e recompensar só as quatro " +
      "patas no chão, resolvemos em poucos dias!",
    name: "Camila Torres",
    context: "Tutora de Beagle",
    ebookSlug: "cao-educado",
    rating: 5,
  },
  {
    headline: "O comando 'vem' salvou meu cachorro!",
    quote:
      "Comprei o e-book principalmente por causa do comando 'vem' e do 'solta'. Meu cão pegava " +
      "coisas perigosas na rua e fugia se a porta ficasse aberta. As orientações para nunca usar " +
      "o chamado pra dar banho ou dar bronca fizeram total sentido. O método de troca no 'solta' " +
      "com petiscos de alto valor salvou a gente várias vezes. Leitura obrigatória pra quem quer " +
      "paz em casa.",
    name: "Lucas Barbosa",
    context: "Tutor de Border Collie",
    ebookSlug: "cao-educado",
    rating: 5,
  },
  {
    headline: "Meu Google Meu Negócio começou a lotar a loja",
    quote:
      "Se eu soubesse disso antes, não teria gasto tanto dinheiro com panfletos. Apliquei só o " +
      "Módulo 1 do Google Meu Negócio: otimizei a descrição com o meu bairro, coloquei as fotos " +
      "certas e imprimi o QR Code de avaliação para colocar no balcão. Em três semanas, entrei " +
      "para o 'bloco dos 3' do mapa na minha cidade. Agora recebo clientes semanais que dizem " +
      "que me acharam no Google!",
    name: "Juliana Rocha",
    context: "Proprietária de salão de beleza",
    ebookSlug: "cliente-na-porta",
    rating: 5,
  },
  {
    headline: "Recuperei clientes antigos no primeiro dia de teste",
    quote:
      "A parte de WhatsApp Business vale ouro. Eu usava o aplicativo comum e perdia muitas " +
      "vendas por falta de organização. Configurei o catálogo, as respostas rápidas e as " +
      "etiquetas do funil. Peguei o modelo pronto de 'recuperação de cliente inativo' do e-book " +
      "e mandei para 10 clientes antigos que não apareciam há meses. Recuperei 6 agendamentos na " +
      "mesma tarde!",
    name: "Thiago Martins",
    context: "Dono de pet shop e banho & tosa",
    ebookSlug: "cliente-na-porta",
    rating: 5,
  },
  {
    headline: "Anúncios locais fáceis de fazer sem gastar muito",
    quote:
      "Eu tinha pavor de investir no Gerenciador de Anúncios e rasgar dinheiro. O e-book ensina " +
      "o passo a passo exato para impulsionar no Instagram focando no raio de 3 a 5 km da loja, " +
      "investindo só R$ 10 por dia. O objetivo direto para mensagens no WhatsApp trouxe " +
      "resultado imediato. O retorno cobriu o investimento logo nos primeiros dias de campanha.",
    name: "Fernando Pires",
    context: "Pizzaria delivery",
    ebookSlug: "cliente-na-porta",
    rating: 5,
  },
  {
    headline: "Perfeito para quem não tem tempo a perder",
    quote:
      "Sou sozinha pra cuidar de estoque, atendimento e vendas. A rotina de 15 minutos diários " +
      "de conteúdo local e a proporção de 4 posts úteis para 1 de venda mudaram a movimentação " +
      "do meu perfil. Além disso, o checklist de cada módulo ajuda a manter o foco sem ficar " +
      "perdida. É um manual prático para quem é comerciante e precisa de vendas reais, não de " +
      "seguidores de enfeite.",
    name: "Vanessa Lima",
    context: "Loja de roupas femininas",
    ebookSlug: "cliente-na-porta",
    rating: 5,
  },
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
