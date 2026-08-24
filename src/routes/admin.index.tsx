import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, LogOut, RefreshCw, TrendingDown } from "lucide-react";
import { checkAdminSession, adminLogin, adminLogout } from "@/functions/admin-auth";
import { getFunnelStats, type FunnelStats, type StatsRange } from "@/functions/admin-stats";
import { getSampleLeads, type SampleLeadRow } from "@/functions/sample-leads";
import {
  getPurchaseStats,
  getCheckoutActivity,
  type PurchaseStats,
  type CheckoutActivity,
} from "@/functions/purchases";
import { getEbook } from "@/data/ebooks";
import { META_PIXEL_IDS } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

const EMPTY_PURCHASES: PurchaseStats = { count: 0, revenue: 0, byProduct: [] };
const EMPTY_CHECKOUT_ACTIVITY: CheckoutActivity = { eventCounts: [], recent: [] };

const CHECKOUT_EVENT_LABELS: Record<string, string> = {
  purchase_approved: "Compra aprovada",
  purchase_refused: "Compra recusada",
  pix_gerado: "Pix gerado",
  boleto_gerado: "Boleto gerado",
  picpay_gerado: "Picpay gerado",
  refund: "Reembolso",
  chargeback: "Chargeback",
  subscription_canceled: "Assinatura cancelada",
  subscription_renewed: "Assinatura renovada",
  checkout_abandonment: "Abandonou checkout",
};

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  loader: async () => {
    const { authenticated } = await checkAdminSession();
    if (!authenticated) return { authenticated: false as const };
    const stats = await getFunnelStats({ data: { range: "30d" } });
    // Leads e vendas são features novas (tabelas sample_leads e purchases).
    // Se a migração ainda não rodou no banco, essas queries falham — e não
    // podem derrubar o resto do painel, que já funcionava sem elas.
    const [leads, purchases, checkoutActivity] = await Promise.all([
      getSampleLeads({ data: { range: "30d" } }).catch((err) => {
        console.error("[admin] falha ao buscar sample_leads:", err);
        return [] as SampleLeadRow[];
      }),
      getPurchaseStats({ data: { range: "30d" } }).catch((err) => {
        console.error("[admin] falha ao buscar purchases:", err);
        return EMPTY_PURCHASES;
      }),
      getCheckoutActivity({ data: { range: "30d" } }).catch((err) => {
        console.error("[admin] falha ao buscar checkout activity:", err);
        return EMPTY_CHECKOUT_ACTIVITY;
      }),
    ]);
    return { authenticated: true as const, stats, leads, purchases, checkoutActivity };
  },
  component: AdminPage,
});

const STAGE_LABELS: Record<string, string> = {
  page_view: "Visitou o site",
  view_ebook: "Viu um produto",
  initiate_checkout: "Iniciou checkout",
};

/**
 * Cada evento aqui tem uma chamada fbq() pareada no código (ver
 * src/lib/product-analytics.ts, meta-pixel.ts, WhatsAppButton, SampleModal e
 * __root.tsx) — então essa contagem é o que o Pixel *deveria* ter recebido.
 * Não é confirmação da Meta: só prova que o navegador do visitante chamou
 * fbq(), não que o evento chegou no servidor deles.
 */
const PIXEL_EVENT_MAP: { event_name: string; fbEvent: string }[] = [
  { event_name: "page_view", fbEvent: "PageView" },
  { event_name: "view_ebook", fbEvent: "ViewContent" },
  { event_name: "initiate_checkout", fbEvent: "InitiateCheckout" },
  { event_name: "download_sample", fbEvent: "DownloadSample (custom)" },
  { event_name: "click_whatsapp", fbEvent: "Contact" },
  { event_name: "scroll_depth", fbEvent: "ScrollDepth (custom)" },
];

const RANGES: { value: StatsRange; label: string }[] = [
  { value: "today", label: "Hoje" },
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "all", label: "Tudo" },
];

