import { CreditCard } from "lucide-react";
import logo from "@/assets/logo-mark-light-blue.png";
import { STORE } from "@/data/ebooks";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40 pb-28 pt-14 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <img src={logo} alt={STORE.name} className="h-10 w-auto" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{STORE.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a href={`mailto:${STORE.supportEmail}`} className="hover:text-foreground">
              {STORE.supportEmail}
            </a>
            <a href="/politica-de-privacidade" className="hover:text-foreground">
              Privacidade
            </a>
            <a href="/termos-de-uso" className="hover:text-foreground">
              Termos
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground/80">
            © {new Date().getFullYear()} {STORE.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="size-4 shrink-0 text-brand-strong" />
            <span>Pagamento seguro via Cakto • Pix ou <strong>até 8x no cartão</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
