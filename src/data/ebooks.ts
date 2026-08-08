import coverCaoEducado from "@/assets/cover-cao-educado.jpg";
import coverClienteNaPorta from "@/assets/cover-cliente-na-porta.jpg";

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
  coverImage: string;
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
    coverImage: coverClienteNaPorta,
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
    checkoutUrl: "https://pay.cakto.com.br/ugxj9tc_1027094",
  },
  {
    slug: "cao-educado",
    title: "Cão Educado",
    tagline:
      "Guia prático de adestramento com reforço positivo para educar seu cão em casa, do jeito certo.",
    category: "Adestramento Positivo",
    format: "PDF · 29 páginas · 5 módulos + bônus",
    price: "R$ 35,90",
    coverImage: coverCaoEducado,
    headline: "Um cão bem-educado começa com o método certo",
    subheadline:
      "O guia completo de adestramento com reforço positivo, o método mais eficaz e recomendado por especialistas. Comandos essenciais, passeio sem puxar e solução para os comportamentos que mais incomodam, com passo a passo pra treinar em casa.",
    audience: [
      "Tutores de filhote ou cão adulto que querem ensinar do zero",
      "Quem já tentou adestrar sozinho e não teve resultado",
      "Donos cansados de latido, puxão na guia ou bagunça em casa",
    ],
    notFor: [
      "Casos de agressividade, ansiedade intensa ou mudanças bruscas de comportamento, que pedem acompanhamento de veterinário ou adestrador profissional",
      "Quem busca resultado sem repetir o treino todo dia",
    ],
    highlights: [
      "Os seis comandos essenciais com passo a passo: senta, deita, fica, vem, junto e solta",
      "Caixa \"Treino na prática\" em cada comando, com o roteiro exato da sessão",
      "Passeios sem puxar e socialização, com sinais de quando procurar um profissional",
      "Solução para latido, pular em visita, mordida de filhote, higiene e ansiedade de ficar sozinho",
      "Plano de 7 dias e desafio de 30 dias pra transformar o treino em rotina",
    ],
    modules: [
      {
        title: "Como o Cão Aprende",
        description:
          "A base do reforço positivo: o marcador, o timing certo, o tipo de recompensa que funciona, como ler a linguagem corporal do seu cão e por que a punição atrapalha o aprendizado.",
      },
      {
        title: "Preparação",
        description:
          "O kit de adestramento, como carregar o marcador, os três Ds do treino (distância, duração e distração) e a rotina de sessões curtas que cabe no seu dia.",
      },
      {
        title: "Os Seis Comandos Essenciais",
        description:
          "Senta, deita, fica, vem, junto e solta, cada um com o passo a passo completo e a caixa \"Treino na prática\" com o roteiro exato da sessão.",
      },
      {
        title: "Passeios e Socialização",
        description:
          "Como passear sem ser puxado, apresentar o cão a outros animais e pessoas com segurança, e os sinais de quando vale procurar um profissional.",
      },
      {
        title: "Comportamentos Difíceis",
        description:
          "Solução prática para o que mais incomoda: latido excessivo, pular em visita, mordida de filhote, higiene e ansiedade ao ficar sozinho.",
      },
    ],
    actionPlan:
      "O guia traz três bônus (mitos do adestramento, erros mais comuns e enriquecimento mental) e dois planos de ação: um começo rápido de 7 dias e um desafio de 30 dias para o treino virar rotina.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/36z2u29_1028969",
  },
];

export const getEbook = (slug: string) => ebooks.find((e) => e.slug === slug);