function AdminPage() {
  const data = Route.useLoaderData();
  const router = useRouter();

  if (!data.authenticated) {
    return <LoginScreen onSuccess={() => router.invalidate()} />;
  }

  return (
    <Dashboard
      initialStats={data.stats}
      initialLeads={data.leads}
      initialPurchases={data.purchases}
      initialCheckoutActivity={data.checkoutActivity}
    />
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const result = await adminLogin({ data: { password } });
    setPending(false);
    if (result.ok) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-xl"
      >
        <h1 className="text-lg font-bold text-white">Painel admin</h1>
        <p className="mt-1 text-sm text-white/50">Acesso restrito.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
        />
        {error ? <p className="mt-2 text-xs text-red-400">Senha incorreta.</p> : null}
        <button
          type="submit"
          disabled={pending || !password}
          className="mt-4 w-full rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-400 disabled:opacity-50"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({
  initialStats,
  initialLeads,
  initialPurchases,
  initialCheckoutActivity,
}: {
  initialStats: FunnelStats;
  initialLeads: SampleLeadRow[];
  initialPurchases: PurchaseStats;
  initialCheckoutActivity: CheckoutActivity;
}) {
  const [range, setRange] = useState<StatsRange>("30d");
  const [stats, setStats] = useState(initialStats);
  const [leads, setLeads] = useState(initialLeads);
  const [purchases, setPurchases] = useState(initialPurchases);
  const [checkoutActivity, setCheckoutActivity] = useState(initialCheckoutActivity);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmails() {
    await navigator.clipboard.writeText(leads.map((l) => l.email).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function reload(nextRange: StatsRange) {
    setLoading(true);
    setRange(nextRange);
    const [fresh, freshLeads, freshPurchases, freshCheckoutActivity] = await Promise.all([
      getFunnelStats({ data: { range: nextRange } }),
      getSampleLeads({ data: { range: nextRange } }).catch(() => [] as SampleLeadRow[]),
      getPurchaseStats({ data: { range: nextRange } }).catch(() => EMPTY_PURCHASES),
      getCheckoutActivity({ data: { range: nextRange } }).catch(() => EMPTY_CHECKOUT_ACTIVITY),
    ]);
    setStats(fresh);
    setLeads(freshLeads);
    setPurchases(freshPurchases);
    setCheckoutActivity(freshCheckoutActivity);
    setLoading(false);
  }

  async function handleLogout() {
    await adminLogout();
    window.location.href = "/admin";
  }

  const stage1 = stats.stages.find((s) => s.event_name === "page_view");
  const baseUniq = stage1?.uniq ?? 0;

  const whatsappClicks = stats.stages.find((s) => s.event_name === "click_whatsapp")?.uniq ?? 0;

  // Derivado do que já existe (scroll_depth), sem captação nova: quem abriu
  // a página mas nunca chegou nem em 25% dela.
  const scroll25 = stats.scrollDepth.find((s) => s.milestone === 25)?.uniq ?? 0;
  const deadSessions = Math.max(0, baseUniq - scroll25);
  const deadPct = baseUniq > 0 ? Math.round((deadSessions / baseUniq) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b0f19] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Funil — Aplica</h1>
            <p className="mt-1 text-sm text-white/50">
              Onde o visitante desiste, do jeito que a loja realmente rastreia hoje.
            </p>
            <Link
              to="/admin/precos"
              className="mt-2 inline-block text-xs font-semibold text-indigo-400 hover:underline"
            >
              Editar preços dos produtos →
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/10 bg-white/5 p-1">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => reload(r.value)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                    range === r.value
                      ? "bg-indigo-500 text-white"
                      : "text-white/60 hover:text-white",
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => reload(range)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 hover:text-white"
              aria-label="Atualizar"
            >
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/60 hover:text-red-300"
            >
              <LogOut className="size-3.5" /> Sair
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-300/70">
              Vendas confirmadas
            </span>
            <p className="mt-1 text-3xl font-extrabold text-white">{purchases.count}</p>
            <p className="mt-1 text-xs text-white/50">{stats.rangeLabel}, via webhook da Cakto</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-300/70">
              Faturamento
            </span>
            <p className="mt-1 text-3xl font-extrabold text-white">
              {purchases.revenue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="mt-1 text-xs text-white/50">Soma do valor pago em cada venda</p>
          </div>
        </div>

        {purchases.byProduct.length > 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#111827] p-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {purchases.byProduct.map((p) => (
                <div key={p.product_name ?? "?"} className="text-xs">
                  <span className="text-white/80">{p.product_name ?? "Produto sem nome"}</span>
                  <span className="ml-1.5 font-semibold text-emerald-400">
                    {p.count}× ·{" "}
                    {p.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-sm font-bold text-white/80">Atividade no checkout (Cakto)</h2>
          <p className="mt-1 text-xs text-white/40">
            Tudo que a Cakto reporta depois que o lead sai do nosso site, {stats.rangeLabel.toLowerCase()}
            — não só a venda aprovada.
          </p>

          {checkoutActivity.eventCounts.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">
              Sem eventos de checkout registrados ainda nesse período.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {checkoutActivity.eventCounts.map((row) => (
                <div key={row.event} className="text-xs">
                  <span className="text-white/80">
                    {CHECKOUT_EVENT_LABELS[row.event] ?? row.event}
                  </span>
                  <span className="ml-1.5 font-semibold text-indigo-400">{row.count}</span>
                </div>
              ))}
            </div>
          )}

          {checkoutActivity.recent.length > 0 ? (
            <div className="mt-5 max-h-80 overflow-y-auto overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-[#111827]">
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/40">
                    <th className="pb-2 pr-4 font-semibold">E-mail</th>
                    <th className="pb-2 pr-4 font-semibold">Produto</th>
                    <th className="pb-2 pr-4 font-semibold">Evento</th>
                    <th className="pb-2 pr-4 font-semibold">Pagamento</th>
                    <th className="pb-2 font-semibold">Quando</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutActivity.recent.map((row, i) => (
                    <tr key={`${row.cakto_id}-${row.event}-${i}`} className="border-b border-white/5">
                      <td className="py-2.5 pr-4 text-white/90">{row.customer_email ?? "—"}</td>
                      <td className="py-2.5 pr-4 text-white/60">{row.product_name ?? "—"}</td>
                      <td className="py-2.5 pr-4 text-white/80">
                        {CHECKOUT_EVENT_LABELS[row.event] ?? row.event}
                      </td>
                      <td className="py-2.5 pr-4 text-white/60">{row.payment_method ?? "—"}</td>
                      <td className="py-2.5 text-white/40">
                        {new Date(row.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
              Cliques no WhatsApp
            </span>
            <p className="mt-1 text-3xl font-extrabold text-white">{whatsappClicks}</p>
            <p className="mt-1 text-xs text-white/50">
              Gente que quis tirar dúvida antes de comprar, {stats.rangeLabel.toLowerCase()}.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
              Sessões que não engajaram
            </span>
            <p className="mt-1 text-3xl font-extrabold text-white">
              {deadSessions}{" "}
              <span className="text-base font-semibold text-white/40">({deadPct}%)</span>
            </p>
            <p className="mt-1 text-xs text-white/50">Abriram e nunca passaram de 25% da página.</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-sm font-bold text-white/80">Funil principal</h2>
          <p className="mt-1 text-xs text-white/40">
            Visitantes únicos em cada etapa, {stats.rangeLabel.toLowerCase()}.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {stats.stages.length === 0 ? (
              <p className="col-span-3 py-8 text-center text-sm text-white/40">
                Sem eventos registrados ainda nesse período.
              </p>
            ) : (
              ["page_view", "view_ebook", "initiate_checkout"].map((name, i) => {
                const stage = stats.stages.find((s) => s.event_name === name);
                const uniq = stage?.uniq ?? 0;
                const pctOfStart = baseUniq > 0 ? Math.round((uniq / baseUniq) * 100) : 0;
                const prevStage =
                  i > 0
                    ? stats.stages.find(
                        (s) =>
                          s.event_name === ["page_view", "view_ebook", "initiate_checkout"][i - 1],
                      )
                    : null;
                const dropFromPrev =
                  prevStage && prevStage.uniq > 0
                    ? Math.round((1 - uniq / prevStage.uniq) * 100)
                    : null;

                return (
                  <div key={name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
                      Etapa {i + 1}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-white">{STAGE_LABELS[name]}</h3>
                    <p className="mt-2 text-3xl font-extrabold">{uniq}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {stage?.total ?? 0} eventos · {pctOfStart}% do início
                    </p>
                    {dropFromPrev !== null && dropFromPrev > 0 ? (
                      <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-400">
                        <TrendingDown className="size-3.5" /> -{dropFromPrev}% da etapa anterior
                      </p>
                    ) : null}
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${Math.max(pctOfStart, 3)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-sm font-bold text-white/80">Até onde os visitantes rolam</h2>
          <p className="mt-1 text-xs text-white/40">
            % de quem visitou (etapa 1) que chegou a cada marco da página, no período.
          </p>

          {stats.scrollDepth.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">
              Sem dado de rolagem ainda nesse período.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {[25, 50, 75, 100].map((milestone) => {
                const row = stats.scrollDepth.find((s) => s.milestone === milestone);
                const uniq = row?.uniq ?? 0;
                const pct = baseUniq > 0 ? Math.round((uniq / baseUniq) * 100) : 0;
                return (
                  <div key={milestone} className="flex items-center gap-3">
                    <span className="w-10 shrink-0 text-xs font-semibold text-white/50">
                      {milestone}%
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${Math.max(pct, uniq > 0 ? 3 : 0)}%` }}
                      />
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs text-white/50">
                      {uniq} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-sm font-bold text-white/80">Eventos do Meta Pixel</h2>
          <p className="mt-1 text-xs text-white/40">
            Pixel ID {META_PIXEL_IDS.join(", ")} · eventos que o navegador do visitante disparou
            via fbq(), {stats.rangeLabel.toLowerCase()}. Não confirma recebimento pela Meta — só
            que o código rodou.
          </p>

          <div className="mt-4 space-y-2.5">
            {PIXEL_EVENT_MAP.map(({ event_name, fbEvent }) => {
              const row = stats.stages.find((s) => s.event_name === event_name);
              return (
                <div key={event_name} className="flex items-center justify-between text-sm">
                  <span className="text-white/80">{fbEvent}</span>
                  <span className="shrink-0 text-white/50">
                    {row?.total ?? 0} disparos · {row?.uniq ?? 0} visitantes únicos
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-sm font-bold text-white/80">Origem do tráfego</h2>
            <p className="mt-1 text-xs text-white/40">
              Por utm_source do link que a pessoa clicou.{" "}
              {stats.origins.every((o) => o.origin === "Direto / orgânico") ? (
                <span className="text-amber-400">Nenhum link visitado tinha utm_source ainda.</span>
              ) : null}
            </p>
            {stats.origins.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">Sem dado ainda.</p>
            ) : (
              <div className="mt-4 space-y-2.5">
                {stats.origins.map((o) => {
                  const conv = o.visitors > 0 ? Math.round((o.checkouts / o.visitors) * 100) : 0;
                  return (
                    <div key={o.origin} className="flex items-center justify-between text-sm">
                      <span className="min-w-0 truncate text-white/80">{o.origin}</span>
                      <span className="shrink-0 text-white/50">
                        {o.visitors} visitantes · {o.checkouts} checkout · {conv}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-sm font-bold text-white/80">Por dispositivo</h2>
            <p className="mt-1 text-xs text-white/40">Mobile vs desktop, pela largura da tela.</p>
            {stats.devices.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">Sem dado ainda.</p>
            ) : (
              <div className="mt-4 space-y-2.5">
                {stats.devices.map((d) => {
                  const conv = d.visitors > 0 ? Math.round((d.checkouts / d.visitors) * 100) : 0;
                  return (
                    <div key={d.device} className="flex items-center justify-between text-sm">
                      <span className="min-w-0 truncate capitalize text-white/80">{d.device}</span>
                      <span className="shrink-0 text-white/50">
                        {d.visitors} visitantes · {d.checkouts} checkout · {conv}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-sm font-bold text-white/80">Por produto</h2>
          <p className="mt-1 text-xs text-white/40">
            Quem viu a página e não iniciou checkout é o primeiro lugar pra olhar. "Amostra" conta
            visitantes únicos que baixaram o PDF de amostra grátis.
          </p>

          {stats.products.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">Nenhum produto visitado ainda.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/40">
                    <th className="pb-2 pr-4 font-semibold">Produto</th>
                    <th className="pb-2 pr-4 font-semibold">Visitantes</th>
                    <th className="pb-2 pr-4 font-semibold">Amostra</th>
                    <th className="pb-2 pr-4 font-semibold">Iniciaram checkout</th>
                    <th className="pb-2 font-semibold">Conversão</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.products.map((p) => {
                    const conv = p.views > 0 ? Math.round((p.checkouts / p.views) * 100) : 0;
                    const title = getEbook(p.slug)?.title ?? p.slug;
                    return (
                      <tr key={p.slug} className="border-b border-white/5">
                        <td className="py-2.5 pr-4">
                          <span className="block font-medium text-white">{title}</span>
                          <span className="block text-xs text-white/40">{p.category}</span>
                        </td>
                        <td className="py-2.5 pr-4 text-white/80">{p.views}</td>
                        <td className="py-2.5 pr-4 text-white/80">{p.samples}</td>
                        <td className="py-2.5 pr-4 text-white/80">{p.checkouts}</td>
                        <td className="py-2.5">
                          <span
                            className={cn(
                              "font-semibold",
                              conv === 0
                                ? "text-red-400"
                                : conv < 15
                                  ? "text-amber-400"
                                  : "text-emerald-400",
                            )}
                          >
                            {conv}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white/80">Leads da amostra grátis</h2>
              <p className="mt-1 text-xs text-white/40">
                Quem deixou o e-mail no popup pra ler a amostra. {leads.length} no total.
              </p>
            </div>
            {leads.length > 0 ? (
              <button
                onClick={copyEmails}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/60 hover:text-white"
              >
                <Copy className="size-3.5" /> {copied ? "Copiado!" : "Copiar e-mails"}
              </button>
            ) : null}
          </div>

          {leads.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">Nenhum lead ainda.</p>
          ) : (
            <div className="mt-4 max-h-80 overflow-y-auto overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-[#111827]">
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/40">
                    <th className="pb-2 pr-4 font-semibold">E-mail</th>
                    <th className="pb-2 pr-4 font-semibold">Produto</th>
                    <th className="pb-2 font-semibold">Quando</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l, i) => (
                    <tr key={`${l.email}-${l.created_at}-${i}`} className="border-b border-white/5">
                      <td className="py-2.5 pr-4 text-white/90">{l.email}</td>
                      <td className="py-2.5 pr-4 text-white/60">
                        {getEbook(l.slug)?.title ?? l.slug}
                      </td>
                      <td className="py-2.5 text-white/40">
                        {new Date(l.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          Total de {stats.totalEvents} eventos no período · Vendas confirmadas via webhook da Cakto
          em tempo real.
        </p>
      </div>
    </div>
  );
}
