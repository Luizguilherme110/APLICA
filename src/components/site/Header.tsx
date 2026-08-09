import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-mark-light-blue.png";
import { STORE } from "@/data/ebooks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <img src={logo} alt={STORE.name} className="h-8 w-auto sm:h-10" />
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
        </nav>
      </div>
    </header>
  );
}
