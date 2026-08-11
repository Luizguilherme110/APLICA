import { neon } from "@neondatabase/serverless";

// Lazy: evita quebrar o build se DATABASE_URL ainda não estiver setada.
let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!);
  return _sql;
}
