"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { MARKET_ACTORS } from "@/data/data";

export default function BrokenInformationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5F0E6", minHeight: "100vh" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_520px] gap-16 items-start mb-20">
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
              El mercado opera con
              <br />
              información{" "}
              <em
                className="not-italic"
                style={{ color: "#C86B4A", textDecoration: "line-through", textDecorationColor: "rgba(200,107,74,0.4)" }}
              >
                rota.
              </em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: 0.25 }}
            className="lg:pt-16"
          >
            <p
              className="font-sans leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(26,26,26,0.6)" }}
            >
              Compradores, inmobiliarias y bancos toman decisiones con señales
              incompletas. No hay un canal que los conecte con información
              estructurada antes de que ocurra la venta.
            </p>
          </motion.div>
        </div>

        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.3 }}
          className="relative w-full"
          style={{ height: "clamp(340px, 50vw, 520px)" }}
        >
          <BrokenNetworkSVG
            inView={inView}
            reduce={!!reduce}
            hovered={hovered}
            setHovered={setHovered}
          />
        </motion.div>

        {/* Actor pain — horizontal editorial strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.6, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 mt-16"
          style={{ borderTop: "1px solid rgba(216,208,195,0.45)" }}
        >
          {MARKET_ACTORS.map((actor, i) => (
            <div
              key={actor.id}
              className="pt-7 pb-8 cursor-default"
              style={{
                paddingRight: i < 2 ? 40 : 0,
                paddingLeft: i > 0 ? 40 : 0,
                borderRight: i < 2 ? "1px solid rgba(216,208,195,0.45)" : "none",
                opacity: hovered && hovered !== actor.id ? 0.35 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setHovered(actor.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <p
                className="font-label text-[9px] tracking-[0.25em] uppercase mb-4"
                style={{ color: hovered === actor.id ? "#C86B4A" : "rgba(26,26,26,0.3)" }}
              >
                {actor.label}
              </p>
              <p
                className="font-display font-light leading-[1.25]"
                style={{ fontSize: "clamp(1rem,1.6vw,1.3rem)", color: "#1A1A1A" }}
              >
                {actor.pain}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Deriva resolution line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.7, delay: 0.8 }}
          className="mt-20 flex items-start gap-6"
        >
          <div
            className="mt-1.5 shrink-0"
            style={{ width: 40, height: 1, backgroundColor: "#1A6B4A" }}
          />
          <p
            className="font-display font-light italic"
            style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "rgba(26,26,26,0.55)" }}
          >
            "Deriva es el canal que conecta a los tres actores con información
            estructurada, antes de que el comprador entre a la sala de ventas."
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function BrokenNetworkSVG({
  inView,
  reduce,
  hovered,
  setHovered,
}: {
  inView: boolean;
  reduce: boolean;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  // Node positions (percentage of 100×60 viewBox)
  const nodes = {
    comprador:    { x: 18, y: 24, label: "Comprador" },
    inmobiliaria: { x: 82, y: 24, label: "Inmobiliaria" },
    banco:        { x: 50, y: 78, label: "Banco" },
    deriva:       { x: 50, y: 48, label: "Deriva" },
  };

  const connections = [
    { from: "comprador",    to: "inmobiliaria", broken: true  },
    { from: "comprador",    to: "banco",        broken: true  },
    { from: "inmobiliaria", to: "banco",        broken: true  },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      aria-label="Mapa de actores del mercado inmobiliario"
    >
      {/* Broken connection lines */}
      {connections.map((c) => {
        const from = nodes[c.from as keyof typeof nodes];
        const to = nodes[c.to as keyof typeof nodes];
        return (
          <motion.line
            key={`${c.from}-${c.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#C86B4A"
            strokeWidth={0.4}
            strokeDasharray="1.5 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView && !reduce
                ? {
                    pathLength: 1,
                    opacity: [0, 0.5, 0.2, 0.5, 0.1, 0.4],
                  }
                : {}
            }
            transition={{
              pathLength: { duration: 1, delay: 0.8 },
              opacity: {
                duration: 4,
                delay: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      {/* Actor nodes */}
      {Object.entries(nodes)
        .filter(([id]) => id !== "deriva")
        .map(([id, node]) => {
          const isHovered = hovered === id;
          return (
            <g
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={9}
                fill={isHovered ? "#EDE3D2" : "#F5F0E6"}
                stroke={isHovered ? "#C86B4A" : "#D8D0C3"}
                strokeWidth={0.6}
                animate={{ r: isHovered ? 10 : 9 }}
                transition={{ duration: 0.2 }}
              />
              <text
                x={node.x}
                y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-space-grotesk), system-ui"
                fontSize={3}
                fontWeight={400}
                fill={isHovered ? "#C86B4A" : "rgba(26,26,26,0.6)"}
              >
                {node.label}
              </text>
            </g>
          );
        })}

      {/* Deriva node — appears after */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={inView && !reduce ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.0 }}
        style={{ transformOrigin: `${nodes.deriva.x}% ${nodes.deriva.y}%` }}
      >
        {/* Stabilizing lines */}
        {["comprador", "inmobiliaria", "banco"].map((id) => {
          const n = nodes[id as keyof typeof nodes];
          return (
            <motion.line
              key={`d-${id}`}
              x1={nodes.deriva.x}
              y1={nodes.deriva.y}
              x2={n.x}
              y2={n.y}
              stroke="#1A6B4A"
              strokeWidth={0.5}
              initial={{ pathLength: 0 }}
              animate={inView && !reduce ? { pathLength: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.3 }}
            />
          );
        })}

        <circle
          cx={nodes.deriva.x}
          cy={nodes.deriva.y}
          r={11}
          fill="#1A6B4A"
        />
        <text
          x={nodes.deriva.x}
          y={nodes.deriva.y + 0.5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-space-grotesk), system-ui"
          fontSize={3}
          fontWeight={500}
          fill="#F5F0E6"
          letterSpacing="0.1em"
        >
          DERIVA
        </text>
      </motion.g>
    </svg>
  );
}
