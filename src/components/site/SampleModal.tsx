import { useState, type ReactNode } from "react";
import { track as trackVercelAnalytics } from "@vercel/analytics/react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveSampleLead } from "@/functions/sample-leads";
import { trackDownloadSample as trackMetaDownloadSample } from "@/lib/meta-pixel";
import { trackDownloadSample as trackOpenaiDownloadSample } from "@/lib/openai-pixel";
import { getSessionId, logFunnelEvent } from "@/lib/funnel-analytics";
import type { Ebook } from "@/data/ebooks";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SampleModal({ ebook, trigger }: { ebook: Ebook; trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  if (!ebook.sampleUrl) return null;
  const sampleUrl = ebook.sampleUrl;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError(true);
      return;
    }
    setError(false);
    setPending(true);

    // Grava o lead, mas nunca deixa uma falha de banco travar a entrega do
    // PDF — a promessa "amostra grátis" tem que se cumprir mesmo se o resto
    // do rastreamento falhar.
    try {
      await saveSampleLead({
        data: {
          email: trimmed,
          slug: ebook.slug,
          category: ebook.category,
          sessionId: getSessionId(),
        },
      });
    } catch (err) {
      console.error("[sample-lead] falha ao gravar:", err);
    }

    trackMetaDownloadSample({ contentName: ebook.title, contentId: ebook.slug });
    trackOpenaiDownloadSample();
    trackVercelAnalytics("download_sample", { slug: ebook.slug, category: ebook.category });
    logFunnelEvent("download_sample", { slug: ebook.slug, category: ebook.category });

    window.open(sampleUrl, "_blank", "noopener");
    setPending(false);
    setOpen(false);
    setEmail("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setError(false);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-brand/12 text-brand-strong sm:mx-0">
            <FileText className="size-5" />
          </span>
          <DialogTitle className="mt-2">Amostra grátis de {ebook.title}</DialogTitle>
          <DialogDescription>
            Digite seu e-mail e a amostra abre em uma nova aba agora mesmo. Sem spam, é só pra você
            poder ler antes de decidir.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="sample-email">E-mail</Label>
            <Input
              id="sample-email"
              type="email"
              inputMode="email"
              autoFocus
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(false);
              }}
            />
            {error ? <p className="text-xs text-destructive">Digite um e-mail válido.</p> : null}
          </div>

          <DialogFooter>
            <Button type="submit" variant="cta" className="w-full" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Preparando...
                </>
              ) : (
                "Ler amostra agora"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
