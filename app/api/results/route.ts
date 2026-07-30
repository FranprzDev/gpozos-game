import { NextResponse } from "next/server";
import { ensureResultsTable, pool } from "@/lib/db";

const validEdgeIds = new Set([
  "45-paraiso", "45-paraiso2", "45-wenceslao", "138-paraiso", "138-paraiso2",
  "138-sanlorenzo", "138-wenceslao", "138-bosque", "122-lapila", "122-malvinas",
  "122-viviendas", "41-carmen", "41-delfin", "41-bosque", "41-mariano", "41-sanlorenzo",
]);

export async function GET() {
  await ensureResultsTable();
  const { rows } = await pool.query(`
    SELECT id, player_name, time_ms, attempts, status, created_at,
           selected_edges, total_cost, coverage, deficit, matches
    FROM results
    WHERE status = 'completed'
    ORDER BY matches DESC, coverage DESC, deficit ASC, time_ms ASC
  `);
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const selected = Array.isArray(body.selectedEdges)
    ? body.selectedEdges.filter((id: unknown): id is string => typeof id === "string")
    : [];
  const validNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

  if (
    typeof body.playerName !== "string" || !body.playerName.trim() || body.status !== "completed" ||
    selected.length !== 3 || new Set(selected).size !== 3 || selected.some((id: string) => !validEdgeIds.has(id)) ||
    !validNumber(body.timeMs) || !validNumber(body.totalCost) || !validNumber(body.coverage) ||
    !validNumber(body.deficit) || !validNumber(body.matches)
  ) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  await ensureResultsTable();
  const { rows } = await pool.query(`
    INSERT INTO results (player_name, time_ms, attempts, status, selected_edges, total_cost, coverage, deficit, matches)
    VALUES ($1, $2, 3, 'completed', $3::jsonb, $4, $5, $6, $7)
    RETURNING *
  `, [body.playerName.trim().slice(0, 80), Math.max(0, Math.round(body.timeMs)), JSON.stringify(selected),
    Math.max(0, Math.round(body.totalCost)), Math.max(0, Math.round(body.coverage)),
    Math.max(0, Math.round(body.deficit)), Math.max(0, Math.min(3, Math.round(body.matches)))]);
  return NextResponse.json(rows[0], { status: 201 });
}
