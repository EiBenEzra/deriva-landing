// ── Hero signal network ─────────────────────────────────────────────────────
export const HERO_SIGNAL_DOTS: {
  id: string; x: number; y: number; delay: number; featured?: boolean;
}[] = [
  { id: "h1",  x: 28,  y: 22,  delay: 0.05 },
  { id: "h2",  x: 72,  y: 12,  delay: 0.15 },
  { id: "h3",  x: 12,  y: 88,  delay: 0.08 },
  { id: "h4",  x: 95,  y: 55,  delay: 0.22 },
  { id: "h5",  x: 18,  y: 158, delay: 0.12 },
  { id: "h6",  x: 60,  y: 195, delay: 0.30 },
  { id: "h7",  x: 38,  y: 270, delay: 0.18 },
  { id: "h8",  x: 88,  y: 302, delay: 0.35 },
  { id: "h9",  x: 45,  y: 340, delay: 0.10 },
  { id: "h10", x: 108, y: 120, delay: 0.25, featured: true },
  { id: "h11", x: 118, y: 240, delay: 0.20 },
  { id: "h12", x: 10,  y: 320, delay: 0.40 },
];

// ── Market actors ───────────────────────────────────────────────────────────
export const MARKET_ACTORS = [
  {
    id: "comprador",
    label: "Comprador / Inversionista",
    pain: "Busca sin información real sobre su capacidad. Evalúa proyectos sin punto de comparación.",
    cx: 22, cy: 38,
  },
  {
    id: "inmobiliaria",
    label: "Inmobiliaria",
    pain: "Recibe leads sin contexto. Ejecutivos esperan. Sala subutilizada.",
    cx: 78, cy: 38,
  },
  {
    id: "banco",
    label: "Banco / Hipoteca",
    pain: "Evalúa cuando el comprador ya firmó promesa. Señal tardía.",
    cx: 50, cy: 78,
  },
];

// ── Funnel stages ───────────────────────────────────────────────────────────
export const FUNNEL_STAGES = [
  { id: "captura",  label: "Leads capturados", volume: 100, pct: 100 },
  { id: "contacto", label: "Contactados",       volume: 40,  pct: 40  },
  { id: "reunion",  label: "Reuniones",          volume: 15,  pct: 15  },
  { id: "visita",   label: "Visitas",            volume: 5,   pct: 5   },
  { id: "reserva",  label: "Reservas",           volume: 2,   pct: 2   },
  { id: "promesa",  label: "Promesas",           volume: 1,   pct: 1   },
];

// ── Operational steps ───────────────────────────────────────────────────────
export const OPERATIONAL_STEPS = [
  { id: 1, phase: "Captación",           desc: "Campañas digitales segmentadas por zona, tipo y rango de inversión.",              paid: false },
  { id: 2, phase: "Diagnóstico",         desc: "Evaluación de capacidad estimada: ahorro, deuda, flujo mensual.",                  paid: false },
  { id: 3, phase: "Matching",            desc: "Proyectos compatibles según capacidad, zona y tipología buscada.",                 paid: false },
  { id: 4, phase: "Asesoría consultiva", desc: "El comprador entiende el proceso antes de entrar a la sala de ventas.",           paid: false },
  { id: 5, phase: "Derivación",          desc: "El lead llega con contexto, capacidad estimada y proyecto preferido.",            paid: true  },
  { id: 6, phase: "Registro CRM",        desc: "ID de atribución, canal, timestamp. La trazabilidad comienza aquí.",             paid: false },
  { id: 7, phase: "Seguimiento",         desc: "Los estados avanzan en el CRM: visita, reserva, promesa, escritura.",            paid: false },
  { id: 8, phase: "Facturación",         desc: "El fee se activa cuando el hito existe y queda trazado en el CRM.",              paid: true  },
];

