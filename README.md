# Deriva

Landing editorial de Deriva, construida como una experiencia de scrollytelling. En vez de una página de marketing convencional, el sitio desarrolla un argumento por escenas: el problema de la información rota en los equipos comerciales, el costo de las promesas mal calificadas, y el mecanismo propuesto para resolverlo.

## Estructura narrativa

Cada componente en `src/components/` es una escena del recorrido:

| Componente | Rol en la narrativa |
|---|---|
| `HeroSignalSystem` | Apertura — el sistema de señales |
| `BrokenInformationMap` | El diagnóstico: información fragmentada |
| `CostPromiseBottleneck` | El costo de prometer sin calificar |
| `MarketClarityScene` | Claridad de mercado |
| `DemandQualificationMechanism` | El mecanismo de calificación de demanda |
| `SignalGameMatrix` | Matriz de señales |
| `CRMTraceSystem` | Trazabilidad en CRM |
| `SalesRoomExperience` | La sala de ventas |
| `VariableCostContract` | Modelo de contrato variable |
| `PilotValidationRoadmap` | Roadmap de validación del piloto |
| `FinalManifesto` | Cierre |

`OperationalScrollytelling`, `EditorialNav` y `ReadingProgress` sostienen la mecánica de lectura.

## Stack

- **Next.js** (App Router) + React + TypeScript
- **Tailwind CSS**
- **Motion** para las transiciones ligadas al scroll

## Desarrollo

```bash
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Linter |
