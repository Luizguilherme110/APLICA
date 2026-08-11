import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { isLaunchOfferActive, LAUNCH_OFFER_ENDS_AT } from "@/data/promo";

function getRemaining() {
  const diff = new Date(LAUNCH_OFFER_ENDS_AT).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Banner de contagem regressiva da campanha de lançamento (src/data/promo.ts).
 * Renderiza vazio até montar no cliente, pra não descasar do horário do
 * servidor no primeiro paint, e some sozinho quando o prazo acabar.
 */
export function LaunchOfferBanner() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>();

  useEffect(() => {
    if (!isLaunchOfferActive()) return;
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!remaining) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-brand-strong px-4 py-2 text-center text-xs font-semibold text-brand-foreground sm:text-sm">
      <Flame className="size-4 shrink-0" aria-hidden />
      <span>Oferta de lançamento termina em</span>
      <span className="font-mono tabular-nums">
        {remaining.days > 0 ? `${remaining.days}d ` : ""}
        {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
      </span>
    </div>
  );
}
