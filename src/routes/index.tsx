import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  MessageCircleMore,
  QrCode,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EbookCard } from "@/components/site/EbookCard";
import { BookCover } from "@/components/site/BookCover";
import { Testimonials } from "@/components/site/Testimonials";
import { ebooks, STORE } from "@/data/ebooks";

const title = `${STORE.name} | ${STORE.tagline}`;
const description =
  "eBooks curtos e aplicáveis para quem toca um negócio no dia a dia. Acesso após a confirmação do pagamento e 7 dias de garantia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: Download, text: "PDF por e-mail assim que o pagamento é confirmado" },
  { icon: Smartphone, text: "Leia no celular, no tablet ou no computador" },
  { icon: ShieldCheck, text: "7 dias de garantia, sem perguntas" },
];

const steps = [
  {
    icon: Wallet,
    title: "Escolha o guia certo",
    text: "Pra fase que o seu negócio está vivendo agora.",
  },
  {
    icon: QrCode,
    title: "Pague com Pix",
    text: "Aprovação na hora, direto pela Cakto.",
  },
  {
    icon: MessageCircleMore,
    title: "Aplique ainda hoje",
    text: "Passo a passo direto, sem enrolação nem termo técnico.",
  },
];

const faqs = [
  {
    q: "Como eu recebo o guia?",
    a: "Assim que o pagamento é aprovado, a Cakto envia um e-mail com o link do PDF para o endereço que você informou no checkout. Nenhum app extra é necessário.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Os guias usam linguagem simples e passo a passo, pensados para quem usa o celular no dia a dia do negócio.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Somente Pix, com aprovação rápida, processado pela Cakto.",
  },
];

function Index() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = ebooks[featuredIndex];

  useEffect(() => {
    if (ebooks.length < 2) return;
    const id = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % ebooks.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-up">
              <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Conhecimento prático pro seu negócio crescer{" "}
                <span className="text-brand-strong">a partir de hoje</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Guias digitais curtos e diretos ao ponto. Escolha o certo para o seu momento e
                comece a aplicar no mesmo dia, sem precisar contratar agência.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="cta" size="xl">
                  <a href="#catalogo">
                    Ver guias disponíveis <ArrowRight />
                  </a>
                </Button>
                {featured ? (
                  <p className="text-sm text-muted-foreground">
                    A partir de{" "}
                    <span
                      key={featured.slug}
                      className="animate-fade-up inline-block font-bold text-foreground"
                    >
                      {featured.price}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>

            {featured ? (
              <div className="mx-auto w-full max-w-xs [animation-delay:120ms] sm:max-w-sm">
                <div className="relative">
                  <div className="absolute -inset-6 -z-10 rounded-full bg-brand/15 blur-3xl" />
                  <div key={featured.slug} className="animate-fade-up">
                    <BookCover
                      title={featured.title}
                      category={featured.category}
                      format={featured.format}
                      image={featured.coverImage}
                      className="rotate-2 shadow-float"
                    />
                  </div>
                </div>
                {ebooks.length > 1 ? (
                  <div className="mt-4 flex items-center justify-center gap-1.5">
                    {ebooks.map((e, i) => (
                      <span
                        key={e.slug}
                        className={`h-1.5 rounded-full transition-all ${
                          i === featuredIndex ? "w-5 bg-brand-strong" : "w-1.5 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-y border-border/70 bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-3 sm:px-6">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-left">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/12 text-brand-strong">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="catalogo"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Catálogo
            </h2>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {ebooks.length} {ebooks.length === 1 ? "guia disponível" : "guias disponíveis"}
            </p>
          </div>
          <div
            className={
              ebooks.length === 1
                ? "mt-8 flex justify-center"
                : "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {ebooks.map((ebook) => (
              <EbookCard
                key={ebook.slug}
                ebook={ebook}
                className={ebooks.length === 1 ? "w-full max-w-sm" : undefined}
              />
            ))}
          </div>
        </section>

        <Testimonials />

        <section className="border-t border-border/70 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Como funciona
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="relative">
                  <span className="mb-4 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-base font-bold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  {i < steps.length - 1 ? (
                    <span className="absolute right-[-1.1rem] top-5 hidden text-border sm:block">
                      <ArrowRight className="size-5" />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Dúvidas frequentes
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
}
