import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/functions/db";
import { adminSessionOrThrow } from "@/functions/admin-guard";
import { rangeToSince, type StatsRange } from "@/functions/admin-stats";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SaveSampleLeadInput = {
  email: string;
  slug: string;
  category?: string;
  sessionId?: string;
};

/**
 * Grava o e-mail de quem pediu a amostra grátis pelo popup. Chamada pelo
 * visitante (sem sessão de admin) — validação de formato aqui é a única
 * barreira contra lixo, então fica rígida.
 */
export const saveSampleLead = createServerFn({ method: "POST" })
  .validator((data: SaveSampleLeadInput) => {
    const email = data.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) throw new Error("e-mail inválido");
    if (!data.slug) throw new Error("slug obrigatório");
    return { ...data, email };
  })
  .handler(async ({ data }) => {
    const sql = getSql();
    await sql`
      INSERT INTO sample_leads (email, slug, category, session_id)
      VALUES (${data.email}, ${data.slug}, ${data.category ?? null}, ${data.sessionId ?? null})
    `;
    return { ok: true };
  });

export type SampleLeadRow = {
  email: string;
  slug: string;
  category: string | null;
  created_at: string;
};

/** Lista os leads da amostra pro painel admin, mais recentes primeiro. */
export const getSampleLeads = createServerFn({ method: "GET" })
  .validator((data: { range: StatsRange }) => data)
  .handler(async ({ data }): Promise<SampleLeadRow[]> => {
    await adminSessionOrThrow();
    const sql = getSql();
    const since = rangeToSince(data.range);
    const rows = since
      ? await sql`
          SELECT email, slug, category, created_at
          FROM sample_leads
          WHERE created_at >= ${since.toISOString()}
          ORDER BY created_at DESC
          LIMIT 500
        `
      : await sql`
          SELECT email, slug, category, created_at
          FROM sample_leads
          ORDER BY created_at DESC
          LIMIT 500
        `;
    return rows as SampleLeadRow[];
  });
