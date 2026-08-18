import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { checkAdminSession } from "@/functions/admin-auth";
import { getPriceOverrides, updateProductPrice } from "@/functions/product-prices";
import { ebooks as baseEbooks, applyPriceOverrides, type Ebook } from "@/data/ebooks";
import { parsePriceBRL } from "@/lib/utils";

export const Route = createFileRoute("/admin/precos")({
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  loader: async () => {
    const { authenticated } = await checkAdminSession();
    if (!authenticated) throw redirect({ to: "/admin" });
    const overrides = await getPriceOverrides();
    return { ebooks: applyPriceOverrides(baseEbooks, overrides) };
  },
  component: PrecosPage,
});

function PrecosPage() {
  const { ebooks } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar ao painel
      </Link>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">
        Preços dos produtos
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Muda aqui e sincroniza com a oferta na Cakto automaticamente — o checkout sempre cobra o
        mesmo valor mostrado no site.
      </p>

      <div className="mt-8 space-y-3">
        {ebooks.map((e) => (
          <PriceRow key={e.slug} ebook={e} />
        ))}
      </div>
    </div>
  );
}

function PriceRow({ ebook }: { ebook: Ebook }) {
  const [price, setPrice] = useState(String(parsePriceBRL(ebook.price)));
  const [originalPrice, setOriginalPrice] = useState(
    ebook.originalPrice ? String(parsePriceBRL(ebook.originalPrice)) : "",
  );
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSave() {
    const priceNum = Number(price.replace(",", "."));
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setFeedback({ ok: false, message: "Preço inválido." });
      return;
    }
    const originalNum = originalPrice.trim() ? Number(originalPrice.replace(",", ".")) : null;

    setPending(true);
    setFeedback(null);
    try {
      const result = await updateProductPrice({
        data: {
          slug: ebook.slug,
          priceCents: Math.round(priceNum * 100),
          originalPriceCents: originalNum != null ? Math.round(originalNum * 100) : null,
        },
      });
      setFeedback(
        result.ok
          ? { ok: true, message: "Salvo — Cakto e site atualizados." }
          : { ok: false, message: result.error },
      );
    } catch (err) {
      console.error("[admin/precos] falha ao salvar:", err);
      setFeedback({
        ok: false,
        message: `Erro inesperado: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{ebook.title}</p>
          <p className="text-xs text-muted-foreground">{ebook.category}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-muted-foreground">Preço (R$)</span>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-28 rounded-lg border border-border/70 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-muted-foreground">
            De (riscado, opcional)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-28 rounded-lg border border-border/70 px-3 py-1.5 text-sm"
          />
        </label>
        <button
          onClick={handleSave}
          disabled={pending}
          className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : "Salvar"}
        </button>
      </div>
      {feedback ? (
        <p className={`mt-2 text-xs font-semibold ${feedback.ok ? "text-brand-strong" : "text-destructive"}`}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}
