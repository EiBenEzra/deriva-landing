"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export type BrandMarkVariant = "default" | "light" | "nav";

interface Props {
  variant?: BrandMarkVariant;
  className?: string;
  animated?: boolean;
}

export default function BrandMark({ variant = "default", className = "", animated = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const textColor = variant === "light" ? "#F5F0E6" : "#1A1A1A";
  const accentColor = variant === "light" ? "rgba(200,168,75,0.7)" : "rgba(26,107,74,0.6)";
  const dotColor = variant === "light" ? "#C8A84B" : "#1A6B4A";
  const size = variant === "nav" ? 1 : 1.4;
  const shouldAnimate = animated && !reduce && inView;

  return (
    <div ref={ref} className={`relative inline-flex flex-col ${className}`} style={{ gap: 4 }}>
      <span
        className="font-label select-none"
        style={{
          fontSize: `${1.125 * size}rem`,
          fontWeight: 200,
          color: textColor,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        deriva
      </span>

      {/* Signal baseline */}
      <div style={{ position: "relative", height: 5, overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: 1,
            backgroundColor: accentColor,
            transformOrigin: "left",
          }}
        />

        {/* Traveling signal dot */}
        {shouldAnimate && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 60],
            }}
            transition={{
              duration: 1.6,
              delay: 0.8,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "absolute",
              top: -1.5,
              left: 0,
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: dotColor,
              boxShadow: `0 0 10px 4px ${dotColor}55`,
            }}
          />
        )}
      </div>
    </div>
  );
}
