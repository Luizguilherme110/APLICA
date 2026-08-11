import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Ebook } from "@/data/ebooks";
import { BookCover } from "@/components/site/BookCover";
import { PriceTag } from "@/components/site/PriceTag";
import { cn } from "@/lib/utils";

export function EbookCard({ ebook, className }: { ebook: Ebook; className?: string | undefined }) {
  return (
    <Link
      to="/ebooks/$slug"
      params={{ slug: ebook.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-card",
        className,
      )}
    >
      <div className="p-5 pb-0 sm:p-6 sm:pb-0">
        <BookCover
          title={ebook.title}
          category={ebook.category}
          format={ebook.format}
          image={ebook.coverImage}
          interactive
          compact
          className="mx-auto max-w-[12rem]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {ebook.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <PriceTag ebook={ebook} size="md" showInstallment />
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong">
            Ver detalhes
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
