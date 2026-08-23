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

// De onde o visitante veio (UTM, capturado uma vez por sessão em
// src/lib/attribution.ts) e em que tipo de aparelho.
await sql`ALTER TABLE funnel_events ADD COLUMN IF NOT EXISTS device TEXT`;
await sql`ALTER TABLE funnel_events ADD COLUMN IF NOT EXISTS utm_source TEXT`;
await sql`ALTER TABLE funnel_events ADD COLUMN IF NOT EXISTS utm_medium TEXT`;
await sql`ALTER TABLE funnel_events ADD COLUMN IF NOT EXISTS utm_campaign TEXT`;
await sql`CREATE INDEX IF NOT EXISTS funnel_events_utm_source_idx ON funnel_events (utm_source)`;

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

// Vendas reais, recebidas via webhook da Cakto (src/functions/cakto-webhook.ts).
// (cakto_id, event) é a chave de idempotência: a Cakto pode reenviar o
// mesmo evento, e ON CONFLICT DO NOTHING evita contar duas vezes — mas
// eventos diferentes do mesmo cakto_id (pix_gerado, depois purchase_approved)
// são estágios distintos da mesma transação, cada um com sua linha.
await sql`
  CREATE TABLE IF NOT EXISTS purchases (
    id BIGSERIAL PRIMARY KEY,
    cakto_id TEXT NOT NULL,
    event TEXT NOT NULL,
    status TEXT,
    product_id TEXT,
    product_name TEXT,
    amount NUMERIC,
    customer_email TEXT,
    payment_method TEXT,
    raw JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS purchases_event_idx ON purchases (event)`;
await sql`CREATE INDEX IF NOT EXISTS purchases_created_at_idx ON purchases (created_at)`;
await sql`CREATE INDEX IF NOT EXISTS purchases_product_id_idx ON purchases (product_id)`;

// Um cakto_id passa por vários eventos ao longo da vida da transação
// (pix_gerado -> purchase_approved, por exemplo). A unicidade antiga era só
// em cakto_id, então o segundo evento do mesmo id caía no ON CONFLICT DO
// NOTHING e sumia — a venda nunca saía de "pix gerado". Troca pra
// (cakto_id, event): cada estágio da transação grava sua própria linha.
await sql`ALTER TABLE purchases DROP CONSTRAINT IF EXISTS purchases_cakto_id_key`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS purchases_cakto_id_event_idx ON purchases (cakto_id, event)`;

// Melhor esforço: extraído do campo "checkoutUrl" do payload da Cakto, se ela
// ecoar os parâmetros que a gente anexou no link (ver src/lib/attribution.ts).
// Não documentado pela Cakto — pode simplesmente não vir preenchido.
await sql`ALTER TABLE purchases ADD COLUMN IF NOT EXISTS utm_source TEXT`;
await sql`ALTER TABLE purchases ADD COLUMN IF NOT EXISTS utm_campaign TEXT`;

console.log("OK: tabelas funnel_events, sample_leads e purchases prontas.");
