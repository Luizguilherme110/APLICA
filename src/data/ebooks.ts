import coverCaoEducado from "@/assets/cover-cao-educado.jpg";
import coverCelularSemMedo from "@/assets/cover-celular-sem-medo.jpg";
import coverClienteNaPorta from "@/assets/cover-cliente-na-porta.jpg";
import coverIaParaIniciantes from "@/assets/cover-ia-para-iniciantes.jpg";
import coverRoboticaColecao from "@/assets/cover-robotica-colecao.png";
import coverRoboticaVol1 from "@/assets/cover-robotica-vol1.png";
import coverRoboticaVol2 from "@/assets/cover-robotica-vol2.png";
import coverRoboticaVol3 from "@/assets/cover-robotica-vol3.png";
import coverRoboticaVol4 from "@/assets/cover-robotica-vol4.png";
import coverRoboticaVol5 from "@/assets/cover-robotica-vol5.png";
import coverEnemEssencial from "@/assets/cover-kit-enem-essencial.png";
import coverEnemQuestoes from "@/assets/cover-enem-pacote-questoes-exercicios.png";
import coverEnemRedacao from "@/assets/cover-enem-pacote-redacao.png";
import coverEnemCienciasNatureza from "@/assets/cover-enem-pacote-ciencias-natureza.png";
import coverEnemMatematica from "@/assets/cover-enem-pacote-matematica.png";
import coverEnemSimuladosProvas from "@/assets/cover-enem-pacote-simulados-provas.png";
import coverEnemCompleto from "@/assets/cover-kit-enem-completo.png";
import { parsePriceBRL } from "@/lib/utils";
import { isLaunchOfferActive } from "@/data/promo";

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
   * CHECKOUT_PENDING, os botões de compra ficam desabilitados no site.
   */
  checkoutUrl: string;
  /**
   * Amostra grátis: as primeiras páginas do PDF real, geradas a partir do
   * arquivo fonte em public/amostras/<slug>.pdf. Sem campo = sem botão de
   * amostra na página do produto.
   */
  sampleUrl?: string;
  /** Texto do botão de compra. Sem campo = "Comprar agora". */
  ctaLabel?: string;
  /** Título da seção de módulos na página do produto. Sem campo = "O que você vai aprender". */
  modulesHeading?: string;
  /**
   * Se dá pra parcelar em até 8x no cartão (mostra "até 8x no cartão" perto
   * do preço). Sem campo = true. Usar false quando o valor for baixo demais
   * pra parcelar na Cakto.
   */
  installments?: boolean;
};

export const STORE = {
  name: "Aplica",
  tagline: "Guias práticos para você aplicar ainda hoje",
  supportEmail: "contato@aplica.com.br",
};

