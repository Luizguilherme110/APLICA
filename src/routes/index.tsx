import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CreditCard,
  Download,
  MessageCircleMore,
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
import { ScreenshotTestimonials } from "@/components/site/ScreenshotTestimonials";
import { LaunchOfferBanner } from "@/components/site/LaunchOfferBanner";
import { RoboticsCollectionSection } from "@/components/site/RoboticsCollectionSection";
import { EnemSection } from "@/components/site/EnemSection";
import { cheapestPriceOf, ENEM_CATEGORY, ROBOTICS_CATEGORY, STORE } from "@/data/ebooks";
import { useCatalog } from "@/lib/catalog-context";

const SPECIAL_CATEGORIES: string[] = [ROBOTICS_CATEGORY, ENEM_CATEGORY];

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
  { icon: CreditCard, text: "Pix ou até 8x no cartão de crédito" },
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
    icon: CreditCard,
    title: "Pague como preferir",
    text: "Pix com aprovação imediata ou até 8x no cartão, direto pela Cakto.",
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
    a: "Pix (com aprovação imediata), cartão de crédito em até 8x, PicPay, Apple Pay e Google Pay, todos processados de forma 100% segura pela Cakto.",
  },
];

function Index() {
  const { ebooks } = useCatalog();
  // Robótica infantil e Apoio ENEM têm seção própria por serem públicos
  // diferentes do resto do catálogo — ficam fora do grid geral e do
  // rotativo do hero.
  const catalogEbooks = ebooks.filter((e) => !SPECIAL_CATEGORIES.includes(e.category));
  const catalogCheapestPrice = cheapestPriceOf(catalogEbooks);

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = catalogEbooks[featuredIndex];

  useEffect(() => {
    if (catalogEbooks.length < 2) return;
    const id = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % catalogEbooks.length);
    }, 5000);
    return () => clearInterval(id);
  }, [catalogEbooks.length]);

  return (
    <div className="min-h-screen bg-background">
      <LaunchOfferBanner />
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
                {catalogCheapestPrice ? (
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>
                      A partir de{" "}
                      <span className="font-bold text-foreground">{catalogCheapestPrice}</span>
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-strong">
                      <CreditCard className="size-3.5" /> Parcele em até 8x no cartão
                    </span>
                  </div>
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
                {catalogEbooks.length > 1 ? (
                  <div className="mt-4 flex items-center justify-center gap-1.5">
                    {catalogEbooks.map((e, i) => (
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
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
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
              {catalogEbooks.length}{" "}
              {catalogEbooks.length === 1 ? "guia disponível" : "guias disponíveis"}
            </p>
          </div>
          <div
            className={
              catalogEbooks.length === 1
                ? "mt-8 flex justify-center"
                : "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {catalogEbooks.map((ebook) => (
              <EbookCard
                key={ebook.slug}
                ebook={ebook}
                className={catalogEbooks.length === 1 ? "w-full max-w-sm" : undefined}
              />
            ))}
          </div>
        </section>

        <RoboticsCollectionSection />
        <EnemSection />

        <ScreenshotTestimonials />
        <Testimonials className="border-t-0" />

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
