"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { REVENUE_MILESTONES } from "@/data/data";

export default function VariableCostContract() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const paidMilestones = REVENUE_MILESTONES.filter((m) => m.paid && m.fee);
  const maxFee = Math.max(...paidMilestones.map((m) => m.fee as number));

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
          03 — Modelo
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-start">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
              className="font-display font-light leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
            >
              Pagás cuando el
              <br />
              <em className="not-italic" style={{ color: "#C8A84B" }}>hito existe.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
              className="font-sans leading-relaxed mb-12"
              style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)", maxWidth: 440 }}
            >
              El modelo es simple: el fee se activa cuando el hito está
              trazado en el CRM. Sin resultado registrado, sin costo.
            </motion.p>

            {/* Milestones timeline */}
            <div className="space-y-0">
              {REVENUE_MILESTONES.map((m, i) => {
                const barWidth = m.fee ? (m.fee / maxFee) * 100 : 0;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: reduce ? 0 : 0.5, delay: 0.4 + i * 0.08 }}
                    className="py-5"
                    style={{ borderBottom: "1px solid rgba(216,208,195,0.5)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: m.paid ? "#C8A84B" : "#D8D0C3",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          className="font-label text-[11px] tracking-[0.08em] uppercase"
                          style={{ color: m.paid ? "#1A1A1A" : "rgba(26,26,26,0.45)" }}
                        >
                          {m.label}
                        </span>
                      </div>
                      {m.fee ? (
                        <span
                          className="font-display font-light"
                          style={{ fontSize: "1.25rem", color: "#C8A84B" }}
                        >
                          ${m.fee.toLocaleString()}
                        </span>
                      ) : (
                        <span
                          className="font-label text-[10px]"
                          style={{ color: "rgba(26,26,26,0.3)" }}
                        >
                          sin fee
                        </span>
                      )}
                    </div>

                    {/* Evidence */}
                    <p
                      className="font-label text-[10px] leading-relaxed pl-5"
                      style={{ color: "rgba(26,26,26,0.4)" }}
                    >
                      {m.evidence}
                    </p>

                    {/* Fee bar */}
                    {m.fee && (
                      <div className="mt-3 pl-5">
                        <div
                          style={{
                            height: 3,
                            backgroundColor: "rgba(216,208,195,0.4)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView && !reduce ? { width: `${barWidth}%` } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: "100%", backgroundColor: "#C8A84B", borderRadius: 2 }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: model comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.4 }}
            className="lg:pt-16 space-y-8"
          >
            {/* Traditional model */}
            <div
              className="p-8"
              style={{ backgroundColor: "rgba(216,208,195,0.3)", borderLeft: "3px solid #C86B4A" }}
            >
              <p className="font-label text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "#C86B4A" }}>
                Modelo tradicional
              </p>
              <p className="font-sans leading-relaxed mb-4" style={{ fontSize: "0.9375rem", color: "rgba(26,26,26,0.65)" }}>
                Pagas antes. El presupuesto se compromete al inicio del mes,
                independientemente del resultado. El costo por promesa se
                calcula —si se calcula— al cierre del período.
              </p>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span style={{ color: "#C86B4A" }}>×</span>
                  <span className="font-label text-[11px]" style={{ color: "rgba(26,26,26,0.5)" }}>Costo fijo sin resultado garantizado</span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: "#C86B4A" }}>×</span>
                  <span className="font-label text-[11px]" style={{ color: "rgba(26,26,26,0.5)" }}>Sin trazabilidad de origen</span>
                </div>
              </div>
            </div>

            {/* Deriva model */}
            <div
              className="p-8"
              style={{ backgroundColor: "rgba(26,107,74,0.06)", borderLeft: "3px solid #1A6B4A" }}
            >
              <p className="font-label text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "#1A6B4A" }}>
                Modelo Deriva
              </p>
              <p className="font-sans leading-relaxed mb-4" style={{ fontSize: "0.9375rem", color: "rgba(26,26,26,0.65)" }}>
                El fee se activa por hito alcanzado y trazado en el CRM.
                Sin resultado registrado, no hay costo. El riesgo de conversión
                lo comparte el canal.
              </p>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span style={{ color: "#1A6B4A" }}>✓</span>
                  <span className="font-label text-[11px]" style={{ color: "rgba(26,26,26,0.5)" }}>Costo variable por hito trazable</span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: "#1A6B4A" }}>✓</span>
                  <span className="font-label text-[11px]" style={{ color: "rgba(26,26,26,0.5)" }}>Atribución completa en CRM</span>
                </div>
              </div>
            </div>

            {/* Legal note */}
            <p
              className="font-sans text-sm leading-relaxed p-4"
              style={{
                color: "rgba(26,26,26,0.4)",
                borderTop: "1px solid rgba(216,208,195,0.5)",
                fontSize: "0.8125rem",
              }}
            >
              El fee por promesa debe estructurarse legal y tributariamente
              como servicio de marketing por resultados, no como corretaje.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
