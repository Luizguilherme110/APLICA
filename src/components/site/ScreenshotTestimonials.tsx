import {
  getTestimonialScreenshots,
  type TestimonialScreenshot,
} from "@/data/testimonialScreenshots";
import { cn } from "@/lib/utils";

function ScreenshotCard({
  item,
  duplicate,
}: {
  item: TestimonialScreenshot;
  duplicate?: boolean;
}) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="w-56 shrink-0 overflow-hidden rounded-2xl bg-card shadow-card sm:w-64"
    >
      <img src={item.src} alt={item.alt} loading="lazy" className="block w-full object-cover" />
    </figure>
  );
}

/**
 * Prova social em formato de print (WhatsApp), rodando em loop contínuo (marquee).
 * Some sozinho se não houver print cadastrado para o ebookSlug pedido.
 */
export function ScreenshotTestimonials({
  ebookSlug,
  title = "O que os leitores estão dizendo no WhatsApp",
  subtitle = "Prints reais de conversas com clientes",
  className,
}: {
  ebookSlug?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const items = getTestimonialScreenshots(ebookSlug);
  if (items.length === 0) return null;

  return (
    <section className={cn("border-y border-border/70 bg-secondary/40", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:px-6">
        <div
          className={cn(
            "flex w-max gap-5 pb-2",
            items.length > 1 && "animate-marquee hover:[animation-play-state:paused]",
          )}
        >
          {items.map((item) => (
            <ScreenshotCard key={item.ebookSlug} item={item} />
          ))}
          {items.length > 1
            ? items.map((item) => (
                <ScreenshotCard key={`${item.ebookSlug}-dup`} item={item} duplicate />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
