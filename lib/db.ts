import { Pool } from "pg";

declare global {
  var gpozosPool: Pool | undefined;
}

export const pool =
  global.gpozosPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") global.gpozosPool = pool;

export async function ensureResultsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS results (
      id BIGSERIAL PRIMARY KEY,
      player_name VARCHAR(80) NOT NULL,
      time_ms INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 3,
      status VARCHAR(30) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      selected_edges JSONB NOT NULL,
      total_cost INTEGER NOT NULL DEFAULT 0,
      coverage INTEGER NOT NULL DEFAULT 0,
      deficit INTEGER NOT NULL DEFAULT 0,
      matches INTEGER NOT NULL DEFAULT 0
    )
  `);
}
