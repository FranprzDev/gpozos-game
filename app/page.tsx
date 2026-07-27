"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";

type Node = {
  id: string;
  label: string;
  kind: "well" | "neighborhood";
  x: number;
  y: number;
  demand?: number;
};
type Edge = {
  id: string;
  from: string;
  to: string;
  cost: number;
  capacity: number;
  coverage: number;
  deficit: number;
  time: number;
  optimal?: boolean;
  simulated?: boolean;
};
const nodes: Node[] = [
  { id: "p45", label: "Pozo 45", kind: "well", x: 15, y: 12 },
  { id: "p138", label: "Pozo 138", kind: "well", x: 50, y: 12 },
  { id: "p122", label: "Pozo 122", kind: "well", x: 85, y: 12 },
  { id: "p41", label: "Pozo 41", kind: "well", x: 50, y: 88 },
  {
    id: "paraiso",
    label: "El Paraíso",
    kind: "neighborhood",
    x: 12,
    y: 40,
    demand: 2174,
  },
  {
    id: "paraiso2",
    label: "Paraíso II",
    kind: "neighborhood",
    x: 25,
    y: 58,
    demand: 484,
  },
  {
    id: "wenceslao",
    label: "Wenceslao Posse",
    kind: "neighborhood",
    x: 38,
    y: 40,
    demand: 1344,
  },
  {
    id: "delfin",
    label: "Delfín Gallo",
    kind: "neighborhood",
    x: 50,
    y: 32,
    demand: 1083,
  },
  {
    id: "sanlorenzo",
    label: "San Lorenzo",
    kind: "neighborhood",
    x: 64,
    y: 40,
    demand: 1119,
  },
  {
    id: "carmen",
    label: "Ntra. Sra. del Carmen",
    kind: "neighborhood",
    x: 78,
    y: 32,
    demand: 311,
  },
  {
    id: "malvinas",
    label: "Malvinas",
    kind: "neighborhood",
    x: 90,
    y: 40,
    demand: 554,
  },
  {
    id: "mariano",
    label: "Mariano Moreno",
    kind: "neighborhood",
    x: 76,
    y: 62,
    demand: 1287,
  },
  {
    id: "bosque",
    label: "El Bosque",
    kind: "neighborhood",
    x: 90,
    y: 78,
    demand: 476,
  },
  {
    id: "lapila",
    label: "La Pila",
    kind: "neighborhood",
    x: 22,
    y: 78,
    demand: 1185,
  },
  {
    id: "viviendas",
    label: "79 Viviendas",
    kind: "neighborhood",
    x: 50,
    y: 68,
    demand: 436,
  },
];
const edges: Edge[] = [
  ["45-paraiso", "p45", "paraiso", 49424800, 90, 2174, 0, 18, true],
  ["45-paraiso2", "p45", "paraiso2", 28000000, 70, 484, 0, 15],
  ["45-wenceslao", "p45", "wenceslao", 35000000, 85, 1344, 0, 20],
  ["138-paraiso", "p138", "paraiso", 31000000, 88, 2174, 0, 19],
  ["138-paraiso2", "p138", "paraiso2", 30000000, 75, 484, 0, 18],
  ["138-sanlorenzo", "p138", "sanlorenzo", 31616000, 80, 1119, 0, 17, true],
  ["138-wenceslao", "p138", "wenceslao", 33000000, 82, 1344, 0, 19],
  ["138-bosque", "p138", "bosque", 42000000, 75, 476, 0, 22],
  ["122-lapila", "p122", "lapila", 30000000, 90, 1185, 0, 16],
  ["122-malvinas", "p122", "malvinas", 36000000, 85, 554, 0, 20],
  ["122-viviendas", "p122", "viviendas", 39000000, 70, 436, 0, 22],
  ["41-carmen", "p41", "carmen", 24000000, 110, 311, 0, 13],
  ["41-delfin", "p41", "delfin", 27000000, 95, 1083, 0, 15],
  ["41-bosque", "p41", "bosque", 60582400, 90, 476, 0, 14, true],
  ["41-mariano", "p41", "mariano", 34000000, 85, 1287, 0, 18],
  ["41-sanlorenzo", "p41", "sanlorenzo", 38000000, 80, 1119, 0, 20],
].map(([id, from, to, cost, capacity, coverage, deficit, time, optimal]) => ({
  id,
  from,
  to,
  cost,
  capacity,
  coverage,
  deficit,
  time,
  optimal: Boolean(optimal),
  simulated: !optimal,
})) as Edge[];
const budget = 175000000;
const fmtMoney = (n: number) => `$${Math.round(n / 1000000)}M`;
const fmt = (ms: number) =>
  `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;
export default function Home() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [candidate, setCandidate] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const scope = useRef<HTMLElement>(null);
  const startRef = useRef(0);
  const chosen = useMemo(
    () => selected.map((id) => edges.find((e) => e.id === id)!),
    [selected],
  );
  const total = chosen.reduce((n, e) => n + e.cost, 0);
  const coverage = chosen.reduce((n, e) => n + e.coverage, 0);
  const matches = chosen.filter((e) => e.optimal).length;
  const deficit = Math.max(0, 5000 - coverage);
  const current = candidate ? edges.find((e) => e.id === candidate) : null;
  useGSAP(
    () => {
      if (!started || !scope.current) return;
      const reveals = scope.current.querySelectorAll(".reveal");
      const pipes = scope.current.querySelectorAll(".pipe");
      const timeline = gsap.timeline();
      if (reveals.length)
        timeline.fromTo(
          reveals,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.04 },
        );
      if (pipes.length)
        timeline.fromTo(
          pipes,
          { strokeDashoffset: 260 },
          { strokeDashoffset: 0, duration: 1.2, stagger: 0.04 },
          "<.15",
        );
    },
    { scope, dependencies: [started] },
  );
  useGSAP(
    () => {
      if (!started || selected.length >= 3) return;
      const id = setInterval(
        () => setElapsed(Date.now() - startRef.current),
        1000,
      );
      return () => clearInterval(id);
    },
    { scope, dependencies: [started, selected.length] },
  );
  useGSAP(
    () => {
      if (!saved || !scope.current) return;
      const ideal = scope.current.querySelectorAll(".ideal-reveal");
      const idealLines = scope.current.querySelectorAll(".ideal-line");
      if (!ideal.length && !idealLines.length) return;
      const timeline = gsap.timeline();
      if (idealLines.length) timeline.fromTo(idealLines, { strokeDashoffset: 260, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 1.6, stagger: .35, ease: "power2.inOut" });
      if (!ideal.length) return;
      timeline.fromTo(
        ideal,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "back.out(1.5)",
        },
      );
    },
    { scope, dependencies: [saved] },
  );
  const begin = () => {
    if (name.trim()) {
      startRef.current = Date.now();
      setStarted(true);
    }
  };
  const confirm = async () => {
    if (!current) return;
    const next = [...selected, current.id];
    setSelected(next);
    setCandidate(null);
    if (next.length === 3) {
      const timeMs = elapsed;
      setElapsed(timeMs);
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: name,
          timeMs,
          selectedEdges: next,
          totalCost: total + current.cost,
          coverage: coverage + current.coverage,
          deficit: Math.max(0, 5000 - coverage - current.coverage),
          matches: next.filter((id) => edges.find((e) => e.id === id)?.optimal)
            .length,
          status: "completed",
        }),
      });
      setSaved(true);
    }
  };
  if (!started)
    return (
      <main className="landing">
        <div className="intro">
          <span className="eyebrow">SAT · DESAFÍO DE PLANIFICACIÓN</span>
          <h1>
            Planificá obras
            <br />
            <em>que lleguen más lejos.</em>
          </h1>
          <p>
            Sos gerente de planificación de la SAT. Elegí exactamente tres
            tuberías para mejorar la red de Pozo 45, Pozo 138, Pozo 122 y Pozo
            41.
          </p>
          <div className="intro-facts">
            <span>
              <b>3</b> obras
            </span>
            <span>
              <b>$175M</b> presupuesto
            </span>
            <span>
              <b>11</b> barrios
            </span>
          </div>
          <label>
            Nombre del gerente
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && begin()}
              placeholder="Escribí tu nombre"
            />
          </label>
          <button disabled={!name.trim()} onClick={begin}>
            Comenzar planificación →
          </button>
        </div>
        <div className="landing-art">
          <div className="sun" />
          <div className="art-card">
            <strong>PL</strong>
            <span>
              Encontrá la
              <br />
              mejor combinación
            </span>
          </div>
        </div>
      </main>
    );
  return (
    <main ref={scope} className="game-shell">
      <header className="reveal">
        <div className="brand">
          ⌁ GPozos <b>·</b> SAT
        </div>
        <nav>
          <a href="/ranking">Ranking ↗</a>
        </nav>
        <div className="player">
          GERENTE<strong>{name}</strong>
        </div>
        <div className="timer">
          TIEMPO<strong>{fmt(elapsed)}</strong>
        </div>
      </header>
      <section className="progress reveal">
        <span>PLANIFICACIÓN</span>
        <b>Obra {Math.min(selected.length + 1, 3)} de 3</b>
        <div>
          <i style={{ width: `${(selected.length / 3) * 100}%` }} />
        </div>
      </section>
      <section className="game-grid">
        <div className="board reveal">
          <div className="board-title">
            RED DE DISTRIBUCIÓN{" "}
            <small>
              {selected.length === 3
                ? "Plan completado"
                : "Seleccioná una tubería disponible"}
            </small>
          </div>
          <svg
            className="network"
            viewBox="0 0 100 100"
            aria-label="Mapa de tuberías de la red"
          >
            {edges.map((e) => {
              const a = nodes.find((n) => n.id === e.from)!;
              const b = nodes.find((n) => n.id === e.to)!;
              const locked = selected.includes(e.id);
              return (
                <line
                  key={e.id}
                  className={`pipe ${locked ? "locked" : ""} ${candidate === e.id ? "active" : ""}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  onClick={() =>
                    !locked && selected.length < 3 && setCandidate(e.id)
                  }
                />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} className={`map-node ${n.kind}`}>
                <circle cx={n.x} cy={n.y} r={n.kind === "well" ? 3.7 : 3} />
                <text x={n.x} y={n.y + (n.kind === "well" ? -6 : 7)}>
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
          <div className="legend">
            <span>● Pozos</span>
            <span>● Barrios</span>
            <span>━ Disponible</span>
            <span>━ Ejecutada</span>
          </div>
        </div>
        <aside>
          <div className="status reveal">
            <span className="eyebrow">PRESUPUESTO</span>
            <strong>{fmtMoney(budget - total)}</strong>
            <small>disponible de $175M</small>
          </div>
          <div className="rounds reveal">
            {[0, 1, 2].map((i) => (
              <div
                className={
                  selected[i] ? "done" : i === selected.length ? "now" : ""
                }
                key={i}
              >
                <b>{selected[i] ? "✓" : i + 1}</b>
                <span>
                  {selected[i]
                    ? edges
                        .find((e) => e.id === selected[i])!
                        .id.replaceAll("-", " → ")
                    : i === selected.length
                      ? "Elegí una obra"
                      : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
          <div className="metrics reveal">
            <div>
              <span>COBERTURA ESTIMADA</span>
              <b>{coverage.toLocaleString("es-AR")} hab.</b>
            </div>
            <div>
              <span>COINCIDENCIAS PL</span>
              <b>{matches} / 3</b>
            </div>
            <div>
              <span>DÉFICIT ESTIMADO</span>
              <b>{deficit.toLocaleString("es-AR")} hab.</b>
            </div>
          </div>
          <a className="text-link" href="/ranking">
            Ver ranking de gerentes →
          </a>
        </aside>
      </section>
      {current && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <span className="eyebrow">
              OBRA {selected.length + 1} DE 3 ·{" "}
              {current.simulated ? "COSTO SIMULADO" : "COSTO DOCUMENTADO"}
            </span>
            <h2>
              {nodes.find((n) => n.id === current.from)!.label} →{" "}
              {nodes.find((n) => n.id === current.to)!.label}
            </h2>
            <p>Esta decisión es definitiva y la tubería quedará bloqueada.</p>
            <div className="investment-data">
              <span>
                Costo<strong>{fmtMoney(current.cost)}</strong>
              </span>
              <span>
                Beneficia
                <strong>{current.coverage.toLocaleString("es-AR")} hab.</strong>
              </span>
              <span>
                Capacidad<strong>{current.capacity} L/s</strong>
              </span>
            </div>
            <button className="confirm" onClick={confirm}>
              Ejecutar obra →
            </button>
            <button className="cancel" onClick={() => setCandidate(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {saved && (
        <section className="result-stage">
          <div className="result-heading"><span className="eyebrow">REVELACIÓN DEL MODELO PL</span><h2>Ahora comparemos tu plan con el ideal.</h2><p>Primero aparece tu recorrido. Después, las tres obras que encontró el modelo.</p></div>
          <svg className="result-network" viewBox="0 0 100 100" aria-label="Comparación entre tu plan y la solución ideal">
            {edges.map(e => { const a = nodes.find(n => n.id === e.from)!; const b = nodes.find(n => n.id === e.to)!; return <line key={e.id} className={`result-line ${selected.includes(e.id) ? "player-line" : "ghost-line"}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />; })}
            {edges.filter(e => e.optimal).map(e => { const a = nodes.find(n => n.id === e.from)!; const b = nodes.find(n => n.id === e.to)!; return <line key={`ideal-${e.id}`} className="ideal-line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />; })}
            {nodes.map(n => <g key={n.id} className={`result-node ${n.kind}`}><circle cx={n.x} cy={n.y} r={n.kind === "well" ? 3.7 : 3} /><text x={n.x} y={n.y + (n.kind === "well" ? -6 : 7)}>{n.label}</text></g>)}
          </svg>
          <div className="result-bottom"><div className="ideal-plan"><span className="eyebrow">LA COMBINACIÓN IDEAL</span><div className="ideal-reveal">Pozo 45 <b>→</b> El Paraíso</div><div className="ideal-reveal">Pozo 138 <b>→</b> San Lorenzo</div><div className="ideal-reveal">Pozo 41 <b>→</b> El Bosque</div></div><div className="result-actions"><strong>{matches} / 3 coincidencias</strong><a className="confirm final-link" href="/ranking">Ver ranking →</a><button className="cancel" onClick={() => location.reload()}>Jugar de nuevo</button></div></div>
        </section>
      )}
    </main>
  );
}
