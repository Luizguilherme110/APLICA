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

console.log("OK: tabela funnel_events pronta.");
