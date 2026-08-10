import coverCaoEducado from "@/assets/cover-cao-educado.jpg";
import coverCelularSemMedo from "@/assets/cover-celular-sem-medo.jpg";
import coverClienteNaPorta from "@/assets/cover-cliente-na-porta.jpg";
import coverIaParaIniciantes from "@/assets/cover-ia-para-iniciantes.jpg";
import { parsePriceBRL } from "@/lib/utils";

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
  /** Preço "de", exibido riscado ao lado do preço atual. */
  originalPrice?: string;
  /** Sem capa, o BookCover desenha uma capa tipográfica com o título e a categoria. */
  coverImage?: string | undefined;
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
    originalPrice: "R$ 97,90",
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
    originalPrice: "R$ 79,90",
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
      'Caixa "Treino na prática" em cada comando, com o roteiro exato da sessão',
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
          'Senta, deita, fica, vem, junto e solta, cada um com o passo a passo completo e a caixa "Treino na prática" com o roteiro exato da sessão.',
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
  {
    slug: "ia-para-iniciantes",
    title: "IA para Iniciantes",
    tagline:
      "101 maneiras de usar inteligência artificial para economizar 1 hora por dia, com prompts prontos para copiar.",
    category: "Inteligência Artificial",
    format: "PDF · 30 páginas · 7 módulos + bônus",
    price: "R$ 57,90",
    originalPrice: "R$ 129,90",
    coverImage: coverIaParaIniciantes,
    headline: "Uma hora por dia é muito tempo de volta no seu bolso",
    subheadline:
      "Um guia direto, do zero e sem termos técnicos, com exemplos e prompts prontos para copiar, que transforma ChatGPT, Gemini e outras ferramentas em um assistente para o seu trabalho, seus estudos e a sua vida.",
    audience: [
      "Quem nunca usou IA e não quer perder tempo com termo técnico",
      "Quem já abriu o ChatGPT, achou o resultado genérico e desistiu",
      "Quem passa o dia em tarefa repetitiva de escrever, resumir, organizar ou pesquisar",
    ],
    notFor: [
      "Quem já escreve prompts com contexto, formato e tom no automático",
      "Quem procura programação, integração por API ou criação de agentes",
    ],
    highlights: [
      "101 maneiras numeradas e separadas por área: e-mails, escrita, trabalho, estudos, casa e negócio",
      "Prompts prontos para copiar, trocar o que está entre colchetes e colar",
      "A fórmula que faz a IA acertar: contexto, tarefa, formato e tom",
      "Funciona com ChatGPT, Gemini, Copilot ou Claude, todas com versão gratuita",
      "Os 10 erros que fazem a IA devolver resposta ruim, e como sair de cada um",
    ],
    modules: [
      {
        title: "Fundamentos",
        description:
          "Como conversar com a IA e escrever pedidos que funcionam. Quais ferramentas usar, a fórmula de contexto, tarefa, formato e tom, e por que continuar a conversa rende mais que aceitar a primeira resposta.",
      },
      {
        title: "E-mails e comunicação",
        description:
          "Maneiras 1 a 16. Rascunhar do zero, responder o que está parado, resumir a conversa longa e ajustar o tom daquela mensagem difícil antes de enviar.",
      },
      {
        title: "Escrita, textos e redes",
        description:
          "Maneiras 17 a 34. Sair da página em branco, gerar ideias, montar calendário de conteúdo e adaptar o mesmo texto para cada canal sem reescrever tudo.",
      },
      {
        title: "Produtividade no trabalho",
        description:
          "Maneiras 35 a 52. Organizar tarefas, criar modelos reutilizáveis, preparar reuniões e transformar o que é repetitivo em processo que se resolve em minutos.",
      },
      {
        title: "Estudos e aprendizado",
        description:
          "Maneiras 53 a 68. Aprender no modo ativo respondendo às perguntas da IA, resumir material longo e treinar para prova com quem nunca se cansa de explicar.",
      },
      {
        title: "Casa, finanças e vida pessoal",
        description:
          "Maneiras 69 a 85. Cardápio da semana e lista de compras, orçamento simples, planejamento de viagem e as pequenas decisões que tomam tempo todo dia.",
      },
      {
        title: "Pequenos negócios",
        description:
          "Maneiras 86 a 101. Anúncios, respostas prontas de atendimento, descrição de produto e ideias de conteúdo para quem toca o próprio negócio sozinho.",
      },
    ],
    actionPlan:
      "O guia fecha com três bônus (a fórmula do prompt perfeito, os 10 erros que estragam a resposta e um capítulo de uso responsável, sobre conferir dados e não expor informação sensível) e dois planos de ação: sete dias para pegar o jeito e um desafio de 30 dias para virar hábito.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/irmwj6t_1031016",
  },
  {
    slug: "celular-sem-medo",
    title: "Celular Sem Medo",
    tagline:
      "Guia em letras grandes e passo a passo para a pessoa idosa usar o celular com autonomia e segurança.",
    category: "Terceira Idade",
    format: "PDF · 32 páginas · 5 módulos + bônus",
    price: "R$ 27,90",
    originalPrice: "R$ 67,90",
    coverImage: coverCelularSemMedo,
    headline: "O celular pode ser seu amigo, não um problema",
    subheadline:
      "O guia simples, em letras grandes e passo a passo, para você usar o seu celular com autonomia, tranquilidade e segurança, no seu tempo e sem depender de ninguém.",
    audience: [
      "Quem tem 60 anos ou mais e quer resolver as próprias coisas no celular",
      "Quem já tem o aparelho mas usa só o básico, com receio de mexer e estragar",
      "Filhos e netos que querem ensinar os pais e avós sem perder a paciência",
    ],
    notFor: [
      "Quem já usa aplicativo de banco, mapas e redes sociais com desenvoltura",
      "Quem procura comparação técnica entre marcas e modelos de aparelho",
    ],
    highlights: [
      "Letras grandes e passos curtos, feito para a pessoa ler sozinha, sem ajuda",
      "WhatsApp inteiro: mensagem, áudio, foto e chamada de vídeo com os netos",
      "O módulo de golpes, o mais importante do guia: falso parente, falso banco e o código do WhatsApp",
      'Cartão "Não caia em golpes" e ficha "Meu celular" para imprimir e deixar à mão',
      "Um capítulo para a família ensinar com paciência, sem atropelar",
    ],
    modules: [
      {
        title: "Conhecendo o celular",
        description:
          "Os primeiros passos, sem pressa: os botões da lateral, a tela, aumentar as letras, ajustar o brilho, conectar no Wi-Fi e entender a barra de notificações. Nada quebra por explorar.",
      },
      {
        title: "WhatsApp sem mistério",
        description:
          "Conversar, mandar foto e ver quem você ama. Mensagem escrita, áudio segurando o microfone, envio de foto da galeria ou tirada na hora, e a chamada de vídeo passo a passo.",
      },
      {
        title: "Aplicativos, fotos e internet",
        description:
          "Instalar aplicativos com segurança, guardar e encontrar suas fotos na galeria, e pesquisar qualquer coisa no Google e no YouTube sem se perder.",
      },
      {
        title: "O dia a dia mais fácil",
        description:
          "Mapas para achar endereços e compartilhar sua localização com a família, transporte por aplicativo e lembretes de remédio que avisam na hora certa.",
      },
      {
        title: "Segurança: sem cair em golpes",
        description:
          "O módulo mais importante. Golpe quase sempre vem com pressa e pressão: falso parente pedindo Pix, falso banco pedindo senha, o código do WhatsApp por SMS, prêmio e boleto falsos. E a lista do que nunca fazer.",
      },
    ],
    actionPlan:
      'O guia termina com três bônus imprimíveis (o cartão anti-golpe para deixar perto do celular, a ficha "Meu celular" com os números importantes e o capítulo para a família ensinar com paciência) e dois planos de ação: sete dias para começar e um desafio de 30 dias para ganhar confiança.',
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/t5woe75_1031028",
  },
];

export const getEbook = (slug: string) => ebooks.find((e) => e.slug === slug);

/** Percentual de desconto arredondado, ou null se não houver originalPrice. */
export const discountPercent = (ebook: Ebook): number | null => {
  if (!ebook.originalPrice) return null;
  const original = parsePriceBRL(ebook.originalPrice);
  const current = parsePriceBRL(ebook.price);
  if (!original || original <= current) return null;
  return Math.round((1 - current / original) * 100);
};

/** Menor preço do catálogo — é o que o "a partir de" da home deve mostrar. */
export const cheapestPrice = ebooks.reduce(
  (cheapest, e) => (parsePriceBRL(e.price) < parsePriceBRL(cheapest) ? e.price : cheapest),
  ebooks[0]?.price ?? "",
);
