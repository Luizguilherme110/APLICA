import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/site/BookCover";
import { PriceTag } from "@/components/site/PriceTag";
import { EnemUpsellCard } from "@/components/site/EnemUpsellCard";
import { ebooks, ENEM_CATEGORY, effectivePrice, getEbook, type Ebook } from "@/data/ebooks";
import { cn, parsePriceBRL } from "@/lib/utils";

const COMPLETE_SLUG = "kit-enem-completo";
const ESSENTIAL_SLUG = "kit-enem-essencial";

/**
 * Cross-sell da seção Apoio ENEM: mostra os pacotes complementares (cada um
 * com seu próprio botão de compra e checkoutUrl independente) e uma chamada
 * para o Kit Completo. Some sozinho para produtos fora da categoria ENEM.
 */
export function EnemCrossSell({ ebook }: { ebook: Ebook }) {
  if (ebook.category !== ENEM_CATEGORY) return null;

  const bundle = getEbook(COMPLETE_SLUG);
  const upsells = ebooks.filter(
    (e) =>
      e.category === ENEM_CATEGORY &&
      e.slug !== ebook.slug &&
      e.slug !== COMPLETE_SLUG &&
      e.slug !== ESSENTIAL_SLUG,
  );
  const showBundle = Boolean(bundle) && ebook.slug !== COMPLETE_SLUG;

  // Soma real dos preços dos produtos individuais (essencial + 5 pacotes),
  // pra mostrar a economia do kit completo sem inventar nenhum valor.
  const individualSlugs = [ESSENTIAL_SLUG, ...upsells.map((e) => e.slug), ebook.slug].filter(
    (slug, i, arr) => arr.indexOf(slug) === i && slug !== COMPLETE_SLUG,
  );
  const individualProducts = individualSlugs
    .map((slug) => getEbook(slug))
    .filter((e): e is Ebook => Boolean(e));
  const separateTotal = individualProducts.reduce(
    (sum, e) => sum + parsePriceBRL(effectivePrice(e)),
    0,
  );
  const savings = bundle ? separateTotal - parsePriceBRL(effectivePrice(bundle)) : 0;

  if (upsells.length === 0 && !showBundle) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {upsells.length > 0 ? (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Quer complementar seu material?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Escolha o que faz sentido para você — cada pacote é uma compra independente.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upsells.map((e) => (
              <EnemUpsellCard key={e.slug} ebook={e} />
            ))}
          </div>
        </>
      ) : null}

      {showBundle && bundle ? (
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-8",
            upsells.length > 0 && "mt-12",
          )}
        >
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="mx-auto w-full max-w-[14rem]">
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
                Quer levar a preparação completa?
              </span>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {bundle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {bundle.subheadline}
              </p>
              {savings > 0 ? (
                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                    <span className="text-sm text-muted-foreground line-through decoration-1">
                      R$ {separateTotal.toFixed(2).replace(".", ",")} separado
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight text-foreground">
                      {effectivePrice(bundle)}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-muted-foreground">
                    <strong className="font-bold text-brand-strong">até 8x no cartão</strong>
                  </span>
                </div>
              ) : (
                <div className="mt-4">
                  <PriceTag ebook={bundle} size="lg" showInstallment />
                </div>
              )}
              <Link
                to="/ebooks/$slug"
                params={{ slug: bundle.slug }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {bundle.ctaLabel ?? "Ver kit completo"} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
