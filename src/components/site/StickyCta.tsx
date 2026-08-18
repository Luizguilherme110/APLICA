import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/site/PriceTag";
import { isCheckoutPending, type Ebook } from "@/data/ebooks";

export function StickyCta({
  ebook,
  href,
  onCheckout,
}: {
  ebook: Pick<Ebook, "price" | "originalPrice" | "installments">;
  href: string;
  onCheckout?: () => void;
}) {
  const pending = isCheckoutPending(href);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <PriceTag
          ebook={ebook}
          size="md"
          showInstallment={ebook.installments ?? true}
          className="min-w-0"
        />
        {pending ? (
          <Button variant="cta" className="h-11 shrink-0 px-5" disabled>
            Em breve
          </Button>
        ) : (
          <Button asChild variant="cta" className="h-11 shrink-0 px-5">
            <a href={href} onClick={onCheckout}>
              Comprar agora <ArrowRight />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
