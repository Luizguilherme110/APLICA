import { Link } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { STORE } from "@/data/ebooks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Store className="size-4" />
          </span>
          <span className="truncate text-[15px] font-extrabold tracking-tight text-foreground">
            {STORE.name}
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link
            to="/"
            hash="catalogo"
            className="hidden transition-colors hover:text-foreground sm:block"
          >
            Catálogo
          </Link>
          <Link
            to="/"
            hash="faq"
            className="hidden transition-colors hover:text-foreground sm:block"
          >
            Dúvidas
          </Link>
          <a
            href={STORE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Suporte
          </a>
        </nav>
      </div>
    </header>
  );
}
