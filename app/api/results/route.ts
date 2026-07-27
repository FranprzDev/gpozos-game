import Database from "better-sqlite3";
import path from "node:path";
import { NextResponse } from "next/server";

const db = new Database(path.join(process.cwd(), "gpozos.sqlite"));
const validEdgeIds = new Set(["45-paraiso", "45-paraiso2", "45-wenceslao", "138-paraiso", "138-paraiso2", "138-sanlorenzo", "138-wenceslao", "138-bosque", "122-lapila", "122-malvinas", "122-viviendas", "41-carmen", "41-delfin", "41-bosque", "41-mariano", "41-sanlorenzo"]);
const columns = db.prepare("PRAGMA table_info(results)").all() as { name: string }[];
if (!columns.length) db.exec("CREATE TABLE results (id INTEGER PRIMARY KEY AUTOINCREMENT, player_name TEXT NOT NULL, time_ms INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 3, status TEXT NOT NULL, edge_id TEXT, created_at TEXT NOT NULL, selected_edges TEXT, total_cost INTEGER DEFAULT 0, coverage INTEGER DEFAULT 0, deficit INTEGER DEFAULT 0, matches INTEGER DEFAULT 0)");
else {
  const additions = ["selected_edges TEXT", "total_cost INTEGER DEFAULT 0", "coverage INTEGER DEFAULT 0", "deficit INTEGER DEFAULT 0", "matches INTEGER DEFAULT 0"];
  for (const definition of additions) { const name = definition.split(" ")[0]; if (!columns.some(column => column.name === name)) db.exec(`ALTER TABLE results ADD COLUMN ${definition}`); }
}

export function GET() {
  return NextResponse.json(db.prepare("SELECT id, player_name, time_ms, attempts, status, created_at, selected_edges, total_cost, coverage, deficit, matches FROM results WHERE status = 'completed' ORDER BY matches DESC, coverage DESC, deficit ASC, time_ms ASC").all());
}

export async function POST(request: Request) {
  const body = await request.json();
  const selected = Array.isArray(body.selectedEdges) ? body.selectedEdges.filter((id: unknown) => typeof id === "string") : [];
  if (typeof body.playerName !== "string" || !body.playerName.trim() || body.status !== "completed" || selected.length !== 3 || new Set(selected).size !== 3 || selected.some(id => !validEdgeIds.has(id)) || !Number.isFinite(body.timeMs) || !Number.isFinite(body.totalCost) || !Number.isFinite(body.coverage) || !Number.isFinite(body.deficit) || !Number.isFinite(body.matches)) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  const info = db.prepare("INSERT INTO results (player_name,time_ms,attempts,status,created_at,selected_edges,total_cost,coverage,deficit,matches) VALUES (?,?,?,?,?,?,?,?,?,?)").run(body.playerName.trim().slice(0, 80), Math.max(0, Math.round(body.timeMs)), 3, "completed", new Date().toISOString(), JSON.stringify(selected), Math.max(0, Math.round(body.totalCost)), Math.max(0, Math.round(body.coverage)), Math.max(0, Math.round(body.deficit)), Math.max(0, Math.min(3, Math.round(body.matches))));
  return NextResponse.json(db.prepare("SELECT * FROM results WHERE id = ?").get(info.lastInsertRowid), { status: 201 });
}
