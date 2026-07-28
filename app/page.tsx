"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GIFEncoder, applyPalette, quantize } from "gifenc";
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
  lane?: number;
};
const nodes: Node[] = [
  { id: "p45", label: "Pozo 45", kind: "well", x: 10, y: 14 },
  { id: "p138", label: "Pozo 138", kind: "well", x: 110, y: 14 },
  { id: "p122", label: "Pozo 122", kind: "well", x: 110, y: 88 },
  { id: "p41", label: "Pozo 41", kind: "well", x: 210, y: 14 },
  {
    id: "paraiso",
    label: "El Paraíso",
    kind: "neighborhood",
    x: 30,
    y: 28,
    demand: 2174,
  },
  {
    id: "paraiso2",
    label: "Paraíso II",
    kind: "neighborhood",
    x: 80,
    y: 38,
    demand: 484,
  },
  {
    id: "wenceslao",
    label: "Wenceslao Posse",
    kind: "neighborhood",
    x: 45,
    y: 56,
    demand: 1344,
  },
  {
    id: "delfin",
    label: "Delfín Gallo",
    kind: "neighborhood",
    x: 175,
    y: 10,
    demand: 1083,
  },
  {
    id: "sanlorenzo",
    label: "San Lorenzo",
    kind: "neighborhood",
    x: 150,
    y: 30,
    demand: 1119,
  },
  {
    id: "carmen",
    label: "Ntra. Sra. del Carmen",
    kind: "neighborhood",
    x: 194,
    y: 48,
    demand: 311,
  },
  {
    id: "malvinas",
    label: "Malvinas",
    kind: "neighborhood",
    x: 178,
    y: 72,
    demand: 554,
  },
  {
    id: "mariano",
    label: "Mariano Moreno",
    kind: "neighborhood",
    x: 165,
    y: 50,
    demand: 1287,
  },
  {
    id: "bosque",
    label: "El Bosque",
    kind: "neighborhood",
    x: 150,
    y: 46,
    demand: 476,
  },
  {
    id: "lapila",
    label: "La Pila",
    kind: "neighborhood",
    x: 110,
    y: 70,
    demand: 1185,
  },
  {
    id: "viviendas",
    label: "79 Viviendas",
    kind: "neighborhood",
    x: 70,
    y: 72,
    demand: 436,
  },
];
const edges: Edge[] = [
  ["45-paraiso", "p45", "paraiso", 49424800, 90, 2174, 0, 18, true, -2],
  ["45-paraiso2", "p45", "paraiso2", 28000000, 70, 484, 0, 15, false, -1],
  ["45-wenceslao", "p45", "wenceslao", 35000000, 85, 1344, 0, 20, false, 1],
  ["138-paraiso", "p138", "paraiso", 31000000, 88, 2174, 0, 19, false, -2],
  ["138-paraiso2", "p138", "paraiso2", 30000000, 75, 484, 0, 18, false, -1],
  ["138-sanlorenzo", "p138", "sanlorenzo", 31616000, 80, 1119, 0, 17, true, 1],
  ["138-wenceslao", "p138", "wenceslao", 33000000, 82, 1344, 0, 19, false, 2],
  ["138-bosque", "p138", "bosque", 42000000, 75, 476, 0, 22, false, 3],
  ["122-lapila", "p122", "lapila", 30000000, 90, 1185, 0, 16, false, -3],
  ["122-malvinas", "p122", "malvinas", 36000000, 85, 554, 0, 20, false, -1],
  ["122-viviendas", "p122", "viviendas", 39000000, 70, 436, 0, 22, false, 1],
  ["41-carmen", "p41", "carmen", 24000000, 110, 311, 0, 13, false, -2],
  ["41-delfin", "p41", "delfin", 27000000, 95, 1083, 0, 15, false, 0],
  ["41-bosque", "p41", "bosque", 60582400, 90, 476, 0, 14, true, 3],
  ["41-mariano", "p41", "mariano", 34000000, 85, 1287, 0, 18, false, 2],
  ["41-sanlorenzo", "p41", "sanlorenzo", 38000000, 80, 1119, 0, 20, false, 1],
].map(([id, from, to, cost, capacity, coverage, deficit, time, optimal, lane]) => ({
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
  lane: Number(lane) || 0,
})) as Edge[];
const edgePath = (a: Node, b: Node, lane = 0) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const bend = lane * 2.2;
  return `M ${a.x} ${a.y} Q ${mx - (dy / length) * bend} ${my + (dx / length) * bend} ${b.x} ${b.y}`;
};
const fmtMoney = (n: number) => `$${Math.round(n / 1000000)}M`;
export default function Home() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [candidate, setCandidate] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showResultChoice, setShowResultChoice] = useState(false);
  const [replay, setReplay] = useState(0);
  const [flowingEdge, setFlowingEdge] = useState<string | null>(null);
  const scope = useRef<HTMLElement>(null);
  const startRef = useRef(0);
  const chosen = useMemo(
    () => selected.map((id) => edges.find((e) => e.id === id)!),
    [selected],
  );
  const total = chosen.reduce((n, e) => n + e.cost, 0);
  const coverage = chosen.reduce((n, e) => n + e.coverage, 0);
  const matches = chosen.filter((e) => e.optimal).length;
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
    { scope, dependencies: [saved, replay] },
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
    setFlowingEdge(current.id);
    window.setTimeout(() => setFlowingEdge(null), 1800);
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
      setShowResultChoice(true);
    }
  };
  const downloadSolution = () => {
    const selectedEdges = chosen.map((e) => {
      const a = nodes.find((n) => n.id === e.from)!;
      const b = nodes.find((n) => n.id === e.to)!;
      return `<path class="pipe" d="${edgePath(a, b, e.lane)}"/>`;
    }).join("");
    const selectedNodes = nodes.map((n) => `<g class="node"><circle cx="${n.x}" cy="${n.y}" r="${n.kind === "well" ? 4.8 : 3.8}"/><text x="${n.x}" y="${n.y + 7}">${n.label}</text></g>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100"><rect width="220" height="100" fill="#164844"/><style>.pipe{fill:none;stroke:#8de4f5;stroke-width:1.8;stroke-linecap:round;stroke-dasharray:8 5;animation:flow 1.4s linear infinite}.node circle{fill:#ffd966;stroke:#f5f4ed;stroke-width:1}.node:first-child circle,.node:nth-child(2) circle,.node:nth-child(3) circle,.node:nth-child(4) circle{fill:#8fd3f4}.node text{font:700 3px Arial;fill:#f5f4ed;text-anchor:middle}@keyframes flow{to{stroke-dashoffset:-26}}</style>${selectedEdges}${selectedNodes}</svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "mi-solucion-gpozos.svg";
    link.click();
    URL.revokeObjectURL(url);
  };
  const downloadGif = async () => {
    const width = 880;
    const height = 400;
    const scale = width / 220;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;
    const encoder = GIFEncoder();
    const selectedPaths = chosen.map((e) => {
      const a = nodes.find((n) => n.id === e.from)!;
      const b = nodes.find((n) => n.id === e.to)!;
      return new Path2D(edgePath(a, b, e.lane));
    });
    for (let frame = 0; frame < 14; frame += 1) {
      context.fillStyle = "#164844";
      context.fillRect(0, 0, width, height);
      context.save();
      context.scale(scale, scale);
      context.lineCap = "round";
      context.lineWidth = 1.3;
      context.strokeStyle = "#486f6b";
      edges.forEach((e) => {
        const a = nodes.find((n) => n.id === e.from)!;
        const b = nodes.find((n) => n.id === e.to)!;
        context.globalAlpha = selected.includes(e.id) ? 0.25 : 0.18;
        context.stroke(new Path2D(edgePath(a, b, e.lane)));
      });
      context.setLineDash([8, 5]);
      context.lineWidth = 2.2;
      context.strokeStyle = "#8de4f5";
      context.globalAlpha = 1;
      selectedPaths.forEach((path) => {
        context.lineDashOffset = -frame * 3;
        context.stroke(path);
      });
      nodes.forEach((n) => {
        context.setLineDash([]);
        context.fillStyle = n.kind === "well" ? "#8fd3f4" : "#ffd966";
        context.strokeStyle = "#f5f4ed";
        context.lineWidth = 1;
        context.beginPath();
        context.arc(n.x, n.y, n.kind === "well" ? 4.8 : 3.8, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.fillStyle = "#f5f4ed";
        context.font = "700 3px Arial";
        context.textAlign = "center";
        context.fillText(n.label, n.x, n.y + 7);
      });
      context.restore();
      const pixels = context.getImageData(0, 0, width, height).data;
      const palette = quantize(pixels, 256);
      encoder.writeFrame(applyPalette(pixels, palette), width, height, { palette, delay: 90 });
    }
    encoder.finish();
    const blob = new Blob([encoder.bytes().buffer as ArrayBuffer], { type: "image/gif" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mi-solucion-gpozos.gif";
    link.click();
    URL.revokeObjectURL(url);
  };
  if (!started)
      return (
      <main className="landing">
        <div className="intro">
          <h1>
            Planificá obras
            <br />
            <em>que lleguen más lejos.</em>
          </h1>
          <p>
            Sos gerente de planificación de la SAT. Elegí exactamente tres
            tuberías para mejorar la red de Delfín Gallo: Pozo 45, Pozo 138,
            Pozo 122 y Pozo 41.
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
          <div className="start-field"><label>Nombre del gerente<input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && begin()} placeholder="Escribí tu nombre" /></label><button aria-label="Comenzar planificación" disabled={!name.trim()} onClick={begin}>→</button></div>
          <div className="mobile-flow" aria-label="Pozo, tubería y barrio"><div className="mobile-flow-item"><i className="mobile-well"/><span>Pozo</span></div><div className="mobile-water-pipe"><b/></div><div className="mobile-flow-item"><i className="mobile-house">⌂</i><span>Barrio</span></div></div>
        </div>
        <div className="landing-art">
          <div className="sun" />
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <svg className="landing-network" viewBox="0 0 500 560" aria-hidden="true"><g className="landing-pipes"><path d="M92 105L180 220L105 365" /><path d="M250 105L180 220L315 350L250 470" /><path d="M408 105L315 350L410 445" /><path d="M92 105L315 350" /><path d="M250 105L105 365" /></g><g className="landing-nodes"><circle cx="92" cy="105" r="15"/><circle cx="250" cy="105" r="15"/><circle cx="408" cy="105" r="15"/><path className="landing-house" d="M168 220l12-12 12 12v15h-24z"/><path className="landing-house" d="M93 365l12-12 12 12v15H93z"/><path className="landing-house" d="M303 350l12-12 12 12v15h-24z"/><path className="landing-house" d="M398 445l12-12 12 12v15h-24z"/></g></svg>
          <div className="three-d-network" aria-label="Cuatro pozos conectados con barrios de Delfín Gallo"><div className="pipe-bridge bridge-a"/><div className="pipe-bridge bridge-b"/><div className="pipe-bridge bridge-c"/>{["A", "B", "C", "D"].map((house) => <div className={`pipe-bridge house-pipe pipe-house-${house}`} key={`pipe-${house}`} />)}{["45", "138", "122", "41"].map((well) => <div className={`mini-well well-${well}`} key={well}><div className="mini-cap"><i/><i/><i/></div><div className="mini-body"><b>POZO {well}</b><span/></div><div className="mini-shadow"/></div>)}{["A", "B", "C", "D"].map((house) => <div className={`hero-house house-${house}`} key={house}><span>⌂</span></div>)}<span className="network-tag">RED ACTUAL · DELFÍN GALLO</span></div>
          <div className="art-label label-top">RED DE POZOS<br /><b>DELFÍN GALLO</b></div>
        </div>
      </main>
    );
  return (
    <main ref={scope} className="game-shell">
      <header className="reveal">
        <div className="brand">
          ⌁ GPozos
        </div>
        <nav>
          <a href="/ranking">Ranking ↗</a>
        </nav>
        <div className="player">
          GERENTE<strong>{name}</strong>
        </div>
      </header>
      <section className="game-grid">
        <div className="board reveal">
          <div className="board-title"><span>ELEGÍ 3 OBRAS PARA MEJORAR LA RED</span><small>Hacé clic en una tubería para ver su impacto y confirmá la inversión.</small></div>
          <svg
            className="network"
            viewBox="0 0 220 100"
            aria-label="Mapa de tuberías de la red"
          >
            <defs>
              <marker id="water-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#8ca8a2" />
              </marker>
            </defs>
            {edges.map((e) => {
              const a = nodes.find((n) => n.id === e.from)!;
              const b = nodes.find((n) => n.id === e.to)!;
              const locked = selected.includes(e.id);
              return (
                <g key={e.id} className={`pipe-hit-area ${flowingEdge ? "disabled" : ""}`} onClick={() => !locked && !flowingEdge && selected.length < 3 && setCandidate(e.id)}>
                  <path className="pipe-hit-target" d={edgePath(a, b, e.lane)} />
                  <path className={`pipe ${locked ? "locked" : ""} ${flowingEdge === e.id ? "flowing" : ""} ${candidate === e.id ? "active" : ""}`} d={edgePath(a, b, e.lane)} />
                </g>
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} className={`map-node ${n.kind}`}>
                {n.kind === "well" ? <circle cx={n.x} cy={n.y} r={3.7} /> : <path className="house-marker" d={`M ${n.x - 3.8} ${n.y + 1} L ${n.x} ${n.y - 3} L ${n.x + 3.8} ${n.y + 1} V ${n.y + 4} H ${n.x - 3.8} Z`} />}
                <text x={n.x} y={n.y + (n.kind === "well" ? -6 : 7)}>
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>
      {flowingEdge && !saved && (
        <div className="upgrade-banner" role="status">
          <span className="water-drop">💧</span>
          <div><strong>MEJORA EN EJECUCIÓN</strong><small>El agua ya está fluyendo hacia el sector beneficiado…</small></div>
          <i><b /><b /><b /></i>
        </div>
      )}
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
      {showResultChoice && (
        <div className="modal-backdrop result-choice-backdrop">
          <div className="confirm-modal result-choice-modal">
            <span className="eyebrow">OBRAS COMPLETADAS</span>
            <h2>¿Qué querés ver?</h2>
            <p>Tu solución ya está lista. Podés descargarla o comparar tu configuración con el modelo PL.</p>
            <button className="confirm" onClick={downloadGif}>Descargar mi solución (.gif)</button>
            <button className="choice-secondary" onClick={downloadSolution}>Descargar versión nítida (.svg)</button>
            <button className="choice-secondary" onClick={() => setShowResultChoice(false)}>Ver solución correcta</button>
          </div>
        </div>
      )}
      {saved && (
        <section className="result-stage">
          <div className="result-heading"><span className="eyebrow">REVELACIÓN DEL MODELO PL</span><h2>El modelo encontró esta combinación.</h2><p>Priorizó las obras que maximizan la cobertura y reducen el déficit dentro del presupuesto disponible.</p></div>
          <svg className="network result-network" viewBox="0 0 220 100" aria-label="Comparación entre tu plan y la solución ideal">
            {edges.map(e => { const a = nodes.find(n => n.id === e.from)!; const b = nodes.find(n => n.id === e.to)!; return <path key={e.id} className={`pipe ${selected.includes(e.id) ? "locked player-choice" : ""}`} d={edgePath(a, b, e.lane)} />; })}
            {edges.filter(e => e.optimal).map(e => { const a = nodes.find(n => n.id === e.from)!; const b = nodes.find(n => n.id === e.to)!; return <path key={`ideal-${e.id}`} className="ideal-line" d={edgePath(a, b, e.lane)} />; })}
            {nodes.map(n => <g key={n.id} className={`map-node ${n.kind}`}>{n.kind === "well" ? <circle cx={n.x} cy={n.y} r={3.7} /> : <path className="house-marker" d={`M ${n.x - 3.8} ${n.y + 1} L ${n.x} ${n.y - 3} L ${n.x + 3.8} ${n.y + 1} V ${n.y + 4} H ${n.x - 3.8} Z`} />}<text x={n.x} y={n.y + (n.kind === "well" ? -6 : 7)}>{n.label}</text></g>)}
          </svg>
          <div className="result-bottom"><div className="ideal-plan"><span>Tu configuración</span>{selected.map(id => { const e = edges.find(edge => edge.id === id)!; return <div className="player-reveal" key={`player-${id}`}>{nodes.find(n => n.id === e.from)!.label} <b>→</b> {nodes.find(n => n.id === e.to)!.label}</div>; })}<span className="model-label">Configuración óptima del modelo PL</span><div className="ideal-reveal">Pozo 45 <b>→</b> El Paraíso</div><div className="ideal-reveal">Pozo 138 <b>→</b> San Lorenzo</div><div className="ideal-reveal">Pozo 41 <b>→</b> El Bosque</div></div><div className="result-actions"><strong>{matches} / 3 coincidencias</strong><button className="replay-button" onClick={() => setReplay(value => value + 1)}>↻ Reproducir animación</button><a className="confirm final-link" href="/ranking">Ver ranking →</a><button className="cancel" onClick={() => location.reload()}>Jugar de nuevo</button></div></div>
        </section>
      )}
    </main>
  );
}
