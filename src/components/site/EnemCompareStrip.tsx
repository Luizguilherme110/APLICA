import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { effectivePrice, type Ebook } from "@/data/ebooks";
import { useCatalog } from "@/lib/catalog-context";

const COMPLETE_SLUG = "kit-enem-completo";

/**
 * Banner logo abaixo do hero apontando pro Kit Completo — no mobile o
 * cross-sell de baixo da página (EnemCrossSell) fica soterrado depois de
 * módulos, depoimentos e garantia. Isso mostra a opção maior sem precisar
 * rolar quase nada. Só na página do Kit Essencial por enquanto, mesma regra
 * do EnemUpsellModal.
 */
export function EnemCompareStrip({ ebook }: { ebook: Ebook }) {
  const { ebooks } = useCatalog();

  if (ebook.slug !== "kit-enem-essencial") return null;

  const complete = ebooks.find((e) => e.slug === COMPLETE_SLUG);
  if (!complete) return null;

  return (
    <section className="border-b border-border/70 bg-secondary/30 py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          to="/ebooks/$slug"
          params={{ slug: complete.slug }}
          className="flex flex-col gap-2 rounded-xl border border-brand/40 bg-card p-4 shadow-glow transition-colors hover:border-brand/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-strong">
              Melhor custo-benefício
            </span>
            <p className="mt-1 text-sm text-foreground">Quer ter tudo em um só lugar?</p>
            <p className="text-sm font-bold text-foreground">
              {complete.title} por {effectivePrice(complete)}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong">
            Ver Kit Completo <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
