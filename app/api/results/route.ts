import Database from "better-sqlite3";
import path from "node:path";
import { NextResponse } from "next/server";

const db = new Database(path.join(process.cwd(), "gpozos.sqlite"));
db.exec(`CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, player_name TEXT NOT NULL, time_ms INTEGER NOT NULL, attempts INTEGER NOT NULL, status TEXT NOT NULL CHECK(status IN ('completed','surrendered')), edge_id TEXT, created_at TEXT NOT NULL)`);

export function GET() { return NextResponse.json(db.prepare("SELECT * FROM results ORDER BY time_ms ASC, attempts ASC").all()); }
export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.playerName !== "string" || !body.playerName.trim() || !["completed", "surrendered"].includes(body.status) || !Number.isFinite(body.timeMs) || !Number.isFinite(body.attempts)) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  const info = db.prepare("INSERT INTO results (player_name,time_ms,attempts,status,edge_id,created_at) VALUES (?,?,?,?,?,?)").run(body.playerName.trim().slice(0, 80), Math.max(0, Math.round(body.timeMs)), Math.max(0, Math.round(body.attempts)), body.status, body.edgeId ?? null, new Date().toISOString());
  return NextResponse.json(db.prepare("SELECT * FROM results WHERE id = ?").get(info.lastInsertRowid), { status: 201 });
}
