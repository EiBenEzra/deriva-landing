"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import BrandMark from "./BrandMark";

const GROUPS = [
  { id: "problema", num: "01", label: "Problema", first: "mercado" },
  { id: "sistema",  num: "02", label: "Sistema",  first: "sala"    },
  { id: "modelo",   num: "03", label: "Modelo",   first: "teoria"  },
  { id: "piloto",   num: "04", label: "Piloto",   first: "piloto"  },
];

const SECTION_TO_GROUP: Record<string, string> = {
  mercado: "problema", dolor: "problema",
  sala: "sistema", solucion: "sistema", flujo: "sistema",
  teoria: "modelo", modelo: "modelo", crm: "modelo",
  beneficios: "piloto", piloto: "piloto", manifiesto: "piloto",
};

const ALL_SECTIONS = [
  "hero","mercado","dolor","sala","solucion","flujo",
  "teoria","modelo","crm","beneficios","piloto","manifiesto",
];

export default function EditorialNav() {
  const [active, setActive] = useState("hero");
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const update = useCallback(() => {
    const hero = document.getElementById("hero");
    if (hero) setPastHero(hero.getBoundingClientRect().bottom < 60);

    for (const id of [...ALL_SECTIONS].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActive(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const activeGroup = SECTION_TO_GROUP[active] ?? "";

  return (
    <motion.div
      className="fixed left-0 right-0 z-40"
      style={{ top: 2 }}
      animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden={!pastHero}
    >
      <div
        style={{
          backgroundColor: "rgba(245,240,230,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(216,208,195,0.45)",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between"
          style={{ height: 52 }}
        >
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver al inicio"
            style={{ pointerEvents: pastHero ? "auto" : "none" }}
          >
            <BrandMark variant="default" animated={false} />
          </button>

          {/* Groups — desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {GROUPS.map((g) => {
              const isActive = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => scrollTo(g.first)}
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ opacity: isActive ? 1 : 0.32 }}
                >
                  <span
                    className="font-label text-[10px] tracking-[0.22em]"
                    style={{ color: "#1A6B4A" }}
                  >
                    {g.num}
                  </span>
                  <span
                    className="font-label text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: "#1A1A1A" }}
                  >
                    {g.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("piloto")}
              className="hidden lg:block font-label text-[11px] tracking-[0.14em] uppercase px-4 py-2 transition-all hover:opacity-85"
              style={{ backgroundColor: "#1A6B4A", color: "#F5F0E6" }}
              aria-label="Solicitar piloto"
            >
              Solicitar piloto
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: "#1A1A1A",
                  transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: "#1A1A1A",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: "#1A1A1A",
                  transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pb-6"
            style={{ borderTop: "1px solid rgba(216,208,195,0.4)" }}
          >
            {GROUPS.map((g) => (
              <div key={g.id} className="pt-4">
                <span
                  className="font-label text-[10px] tracking-[0.22em]"
                  style={{ color: "#1A6B4A" }}
                >
                  {g.num} {g.label.toUpperCase()}
                </span>
              </div>
            ))}
            <button
              onClick={() => scrollTo("piloto")}
              className="mt-5 w-full font-label text-[11px] tracking-[0.14em] uppercase py-3 text-center"
              style={{ backgroundColor: "#1A6B4A", color: "#F5F0E6" }}
            >
              Solicitar piloto
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
