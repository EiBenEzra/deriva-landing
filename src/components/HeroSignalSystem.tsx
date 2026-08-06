"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import BrandMark from "./BrandMark";
import { HERO_SIGNAL_DOTS } from "@/data/data";

// Signal network center and output positions (within 160x380 SVG)
const CX = 130;
const CY = 190;
const OUT_X = 155;

function getPath(x: number, y: number) {
  const dx = CX - x;
  const dy = CY - y;
  const c1x = x + dx * 0.5;
  const c1y = y;
  const c2x = CX - dx * 0.2;
  const c2y = CY - dy * 0.15;
  return `M ${x} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${CX} ${CY}`;
}

export default function HeroSignalSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      {/* Noise grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-28 pb-20">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="mb-14"
        >
          <BrandMark variant="default" animated={inView && !reduce} />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-0 items-start">
          {/* ── Left: Editorial text ── */}
          <div className="lg:pr-16">
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.1 }}
              className="font-label text-[11px] tracking-[0.22em] uppercase mb-8"
              style={{ color: "#1A6B4A" }}
            >
              Canal de demanda calificada
            </motion.p>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.9, delay: 0.15 }}
              className="font-display font-light leading-[1.02]"
              style={{
                fontSize: "clamp(4rem, 8.5vw, 8.5rem)",
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
              }}
            >
              Del lead frío
              <br />
              a la promesa
              <br />
              <em className="not-italic" style={{ color: "#1A6B4A" }}>
                trazable.
              </em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.35 }}
              className="mt-8 font-sans leading-relaxed max-w-[520px]"
              style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.65)" }}
            >
              Un canal de performance comercial que convierte demanda dispersa
              en compradores calificados, asesorados y listos para activar
              salas de venta.
            </motion.p>

            {/* Editorial pull quote */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.5 }}
              className="mt-12 ml-0"
            >
              <p
                className="font-display font-light italic leading-snug"
                style={{ fontSize: "clamp(1.05rem,1.8vw,1.3rem)", color: "rgba(26,26,26,0.4)", maxWidth: 460 }}
              >
                "Las inmobiliarias no tienen un problema de ventas.
                <br />
                Tienen un problema de señales."
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.6, delay: 0.65 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              <button
                className="font-label text-[12px] tracking-[0.12em] uppercase px-8 py-4 transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#1A6B4A", color: "#F5F0E6" }}
                onClick={() =>
                  document.getElementById("piloto")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Conversemos un piloto
              </button>
              <button
                className="font-label text-[12px] tracking-[0.12em] uppercase px-8 py-4 transition-colors hover:border-[#1A6B4A] hover:text-[#1A6B4A]"
                style={{ border: "1px solid #D8D0C3", color: "rgba(26,26,26,0.6)" }}
                onClick={() =>
                  document.getElementById("mercado")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver el sistema →
              </button>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduce ? 0 : 0.5, delay: 1.4 }}
              className="mt-16 flex items-center gap-3"
            >
              <div style={{ width: 1, height: 32, backgroundColor: "#D8D0C3" }} />
              <span
                className="font-label text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(26,26,26,0.25)" }}
              >
                Explorar
              </span>
            </motion.div>
          </div>

          {/* ── Right: Signal network ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: reduce ? 0 : 1, delay: 0.4 }}
            className="hidden lg:block"
          >
            <SignalNetwork inView={inView} reduce={!!reduce} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SignalNetwork({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <div style={{ width: 200, height: 480 }}>
      <svg
        viewBox="0 0 160 380"
        width="200"
        height="480"
        aria-label="Red de señales: leads que derivan hacia sala de ventas"
        role="img"
      >
        {/* Paths from each dot to center */}
        {HERO_SIGNAL_DOTS.map((dot) => {
          const d = getPath(dot.x, dot.y);
          return (
            <motion.path
              key={dot.id}
              d={d}
              fill="none"
              stroke={dot.featured ? "#1A6B4A" : "#D8D0C3"}
              strokeWidth={dot.featured ? 1 : 0.75}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                inView && !reduce
                  ? { pathLength: 1, opacity: dot.featured ? 0.8 : 0.5 }
                  : {}
              }
              transition={{
                pathLength: { duration: 1.2, delay: 0.6 + dot.delay, ease: "easeOut" },
                opacity: { duration: 0.3, delay: 0.5 + dot.delay },
              }}
            />
          );
        })}

        {/* Output line to right */}
        <motion.line
          x1={CX} y1={CY}
          x2={CX} y2={CY}
          stroke="#1A6B4A"
          strokeWidth={1.5}
          initial={{ x2: CX }}
          animate={inView && !reduce ? { x2: OUT_X } : {}}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        />

        {/* Input dots */}
        {HERO_SIGNAL_DOTS.map((dot) => (
          <motion.circle
            key={`d-${dot.id}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.featured ? 4 : 2.5}
            fill={dot.featured ? "#1A6B4A" : "#D8D0C3"}
            stroke={dot.featured ? "#1A6B4A" : "none"}
            strokeWidth={dot.featured ? 1 : 0}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView && !reduce ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + dot.delay }}
          />
        ))}

        {/* Featured dot outer ring */}
        {HERO_SIGNAL_DOTS.filter((d) => d.featured).map((dot) => (
          <motion.circle
            key={`ring-${dot.id}`}
            cx={dot.x}
            cy={dot.y}
            r={8}
            fill="none"
            stroke="#1A6B4A"
            strokeWidth={0.75}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView && !reduce ? { opacity: 0.4, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        ))}

        {/* Central node */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={14}
          fill="#F5F0E6"
          stroke="#1A6B4A"
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView && !reduce ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
        />
        <motion.circle
          cx={CX}
          cy={CY}
          r={5}
          fill="#1A6B4A"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView && !reduce ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.8 }}
        />

        {/* Labels */}
        <motion.text
          x={CX}
          y={CY + 26}
          textAnchor="middle"
          fontFamily="var(--font-space-grotesk), system-ui"
          fontSize={7}
          fontWeight={500}
          fill="#1A6B4A"
          letterSpacing="0.06em"
          initial={{ opacity: 0 }}
          animate={inView && !reduce ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.9 }}
        >
          DERIVA
        </motion.text>

        {/* Featured lead label */}
        {HERO_SIGNAL_DOTS.filter((d) => d.featured).map((dot) => (
          <motion.text
            key={`lbl-${dot.id}`}
            x={dot.x + 12}
            y={dot.y + 1}
            fontFamily="var(--font-space-grotesk), system-ui"
            fontSize={6.5}
            fill="#1A6B4A"
            initial={{ opacity: 0 }}
            animate={inView && !reduce ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            Lead calificado
          </motion.text>
        ))}

        {/* Output label */}
        <motion.text
          x={OUT_X + 2}
          y={CY - 4}
          fontFamily="var(--font-space-grotesk), system-ui"
          fontSize={5.5}
          fill="#1A1A1A"
          opacity={0.4}
          initial={{ opacity: 0 }}
          animate={inView && !reduce ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.4, delay: 2.2 }}
        >
          Sala
        </motion.text>
        <motion.text
          x={OUT_X + 2}
          y={CY + 6}
          fontFamily="var(--font-space-grotesk), system-ui"
          fontSize={5.5}
          fill="#1A1A1A"
          opacity={0.4}
          initial={{ opacity: 0 }}
          animate={inView && !reduce ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.4, delay: 2.2 }}
        >
          ventas
        </motion.text>
      </svg>
    </div>
  );
}
