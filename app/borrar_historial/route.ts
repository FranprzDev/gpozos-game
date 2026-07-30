import { NextResponse } from "next/server";
import { ensureResultsTable, pool } from "@/lib/db";

// Endpoint de pruebas: GET /borrar_historial?password=1234 elimina todas las partidas.
export async function GET(request: Request) {
  const password = new URL(request.url).searchParams.get("password");
  if (password !== "1234") {
    return NextResponse.json({ error: "Contraseña inválida" }, { status: 401 });
  }

  await ensureResultsTable();
  const result = await pool.query("DELETE FROM results");
  return NextResponse.json({ ok: true, deleted: result.rowCount ?? 0 });
}
