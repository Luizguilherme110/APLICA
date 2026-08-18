import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ENEM_CATEGORY, effectivePrice, type Ebook } from "@/data/ebooks";
import { useCatalog } from "@/lib/catalog-context";
import { cn } from "@/lib/utils";

const COMPLETE_SLUG = "kit-enem-completo";

/**
 * Faixa de comparação logo abaixo do hero — no mobile o cross-sell de baixo
 * da página (EnemCrossSell) fica soterrado depois de módulos, depoimentos e
 * garantia. Isso mostra "tem outras opções" sem precisar rolar quase nada.
 * Só na página do Kit Essencial por enquanto, mesma regra do EnemUpsellModal.
 */
export function EnemCompareStrip({ ebook }: { ebook: Ebook }) {
  const { ebooks } = useCatalog();

  if (ebook.slug !== "kit-enem-essencial") return null;

  const others = ebooks
    .filter((e) => e.category === ENEM_CATEGORY && e.slug !== ebook.slug)
    .sort((a) => (a.slug === COMPLETE_SLUG ? -1 : 0));

  if (others.length === 0) return null;

  return (
    <section className="border-b border-border/70 bg-secondary/30 py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold text-foreground">Tem outras opções, com preços diferentes</p>
        <div className="mt-3 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {others.map((e) => {
            const isComplete = e.slug === COMPLETE_SLUG;
            return (
              <Link
                key={e.slug}
                to="/ebooks/$slug"
                params={{ slug: e.slug }}
                className={cn(
                  "flex w-36 shrink-0 snap-start flex-col rounded-xl border p-3 transition-colors sm:w-40",
                  isComplete
                    ? "border-brand/40 bg-card shadow-glow"
                    : "border-border/70 bg-card hover:border-brand/40",
                )}
              >
                {isComplete ? (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand-strong">
                    Melhor conteúdo
                  </span>
                ) : null}
                <span className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-foreground">
                  {e.title}
                </span>
                <span className="mt-2 text-sm font-extrabold text-foreground">
                  {effectivePrice(e)}
                </span>
                <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-brand-strong">
                  Ver <ArrowRight className="size-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