/** Sentinela de checkout ainda não cadastrado na Cakto — desabilita os botões de compra. */
export const CHECKOUT_PENDING = "#checkout-pendente";
export const isCheckoutPending = (checkoutUrl: string): boolean => checkoutUrl === CHECKOUT_PENDING;

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
    sampleUrl: "/amostras/cliente-na-porta.pdf",
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
    sampleUrl: "/amostras/cao-educado.pdf",
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
    sampleUrl: "/amostras/ia-para-iniciantes.pdf",
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
    sampleUrl: "/amostras/celular-sem-medo.pdf",
  },
  {
    slug: "robotica-vol-1-primeiros-projetos",
    title: "Robótica com Sucata — Vol. 1: Primeiros Projetos",
    tagline:
      "8 experiências de ciência para fazer com seu filho de 5 a 7 anos usando só papel, barbante e coisa de casa.",
    category: "Robótica Infantil",
    format: "PDF · 8 experiências práticas",
    price: "R$ 24,90",
    coverImage: coverRoboticaVol1,
    headline: "A curiosidade começa cedo — e cabe na sua mesa",
    subheadline:
      "8 experiências de ciência para fazer junto com seu filho de 5 a 7 anos, sem motor, sem tomada e sem complicação. Só papel, barbante e coisa que você já tem em casa.",
    audience: [
      "Pais e mães de crianças de 5 a 7 anos que querem uma atividade sem tela",
      "Quem quer começar a coleção Mãos à Obra pelo volume mais simples",
      "Família que já tem papel, barbante e cola em casa — nada de compra extra",
    ],
    notFor: [
      "Crianças acima de 8 anos, que já dão conta de projeto com motor (ver Volume 2)",
      "Quem procura projeto com eletrônica ou peça de loja de robótica",
    ],
    highlights: [
      "8 experiências: foguete de bexiga, carrinho de bexiga, pião de cores, catapulta de palitos, mão de papelão, telefone de copo, barquinho a sabão e vulcão de espuma",
      "Zero motor, zero eletricidade — só material que já tem em casa",
      'Cada experiência com o quadro "Como funciona?", pra explicar a ciência sem aula chata',
      "Regras de segurança em cada projeto, escritas pra ler junto com a criança",
      "Nível de dificuldade em estrelas, do mais rápido ao mais caprichado",
    ],
    modules: [
      {
        title: "01 · Foguete de Bexiga",
        description:
          "Ar sai atrás, foguete vai pra frente — o mesmo princípio de um foguete de verdade, montado com bexiga, canudo e barbante em 15 minutos.",
      },
      {
        title: "02 · Carrinho de Bexiga",
        description:
          "O mesmo empurrão de ar do foguete, agora deitado e com rodas de tampinha — a criança vê o ar virar movimento.",
      },
      {
        title: "03 · Pião de Cores (Disco de Newton)",
        description:
          "Gira rápido e as cores do arco-íris quase somem, virando branco — primeira lição de como a luz funciona.",
      },
      {
        title: "04 · Catapulta de Palitos",
        description:
          "Dobra o palito, guarda força, solta o pulo — energia elástica explicada lançando bolinha de papel.",
      },
      {
        title: "05 · Mão de Papelão",
        description:
          "Barbantes fazem o papel de tendão: puxou um, o dedo dobra — anatomia da mão em miniatura.",
      },
      {
        title: "06 · Telefone de Copo",
        description:
          "A voz vibra e viaja pelo barbante esticado entre dois copos — som visto (e sentido) na prática.",
      },
      {
        title: "07 · Barquinho a Sabão",
        description:
          "Uma gota de sabão atrás empurra o barquinho pra frente — tensão superficial em ação numa bacia de água.",
      },
      {
        title: "08 · Vulcão de Espuma",
        description:
          "Vinagre mais bicarbonato vira gás e espuma — a clássica reação química, com direito a lava de mentirinha.",
      },
    ],
    actionPlan:
      "Cada experiência traz a lista do que ter em mãos (a maioria já em casa) e uma seção de segurança em 4 regras, pra fazer com a criança sem susto — cortes e coisas quentes ficam sempre com o adulto.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/35anggs_1034896",
    sampleUrl: "/amostras/robotica-vol-1-primeiros-projetos.pdf",
  },
  {
    slug: "robotica-vol-2-motores-e-movimento",
    title: "Robótica com Sucata — Vol. 2: Motores e Movimento",
    tagline:
      "6 projetos de verdade para montar com seu filho de 8 a 10 anos, usando papelão, um motorzinho e muita curiosidade.",
    category: "Robótica Infantil",
    format: "PDF · 6 projetos práticos",
    price: "R$ 24,90",
    coverImage: coverRoboticaVol2,
    headline: "Aprender fazendo — agora com motor de verdade",
    subheadline:
      "6 projetos para montar com seu filho de 8 a 10 anos: carrinho, robô que anda sozinho, robô que desenha, barco, ventilador e carrossel. Material barato, ciência de verdade.",
    audience: [
      "Pais e mães de crianças de 8 a 10 anos prontas pro primeiro motor",
      "Quem já fez o Volume 1 e quer o próximo degrau",
      "Família disposta a usar cola quente com supervisão do adulto",
    ],
    notFor: [
      "Crianças com menos de 8 anos (comece pelo Volume 1)",
      "Quem não tem como comprar um motorzinho DC de 3-6V (custa pouco, mas é obrigatório)",
    ],
    highlights: [
      "6 projetos: carrinho a motor, escova-robô, robô rabiscador, barquinho a hélice, ventilador de mão e carrossel giratório",
      "Kit básico de compra única (motorzinho, suporte de pilha) que serve pros 6 projetos",
      "Explicação de como o motor transforma eletricidade em movimento, sem termo técnico",
      "5 regras de segurança específicas para cola quente e fio elétrico",
      "Nível de dificuldade em estrelas, do mais simples ao mais caprichado",
    ],
    modules: [
      {
        title: "01 · Carrinho a Motor",
        description:
          "Motor, correia de elástico e eixo traseiro — o mesmo princípio da corrente de bicicleta, num carrinho de papelão que anda de verdade.",
      },
      {
        title: "02 · Escova-Robô (Bristlebot)",
        description:
          "Cerdas inclinadas mais vibração igual robô que anda sozinho — o clássico bristlebot, feito com escova de dente.",
      },
      {
        title: "03 · Robô Rabiscador",
        description:
          "Peso torto no eixo do motor faz o copo tremer e virar arte — desenho feito por vibração, sem controle nenhum.",
      },
      {
        title: "04 · Barquinho a Hélice",
        description:
          "Hélice no ar empurra o barco, com pilha sempre seca em cima — ação e reação explicadas numa bacia d'água.",
      },
      {
        title: "05 · Ventilador de Mão",
        description:
          "Aperta o botão, a hélice gira e vem o vento — primeiro interruptor caseiro montado do zero.",
      },
      {
        title: "06 · Carrossel Giratório",
        description:
          "Disco bem centralizado no eixo gira liso — a mesma ideia de uma roda de carro balanceada, em miniatura.",
      },
    ],
    actionPlan:
      "Traz um kit básico de compra única (motorzinho, suporte de pilha) que serve pros 6 projetos, mais 5 regras de segurança para cola quente e fio elétrico — o adulto corta e cola, a criança monta e liga.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/34r7rxf_1034900",
    sampleUrl: "/amostras/robotica-vol-2-motores-e-movimento.pdf",
  },
  {
    slug: "robotica-vol-3-maquinas-e-mecanismos",
    title: "Robótica com Sucata — Vol. 3: Máquinas e Mecanismos",
    tagline:
      "8 máquinas de verdade em miniatura para montar com seu filho de 9 a 12 anos: hidráulica, roldana, engrenagem e alavanca.",
    category: "Robótica Infantil",
    format: "PDF · 8 projetos práticos",
    price: "R$ 24,90",
    coverImage: coverRoboticaVol3,
    headline: "Como as máquinas pensam, na mesa da cozinha",
    subheadline:
      "8 máquinas reais em miniatura para montar com seu filho de 9 a 12 anos: braço hidráulico, guindaste, engrenagens e ponte levadiça — os mesmos princípios de um guindaste ou escavadeira de verdade.",
    audience: [
      'Pais e mães de crianças de 9 a 12 anos que já querem entender "como funciona por dentro"',
      "Quem já passou pelos Volumes 1 e 2 e quer o próximo nível de engenharia",
      "Família com seringa, papelão grosso e uma tarde livre",
    ],
    notFor: [
      "Crianças menores de 9 anos (a montagem exige mais precisão — comece pelo Volume 1 ou 2)",
      "Quem procura projeto eletrônico (isso é o Volume 4)",
    ],
    highlights: [
      "8 máquinas: braço hidráulico, elevador hidráulico, guindaste de roldana, garra pantográfica, engrenagens, autômato de manivela, ponte levadiça e balança de braço",
      "Os mesmos princípios de hidráulica, roldana, engrenagem e alavanca de uma máquina de verdade",
      "Seringas sem agulha no lugar de pistão hidráulico — segurança em primeiro lugar",
      "4 regras de segurança específicas para furo, cola quente e teste de peso",
      "Nível de dificuldade em estrelas nas 8 máquinas",
    ],
    modules: [
      {
        title: "01 · Braço Hidráulico",
        description:
          "Empurra uma seringa, a outra se move pela água — hidráulica de verdade, o mesmo princípio de uma escavadeira.",
      },
      {
        title: "02 · Elevador Hidráulico",
        description:
          "Água empurra o pistão e a cabine sobe — mesma ideia do braço, agora levantando peso na vertical.",
      },
      {
        title: "03 · Guindaste de Roldana",
        description:
          "Roldana divide o peso: puxa fácil — a física por trás de todo guindaste de obra.",
      },
      {
        title: "04 · Garra Pantográfica",
        description:
          "Tesouras cruzadas viram uma garra que estica e pega objetos à distância — mecanismo de tesoura em ação.",
      },
      {
        title: "05 · Engrenagens de Papelão",
        description:
          "Dentes se encaixam: uma gira, a outra também — a base de toda transmissão mecânica, cortada em papelão.",
      },
      {
        title: "06 · Autômato de Manivela",
        description:
          "O came gira e faz o boneco subir e descer — o mecanismo por trás de brinquedos mecânicos antigos.",
      },
      {
        title: "07 · Ponte Levadiça",
        description:
          "Gira a manivela, o barbante levanta a ponte — sistema de polia aplicado numa ponte de brinquedo que funciona.",
      },
      {
        title: "08 · Balança de Braço",
        description:
          "Peso vezes distância: o lado mais pesado desce — a lei da alavanca, sentida na mão.",
      },
    ],
    actionPlan:
      "Cada máquina vem com a lista de material (papelão grosso, seringa sem agulha, palito) e 4 regras de segurança — furo e cola quente ficam com o adulto, a criança conduz a montagem.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/398g8bs_1034903",
    sampleUrl: "/amostras/robotica-vol-3-maquinas-e-mecanismos.pdf",
  },
  {
    slug: "robotica-vol-4-eletronica-basica",
    title: "Robótica com Sucata — Vol. 4: Eletrônica Básica",
    tagline:
      "8 circuitos de verdade para montar com seu filho de 10 anos ou mais: luz que acende, campainha que apita, jogo que reage ao toque.",
    category: "Robótica Infantil",
    format: "PDF · 8 projetos práticos",
    price: "R$ 24,90",
    coverImage: coverRoboticaVol4,
    headline: "A eletricidade acende — sempre em segurança",
    subheadline:
      "8 circuitos reais para montar com seu filho de 10 anos ou mais, movidos só a pilha (até 9V, sem risco de choque): LED, campainha, alarme, lanterna e um quiz que acende quando acerta.",
    audience: [
      "Pais e mães de crianças de 10 anos ou mais interessadas em eletrônica",
      "Quem já passou pelos volumes anteriores e quer entender fio, LED e circuito de verdade",
      "Família disposta a comprar um kit simples de LED, resistor e buzzer (barato, dura pra todos os projetos)",
    ],
    notFor: [
      "Crianças menores de 10 anos (eletrônica pede mais atenção — comece pelos volumes anteriores)",
      "Quem espera trabalhar com tomada ou voltagem alta — este volume é só pilha, de propósito",
    ],
    highlights: [
      "8 circuitos: primeiro circuito, interruptor caseiro, semáforo de LEDs, campainha, jogo do fio, alarme de porta, lanterna e placa-quiz luminosa",
      "Tudo movido a pilha (até 9V) — nenhum projeto chega perto de tomada",
      "Explicação de circuito fechado, resistor e LED sem termo técnico",
      "5 regras de segurança específicas para fio, resistor e pilha",
      "Nível de dificuldade em estrelas nos 8 circuitos",
    ],
    modules: [
      {
        title: "01 · Meu Primeiro Circuito",
        description:
          "Pilha, fio e LED formam luz — o circuito fechado mais simples que existe, primeira vez que a criança acende um LED sozinha.",
      },
      {
        title: "02 · Interruptor Caseiro",
        description:
          "Encostou os contatos: liga; separou: desliga — o interruptor mais básico, montado com clipe e fio.",
      },
      {
        title: "03 · Semáforo de LEDs",
        description:
          "3 LEDs, 3 caminhos, uma pilha — vermelho, amarelo e verde ligados em paralelo, igual sinal de trânsito de verdade.",
      },
      {
        title: "04 · Campainha com Buzzer",
        description:
          "Corrente no buzzer vira som — o botão decide quando o circuito fecha e a campainha apita.",
      },
      {
        title: "05 · Jogo do Fio (Mão Firme)",
        description:
          "Encostou a argola no arame, acende — e perdeu. O clássico jogo de precisão, agora com circuito de verdade.",
      },
      {
        title: "06 · Alarme de Porta",
        description:
          "Abriu a porta, os contatos se separam e o alarme apita — sensor de contato simples, o mesmo princípio de um alarme residencial.",
      },
      {
        title: "07 · Lanterna de Papelão",
        description:
          "Pilha, LED e refletor de papel alumínio viram lanterna — luz concentrada, feita do zero.",
      },
      {
        title: "08 · Placa-Quiz Luminosa",
        description:
          "Acertou o par certo, o circuito fecha e acende — jogo de perguntas e respostas que dá feedback na hora, com fio por trás de cada resposta.",
      },
    ],
    actionPlan:
      "Cada circuito vem com a lista de material (pilha, LED, resistor, buzzer) e 5 regras de segurança — só pilha até 9V, nunca tomada, e todo LED usa resistor pra não queimar.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/pyr3ff6_1034908",
    sampleUrl: "/amostras/robotica-vol-4-eletronica-basica.pdf",
  },
  {
    slug: "robotica-vol-5-jogos-e-brinquedos",
    title: "Robótica com Sucata — Vol. 5: Jogos e Brinquedos DIY",
    tagline:
      "8 jogos inteiros para montar com seu filho de 6 a 12 anos e jogar de verdade: basquete de mesa, pinball, pebolim, boliche e pesca.",
    category: "Robótica Infantil",
    format: "PDF · 8 projetos práticos",
    price: "R$ 24,90",
    coverImage: coverRoboticaVol5,
    headline: "Feito para jogar — a família toda",
    subheadline:
      "8 jogos completos para montar com seu filho de 6 a 12 anos, feitos de papelão, e depois jogar de verdade: basquete de mesa, pinball, pebolim, boliche, pesca magnética e mais.",
    audience: [
      "Pais e mães de crianças de 6 a 12 anos (faixa mais ampla da coleção)",
      "Quem quer terminar um projeto e já usar na hora, sem esperar dias",
      "Família que curte jogo de mesa e quer um feito à mão, junto",
    ],
    notFor: [
      'Quem procura o lado mais "ciência explicada" da coleção — este é o volume mais brincadeira (ver Volumes 1 a 4 para mecanismo e eletrônica)',
    ],
    highlights: [
      "8 jogos: basquete de mesa, pinball de papelão, jogo de argolas, labirinto equilibrista, pebolim, boliche, pesca magnética e air hockey de balão",
      "Cada projeto termina em brinquedo funcional, pronto pra disputar uma partida em família",
      "Material 100% caixa de papelão e coisa de casa — nada de peça cara",
      "4 regras de segurança para ímã, bolinha pequena e lançador",
      "Nível de dificuldade em estrelas nos 8 jogos",
    ],
    modules: [
      {
        title: "01 · Basquete de Mesa",
        description:
          "Aperta a alavanca e encesta a bolinha — mecanismo de lançamento simples, pontuação de verdade.",
      },
      {
        title: "02 · Pinball de Papelão",
        description:
          "Elástico lança a bolinha, pinos dão pontos — o clássico fliperama, em versão caseira e sem pilha.",
      },
      {
        title: "03 · Jogo de Argolas",
        description:
          "Acerte as argolas no pino: quanto mais longe, mais pontos — precisão e mira, testadas em família.",
      },
      {
        title: "04 · Labirinto Equilibrista",
        description:
          "Incline a caixa e leve a bolinha até o fim sem cair nos furos — equilíbrio e pulso firme.",
      },
      {
        title: "05 · Pebolim de Caixa",
        description:
          "Gire os palitos e chute a bolinha pro gol — pebolim de mesa, montado numa caixa de sapato.",
      },
      {
        title: "06 · Boliche de Garrafas",
        description:
          "Role a bola e derrube as garrafinhas — boliche completo, com pinos feitos de garrafa PET.",
      },
      {
        title: "07 · Pesca Magnética",
        description:
          "O ímã da vara pega o clipe dos peixinhos — pesca clássica, com física de ímã explicada no processo.",
      },
      {
        title: "08 · Air Hockey de Balão",
        description:
          "O balão faz o disco deslizar quase sem atrito — colchão de ar caseiro, o mesmo truque de uma mesa de air hockey de verdade.",
      },
    ],
    actionPlan:
      "Cada jogo vem com a lista de material (caixa de papelão, palito, ímã pequeno) e 4 regras de segurança — ímã e bolinha pequena longe de criança menor, lançador sempre mirando o alvo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/mnuyb9d_1034910",
    sampleUrl: "/amostras/robotica-vol-5-jogos-e-brinquedos.pdf",
  },
  {
    slug: "robotica-colecao-completa",
    title: "Mãos à Obra — Coleção Completa de Robótica Infantil",
    tagline:
      "5 volumes, 38 projetos de robótica com sucata para fazer com seu filho, do primeiro projeto sem motor até o jogo eletrônico. Sai mais barato que comprar solto.",
    category: "Robótica Infantil",
    format: "PDF · 5 volumes · 38 projetos práticos",
    price: "R$ 39,90",
    originalPrice: "R$ 124,50",
    coverImage: coverRoboticaColecao,
    headline: "38 projetos de robótica para fazer com seu filho, do 1º ao último",
    subheadline:
      "Os 5 volumes da coleção Mãos à Obra, numa compra só: de experiências sem motor pros 5-7 anos até circuito eletrônico pros 10+. Sai por menos que os 5 separados.",
    audience: [
      "Pais e mães com mais de um filho, em idades diferentes (a coleção cobre de 5 a 12+ anos)",
      "Quem já sabe que vai usar mais de um volume e quer economizar comprando junto",
      "Família que quer um plano de atividades sem tela para meses, não só um fim de semana",
    ],
    notFor: ["Quem só quer testar um volume antes de decidir (comece pelo Volume 1, avulso)"],
    highlights: [
      "Os 5 volumes completos: Primeiros Projetos, Motores e Movimento, Máquinas e Mecanismos, Eletrônica Básica e Jogos e Brinquedos DIY",
      "38 projetos ao todo, cobrindo de 5 a 12+ anos — a coleção cresce junto com a criança",
      "Sai por R$ 39,90 em vez de R$ 124,50 comprando os 5 avulsos",
      "Cada volume com lista de material, passo a passo ilustrado, segurança e nível de dificuldade",
      "PDF de cada volume liberado no mesmo e-mail, todos de uma vez",
    ],
    modules: [
      {
        title: "Volume 1 — Primeiros Projetos (5-7 anos)",
        description:
          "8 experiências sem motor nem eletricidade — foguete de bexiga, catapulta, vulcão de espuma e mais, com material que já tem em casa.",
      },
      {
        title: "Volume 2 — Motores e Movimento (8-10 anos)",
        description:
          "6 projetos com motorzinho de verdade — carrinho, robô que anda sozinho, robô que desenha, barco, ventilador e carrossel.",
      },
      {
        title: "Volume 3 — Máquinas e Mecanismos (9-12 anos)",
        description:
          "8 máquinas em miniatura — braço hidráulico, guindaste de roldana, engrenagens e ponte levadiça, os mesmos princípios de máquina de verdade.",
      },
      {
        title: "Volume 4 — Eletrônica Básica (10+ anos)",
        description:
          "8 circuitos reais movidos a pilha — LED, campainha, alarme de porta, lanterna e um quiz que acende ao acertar.",
      },
      {
        title: "Volume 5 — Jogos e Brinquedos DIY (6-12 anos)",
        description:
          "8 jogos completos para montar e jogar em família — basquete de mesa, pinball, pebolim, boliche e pesca magnética.",
      },
    ],
    actionPlan:
      "Comece pelo Volume 1 ou pelo volume da idade do seu filho, e avance conforme ele ganha confiança. Cada volume é independente — pode pular direto pro que combina com a idade da criança, sem seguir a ordem.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/nytaca3_1034888",
  },
  {
    slug: "kit-enem-essencial",
    title: "Kit ENEM Essencial",
    tagline:
      "Pacote de materiais selecionados para organizar seus estudos e revisar para o ENEM sem procurar conteúdo espalhado.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 19,90",
    coverImage: coverEnemEssencial,
    headline: "Organize seus estudos e tenha materiais de revisão em um só lugar",
    subheadline:
      "Um pacote de materiais selecionados para quem quer começar ou acelerar os estudos para o ENEM sem precisar procurar conteúdo em dezenas de lugares.",
    audience: [
      "Quem vai prestar o ENEM e quer organizar os estudos",
      "Quem deixou para estudar mais perto da prova",
      "Quem procura materiais de revisão num só lugar, sem perder tempo pesquisando",
    ],
    notFor: ["Quem já tem um cronograma de estudos fechado e não precisa de material extra"],
    highlights: [
      "Questões para praticar",
      "Materiais de revisão",
      "Conteúdos de apoio",
      "Materiais organizados por área",
      "Conteúdos para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos de cada área
    // forem selecionados e associados a este produto.
    modules: [
      {
        title: "Questões e exercícios",
        description: "Pratique com questões selecionadas para reforçar o conteúdo.",
      },
      {
        title: "Materiais de revisão",
        description: "Resumos e conteúdos organizados para revisar antes da prova.",
      },
      {
        title: "Conteúdos de apoio",
        description: "Materiais complementares organizados por área para apoiar seus estudos.",
      },
    ],
    actionPlan:
      "Você recebe o acesso aos materiais assim que o pagamento é confirmado e organiza sua rotina de estudos no seu próprio ritmo, sem prazo para acessar o conteúdo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/qyxma4z_1047701",
    ctaLabel: "Quero estudar para o ENEM",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "enem-pacote-questoes-exercicios",
    title: "Pacote de Questões e Exercícios",
    tagline: "Questões e exercícios para praticar e reforçar seus estudos para o ENEM.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 5,90",
    coverImage: coverEnemQuestoes,
    headline: "Pratique mais, sem procurar em outro lugar",
    subheadline:
      "Pratique com diferentes materiais de questões e exercícios para reforçar seus estudos.",
    audience: [
      "Quem já tem o Kit ENEM Essencial e quer praticar mais",
      "Quem quer treinar com mais questões antes da prova",
    ],
    notFor: ["Quem procura só teoria, sem exercícios práticos"],
    highlights: [
      "Questões para praticar",
      "Material organizado para revisão ativa",
      "Conteúdo para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Questões e exercícios",
        description: "Pratique com questões selecionadas para reforçar o conteúdo.",
      },
    ],
    actionPlan:
      "Você recebe o acesso ao material assim que o pagamento é confirmado, pronto para praticar no seu ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/353s4p4_1047718",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "enem-pacote-redacao",
    title: "Pacote de Redação",
    tagline: "Materiais de apoio para estudar e revisar redação para o ENEM.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 7,90",
    coverImage: coverEnemRedacao,
    headline: "Reforce sua redação com material de apoio",
    subheadline: "Materiais de apoio para estudar e revisar redação para o ENEM.",
    audience: [
      "Quem já tem o Kit ENEM Essencial e quer reforçar a redação",
      "Quem quer revisar estrutura e argumentação antes da prova",
    ],
    notFor: ["Quem procura correção individual de redação"],
    highlights: [
      "Materiais de apoio para redação",
      "Conteúdo de revisão organizado",
      "Material para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Redação",
        description: "Materiais de apoio para estudar e revisar redação para o ENEM.",
      },
    ],
    actionPlan:
      "Você recebe o acesso ao material assim que o pagamento é confirmado, pronto para revisar no seu ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/i75psqx_1047722",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "enem-pacote-ciencias-natureza",
    title: "Pacote de Ciências da Natureza",
    tagline: "Materiais para revisar os principais conteúdos das Ciências da Natureza.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 7,90",
    coverImage: coverEnemCienciasNatureza,
    headline: "Física, Química e Biologia num só material",
    subheadline: "Materiais para revisar os principais conteúdos das Ciências da Natureza.",
    audience: [
      "Quem já tem o Kit ENEM Essencial e quer reforçar Ciências da Natureza",
      "Quem quer revisar Física, Química e Biologia antes da prova",
    ],
    notFor: ["Quem procura só uma dessas matérias isoladamente"],
    highlights: [
      "Materiais de Física, Química e Biologia",
      "Conteúdo organizado para revisão",
      "Material para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Ciências da Natureza",
        description: "Materiais para revisar os principais conteúdos de Física, Química e Biologia.",
      },
    ],
    actionPlan:
      "Você recebe o acesso ao material assim que o pagamento é confirmado, pronto para revisar no seu ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/3duxy4c_1047726",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "enem-pacote-matematica",
    title: "Pacote de Matemática",
    tagline: "Materiais para revisar matemática e praticar questões.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 5,90",
    coverImage: coverEnemMatematica,
    headline: "Reforce matemática no seu ritmo",
    subheadline: "Materiais para revisar matemática e praticar questões.",
    audience: [
      "Quem já tem o Kit ENEM Essencial e quer reforçar matemática",
      "Quem quer praticar mais questões de matemática antes da prova",
    ],
    notFor: ["Quem procura aula em vídeo, não material em PDF"],
    highlights: [
      "Materiais de matemática",
      "Questões para praticar",
      "Material para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Matemática",
        description: "Materiais para revisar matemática e praticar questões.",
      },
    ],
    actionPlan:
      "Você recebe o acesso ao material assim que o pagamento é confirmado, pronto para praticar no seu ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/3epocmv_1047732",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "enem-pacote-simulados-provas",
    title: "Pacote de Simulados e Provas",
    tagline: "Materiais para praticar em formato de prova e testar seus conhecimentos.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 7,90",
    coverImage: coverEnemSimuladosProvas,
    headline: "Treine no formato real da prova",
    subheadline: "Materiais para praticar em formato de prova e testar seus conhecimentos.",
    audience: [
      "Quem já tem o Kit ENEM Essencial e quer treinar em formato de prova",
      "Quem quer testar o próprio ritmo antes do dia do ENEM",
    ],
    notFor: ["Quem procura correção automática ou nota comparativa"],
    highlights: [
      "Materiais em formato de prova",
      "Conteúdo para testar seus conhecimentos",
      "Material para estudar no seu ritmo",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Simulados e provas",
        description: "Materiais para praticar em formato de prova e testar seus conhecimentos.",
      },
    ],
    actionPlan:
      "Você recebe o acesso ao material assim que o pagamento é confirmado, pronto para treinar no seu ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/k8aisst_1047734",
    modulesHeading: "O que você recebe",
    installments: false,
  },
  {
    slug: "kit-enem-completo",
    title: "Kit ENEM Completo",
    tagline: "Reúna os principais materiais da seção Apoio ENEM em uma única compra.",
    category: "Apoio ENEM",
    format: "PDF · Material digital",
    price: "R$ 49,90",
    coverImage: coverEnemCompleto,
    headline: "Reúna toda a preparação para o ENEM em um só lugar",
    subheadline: "Reúna os principais materiais da seção em uma única compra.",
    audience: [
      "Quem já sabe que vai usar mais de um material e prefere economizar comprando junto",
      "Quem quer montar um plano de estudos completo sem comprar pacote por pacote",
    ],
    notFor: ["Quem só quer testar um pacote antes de decidir (comece pelo Kit Essencial, avulso)"],
    highlights: [
      "Questões e exercícios",
      "Redação",
      "Matemática",
      "Ciências da Natureza",
      "Simulados e provas",
      "Materiais organizados por área",
    ],
    // TODO: copy a validar com o cliente assim que os arquivos forem selecionados.
    modules: [
      {
        title: "Questões e exercícios",
        description: "Pratique com questões selecionadas para reforçar o conteúdo.",
      },
      {
        title: "Redação",
        description: "Materiais de apoio para estudar e revisar redação para o ENEM.",
      },
      {
        title: "Matemática",
        description: "Materiais para revisar matemática e praticar questões.",
      },
      {
        title: "Ciências da Natureza",
        description: "Materiais para revisar os principais conteúdos de Física, Química e Biologia.",
      },
      {
        title: "Simulados e provas",
        description: "Materiais para praticar em formato de prova e testar seus conhecimentos.",
      },
    ],
    actionPlan:
      "Você recebe o acesso a todos os materiais assim que o pagamento é confirmado e organiza sua rotina de estudos no seu próprio ritmo.",
    guarantee:
      "Você tem 7 dias corridos após a compra para pedir reembolso integral, sem precisar justificar. É um direito garantido por lei em qualquer compra digital no Brasil.",
    checkoutUrl: "https://pay.cakto.com.br/dr8bb72_1047738",
    ctaLabel: "Quero o Kit Completo",
    modulesHeading: "O que você recebe",
    installments: true,
  },
];

