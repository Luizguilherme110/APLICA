import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Download,
  FileText,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { BookCover } from "@/components/site/BookCover";
import { Testimonials } from "@/components/site/Testimonials";
import { ScreenshotTestimonials } from "@/components/site/ScreenshotTestimonials";
import { PriceTag } from "@/components/site/PriceTag";
import { LaunchOfferBanner } from "@/components/site/LaunchOfferBanner";
import { SampleModal } from "@/components/site/SampleModal";
import { EnemCrossSell } from "@/components/site/EnemCrossSell";
import { EnemUpsellModal } from "@/components/site/EnemUpsellModal";
import { EnemCompareStrip } from "@/components/site/EnemCompareStrip";
import {
  getEbook,
  getProductFamily,
  isCheckoutPending,
  applyPriceOverride,
  type Ebook,
} from "@/data/ebooks";
import { getPriceOverrides } from "@/functions/product-prices";
import { useCatalog } from "@/lib/catalog-context";
import { reportCheckoutIntent, reportProductView } from "@/lib/product-analytics";
import { withAttribution } from "@/lib/attribution";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ebooks/$slug")({
  loader: async ({ params }) => {
    const base = getEbook(params.slug);
    if (!base) throw notFound();
    const overrides = await getPriceOverrides();
    return { ebook: applyPriceOverride(base, overrides[base.slug]) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "eBook não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const { ebook } = loaderData;
    return {
      meta: [
        { title: `${ebook.title} | eBook digital` },
        { name: "description", content: ebook.tagline },
        { property: "og:title", content: ebook.title },
        { property: "og:description", content: ebook.tagline },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: EbookPage,
});

function BuyButton({ ebook, className }: { ebook: Ebook; className?: string }) {
  if (isCheckoutPending(ebook.checkoutUrl)) {
    return (
      <Button variant="cta" size="xl" className={className} disabled>
        Em breve
      </Button>
    );
  }

  return (
    <Button asChild variant="cta" size="xl" className={className}>
      <a href={withAttribution(ebook.checkoutUrl)} onClick={() => reportCheckoutIntent(ebook)}>
        {ebook.ctaLabel ?? "Comprar agora"} <ArrowRight />
      </a>
    </Button>
  );
}

function EbookPage() {
  const { ebook } = Route.useLoaderData() as { ebook: Ebook };
  const { ebooks } = useCatalog();
  // Cada família de produto (guias, robótica, ENEM) só recomenda produtos da
  // mesma família na lista de "outros guias" — ver getProductFamily.
  const family = getProductFamily(ebook);
  const others = ebooks.filter((e) => e.slug !== ebook.slug && getProductFamily(e) === family);

  useEffect(() => {
    reportProductView(ebook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ebook.slug]);

  return (
    <div className="min-h-screen bg-background">
      <LaunchOfferBanner />
      <Header />

      <main>
        <section className="border-b border-border/70 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Voltar ao catálogo
            </Link>

            <div className="mt-6 grid items-center gap-10 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
                  {ebook.category}
                </span>
                <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl">
                  {ebook.headline}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {ebook.subheadline}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {ebook.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-strong" />
                      <span className="min-w-0 text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <PriceTag ebook={ebook} size="lg" showInstallment={ebook.installments ?? true} />
                  <BuyButton ebook={ebook} />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3.5" /> Pagamento seguro via Cakto • Pix ou{" "}
                  {ebook.installments ?? true ? "até 8x no cartão" : "cartão"}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Download className="size-3.5" /> PDF por e-mail assim que o pagamento é
                  confirmado
                </p>
                {ebook.sampleUrl ? (
                  <SampleModal
                    ebook={ebook}
                    trigger={
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong underline decoration-brand-strong/30 underline-offset-4 hover:decoration-brand-strong"
                      >
                        <FileText className="size-4" /> Ler uma amostra grátis antes de comprar
                      </button>
                    }
                  />
                ) : null}
              </div>

              <div className="mx-auto w-full max-w-[15rem] sm:max-w-xs">
                <BookCover
                  title={ebook.title}
                  category={ebook.category}
                  format={ebook.format}
                  image={ebook.coverImage}
                  className="-rotate-2 shadow-float"
                />
              </div>
            </div>
          </div>
        </section>

        <EnemCompareStrip ebook={ebook} />

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {ebook.modulesHeading ?? "O que você vai aprender"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{ebook.format}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ebook.modules.map((m, i) => (
              <div
                key={m.title}
                className={cn(
                  "rounded-2xl border border-border/70 bg-card p-6",
                  ebook.modules.length % 2 === 1 &&
                    i === ebook.modules.length - 1 &&
                    "sm:col-span-2",
                )}
              >
                <span className="text-xs font-bold text-brand-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-bold text-foreground">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:p-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
              <Calendar className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold">Bônus: kit de ferramentas e planos de ação</h3>
              <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">
                {ebook.actionPlan}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Para quem é este guia
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
                  <Check className="size-4 text-brand-strong" /> Feito para você, se
                </h3>
                <ul className="mt-4 space-y-3">
                  {ebook.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-strong" />
                      <span className="min-w-0">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  <X className="size-4" /> Provavelmente não é pra você, se
                </h3>
                <ul className="mt-4 space-y-3">
                  {ebook.notFor.map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ScreenshotTestimonials
          ebookSlug={ebook.slug}
          title="Quem comprou, aprovou"
          className="border-t-0 bg-background"
        />
        <Testimonials
          ebookSlug={ebook.slug}
          title="Depoimentos de quem comprou"
          className="border-t-0 bg-background"
        />

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-2xl border border-border/70 bg-card p-6 text-center sm:p-8">
            <ShieldCheck className="mx-auto size-8 text-brand-strong" />
            <h2 className="mt-3 text-lg font-bold text-foreground">Garantia de 7 dias</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {ebook.guarantee}
            </p>
            <BuyButton ebook={ebook} className="mt-6 w-full sm:w-auto" />
          </div>
        </section>

        <EnemCrossSell ebook={ebook} />

        {family !== "enem" && others.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Outros guias</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.map((e) => (
                <Link
                  key={e.slug}
                  to="/ebooks/$slug"
                  params={{ slug: e.slug }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-brand/40"
                >
                  <span className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-strong">
                      {e.category}
                    </span>
                    <span className="mt-1 block truncate text-sm font-bold text-foreground">
                      {e.title}
                    </span>
                    <PriceTag ebook={e} size="sm" className="mt-1" />
                  </span>
                  <ArrowLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <EnemUpsellModal ebook={ebook} />
      <StickyCta
        ebook={ebook}
        href={withAttribution(ebook.checkoutUrl)}
        onCheckout={() => reportCheckoutIntent(ebook)}
      />
    </div>
  );
}
