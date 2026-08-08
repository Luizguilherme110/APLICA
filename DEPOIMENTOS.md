# Como conseguir e publicar depoimentos

A seção de depoimentos já está pronta e integrada na home e na página de cada
ebook. Ela fica **invisível** enquanto `src/data/testimonials.ts` estiver vazio.
Assim que você cadastrar o primeiro depoimento real, ela aparece sozinha.

---

## 1. Peça no momento certo

O melhor retorno vem entre **5 e 10 dias** depois da compra. Antes disso a pessoa
ainda não aplicou nada; muito depois ela já esqueceu.

Você tem o e-mail de todo comprador no painel da Cakto. Se o cliente veio pelo
WhatsApp, peça por lá — a taxa de resposta é muito maior.

Uma taxa normal de resposta é de 5% a 15%. Com 100 vendas você consegue de 5 a
15 depoimentos, e 6 bons já enchem a seção.

## 2. O pedido (WhatsApp)

Não pergunte "o que você achou?" — isso gera "gostei, muito bom", que não
convence ninguém. Pergunte por **situação concreta**:

> Oi, [nome]! Aqui é o [seu nome], do guia **[título]**.
>
> Não é pra vender nada — queria só saber se conseguiu aplicar alguma coisa.
>
> Se puder responder em 1 minuto, me ajuda demais:
>
> 1. Qual era o problema antes de comprar?
> 2. O que você aplicou primeiro?
> 3. Mudou alguma coisa? Pode ser pequeno.
>
> Pode mandar por áudio se for mais fácil. E se eu puder publicar sua resposta no
> site, me avisa como prefere aparecer (nome, negócio e cidade).

Essas três perguntas são o que separa um depoimento crível de um genérico. A
resposta vem com número, prazo ou detalhe do dia a dia — e é isso que convence.

## 3. Versão e-mail

**Assunto:** Conseguiu aplicar alguma coisa do guia?

> Oi, [nome]! Você comprou o guia **[título]** semana passada.
>
> Queria saber de verdade se funcionou pra você. Se puder responder este e-mail
> com duas linhas sobre o que mudou no seu negócio depois de aplicar, eu leio
> todas as respostas.
>
> Se topar que eu publique no site, me diz como prefere ser identificado.
>
> Obrigado,
> [seu nome]

## 4. Autorização (não pule)

Antes de publicar, tenha o **"pode publicar" por escrito** e guarde o print. É o
que te protege se alguém questionar depois. Publique só o que a pessoa
autorizou: se ela não liberou o nome do negócio, use só o primeiro nome e a
cidade.

## 5. Cadastre em `src/data/testimonials.ts`

Abra o arquivo e preencha o array `testimonials`. O modelo comentado está no topo
do arquivo. Regras:

- **Não reescreva o texto do cliente.** Corrigir uma vírgula, tudo bem. Trocar as
  palavras dele pelas suas, não — é justamente o que faz o depoimento soar
  fabricado. Texto imperfeito e informal converte mais que texto polido.
- Se o depoimento veio longo, **corte**, não resuma. Escolha o trecho mais
  concreto e mantenha as palavras originais.
- `verifiedPurchase: true` só quando você confirmou a venda no painel da Cakto.
  É esse campo que liga o selo "Compra verificada".
- `context` é o que mais pesa na credibilidade: "Pet shop · Contagem, MG" vale
  muito mais que "Empreendedora".

## 6. Enquanto não houver nenhum

Não deixe a página sem prova social. O que você já pode usar hoje, e é tudo
verdade:

- **A garantia de 7 dias** — já está na página, mas pode ganhar mais destaque.
  Reverter o risco funciona tão bem quanto depoimento.
- **Amostra do conteúdo** — publique uma página real do PDF, ou o sumário
  completo. Deixar o comprador ver o que vai receber tira mais objeção do que
  qualquer elogio de terceiro.
- **Quem escreveu e por quê** — uma seção curta sobre você e sua experiência com
  o assunto. Autoridade do autor substitui prova social no começo.
- **O que está incluso, em número** — 29 páginas, 5 módulos, 6 modelos de
  mensagem prontos. Concreto e verificável.

Quando os primeiros depoimentos entrarem, essa seção passa a carregar o peso e
você pode enxugar o resto.
