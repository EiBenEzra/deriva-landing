"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import BrandMark from "./BrandMark";

export default function FinalManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#0F1923" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,240,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,230,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizontal rule */}
      <div className="relative z-10 pt-20 px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            backgroundColor: "#C8A84B",
            opacity: 0.3,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1fr_360px] gap-20 items-start">
            {/* Left: manifesto text */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: reduce ? 0 : 0.5, delay: 0.2 }}
                className="font-label text-[11px] tracking-[0.22em] uppercase mb-8"
                style={{ color: "#C8A84B" }}
              >
                Tesis de negocio
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reduce ? 0 : 0.9, delay: 0.3 }}
                className="font-display font-light leading-[1.08]"
                style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)", color: "#F5F0E6" }}
              >
                No construimos otro canal
                <br />
                de publicidad.
                <br />
                <span style={{ color: "#C8A84B" }}>
                  Construimos el canal de
                  <br />
                  demanda calificada.
                </span>
              </motion.h2>

              {/* Closing quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reduce ? 0 : 0.7, delay: 0.6 }}
                className="mt-14 pt-8"
                style={{ borderTop: "1px solid rgba(245,240,230,0.12)" }}
              >
                <p
                  className="font-display font-light italic leading-relaxed"
                  style={{
                    fontSize: "clamp(1.1rem,2vw,1.5rem)",
                    color: "rgba(245,240,230,0.5)",
                  }}
                >
                  "El comprador ya existe.
                  <br />
                  La sala de ventas ya existe.
                  <br />
                  Solo faltaba el canal que los conectara con certeza."
                </p>
              </motion.div>
            </div>

            {/* Right: CTA panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.5 }}
            >
              <div
                className="p-8"
                style={{
                  border: "1px solid rgba(245,240,230,0.12)",
                  backgroundColor: "rgba(245,240,230,0.03)",
                }}
              >
                <p
                  className="font-label text-[10px] tracking-[0.2em] uppercase mb-6"
                  style={{ color: "rgba(245,240,230,0.35)" }}
                >
                  ¿Te interesa participar?
                </p>

                {["Inmobiliaria piloto", "Socio estratégico", "Inversionista"].map((role) => (
                  <div key={role} className="flex items-center gap-3 mb-3">
                    <div
                      style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#C8A84B", opacity: 0.6 }}
                    />
                    <span className="font-label text-sm" style={{ color: "rgba(245,240,230,0.5)" }}>
                      {role}
                    </span>
                  </div>
                ))}

                <button
                  className="mt-8 w-full py-4 font-label text-[12px] tracking-[0.14em] uppercase transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#1A6B4A", color: "#F5F0E6" }}
                >
                  Conversemos un piloto
                </button>
                <button
                  className="mt-2 w-full py-3.5 font-label text-[11px] tracking-[0.14em] uppercase transition-colors hover:border-[#C8A84B] hover:text-[#C8A84B]"
                  style={{ border: "1px solid rgba(245,240,230,0.15)", color: "rgba(245,240,230,0.4)" }}
                >
                  Solicitar información
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 px-6 lg:px-12 py-8 max-w-[1400px] mx-auto w-full"
        style={{ borderTop: "1px solid rgba(245,240,230,0.08)" }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <BrandMark variant="light" animated={inView && !reduce} />
          <p
            className="font-label text-[10px] tracking-[0.15em]"
            style={{ color: "rgba(245,240,230,0.2)" }}
          >
            Canal de demanda calificada · Chile · 2025
          </p>
        </div>
      </div>
    </div>
  );
}
