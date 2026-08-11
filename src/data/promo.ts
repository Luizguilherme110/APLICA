/**
 * Campanha de lançamento: data real de término.
 *
 * IMPORTANTE — quando esse prazo passar, o site sozinho para de mostrar
 * preço riscado, badge de desconto e o banner de contagem regressiva.
 * O preço que continua sendo cobrado é o que estiver configurado no
 * checkout da Cakto — atualize lá manualmente pra bater com o que o site
 * vai passar a mostrar (o originalPrice de cada ebook em src/data/ebooks.ts).
 *
 * Pra rodar uma nova urgência depois, não reative esta data: crie um gancho
 * novo (outro bônus, outro prazo) em vez de religar o mesmo desconto.
 */
export const LAUNCH_OFFER_ENDS_AT = "2026-08-17T23:59:59-03:00";

export function isLaunchOfferActive(now: number = Date.now()): boolean {
  return now < new Date(LAUNCH_OFFER_ENDS_AT).getTime();
}
