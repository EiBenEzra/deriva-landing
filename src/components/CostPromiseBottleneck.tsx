"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { FUNNEL_STAGES } from "@/data/data";

export default function CostPromiseBottleneck() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"tradicional" | "deriva">("tradicional");

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#EDE3D2" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header row */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-24">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5 }}
              className="font-label text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ color: "rgba(26,26,26,0.35)" }}
            >
              01 — Problema
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
              className="font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
            >
              ¿Cuánto costó
              <br />
              realmente cada{" "}
              <em className="not-italic" style={{ color: "#C86B4A" }}>
                promesa?
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
            El costo fijo mensual se distribuye entre muy pocas promesas.
            Pero nadie ve el número completo hasta el final del mes.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">
          {/* Pipeline visualization */}
          <div>
            <PipelineViz inView={inView} reduce={!!reduce} />
          </div>

          {/* Right: comparison toggle */}
          <div>
            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.4 }}
              className="flex mb-10"
            >
              {(["tradicional", "deriva"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 py-2.5 font-label text-[10px] tracking-[0.15em] uppercase transition-all"
                  style={{
                    backgroundColor: mode === m ? "#1A1A1A" : "transparent",
                    color: mode === m ? "#F5F0E6" : "rgba(26,26,26,0.45)",
                    border: "1px solid",
                    borderColor: mode === m ? "#1A1A1A" : "rgba(216,208,195,0.6)",
                    borderRight: m === "tradicional" ? "none" : undefined,
                  }}
                >
                  {m === "tradicional" ? "Modelo actual" : "Con Deriva"}
                </button>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.6, delay: 0.5 }}
            >
              {mode === "tradicional" ? <TradicionalPanel /> : <DerivaPanel />}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PipelineViz({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const maxWidth = 320;

  return (
    <div className="space-y-0">
      {FUNNEL_STAGES.map((stage, i) => {
        const stageWidth = (stage.pct / 100) * maxWidth;
        const isLast = i === FUNNEL_STAGES.length - 1;

        return (
          <div key={stage.id}>
            <div className="flex items-center gap-4">
              {/* Bar */}
              <div
                style={{ height: 40, width: maxWidth, position: "relative", flexShrink: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(216,208,195,0.3)",
                  }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView && !reduce ? { width: stageWidth } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: isLast
                      ? "#1A6B4A"
                      : i > 3
                      ? "#C8A84B"
                      : i > 1
                      ? "#C86B4A"
                      : "#D8D0C3",
                    opacity: isLast ? 1 : 0.7 - i * 0.06,
                  }}
                />
              </div>

              {/* Label + volume */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className="font-label text-[10px] tracking-[0.12em] uppercase w-20"
                  style={{ color: "rgba(26,26,26,0.5)" }}
                >
                  {stage.label}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView && !reduce ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.12 }}
                  className="font-display font-light"
                  style={{
                    fontSize: "1.5rem",
                    color: isLast ? "#1A6B4A" : "rgba(26,26,26,0.7)",
                  }}
                >
                  {stage.volume}
                </motion.span>
              </div>
            </div>

            {/* Leak indicator between stages */}
            {!isLast && (
              <div className="flex items-center" style={{ height: 16, paddingLeft: 8 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView && !reduce ? { width: 1 } : {}}
                  transition={{ duration: 0.2, delay: 0.7 + i * 0.12 }}
                  style={{
                    height: 1,
                    width: 1,
                    backgroundColor: "rgba(200,107,74,0.4)",
                    flexGrow: 1,
                    maxWidth: (1 - FUNNEL_STAGES[i + 1].pct / stage.pct) * maxWidth,
                  }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView && !reduce ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.0 + i * 0.12 }}
                  className="font-label text-[9px] ml-2"
                  style={{ color: "#C86B4A" }}
                >
                  −{(stage.volume - FUNNEL_STAGES[i + 1].volume)} perdidos
                </motion.span>
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(216,208,195,0.5)" }}>
        <p
          className="font-label text-[10px] tracking-[0.12em] uppercase"
          style={{ color: "rgba(26,26,26,0.4)" }}
        >
          Base 100 leads / ciclo
        </p>
      </div>
    </div>
  );
}

function TradicionalPanel() {
  const items = [
    { label: "Costo mensual fijo", value: "$2.400.000", note: "Pagas antes" },
    { label: "Promesas / mes",      value: "1–2",        note: "Resultado incierto" },
    { label: "Costo por promesa",   value: "~$1.200.000", note: "Calculado al final" },
    { label: "Trazabilidad",        value: "Ninguna",    note: "Origen del lead: desconocido" },
  ];

  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div
          key={i}
          className="py-5 flex justify-between items-start"
          style={{ borderBottom: "1px solid rgba(216,208,195,0.4)" }}
        >
          <div>
            <p className="font-label text-[11px] tracking-[0.1em] uppercase" style={{ color: "rgba(26,26,26,0.45)" }}>
              {item.label}
            </p>
            <p className="font-label text-[10px] mt-1" style={{ color: "#C86B4A" }}>
              {item.note}
            </p>
          </div>
          <p className="font-display font-light text-xl" style={{ color: "#1A1A1A" }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function DerivaPanel() {
  const items = [
    { label: "Costo fijo mensual",  value: "$0",         note: "Sin compromiso previo" },
    { label: "Costo por derivación", value: "$15.000",   note: "Solo si el hito existe" },
    { label: "Costo por promesa",   value: "$120.000",   note: "Trazado en CRM" },
    { label: "Trazabilidad",        value: "Total",      note: "Canal + lead ID + hito" },
  ];

  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div
          key={i}
          className="py-5 flex justify-between items-start"
          style={{ borderBottom: "1px solid rgba(216,208,195,0.4)" }}
        >
          <div>
            <p className="font-label text-[11px] tracking-[0.1em] uppercase" style={{ color: "rgba(26,26,26,0.45)" }}>
              {item.label}
            </p>
            <p className="font-label text-[10px] mt-1" style={{ color: "#1A6B4A" }}>
              {item.note}
            </p>
          </div>
          <p className="font-display font-light text-xl" style={{ color: "#1A6B4A" }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
