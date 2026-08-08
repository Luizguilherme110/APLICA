import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookCover({
  title,
  category,
  format,
  image,
  className,
  interactive = false,
  compact = false,
}: {
  title: string;
  category: string;
  format: string;
  image?: string;
  className?: string;
  interactive?: boolean;
  compact?: boolean;
}) {
  if (image) {
    return (
      <div
        className={cn(
          "relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[oklch(0.2_0.018_50)] shadow-float",
          interactive && "transition-transform duration-300 group-hover:-translate-y-1",
          className,
        )}
      >
        <img src={image} alt={title} className="absolute inset-0 size-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[oklch(0.2_0.018_50)] shadow-float",
        interactive && "transition-transform duration-300 group-hover:-translate-y-1",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-2.5 bg-black/35" />
      <div className="absolute -right-12 -top-12 size-32 rotate-45 bg-brand" />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-5 pl-7 sm:p-7 sm:pl-9",
          compact && "p-4 pl-5 sm:p-4 sm:pl-5",
        )}
      >
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80",
            compact && "gap-1 px-2 py-0.5 text-[8px] tracking-normal",
          )}
        >
          <MapPin className={cn("size-3 text-brand", compact && "size-2.5")} />
          {category}
        </span>

        <div>
          <div className={cn("mb-2 h-0.5 w-9 bg-brand", compact && "mb-1.5 w-6")} />
          <h3
            className={cn(
              "text-balance text-2xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-3xl",
              compact && "text-lg sm:text-lg",
            )}
          >
            {title}
          </h3>
        </div>

        <p
          className={cn(
            "text-[11px] font-medium uppercase tracking-wide text-white/50",
            compact && "text-[9px]",
          )}
        >
          {format}
        </p>
      </div>
    </div>
  );
}
