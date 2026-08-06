"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const handle = () => {
      const doc = document.documentElement;
      setPct((doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: 2, backgroundColor: "rgba(216,208,195,0.35)" }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ scaleX: pct / 100, backgroundColor: "#1A6B4A" }}
        transition={{ duration: 0 }}
      />
    </div>
  );
}
