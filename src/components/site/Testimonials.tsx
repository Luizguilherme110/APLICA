import { Quote, ShieldCheck, Star } from "lucide-react";
import { getAverageRating, getTestimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i <= rating ? "fill-brand text-brand" : "fill-transparent text-border",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { headline, quote, name, context, rating, verifiedPurchase } = testimonial;

  return (
    <figure className="flex flex-col rounded-2xl border border-border/70 bg-card p-6">
      <Quote className="size-5 shrink-0 text-brand/35" aria-hidden />

      {typeof rating === "number" ? (
        <div className="mt-4">
          <Stars rating={rating} />
        </div>
      ) : null}

      {headline ? (
        <p className="mt-3 text-balance text-base font-bold leading-snug text-foreground">
          {headline}
        </p>
      ) : null}

      <blockquote
        className={cn(
          "flex-1 text-sm leading-relaxed text-muted-foreground",
          headline ? "mt-2" : "mt-3",
        )}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/12 text-sm font-bold text-brand-strong"
          aria-hidden
        >
          {name.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-foreground">{name}</span>
          {context ? (
            <span className="block truncate text-xs text-muted-foreground">{context}</span>
          ) : null}
        </span>
        {verifiedPurchase ? (
          <span
            className="ml-auto flex shrink-0 items-center gap-1 text-[11px] font-semibold text-brand-strong"
            title="Compra confirmada no painel de vendas"
          >
            <ShieldCheck className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Compra verificada</span>
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Seção de prova social. Não renderiza nada enquanto não houver depoimentos
 * reais cadastrados em src/data/testimonials.ts — de propósito: é melhor não
 * ter seção nenhuma do que ter uma seção com conteúdo inventado.
 */
export function Testimonials({
  ebookSlug,
  title = "O que dizem os leitores",
  className,
}: {
  ebookSlug?: string;
  title?: string;
  className?: string;
}) {
  const items = getTestimonials(ebookSlug);
  if (items.length === 0) return null;

  const average = getAverageRating(items);
  const ratedCount = items.filter((t) => typeof t.rating === "number").length;

  return (
    <section className={cn("border-y border-border/70 bg-secondary/40", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {average !== null ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={Math.round(average)} />
              <span>
                <span className="font-bold text-foreground">
                  {average.toFixed(1).replace(".", ",")}
                </span>{" "}
                de {ratedCount} {ratedCount === 1 ? "avaliação" : "avaliações"}
              </span>
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-8 grid gap-5",
            items.length === 1
              ? "mx-auto max-w-xl"
              : items.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((t) => (
            <TestimonialCard key={`${t.name}-${t.quote.slice(0, 24)}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
