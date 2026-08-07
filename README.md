# Venda Local VIP

Build a high-converting, modern, mobile-first sales landing page (LP) for a digital product (an eBook / Playbook called "Guia Prático: Do Comercio Físico ao Digital").

### DESIGN SYSTEM & AESTHETICS:

- **Style:** Clean, professional, premium, high-contrast, optimized for sales conversion.

- **Color Palette:**

  - Background: Soft neutral light/slate background (`bg-slate-50` / `bg-white`) with dark slate text (`text-slate-900`) for maximum legibility.

  - Primary Brand Color: Deep Navy/Slate (`#0f172a` / `slate-900`).

  - High-Conversion Accent Color (CTAs/Badges): Electric Emerald Green (`#10b981` / `emerald-500` / `emerald-600`) with hover glow effects for primary action buttons.

  - Highlight/Urgency Accent: Amber/Yellow (`#f59e0b`) for star ratings and highlight badges.

- **UI Components:** Use Shadcn/UI style cards, buttons, badges, accordions, and dialogs.

- **Typography:** Inter or Sans-serif, bold clear headings, high contrast, optimal line height for mobile reading.

- **Icons:** Use Lucide React icons (`Check`, `Star`, `ShieldCheck`, `Zap`, `Lock`, `BookOpen`, `Smartphone`, `TrendingUp`, `Clock`, `ChevronDown`, `Gift`, `ArrowRight`).

---

### PAGE STRUCTURE & SECTIONS (In order of appearance):

#### 1. TOP ANNOUNCEMENT BAR (Urgency Header)

- Sticky top banner with emerald text or amber background:

  - Text: "🔥 OFERTA DE LANÇAMENTO: De R$ 97,00 por apenas R$ 27,90 (Restam poucas vagas)"

  - Countdown timer UI placeholder or simple pulse badge.

#### 2. HERO SECTION (Above the fold)

- **Top Badge:** Pill-shaped badge with Lucide `Zap` icon: "PLAYBOOK PRÁTICO PARA NEGÓCIOS LOCAIS".

- **Main Headline (H1):** "Transforme a Sua Loja Física em um Ímã de Clientes Usando Apenas o Celular e a Internet"

- **Subheadline:** "Descubra o passo a passo simplificado para atrair clientes do seu bairro, dominar o Google Meu Negócio e vender todos os dias no WhatsApp — sem gastar fortunas com agências."

- **Visual Element:** A floating 3D Ebook Cover Mockup card with glossy badge ("100% Digital & Acesso Imediato"), star rating (`5.0 ⭐⭐⭐⭐⭐` - "Mais de 450 comerciantes já aplicaram"), and feature checklist bullet points.

- **Primary CTA Button:** Large green glowing button (`bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-lg w-full sm:w-auto`).

  - Button Text: "QUERO VENDER MAIS NA MINHA LOJA →"

  - Subtext under CTA: "🔒 Compra 100% Segura • Acesso Imediato no E-mail"

- **Trust Badges Bar:** 3 quick icon features:

  - ⚡ "Leitura Rápida e Direta ao Ponto"

  - 🛡️ "7 Dias de Garantia Incondicional"

  - 📲 "Acesso no Celular, Tablet ou PC"

#### 3. THE PROBLEM / PAIN POINTS SECTION

- **Section Title:** "Você Sente Que Seu Comércio Está Parado Enquanto os Clientes Estão Todos no Celular?"

- **Grid of 3 Problem Cards (Soft red border/accent):**

  1. *Rua Vazia, Custos Altos:* Ter que esperar passivamente os clientes entrarem pela porta.

  2. *Instagram que Não Vende:* Postar fotos sem estratégias locais e não receber nenhuma mensagem.

  3. *Complicado Demais:* Achar que marketing digital é só para grandes empresas ou exige termos difíceis.

#### 4. THE SOLUTION / WHAT'S INSIDE (Modules Grid)

- **Section Title:** "O Que Você Vai Aprender Dentro do Guia Prático"

- **Subtitle:** "Sem enrolação ou teorias chatas. Apenas o que funciona na prática para o seu bairro."

