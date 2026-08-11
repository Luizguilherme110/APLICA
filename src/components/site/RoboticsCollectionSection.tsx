import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ebooks, getEbook, ROBOTICS_CATEGORY } from "@/data/ebooks";
import { BookCover } from "@/components/site/BookCover";
import { EbookCard } from "@/components/site/EbookCard";
import { PriceTag } from "@/components/site/PriceTag";

const BUNDLE_SLUG = "robotica-colecao-completa";

/**
 * Seção própria pra coleção de robótica infantil — público diferente do
 * resto do catálogo, então fica fora do grid geral (ver Index em
 * src/routes/index.tsx). Some sozinha se o produto ainda não existir em
 * src/data/ebooks.ts.
 */
export function RoboticsCollectionSection() {
  const bundle = getEbook(BUNDLE_SLUG);
  const volumes = ebooks.filter(
    (e) => e.category === ROBOTICS_CATEGORY && e.slug !== BUNDLE_SLUG,
  );

  if (!bundle) return null;

  return (
    <section className="border-y border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Coleção Robótica com Sucata
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          5 volumes, 38 projetos pra fazer com seu filho usando papelão, sucata e coisa de casa —
          de experiência sem motor pros pequenos até circuito eletrônico pros maiores.
        </p>

        <div className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="mx-auto w-full max-w-[16rem]">
            <BookCover
              title={bundle.title}
              category={bundle.category}
              format={bundle.format}
              image={bundle.coverImage}
              className="shadow-float"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
              Oferta principal · os 5 volumes numa compra só
            </span>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {bundle.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {bundle.subheadline}
            </p>
            <ul className="mt-4 space-y-2">
              {bundle.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-strong" />
                  <span className="min-w-0 text-foreground">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PriceTag ebook={bundle} size="lg" />
              <Link
                to="/ebooks/$slug"
                params={{ slug: bundle.slug }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ver coleção completa <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {volumes.length > 0 ? (
          <div className="mt-10">
            <p className="text-sm font-semibold text-muted-foreground">
              Ou comece por um volume avulso
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {volumes.map((v) => (
                <EbookCard key={v.slug} ebook={v} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