export const getEbook = (slug: string) => ebooks.find((e) => e.slug === slug);

/**
 * Preço que deve aparecer como "atual" agora. Enquanto a campanha de
 * lançamento estiver ativa (src/data/promo.ts), é o price promocional;
 * depois do prazo, vira o originalPrice — sem precisar mexer em nada.
 */
export const effectivePrice = (ebook: Pick<Ebook, "price" | "originalPrice">): string =>
  isLaunchOfferActive() ? ebook.price : (ebook.originalPrice ?? ebook.price);

/** Preço riscado a exibir, ou undefined se não houver campanha ativa. */
export const strikePrice = (ebook: Pick<Ebook, "price" | "originalPrice">): string | undefined =>
  isLaunchOfferActive() ? ebook.originalPrice : undefined;

/** Percentual de desconto arredondado, ou null se não houver campanha ativa. */
export const discountPercent = (ebook: Ebook): number | null => {
  if (!isLaunchOfferActive() || !ebook.originalPrice) return null;
  const original = parsePriceBRL(ebook.originalPrice);
  const current = parsePriceBRL(ebook.price);
  if (!original || original <= current) return null;
  return Math.round((1 - current / original) * 100);
};

/** Menor preço efetivo de uma lista de ebooks (respeita a campanha ativa). */
export const cheapestPriceOf = (list: Ebook[]): string =>
  list.reduce(
    (cheapest, e) =>
      parsePriceBRL(effectivePrice(e)) < parsePriceBRL(cheapest) ? effectivePrice(e) : cheapest,
    list[0] ? effectivePrice(list[0]) : "",
  );

/** Menor preço do catálogo — é o que o "a partir de" da home deve mostrar. */
export const cheapestPrice = cheapestPriceOf(ebooks);

/** Categoria dos produtos de robótica infantil — tratados numa seção própria, fora do catálogo geral. */
export const ROBOTICS_CATEGORY = "Robótica Infantil";

/** Categoria dos produtos de apoio ao ENEM — tratados numa seção própria, fora do catálogo geral. */
export const ENEM_CATEGORY = "Apoio ENEM";

/**
 * Categorias com seção própria, cujos produtos só recomendam produtos da
 * mesma família na página de produto (ver getProductFamily). Qualquer
 * categoria que não estiver aqui cai em "guias", a família genérica.
 */
const MULTI_PRODUCT_CATEGORIES: Record<string, string> = {
  [ROBOTICS_CATEGORY]: "robotica",
  [ENEM_CATEGORY]: "enem",
};

export const getProductFamily = (ebook: Pick<Ebook, "category">): string =>
  MULTI_PRODUCT_CATEGORIES[ebook.category] ?? "guias";
