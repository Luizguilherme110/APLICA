import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, LogOut, RefreshCw, TrendingDown } from "lucide-react";
import { checkAdminSession, adminLogin, adminLogout } from "@/functions/admin-auth";
import { getFunnelStats, type FunnelStats, type StatsRange } from "@/functions/admin-stats";
import { getSampleLeads, type SampleLeadRow } from "@/functions/sample-leads";
import { getEbook } from "@/data/ebooks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  loader: async () => {
    const { authenticated } = await checkAdminSession();
    if (!authenticated) return { authenticated: false as const };
    const [stats, leads] = await Promise.all([
      getFunnelStats({ data: { range: "30d" } }),
      getSampleLeads(),
    ]);
    return { authenticated: true as const, stats, leads };
  },
  component: AdminPage,
});

const STAGE_LABELS: Record<string, string> = {
  page_view: "Visitou o site",
  view_ebook: "Viu um produto",
  initiate_checkout: "Iniciou checkout",
};

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

  return <Dashboard initialStats={data.stats} leads={data.leads} />;
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

function Dashboard({ initialStats, leads }: { initialStats: FunnelStats; leads: SampleLeadRow[] }) {
  const [range, setRange] = useState<StatsRange>("30d");
  const [stats, setStats] = useState(initialStats);
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
    const fresh = await getFunnelStats({ data: { range: nextRange } });
    setStats(fresh);
    setLoading(false);
  }

  async function handleLogout() {
    await adminLogout();
    window.location.href = "/admin";
  }

  const stage1 = stats.stages.find((s) => s.event_name === "page_view");
  const baseUniq = stage1?.uniq ?? 0;

  return (
    <div className="min-h-screen bg-[#0b0f19] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Funil — Aplica</h1>
            <p className="mt-1 text-sm text-white/50">
              Onde o visitante desiste, do jeito que a loja realmente rastreia hoje.
            </p>
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
          Total de {stats.totalEvents} eventos no período · Não inclui compra concluída (isso só a
          Cakto sabe — precisa de webhook pra entrar aqui).
        </p>
      </div>
    </div>
  );
}
