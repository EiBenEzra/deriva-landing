"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { OPERATIONAL_STEPS } from "@/data/data";

export default function OperationalScrollytelling() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#EDE3D2", minHeight: "100vh" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header */}
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
          className="font-display font-light leading-[1.05] mb-16"
          style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
        >
          Flujo operativo
        </motion.h2>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Step list */}
          <div className="space-y-0">
            {OPERATIONAL_STEPS.map((step, i) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: reduce ? 0 : 0.5, delay: 0.2 + i * 0.06 }}
                onClick={() => setActive(i)}
                className="w-full text-left py-4 flex items-center gap-4 transition-all group"
                style={{
                  borderBottom: "1px solid rgba(216,208,195,0.5)",
                  opacity: active === i ? 1 : 0.45,
                }}
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="font-label text-[10px] tracking-[0.15em]"
                    style={{ color: "rgba(26,26,26,0.35)", width: 18 }}
                  >
                    {String(step.id).padStart(2, "0")}
                  </span>
                  {step.paid && (
                    <div
                      style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#C8A84B", flexShrink: 0 }}
                    />
                  )}
                  {!step.paid && (
                    <div style={{ width: 6 }} />
                  )}
                </div>
                <span
                  className="font-label text-[12px] tracking-[0.08em] uppercase"
                  style={{ color: active === i ? "#1A1A1A" : "rgba(26,26,26,0.6)" }}
                >
                  {step.phase}
                </span>
                {active === i && (
                  <div
                    className="ml-auto"
                    style={{ width: 16, height: 1, backgroundColor: "#1A6B4A" }}
                  />
                )}
              </motion.button>
            ))}

            <div className="mt-5 flex items-center gap-2">
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#C8A84B" }} />
              <span className="font-label text-[10px]" style={{ color: "rgba(26,26,26,0.4)" }}>
                Hito de facturación
              </span>
            </div>
          </div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
                className="p-10 lg:p-14"
                style={{
                  backgroundColor: "#F5F0E6",
                  borderLeft: `3px solid ${OPERATIONAL_STEPS[active].paid ? "#C8A84B" : "#1A6B4A"}`,
                }}
              >
                <p
                  className="font-label text-[10px] tracking-[0.22em] uppercase mb-4"
                  style={{
                    color: OPERATIONAL_STEPS[active].paid ? "#C8A84B" : "rgba(26,26,26,0.35)",
                  }}
                >
                  Paso {String(OPERATIONAL_STEPS[active].id).padStart(2, "0")}
                  {OPERATIONAL_STEPS[active].paid ? " · Hito facturable" : ""}
                </p>

                <h3
                  className="font-display font-light mb-6"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A1A", lineHeight: 1.1 }}
                >
                  {OPERATIONAL_STEPS[active].phase}
                </h3>

                <p
                  className="font-sans leading-relaxed"
                  style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)", maxWidth: 480 }}
                >
                  {OPERATIONAL_STEPS[active].desc}
                </p>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-12">
                  {OPERATIONAL_STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Paso ${i + 1}`}
                    >
                      <motion.div
                        animate={{
                          width: active === i ? 20 : 6,
                          backgroundColor: active === i ? "#1A6B4A" : "#D8D0C3",
                        }}
                        style={{ height: 3, borderRadius: 2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  ))}
                </div>

                {/* Nav arrows */}
                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={() => setActive(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className="font-label text-[11px] tracking-[0.1em] uppercase px-4 py-2 transition-opacity disabled:opacity-20"
                    style={{ border: "1px solid rgba(216,208,195,0.6)", color: "#1A1A1A" }}
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setActive(Math.min(OPERATIONAL_STEPS.length - 1, active + 1))}
                    disabled={active === OPERATIONAL_STEPS.length - 1}
                    className="font-label text-[11px] tracking-[0.1em] uppercase px-4 py-2 transition-opacity disabled:opacity-20"
                    style={{ backgroundColor: "#1A6B4A", color: "#F5F0E6" }}
                  >
                    Siguiente →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
