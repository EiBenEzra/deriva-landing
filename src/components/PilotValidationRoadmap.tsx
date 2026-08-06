"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { PILOT_PHASES, PILOT_METRICS } from "@/data/data";

type ValidationState = "sin" | "señales" | "validado";

const STATES: { id: ValidationState; label: string }[] = [
  { id: "sin",      label: "Sin evidencia" },
  { id: "señales",  label: "Señales tempranas" },
  { id: "validado", label: "Canal validado" },
];

const STATE_COLORS: Record<ValidationState, string> = {
  sin:      "#D8D0C3",
  señales:  "#C8A84B",
  validado: "#1A6B4A",
};

export default function PilotValidationRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [state, setState] = useState<ValidationState>("sin");

  const phaseWidths = [16, 50, 34]; // % widths for 3 phases

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#EDE3D2", minHeight: "100vh" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="font-label text-[11px] tracking-[0.22em] uppercase mb-6"
          style={{ color: "rgba(26,26,26,0.35)" }}
        >
          04 — Piloto
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
          >
            90 días para
            <br />
            <em className="not-italic" style={{ color: "#1A6B4A" }}>validar el canal.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
            className="font-sans leading-relaxed lg:pt-12"
            style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)" }}
          >
            Un piloto estructurado con métricas claras. Al final, la
            inmobiliaria decide con evidencia.
          </motion.p>
        </div>

        {/* Timeline bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex h-10 overflow-hidden" style={{ borderRadius: 2 }}>
            {PILOT_PHASES.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ width: 0 }}
                animate={inView && !reduce ? { width: `${phaseWidths[i]}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: phase.color, overflow: "hidden" }}
                className="flex items-center px-3"
              >
                <span
                  className="font-label text-[9px] tracking-[0.12em] uppercase whitespace-nowrap"
                  style={{ color: phase.textColor, opacity: 0.8 }}
                >
                  {phase.weeks}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Phase cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {PILOT_PHASES.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.6, delay: 0.5 + i * 0.1 }}
              className="p-8"
              style={{
                borderTop: `3px solid ${phase.color}`,
                backgroundColor: i === 1 ? "rgba(26,107,74,0.06)" : "rgba(216,208,195,0.2)",
              }}
            >
              <p
                className="font-label text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: phase.color }}
              >
                {phase.weeks}
              </p>
              <h3
                className="font-display font-light mb-5"
                style={{ fontSize: "1.5rem", color: "#1A1A1A" }}
              >
                {phase.label}
              </h3>
              <div className="space-y-2">
                {phase.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: phase.color,
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    <span className="font-sans text-sm" style={{ color: "rgba(26,26,26,0.6)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics + validation state */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Metrics */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.6 }}
              className="font-label text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(26,26,26,0.35)" }}
            >
              Métricas de validación
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {PILOT_METRICS.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: reduce ? 0 : 0.4, delay: 0.7 + i * 0.07 }}
                  className="py-4 flex items-center gap-3"
                  style={{ borderBottom: "1px solid rgba(216,208,195,0.4)" }}
                >
                  <span
                    className="font-label text-[10px] tracking-[0.1em] shrink-0"
                    style={{ color: "rgba(26,26,26,0.3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm" style={{ color: "rgba(26,26,26,0.65)" }}>
                    {metric}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Validation state */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.6, delay: 0.7 }}
          >
            <p
              className="font-label text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(26,26,26,0.35)" }}
            >
              Estado al cierre
            </p>
            <div className="space-y-3">
              {STATES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setState(s.id)}
                  className="w-full text-left p-4 transition-all flex items-center gap-3"
                  style={{
                    backgroundColor: state === s.id ? "rgba(26,107,74,0.08)" : "transparent",
                    border: `1px solid ${state === s.id ? STATE_COLORS[s.id] : "rgba(216,208,195,0.5)"}`,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: STATE_COLORS[s.id],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-label text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: state === s.id ? "#1A1A1A" : "rgba(26,26,26,0.45)" }}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
            <p
              className="font-sans text-sm mt-4 leading-relaxed"
              style={{ color: "rgba(26,26,26,0.45)", fontSize: "0.875rem" }}
            >
              Al día 90, la inmobiliaria decide con evidencia, no con intuición.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
