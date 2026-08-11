// Roda uma vez pra criar a tabela de eventos do funil no Postgres (Neon).
// Uso: npx dotenv -e .env.local -- node scripts/setup-analytics-db.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS funnel_events (
    id BIGSERIAL PRIMARY KEY,
    event_name TEXT NOT NULL,
    slug TEXT,
    category TEXT,
    value NUMERIC,
    session_id TEXT NOT NULL,
    path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS funnel_events_event_name_idx ON funnel_events (event_name)`;
await sql`CREATE INDEX IF NOT EXISTS funnel_events_created_at_idx ON funnel_events (created_at)`;
await sql`CREATE INDEX IF NOT EXISTS funnel_events_session_id_idx ON funnel_events (session_id)`;

// E-mails de quem pediu a amostra grátis pelo popup (src/components/site/SampleModal.tsx).
await sql`
  CREATE TABLE IF NOT EXISTS sample_leads (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    slug TEXT NOT NULL,
    category TEXT,
    session_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS sample_leads_slug_idx ON sample_leads (slug)`;
await sql`CREATE INDEX IF NOT EXISTS sample_leads_created_at_idx ON sample_leads (created_at)`;

console.log("OK: tabelas funnel_events e sample_leads prontas.");
