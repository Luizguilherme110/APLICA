export const SCROLL_MILESTONES = [25, 50, 75, 100] as const;
export type ScrollMilestone = (typeof SCROLL_MILESTONES)[number];

/**
 * % da página já visto: soma do que rolou com a altura da janela, sobre a
 * altura total do documento. Página que cabe inteira na tela sem precisar
 * rolar conta como 100 — a pessoa já viu tudo, só não tinha o que rolar.
 */
export function currentScrollPercent(): number {
  const doc = document.documentElement;
  const scrolled = window.scrollY + window.innerHeight;
  const total = doc.scrollHeight;
  if (total <= 0) return 100;
  return Math.min(100, Math.round((scrolled / total) * 100));
}

/**
 * Observa a rolagem e chama `onMilestone` uma única vez por marco atingido
 * (25/50/75/100), na ordem. `passive: true` e throttle por requestAnimationFrame
 * pra não pesar no scroll. Retorna a função de limpeza.
 */
export function watchScrollDepth(onMilestone: (milestone: ScrollMilestone) => void): () => void {
  const reached = new Set<ScrollMilestone>();
  let ticking = false;

  function check() {
    ticking = false;
    const pct = currentScrollPercent();
    for (const milestone of SCROLL_MILESTONES) {
      if (pct >= milestone && !reached.has(milestone)) {
        reached.add(milestone);
        onMilestone(milestone);
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // Página curta que já nasce 100% visível, ou usuário que chega direto no rodapé.
  check();

  return () => window.removeEventListener("scroll", onScroll);
}
