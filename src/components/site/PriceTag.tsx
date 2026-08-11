import { discountPercent, effectivePrice, strikePrice, type Ebook } from "@/data/ebooks";
import { cn } from "@/lib/utils";

export function PriceTag({
  ebook,
  size = "md",
  className,
}: {
  ebook: Pick<Ebook, "price" | "originalPrice">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const price = effectivePrice(ebook);
  const strike = strikePrice(ebook);
  const pct = discountPercent(ebook as Ebook);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      {strike ? (
        <span
          className={cn(
            "text-muted-foreground/70 line-through decoration-1",
            size === "lg" ? "text-lg" : size === "md" ? "text-sm" : "text-xs",
          )}
        >
          {strike}
        </span>
      ) : null}
      <span
        className={cn(
          "font-extrabold tracking-tight text-foreground",
          size === "lg" ? "text-3xl" : size === "md" ? "text-lg" : "text-base",
        )}
      >
        {price}
      </span>
      {pct ? (
        <span className="rounded-full bg-danger-soft px-1.5 py-0.5 text-[11px] font-bold leading-none text-danger-ink">
          -{pct}%
        </span>
      ) : null}
    </span>
  );
}
