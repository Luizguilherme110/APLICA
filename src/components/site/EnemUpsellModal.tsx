import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnemUpsellCard } from "@/components/site/EnemUpsellCard";
import { ENEM_CATEGORY, type Ebook } from "@/data/ebooks";
import { useCatalog } from "@/lib/catalog-context";

const AUTO_OPEN_DELAY_MS = 5000;

/**
 * Popup de cross-sell só pra página do Kit ENEM Essencial — é a página que
 * recebe tráfego de anúncio, e a ideia é toda visita já ver o Kit Completo e
 * os pacotes avulsos, sem depender de rolar até o fim da página. Abre uma
 * vez por sessão (sessionStorage), não incomoda em navegações seguintes.
 */
export function EnemUpsellModal({ ebook }: { ebook: Ebook }) {
  const { ebooks } = useCatalog();
  const [open, setOpen] = useState(false);
  const eligible = ebook.slug === "kit-enem-essencial";

  useEffect(() => {
    if (!eligible) return;
    const seenKey = `enem_upsell_seen_${ebook.slug}`;
    if (sessionStorage.getItem(seenKey)) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(seenKey, "1");
      setOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, [eligible, ebook.slug]);

  if (!eligible) return null;

  const others = ebooks
    .filter((e) => e.category === ENEM_CATEGORY && e.slug !== ebook.slug)
    .sort((a) => (a.slug === "kit-enem-completo" ? -1 : 0));

  if (others.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Leve mais barato comprando junto</DialogTitle>
          <DialogDescription>
            Além do Essencial, você pode complementar ou já levar tudo no Kit Completo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((e) => (
            <EnemUpsellCard key={e.slug} ebook={e} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