// ── Game quadrants ──────────────────────────────────────────────────────────
export const GAME_QUADRANTS = [
  { id: "ruido",     label: "Ruido",              desc: "Alta intención, baja capacidad. Interés sin respaldo económico.",      qx: 0, qy: 0, color: "#C86B4A" },
  { id: "dormido",   label: "Potencial dormido",  desc: "Alta capacidad, baja intención. No sabe que puede comprar.",          qx: 1, qy: 0, color: "#C8A84B" },
  { id: "deseo",     label: "Deseo sin viabilidad", desc: "Baja capacidad, baja intención. No es el momento aún.",            qx: 0, qy: 1, color: "#D8D0C3" },
  { id: "derivable", label: "Lead derivable",     desc: "Alta capacidad + alta intención. Listo para sala de ventas.",        qx: 1, qy: 1, color: "#1A6B4A" },
];

// ── Revenue milestones ──────────────────────────────────────────────────────
export const REVENUE_MILESTONES = [
  { id: "lead",       label: "Lead calificado",    fee: null,   evidence: "Diagnóstico completado",        paid: false },
  { id: "reunion",    label: "Reunión asistida",   fee: null,   evidence: "Ejecutivo confirma asistencia", paid: false },
  { id: "derivacion", label: "Derivación aceptada", fee: 15000, evidence: "Registro CRM + timestamp",      paid: true  },
  { id: "visita",     label: "Visita concretada",  fee: 25000,  evidence: "Confirmación ejecutivo + CRM",  paid: true  },
  { id: "reserva",    label: "Reserva",            fee: 60000,  evidence: "Documento de reserva firmado",  paid: true  },
  { id: "promesa",    label: "Promesa",            fee: 120000, evidence: "Contrato + notaría",            paid: true  },
];

// ── CRM ─────────────────────────────────────────────────────────────────────
export const CRM_COLUMNS = [
  "Lead", "Contactado", "Reunión", "Visita", "Reserva", "Promesa", "Escritura",
];

export const CRM_FEATURED = {
  id: "D-0047",
  name: "Andrés M.",
  channel: "Deriva",
  project: "Torres del Pacífico",
  range: "3.500 – 4.200 UF",
  executive: "Paula R.",
  dateIn: "14 Jun",
};

// ── Pilot ───────────────────────────────────────────────────────────────────
export const PILOT_PHASES = [
  {
    id: "config",
    label: "Configuración",
    weeks: "Sem 1–2",
    color: "#D8D0C3",
    textColor: "#1A1A1A",
    items: ["Acceso a CRM", "Briefing de proyectos", "Perfil objetivo y rangos", "Setup de campañas"],
  },
  {
    id: "operacion",
    label: "Operación",
    weeks: "Sem 3–8",
    color: "#1A6B4A",
    textColor: "#F5F0E6",
    items: ["Captación activa", "Diagnósticos semanales", "Derivaciones a sala", "Reporte quincenal"],
  },
  {
    id: "validacion",
    label: "Validación",
    weeks: "Sem 9–12",
    color: "#C8A84B",
    textColor: "#1A1A1A",
    items: ["Análisis tasa lead→visita", "Costo por hito trazable", "NPS de compradores", "Decisión de continuidad"],
  },
];

export const PILOT_METRICS = [
  "CPL calificado",
  "Tasa lead → visita",
  "Tasa de aceptación por ejecutivo",
  "NPS del proceso de asesoría",
  "Reservas y promesas atribuibles",
  "Tiempo promedio lead → visita",
];

// ── Benefits ────────────────────────────────────────────────────────────────
export const INMOBILIARIA_BENEFITS = [
  "Menos leads sin contexto.",
  "Mayor uso de sala de ventas.",
  "Costo variable por hito.",
  "Trazabilidad por canal.",
  "Ejecutivos enfocados en compradores reales.",
  "Mejor lectura del costo por promesa.",
];

export const COMPRADOR_BENEFITS = [
  "Conoce su capacidad real antes de entrar al proceso.",
  "Compara proyectos compatibles con su rango e intención.",
  "Llega a la sala de ventas con contexto, no con preguntas.",
  "Toma decisiones de compra o inversión con información trazada.",
];