- **4 Feature Cards Grid (Shadcn Card style with icon headers):**

  - **Módulo 1: O Ímã de Clientes no Google** (Como colocar sua loja no topo das buscas locais e receber ligações de graça).

  - **Módulo 2: Instagram Local Descomplicado** (O que postar em 15 minutos por dia para gerar desejo imediato no seu bairro).

  - **Módulo 3: WhatsApp Máquina de Vendas** (Scripts prontos para copiar e colar que fecham vendas e evitam o vácuo).

  - **Módulo 4: Anúncios Rápidos para Seu Bairro** (Como investir R$ 5 a R$ 10 por dia cobrindo um raio de 3km a 5km da sua loja).

#### 5. EXCLUSIVE BONUSES SECTION (High-Value Additions)

- **Section Title:** "Leve Hoje E Ganhe +3 Bônus Gratuitos Exclusivos 🎁"

- **Grid of 3 Bonus Cards with "GRÁTIS HOJE" Badge:**

  - *Bônus 1:* 20 Scripts Prontos de Atendimento e Vendas para WhatsApp *(Valor Normal: R$ 47)*

  - *Bônus 2:* Calendário de Conteúdo de 30 Dias para Redes Sociais Locais *(Valor Normal: R$ 37)*

  - *Bônus 3:* Checklist Mestre de Ação Rápida de 7 Dias *(Valor Normal: R$ 29)*

#### 6. SOCIAL PROOF / TESTIMONIALS SECTION

- **Section Title:** "Quem Já Aplicou, Aprovou!"

- **Grid of 3 Testimonial Cards:**

  - *Depoimento 1:* Mariana S. (Loja de Roupas) - "Minhas vendas no WhatsApp dobraram na primeira semana aplicando o Módulo 3."

  - *Depoimento 2:* Carlos E. (Hamburgueria) - "O passo a passo do Google Meu Negócio me fez aparecer em 1º lugar na minha cidade."

  - *Depoimento 3:* Fernanda M. (Salão de Beleza) - "Finalmente um guia que fala a língua de quem tem loja física. Muito prático!"

#### 7. SPECIAL OFFER / PRICING & CHECKOUT SECTION (The Main conversion area)

- A highlighted container/card with a glowing border.

- **Card Content:**

  - Badge: "OFERTA ESPECIAL COM TEMPO LIMITADO"

  - Title: "Guia Prático: Do Comércio Físico ao Digital + Todos os Bônus"

  - Price Anchor: De ~R$ 97,00~ por apenas:

  - **Big Price Tag:** "R$ 27,90" ou "3x de R$ 9,80"

  - **Bullet List of Everything Included:** Checkmark list detailing eBook + 3 Bonuses + Lifetime Access.

  - **Big CTA Button:** "QUERO COMPRAR AGORA COM DESCONTO →" (Triggers redirect or popup modal)

  - **Garantia Card (Seal UI):** "Garantia Cega de 7 Dias" (Se não gostar do conteúdo, devolvemos 100% do seu dinheiro sem perguntas).

#### 8. FAQ SECTION (Accordion Component)

- **Section Title:** "Dúvidas Frequentes"

- Use Shadcn `Accordion` for collapsible Q&A:

  - *Como vou receber o guia?* (R: O acesso é enviado instantaneamente para o seu e-mail logo após a confirmação do pagamento).

  - *Preciso entender de computador ou marketing?* (R: Não! O guia foi feito em linguagem 100% simples e didática para quem usa só o celular).

  - *Serve para o meu tipo de negócio?* (R: Sim! Funciona para lojas de roupas, restaurantes, pet shops, salões, oficinas e qualquer negócio com endereço ou atendimento local).

  - *Quais são as formas de pagamento?* (R: PIX com liberação imediata, ou Cartão de Crédito).

#### 9. FOOTER & STICKY MOBILE CTA

- **Footer:** Links para Políticas de Privacidade, Termos de Uso, Suporte via WhatsApp/E-mail. CNPJ/Copyright placeholder.

- **Sticky Bottom Mobile Bar:** Floating green bar visible only on mobile screens with price and quick "Comprar Agora" CTA button for fast checkout.

---

Ensure all components are interactive, smooth, clean, responsive on screens from mobile to desktop, and ready to connect checkout links (e.g. Kiwify / Hotmart / PerfectPay URLs).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8b21eaa5-8c32-4073-8a28-737997818255).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
