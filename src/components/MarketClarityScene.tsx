"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { INMOBILIARIA_BENEFITS, COMPRADOR_BENEFITS } from "@/data/data";

export default function MarketClarityScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} style={{ backgroundColor: "#F5F0E6" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="font-label text-[11px] tracking-[0.22em] uppercase mb-6"
          style={{ color: "rgba(26,26,26,0.35)" }}
        >
          — Propuesta
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
          className="font-display font-light leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A", maxWidth: 700 }}
        >
          Comprar una propiedad no debería
          empezar con{" "}
          <em className="not-italic" style={{ color: "#C86B4A" }}>ansiedad.</em>
          <br />
          Debería empezar con{" "}
          <em className="not-italic" style={{ color: "#1A6B4A" }}>claridad.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.3 }}
          className="font-sans leading-relaxed mb-20 max-w-[540px]"
          style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.55)" }}
        >
          Deriva conecta a compradores e inversionistas con inmobiliarias
          con información estructurada antes de que ocurra la venta.
        </motion.p>

        {/* Split panels */}
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-px" style={{ backgroundColor: "rgba(216,208,195,0.4)" }}>
          {/* Inmobiliaria */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.3 }}
            className="p-10 lg:p-14"
            style={{ backgroundColor: "#EDE3D2" }}
          >
            <p
              className="font-label text-[10px] tracking-[0.22em] uppercase mb-8"
              style={{ color: "#1A6B4A" }}
            >
              Para inmobiliarias
            </p>
            <div className="space-y-6">
              {INMOBILIARIA_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: reduce ? 0 : 0.5, delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <span
                    className="font-label text-[10px] tracking-[0.1em] shrink-0 mt-0.5"
                    style={{ color: "rgba(26,26,26,0.3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)", color: "#1A1A1A", lineHeight: 1.3 }}
                  >
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comprador */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.4 }}
            className="p-10 lg:p-14"
            style={{ backgroundColor: "#F5F0E6" }}
          >
            <p
              className="font-label text-[10px] tracking-[0.22em] uppercase mb-8"
              style={{ color: "#C8A84B" }}
            >
              Para compradores e inversionistas
            </p>
            <div className="space-y-8">
              {COMPRADOR_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: reduce ? 0 : 0.5, delay: 0.5 + i * 0.09 }}
                  className="flex items-start gap-4"
                >
                  <span
                    className="font-label text-[10px] tracking-[0.1em] shrink-0 mt-0.5"
                    style={{ color: "rgba(26,26,26,0.3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "clamp(1.2rem,2vw,1.6rem)", color: "#1A1A1A", lineHeight: 1.25 }}
                  >
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
