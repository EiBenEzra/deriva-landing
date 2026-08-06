"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { CRM_COLUMNS, CRM_FEATURED } from "@/data/data";

export default function CRMTraceSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [activeCol, setActiveCol] = useState(0);

  // Auto-advance the card
  useEffect(() => {
    if (!inView || reduce) return;
    const timer = setInterval(() => {
      setActiveCol((c) => (c < CRM_COLUMNS.length - 1 ? c + 1 : c));
    }, 1600);
    return () => clearInterval(timer);
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#F5F0E6", minHeight: "100vh" }}
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

        <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-start mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#1A1A1A" }}
          >
            La trazabilidad
            <br />
            no es un beneficio.
            <br />
            <em className="not-italic" style={{ color: "#1A6B4A" }}>Es el producto.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
            className="font-sans leading-relaxed lg:pt-12"
            style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)" }}
          >
            Cada lead entra al CRM con ID de atribución, canal y timestamp.
            Los hitos de facturación solo se activan con evidencia.
          </motion.p>
        </div>

        {/* CRM Board */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.3 }}
          className="overflow-x-auto pb-4"
        >
          <div style={{ minWidth: 700 }}>
            {/* Column headers */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${CRM_COLUMNS.length}, minmax(90px, 1fr))`,
                borderBottom: "1px solid rgba(216,208,195,0.5)",
                paddingBottom: 8,
                marginBottom: 16,
              }}
            >
              {CRM_COLUMNS.map((col, i) => (
                <div
                  key={col}
                  className="px-2"
                >
                  <div
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ backgroundColor: i <= activeCol ? "#1A6B4A" : "#D8D0C3" }}
                      transition={{ duration: 0.3 }}
                      style={{ width: 6, height: 6, borderRadius: "50%" }}
                    />
                    <span
                      className="font-label text-[10px] tracking-[0.12em] uppercase"
                      style={{ color: i <= activeCol ? "#1A1A1A" : "rgba(26,26,26,0.35)" }}
                    >
                      {col}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured card row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${CRM_COLUMNS.length}, minmax(90px, 1fr))`,
                height: 120,
                position: "relative",
              }}
            >
              {/* Track line */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: "rgba(216,208,195,0.4)",
                  zIndex: 0,
                }}
              />
              {/* Trazabilidad line */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  height: 1,
                  backgroundColor: "#1A6B4A",
                  zIndex: 1,
                  opacity: 0.5,
                }}
                animate={{
                  width: `${((activeCol + 0.5) / CRM_COLUMNS.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* The moving card */}
              {CRM_COLUMNS.map((col, i) => (
                <div
                  key={col}
                  className="px-2 flex items-center justify-center relative"
                  style={{ zIndex: 2 }}
                >
                  <AnimatePresence>
                    {activeCol === i && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full p-3"
                        style={{
                          backgroundColor: "#F5F0E6",
                          border: "1px solid #1A6B4A",
                          borderTop: "3px solid #1A6B4A",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-label text-[9px] tracking-[0.15em]" style={{ color: "#1A6B4A" }}>
                            {CRM_FEATURED.id}
                          </span>
                          <span className="font-label text-[9px]" style={{ color: "rgba(26,26,26,0.35)" }}>
                            {CRM_FEATURED.channel}
                          </span>
                        </div>
                        <p className="font-label text-[11px] font-medium" style={{ color: "#1A1A1A" }}>
                          {CRM_FEATURED.name}
                        </p>
                        <p className="font-label text-[9px] mt-1" style={{ color: "rgba(26,26,26,0.5)" }}>
                          {CRM_FEATURED.project}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Other (dim) leads */}
            <div
              className="grid mt-2"
              style={{ gridTemplateColumns: `repeat(${CRM_COLUMNS.length}, minmax(90px, 1fr))` }}
            >
              {[
                { col: 0, name: "María V.", id: "D-0031" },
                { col: 1, name: "Carlos R.", id: "D-0038" },
                { col: 2, name: "Laura M.", id: "D-0041" },
                { col: 3, name: "Pedro A.", id: "D-0044" },
              ].map((lead) => (
                <div
                  key={lead.id}
                  className="px-2 py-2"
                  style={{ gridColumn: lead.col + 1 }}
                >
                  <div
                    className="p-2"
                    style={{
                      backgroundColor: "rgba(216,208,195,0.3)",
                      border: "1px solid rgba(216,208,195,0.5)",
                    }}
                  >
                    <p className="font-label text-[9px]" style={{ color: "rgba(26,26,26,0.4)" }}>
                      {lead.id}
                    </p>
                    <p className="font-label text-[10px]" style={{ color: "rgba(26,26,26,0.6)" }}>
                      {lead.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Attribution panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "1px solid rgba(216,208,195,0.5)" }}
        >
          {[
            { label: "Lead ID",       value: CRM_FEATURED.id },
            { label: "Canal",         value: CRM_FEATURED.channel },
            { label: "Proyecto",      value: CRM_FEATURED.project },
            { label: "Rango",         value: CRM_FEATURED.range },
            { label: "Ejecutivo",     value: CRM_FEATURED.executive },
            { label: "Fecha ingreso", value: CRM_FEATURED.dateIn },
            { label: "Estado actual", value: CRM_COLUMNS[activeCol] },
            { label: "Hito facturable", value: activeCol >= 4 ? "Reserva" : activeCol >= 3 ? "Visita" : activeCol >= 2 ? "Derivación" : "—" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-4"
              style={{ borderRight: (i + 1) % 4 !== 0 ? "1px solid rgba(216,208,195,0.5)" : "none", borderBottom: i < 4 ? "1px solid rgba(216,208,195,0.5)" : "none" }}
            >
              <p className="font-label text-[9px] tracking-[0.15em] uppercase mb-1" style={{ color: "rgba(26,26,26,0.35)" }}>
                {item.label}
              </p>
              <p className="font-label text-[11px]" style={{ color: "#1A1A1A" }}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
