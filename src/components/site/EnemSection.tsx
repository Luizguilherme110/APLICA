import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCover } from "@/components/site/BookCover";
import { EbookCard } from "@/components/site/EbookCard";
import { PriceTag } from "@/components/site/PriceTag";
import { EnemContentCategories } from "@/components/site/EnemContentCategories";
import { ENEM_CATEGORY } from "@/data/ebooks";
import { useCatalog } from "@/lib/catalog-context";

const ESSENTIAL_SLUG = "kit-enem-essencial";
const COMPLETE_SLUG = "kit-enem-completo";

/**
 * Seção própria pra Apoio ENEM — mesma lógica da RoboticsCollectionSection:
 * público diferente do resto do catálogo, fica fora do grid geral (ver Index
 * em src/routes/index.tsx). Some sozinha se o produto de entrada ainda não
 * existir em src/data/ebooks.ts.
 */
export function EnemSection() {
  const { ebooks, getEbook } = useCatalog();
  const essential = getEbook(ESSENTIAL_SLUG);
  const complete = getEbook(COMPLETE_SLUG);
  const packs = ebooks.filter(
    (e) => e.category === ENEM_CATEGORY && e.slug !== ESSENTIAL_SLUG && e.slug !== COMPLETE_SLUG,
  );

  if (!essential) return null;

  return (
    <section id="enem" className="scroll-mt-20 border-y border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
            Apoio ENEM
          </span>
          <h2 className="mt-3 text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Seu material de estudo para o ENEM em um só lugar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Questões, simulados, redação, matérias, revisões e materiais de apoio para você estudar
            sem perder horas procurando conteúdo.
          </p>
          <div className="mt-7 flex justify-center">
            <Button asChild variant="cta" size="xl">
              <Link to="/ebooks/$slug" params={{ slug: essential.slug }}>
                Ver materiais <ArrowRight />
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Materiais digitais • Acesso rápido • Estude no seu ritmo
          </p>
        </div>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="mx-auto w-full max-w-[16rem]">
            <BookCover
              title={essential.title}
              category={essential.category}
              format={essential.format}
              image={essential.coverImage}
              className="shadow-float"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
              Produto de entrada · comece por aqui
            </span>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {essential.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {essential.subheadline}
            </p>
            <ul className="mt-4 space-y-2">
              {essential.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-strong" />
                  <span className="min-w-0 text-foreground">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PriceTag ebook={essential} size="lg" />
              <Link
                to="/ebooks/$slug"
                params={{ slug: essential.slug }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ver Kit Essencial <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            O que você pode encontrar
          </h3>
          <EnemContentCategories className="mt-8" />
        </div>

        {packs.length > 0 ? (
          <div className="mt-16">
            <p className="text-sm font-semibold text-muted-foreground">
              Complemente com pacotes por área
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {packs.map((p) => (
                <EbookCard key={p.slug} ebook={p} />
              ))}
            </div>
          </div>
        ) : null}

        {complete ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-brand/30 bg-card p-6 shadow-glow sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="mx-auto w-full max-w-[16rem]">
                <BookCover
                  title={complete.title}
                  category={complete.category}
                  format={complete.format}
                  image={complete.coverImage}
                  className="shadow-float"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
                  Quer levar a preparação completa?
                </span>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  {complete.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {complete.subheadline}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <PriceTag ebook={complete} size="lg" showInstallment />
                  <Link
                    to="/ebooks/$slug"
                    params={{ slug: complete.slug }}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {complete.ctaLabel ?? "Ver Kit Completo"} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
