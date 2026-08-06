"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { GAME_QUADRANTS } from "@/data/data";

// Scattered initial positions → final quadrant targets
const SIGNAL_DOTS = [
  { id: "s1", ix: 65, iy: 35, qx: 1, qy: 1 }, // derivable
  { id: "s2", ix: 20, iy: 75, qx: 0, qy: 0 }, // ruido
  { id: "s3", ix: 80, iy: 65, qx: 1, qy: 0 }, // dormido
  { id: "s4", ix: 40, iy: 20, qx: 0, qy: 1 }, // deseo
  { id: "s5", ix: 55, iy: 82, qx: 1, qy: 1 }, // derivable
  { id: "s6", ix: 30, iy: 50, qx: 0, qy: 0 }, // ruido
  { id: "s7", ix: 72, iy: 28, qx: 1, qy: 1 }, // derivable
  { id: "s8", ix: 15, iy: 40, qx: 0, qy: 1 }, // deseo
];

// Quadrant to center pixel within 200x200 grid
function qCenter(qx: number, qy: number) {
  return { x: qx === 0 ? 50 : 150, y: qy === 0 ? 50 : 150 };
}

export default function SignalGameMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  // Trigger dot migration after initial reveal
  const shouldAnimate = inView && !reduce;

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="font-label text-[11px] tracking-[0.22em] uppercase mb-6"
          style={{ color: "rgba(26,26,26,0.35)" }}
        >
          03 — Modelo
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
              className="font-display font-light leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
            >
              Ordenar señales,
              <br />
              no crear{" "}
              <em className="not-italic" style={{ color: "#1A6B4A" }}>compradores.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
              className="font-sans leading-relaxed mb-12"
              style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)", maxWidth: 480 }}
            >
              "Un lead sin diagnóstico es como una oferta de empleo sin CV."
              Deriva no crea compradores mágicamente. Los diagnostica y prioriza.
            </motion.p>

            {/* Matrix */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.35 }}
            >
              <MatrixSVG
                hovered={hovered}
                setHovered={setHovered}
                shouldAnimate={shouldAnimate}
              />
            </motion.div>

            {/* Trigger animation button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.8 }}
              onClick={() => setAnimated(!animated)}
              className="mt-6 font-label text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
              style={{
                color: "rgba(26,26,26,0.45)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                textDecorationColor: "rgba(216,208,195,0.8)",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {animated ? "Ver leads dispersos" : "Aplicar diagnóstico →"}
            </motion.button>
          </div>

          {/* Legend */}
          <div className="lg:pt-16">
            <p
              className="font-label text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(26,26,26,0.35)" }}
            >
              Cuadrantes
            </p>
            <div className="space-y-5">
              {GAME_QUADRANTS.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: reduce ? 0 : 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-4 cursor-default"
                  onMouseEnter={() => setHovered(q.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ opacity: hovered && hovered !== q.id ? 0.3 : 1, transition: "opacity 0.2s" }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: q.color,
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <p className="font-label text-[11px] tracking-[0.06em] uppercase mb-1" style={{ color: "#1A1A1A" }}>
                      {q.label}
                    </p>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.55)" }}>
                      {q.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Axis labels */}
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(216,208,195,0.4)" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] uppercase" style={{ color: "rgba(26,26,26,0.3)" }}>Eje X</p>
                  <p className="font-sans text-sm mt-1" style={{ color: "rgba(26,26,26,0.5)" }}>Capacidad de compra</p>
                </div>
                <div>
                  <p className="font-label text-[9px] tracking-[0.15em] uppercase" style={{ color: "rgba(26,26,26,0.3)" }}>Eje Y</p>
                  <p className="font-sans text-sm mt-1" style={{ color: "rgba(26,26,26,0.5)" }}>Intención activa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixSVG({
  hovered,
  setHovered,
  shouldAnimate,
}: {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  shouldAnimate: boolean;
}) {
  // 200x200 grid
  const size = 200;
  const half = size / 2;

  const qColors: Record<string, string> = {
    ruido: "#C86B4A",
    dormido: "#C8A84B",
    deseo: "#D8D0C3",
    derivable: "#1A6B4A",
  };

  // Map quadrant position to correct quadrant id
  const dotTargetId = (qx: number, qy: number) => {
    if (qx === 1 && qy === 1) return "derivable";
    if (qx === 0 && qy === 0) return "ruido";
    if (qx === 1 && qy === 0) return "dormido";
    return "deseo";
  };

  return (
    <svg
      viewBox={`-20 -20 ${size + 40} ${size + 40}`}
      width="100%"
      style={{ maxWidth: 380 }}
      aria-label="Matriz de señales 2x2"
    >
      {/* Quadrant fills */}
      {GAME_QUADRANTS.map((q) => {
        const rx = q.qx * half;
        const ry = q.qy * half;
        const isHovered = hovered === q.id;
        return (
          <rect
            key={q.id}
            x={rx}
            y={ry}
            width={half}
            height={half}
            fill={isHovered ? q.color : "transparent"}
            fillOpacity={isHovered ? 0.12 : 0}
            stroke="#D8D0C3"
            strokeWidth={0.5}
            style={{ cursor: "default", transition: "fill-opacity 0.2s" }}
            onMouseEnter={() => setHovered(q.id)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

      {/* Axis lines */}
      <line x1={half} y1={0} x2={half} y2={size} stroke="#D8D0C3" strokeWidth={1} />
      <line x1={0} y1={half} x2={size} y2={half} stroke="#D8D0C3" strokeWidth={1} />

      {/* Quadrant labels */}
      {GAME_QUADRANTS.map((q) => {
        const lx = q.qx * half + half / 2;
        const ly = q.qy * half + half / 2;
        return (
          <text
            key={`lbl-${q.id}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-space-grotesk),system-ui"
            fontSize={7}
            fill={q.color}
            opacity={hovered === q.id ? 1 : 0.55}
            letterSpacing="0.05em"
          >
            {q.label}
          </text>
        );
      })}

      {/* Signal dots */}
      {SIGNAL_DOTS.map((dot) => {
        const tid = dotTargetId(dot.qx, dot.qy);
        const target = qCenter(dot.qx, dot.qy);
        const isDerivedTarget = tid === "derivable";

        return (
          <motion.circle
            key={dot.id}
            r={isDerivedTarget ? 5 : 4}
            fill={qColors[tid]}
            initial={{ cx: dot.ix * 2, cy: dot.iy * 2 }}
            animate={
              shouldAnimate
                ? { cx: target.x, cy: target.y }
                : { cx: dot.ix * 2, cy: dot.iy * 2 }
            }
            transition={{
              duration: 0.9,
              delay: shouldAnimate ? 0.5 + SIGNAL_DOTS.indexOf(dot) * 0.08 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            opacity={0.85}
          />
        );
      })}

      {/* Axis labels */}
      <text x={half} y={size + 16} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={7} fill="rgba(26,26,26,0.3)" letterSpacing="0.08em">CAPACIDAD</text>
      <text x={-16} y={half} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={7} fill="rgba(26,26,26,0.3)" letterSpacing="0.08em" transform={`rotate(-90, -16, ${half})`}>INTENCIÓN</text>
    </svg>
  );
}
