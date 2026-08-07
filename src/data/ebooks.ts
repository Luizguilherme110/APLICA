export type Module = {
  title: string;
  description: string;
};

export type Ebook = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  format: string;
  price: string;
  headline: string;
  subheadline: string;
  audience: string[];
  notFor: string[];
  highlights: string[];
  modules: Module[];
  actionPlan: string;
  guarantee: string;
  /**
   * TODO: substituir pelo link real de checkout gerado na Cakto assim que o
   * produto estiver cadastrado por lá. Enquanto este valor apontar para
   * "#checkout-pendente", os botões de compra ficam desabilitados no site.
   */
  checkoutUrl: string;
};

export const STORE = {
  name: "Aplica",
  tagline: "Guias práticos para você aplicar ainda hoje",
  supportEmail: "contato@aplica.com.br",
  whatsapp: "https://wa.me/5500000000000",
};

export const ebooks: Ebook[] = [
  {
    slug: "cliente-na-porta",
    title: "Cliente na Porta",
    tagline:
      "Guia prático de marketing digital para atrair e fidelizar clientes do comércio local.",
    category: "Marketing Local",
    format: "PDF · 29 páginas · 5 módulos + bônus",
    price: "R$ 47,90",
    headline: "A vitrine do seu cliente hoje é a tela do celular",
    subheadline:
      "O guia completo para atrair clientes da sua região e vender mais pela internet, sem depender de agência nem de grande investimento. Para lojas, restaurantes, salões, pet shops e prestadores de serviço.",
    audience: [
      "Donos de loja física, restaurante, salão ou pet shop",
      "Prestadores de serviço que dependem de clientes da própria região",
      "Quem tem 15 a 20 minutos por dia e um celular, nada além disso",
    ],
    notFor: [
      "Quem já tem equipe de marketing dedicada",
      "Negócios 100% online sem base de clientes local",
    ],
    highlights: [
      "Perfil no Google Meu Negócio otimizado, com o sistema completo de avaliações 5 estrelas",
      "Banco de ideias e roteiro de conteúdo para o Instagram do bairro",
      "Seis modelos de mensagem prontos para o WhatsApp Business, da saudação à indicação",
      "Como impulsionar um post para um raio de 3 a 5 km a partir de R$ 5 por dia",
      "Programa de fidelização simples para vender de novo para quem já comprou",
    ],
    modules: [
      {
        title: "Google Meu Negócio",
        description:
          "O mapa que leva o cliente até você. Cadastro completo, categorias, atributos, fotos que convertem e o sistema para conseguir avaliações 5 estrelas, incluindo como responder às negativas sem se queimar.",
      },
      {
        title: "Instagram Local",
        description:
          "Conteúdo que atrai clientes do bairro. Perfil otimizado, um banco de ideias de post por tipo de negócio, rotina de 15 minutos, vídeos curtos e parcerias locais para crescer sem gastar.",
      },
      {
        title: "WhatsApp Business",
        description:
          "Onde a venda realmente se fecha. Catálogo, funil de atendimento com etiquetas, listas de transmissão e seis modelos de mensagem prontos, da saudação automática ao pedido de indicação.",
      },
      {
        title: "Anúncios Locais",
        description:
          "Alcance extra, com poucos reais por dia. Como impulsionar para um raio de 3 a 5 km, a estrutura de um anúncio que funciona e quanto investir no primeiro teste.",
      },
      {
        title: "Fidelização",
        description:
          "O lucro que está na sua base de clientes. Pós-venda que traz o cliente de volta, um programa de fidelidade simples e como usar datas e contatos para vender de novo.",
      },
    ],
    actionPlan:
      "O guia termina com um kit de bônus (métricas simples, erros que afundam o marketing local e 20 ideias de post) e dois planos de ação: um começo rápido de 7 dias e um desafio de 30 dias para virar hábito.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "#checkout-pendente",
  },
];

export const getEbook = (slug: string) => ebooks.find((e) => e.slug === slug);
