"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const STEPS = [
  { label: "Captación",   color: "#D8D0C3" },
  { label: "Diagnóstico", color: "#C8A84B" },
  { label: "Matching",    color: "#C8A84B" },
  { label: "Asesoría",    color: "#1A6B4A" },
];

const DO_NOT = [
  "No cerramos la venta.",
  "No reemplazamos la sala.",
  "No prometemos aprobación hipotecaria.",
  "No somos publicación masiva.",
];

export default function DemandQualificationMechanism() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#F5F0E6", minHeight: "100vh" }}
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

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-start">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
              className="font-display font-light leading-[1.05] mb-10"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
            >
              No somos un portal.
              <br />
              Somos un{" "}
              <em className="not-italic" style={{ color: "#1A6B4A" }}>mecanismo.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
              className="font-sans leading-relaxed mb-12"
              style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)", maxWidth: 480 }}
            >
              Captamos, diagnosticamos y derivamos. La sala de ventas recibe
              un comprador con contexto, no un lead frío. El cierre sigue
              siendo su responsabilidad.
            </motion.p>

            {/* Flow steps */}
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: reduce ? 0 : 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(216,208,195,0.4)" }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: step.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-label text-[12px] tracking-[0.1em] uppercase"
                    style={{ color: "#1A1A1A" }}
                  >
                    {step.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div
                      className="ml-auto"
                      style={{ width: 16, height: 1, backgroundColor: "rgba(216,208,195,0.6)" }}
                    />
                  )}
                  {i === STEPS.length - 1 && (
                    <span
                      className="ml-auto font-label text-[10px] tracking-[0.1em] uppercase"
                      style={{ color: "#1A6B4A" }}
                    >
                      → Sala de ventas
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: mechanism SVG + what we don't do */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <MechanismDiagram inView={inView} reduce={!!reduce} />
            </motion.div>

            {/* What we don't do */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.6, delay: 0.6 }}
            >
              <p
                className="font-label text-[10px] tracking-[0.2em] uppercase mb-5"
                style={{ color: "rgba(26,26,26,0.35)" }}
              >
                Qué no hacemos
              </p>
              <div className="space-y-3">
                {DO_NOT.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 font-label text-[11px]"
                      style={{ color: "rgba(200,107,74,0.6)" }}
                    >
                      ×
                    </span>
                    <span
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "rgba(26,26,26,0.5)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MechanismDiagram({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <svg viewBox="0 0 340 180" width="100%" aria-label="Mecanismo de calificación de demanda">
      {/* Input: scattered dots */}
      {[
        [20, 30], [20, 80], [20, 130],
        [50, 10], [50, 55], [50, 100], [50, 155],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={4}
          fill="#D8D0C3"
          initial={{ opacity: 0 }}
          animate={inView && !reduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
        />
      ))}

      {/* Input label */}
      <text x={35} y={172} textAnchor="middle" fontFamily="var(--font-space-grotesk),system-ui" fontSize={7} fill="rgba(26,26,26,0.3)" letterSpacing="0.1em">DEMANDA</text>

      {/* Converging lines → filter box */}
      {[30, 80, 130].map((y, i) => (
        <motion.line
          key={i}
          x1={60} y1={y}
          x2={115} y2={90}
          stroke="#D8D0C3"
          strokeWidth={0.6}
          initial={{ pathLength: 0 }}
          animate={inView && !reduce ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
        />
      ))}

      {/* Central mechanism box */}
      <motion.rect
        x={115} y={55} width={110} height={70} rx={2}
        fill="#1A6B4A"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView && !reduce ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{ transformOrigin: "170px 90px" }}
      />
      <motion.text
        x={170} y={85}
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk),system-ui"
        fontSize={9}
        fontWeight={500}
        fill="#F5F0E6"
        letterSpacing="0.12em"
        initial={{ opacity: 0 }}
        animate={inView && !reduce ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        DERIVA
      </motion.text>
      <motion.text
        x={170} y={101}
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk),system-ui"
        fontSize={6.5}
        fill="rgba(245,240,230,0.7)"
        initial={{ opacity: 0 }}
        animate={inView && !reduce ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.1 }}
      >
        Diagnóstico · Matching · Asesoría
      </motion.text>

      {/* Output line */}
      <motion.line
        x1={225} y1={90}
        x2={225} y2={90}
        stroke="#1A6B4A"
        strokeWidth={1.5}
        initial={{ x2: 225 }}
        animate={inView && !reduce ? { x2: 285 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      />

      {/* Output node */}
      <motion.circle
        cx={300}
        cy={90}
        r={20}
        fill="#F5F0E6"
        stroke="#1A6B4A"
        strokeWidth={1}
        initial={{ scale: 0 }}
        animate={inView && !reduce ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
        style={{ transformOrigin: "300px 90px" }}
      />
      <motion.text
        x={300} y={87}
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk),system-ui"
        fontSize={6}
        fill="#1A6B4A"
        initial={{ opacity: 0 }}
        animate={inView && !reduce ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.7 }}
      >
        Lead
      </motion.text>
      <motion.text
        x={300} y={96}
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk),system-ui"
        fontSize={6}
        fill="#1A6B4A"
        initial={{ opacity: 0 }}
        animate={inView && !reduce ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.7 }}
      >
        calificado
      </motion.text>
    </svg>
  );
}
