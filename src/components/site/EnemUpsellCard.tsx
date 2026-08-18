import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BookCover } from "@/components/site/BookCover";
import { PriceTag } from "@/components/site/PriceTag";
import { isCheckoutPending, type Ebook } from "@/data/ebooks";
import { reportCheckoutIntent } from "@/lib/product-analytics";
import { withAttribution } from "@/lib/attribution";
import { cn } from "@/lib/utils";

/**
 * Card de complemento (upsell) com botão de compra próprio e independente —
 * diferente do EbookCard, que só leva para a página do produto. Cada compra
 * continua sendo um checkoutUrl separado (ver src/data/ebooks.ts); qualquer
 * combinação de itens num único pedido depende de order bump configurado na
 * Cakto, fora deste código.
 */
export function EnemUpsellCard({ ebook, className }: { ebook: Ebook; className?: string }) {
  const pending = isCheckoutPending(ebook.checkoutUrl);

  return (
    <div className={cn("flex flex-col rounded-2xl border border-border/70 bg-card p-5", className)}>
      <div className="flex items-start gap-4">
        <BookCover
          title={ebook.title}
          category={ebook.category}
          format={ebook.format}
          image={ebook.coverImage}
          compact
          className="w-16 shrink-0 sm:w-20"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-foreground">{ebook.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {ebook.tagline}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <PriceTag ebook={ebook} size="sm" />
        {pending ? (
          <Button variant="cta" size="sm" disabled>
            Em breve
          </Button>
        ) : (
          <Button asChild variant="cta" size="sm">
            <a
              href={withAttribution(ebook.checkoutUrl)}
              onClick={() => reportCheckoutIntent(ebook)}
            >
              Adicionar
            </a>
          </Button>
        )}
      </div>
      <Link
        to="/ebooks/$slug"
        params={{ slug: ebook.slug }}
        className="mt-2 text-center text-xs font-semibold text-brand-strong hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
}
