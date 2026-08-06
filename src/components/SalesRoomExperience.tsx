"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";

type RoomMode = "sin" | "con";

const DESKS = [
  { id: "e1", x: 390, y: 195, label: "E1" },
  { id: "e2", x: 470, y: 195, label: "E2" },
  { id: "e3", x: 390, y: 280, label: "E3" },
  { id: "e4", x: 470, y: 280, label: "E4" },
];

// Visitor dot paths: from entry (300, 440) to each desk
const VISITOR_PATHS = [
  "M 300 440 C 300 380, 350 330, 390 235",
  "M 300 440 C 300 380, 400 330, 470 235",
  "M 300 440 C 300 390, 320 330, 390 315",
];

export default function SalesRoomExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<RoomMode>("sin");
  const [capacity, setCapacity] = useState(0);

  // Animate capacity counter
  useEffect(() => {
    if (!inView) return;
    const target = mode === "sin" ? 42 : 78;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCapacity(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [inView, mode]);

  const activeDesks = mode === "sin" ? ["e1", "e2"] : ["e1", "e2", "e3", "e4"];

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5 }}
              className="font-label text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ color: "rgba(26,26,26,0.35)" }}
            >
              02 — Sistema
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
              className="font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
            >
              La sala ya está pagada.
              <br />
              No está siendo{" "}
              <em className="not-italic" style={{ color: "#C8A84B" }}>
                usada bien.
              </em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
            className="font-sans leading-relaxed lg:pb-2"
            style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)" }}
          >
            La capacidad ociosa es el activo invisible del sector.
            Ejecutivos disponibles, sala equipada, sin flujo calificado.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5, delay: 0.3 }}
          className="flex items-center gap-0 mb-12"
          style={{ width: "fit-content" }}
        >
          {(["sin", "con"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="font-label text-[11px] tracking-[0.14em] uppercase px-6 py-2.5 transition-all"
              style={{
                backgroundColor: mode === m ? "#1A1A1A" : "transparent",
                color: mode === m ? "#F5F0E6" : "rgba(26,26,26,0.4)",
                border: "1px solid",
                borderColor: mode === m ? "#1A1A1A" : "rgba(216,208,195,0.6)",
                borderRight: m === "sin" ? "none" : undefined,
              }}
            >
              {m === "sin" ? "Sin canal trazable" : "Con Deriva"}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_200px] gap-12 items-start">
          {/* Floor plan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.4 }}
          >
            <FloorPlan
              mode={mode}
              activeDesks={activeDesks}
              inView={inView}
              reduce={!!reduce}
            />
          </motion.div>

          {/* Capacity indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.6, delay: 0.5 }}
            className="flex flex-col items-start gap-8"
          >
            <div>
              <p
                className="font-label text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "rgba(26,26,26,0.35)" }}
              >
                Capacidad utilizada
              </p>
              <div
                className="font-display font-light"
                style={{
                  fontSize: "clamp(3rem,6vw,5rem)",
                  color: mode === "con" ? "#1A6B4A" : "#1A1A1A",
                  transition: "color 0.5s ease",
                  lineHeight: 1,
                }}
              >
                {capacity}
                <span
                  className="font-label font-light"
                  style={{ fontSize: "1.5rem", color: "rgba(26,26,26,0.35)" }}
                >
                  %
                </span>
              </div>

              {/* Vertical bar */}
              <div
                className="mt-4 relative"
                style={{ width: 6, height: 160, backgroundColor: "rgba(216,208,195,0.4)" }}
              >
                <motion.div
                  animate={{ height: `${capacity}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: mode === "con" ? "#1A6B4A" : "#D8D0C3",
                    transition: "background-color 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* Desk status */}
            <div className="space-y-2">
              <p
                className="font-label text-[10px] tracking-[0.18em] uppercase mb-3"
                style={{ color: "rgba(26,26,26,0.35)" }}
              >
                Ejecutivos activos
              </p>
              {DESKS.map((desk) => {
                const active = activeDesks.includes(desk.id);
                return (
                  <div key={desk.id} className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        backgroundColor: active ? "#1A6B4A" : "#D8D0C3",
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ width: 6, height: 6, borderRadius: "50%" }}
                    />
                    <span
                      className="font-label text-[11px]"
                      style={{ color: active ? "#1A6B4A" : "rgba(26,26,26,0.35)" }}
                    >
                      {desk.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mode description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.7 }}
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(216,208,195,0.4)" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-display font-light italic"
              style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "rgba(26,26,26,0.5)" }}
            >
              {mode === "sin"
                ? "Flujo escaso. Ejecutivos en espera. Leads sin contexto."
                : "Leads calificados con ruta clara. Sala activada. Ejecutivos con contexto."}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function FloorPlan({
  mode,
  activeDesks,
  inView,
  reduce,
}: {
  mode: RoomMode;
  activeDesks: string[];
  inView: boolean;
  reduce: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 480"
      className="w-full"
      style={{ maxHeight: 420 }}
      aria-label="Plano de sala de ventas"
    >
      {/* Outer room */}
      <rect
        x={40} y={30} width={520} height={420}
        fill="none"
        stroke="#D8D0C3"
        strokeWidth={1.5}
      />

      {/* Entry gap */}
      <rect x={255} y={448} width={90} height={4} fill="#F5F0E6" />
      <line x1={255} y1={449} x2={255} y2={452} stroke="#D8D0C3" strokeWidth={1} />
      <line x1={345} y1={449} x2={345} y2={452} stroke="#D8D0C3" strokeWidth={1} />
      <text x={300} y={468} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={8} fill="rgba(26,26,26,0.3)" letterSpacing="0.12em">ACCESO</text>

      {/* Waiting zone */}
      <rect x={55} y={290} width={140} height={140} fill="rgba(216,208,195,0.15)" stroke="#D8D0C3" strokeWidth={0.6} strokeDasharray="4 3" />
      <text x={125} y={362} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={7.5} fill="rgba(26,26,26,0.3)" letterSpacing="0.1em">ZONA ESPERA</text>

      {/* Sala piloto / meeting room */}
      <rect x={150} y={50} width={250} height={160} fill="rgba(216,208,195,0.1)" stroke="#D8D0C3" strokeWidth={0.6} />
      <text x={275} y={133} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={7.5} fill="rgba(26,26,26,0.3)" letterSpacing="0.1em">SALA PILOTO</text>

      {/* Screen */}
      <rect x={160} y={60} width={230} height={22} fill="rgba(26,26,26,0.05)" stroke="#D8D0C3" strokeWidth={0.5} />
      <text x={275} y={74} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={6} fill="rgba(26,26,26,0.25)" letterSpacing="0.14em">PANTALLA PROYECTO</text>

      {/* Section divider */}
      <line x1={40} y1={235} x2={560} y2={235} stroke="#D8D0C3" strokeWidth={0.5} strokeDasharray="6 4" />

      {/* Executive desks */}
      {DESKS.map((desk) => {
        const isActive = activeDesks.includes(desk.id);
        return (
          <g key={desk.id}>
            <motion.rect
              x={desk.x}
              y={desk.y}
              width={55}
              height={50}
              rx={2}
              animate={{
                fill: isActive ? "#1A6B4A" : "#EDE3D2",
                opacity: isActive ? 0.9 : 0.5,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              stroke="#D8D0C3"
              strokeWidth={0.5}
            />
            {/* Seat indicator */}
            <motion.circle
              cx={desk.x + 27.5}
              cy={desk.y + 63}
              r={5}
              animate={{
                fill: isActive ? "#1A6B4A" : "#D8D0C3",
                opacity: isActive ? 0.4 : 0.3,
              }}
              transition={{ duration: 0.5 }}
            />
            <text
              x={desk.x + 27.5}
              y={desk.y + 28}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-space-grotesk),system-ui"
              fontSize={8}
              fontWeight={500}
              fill={isActive ? "#F5F0E6" : "rgba(26,26,26,0.35)"}
            >
              {desk.label}
            </text>
          </g>
        );
      })}

      {/* Tótem */}
      <rect x={245} y={260} width={30} height={30} rx={15} fill="none" stroke="#D8D0C3" strokeWidth={0.8} />
      <text x={260} y={280} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={6} fill="rgba(26,26,26,0.3)">T</text>

      {/* Visitor paths (con Deriva only) */}
      <AnimatePresence>
        {mode === "con" && !reduce && (
          <>
            {VISITOR_PATHS.map((path, i) => (
              <motion.g key={`vpath-${i}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#1A6B4A"
                  strokeWidth={0.6}
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.35 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                />
                <motion.circle
                  r={4}
                  fill="#1A6B4A"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0], offsetDistance: ["0%", "100%"] } as never}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: 0.8 + i * 0.4, repeat: Infinity, repeatDelay: 2 }}
                  style={{ offsetPath: `path('${path}')` } as React.CSSProperties}
                />
              </motion.g>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Entry visitors indicator */}
      {mode === "sin" && (
        <>
          {[285, 310, 330].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={443}
              r={3}
              fill="rgba(216,208,195,0.6)"
            />
          ))}
        </>
      )}
    </svg>
  );
}
