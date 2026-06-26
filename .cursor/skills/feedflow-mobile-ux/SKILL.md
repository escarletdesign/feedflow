---
name: feedflow-mobile-ux
description: >-
  FeedFlow UX framework for mobile-first vertical narrative websites (scroll snap,
  full-viewport sections, Umbral-style storytelling). Use when building or refactoring
  mobile feed-like landing pages with @escarlet/feedflow, implementing
  MobileFullSection/MobileScrollContainer, vertical story sections (intrigue, problem,
  solution, CTA), Lenis/Framer Motion scroll UX, or applying the Escarlet/Umbral mobile web spec.
---

# FeedFlow — UX móvil narrativo

Marco de diseño y desarrollo para webs móviles con scroll vertical tipo feed, inspirado en patrones sociales pero con narrativa ética y fin claro.

**Implementación en este monorepo:** paquete npm workspace `@escarlet/feedflow` + demo en `apps/demo`.

## Cuándo aplicar

- Nueva experiencia móvil distinta del desktop (no solo responsive).
- Landing o página de marca con secciones ~100vh y `scroll-snap`.
- Proyecto Next.js (Umbral y similares) que pida bloques: intriga → problema → solución → casos → proceso → credibilidad → CTA.

## Instalación (consumidor Next.js)

En un monorepo pnpm (recomendado):

```bash
pnpm add @escarlet/feedflow framer-motion
```

En otro repo vía Git (hasta publicar en npm):

```bash
pnpm add @escarlet/feedflow@workspace:* framer-motion
# o: pnpm add github:escarletdesign/feedflow#main --filter tu-app
```

Peer dependencies: `react`, `react-dom`, `framer-motion` (requeridos). Opcionales: `lenis` o `@studio-freight/lenis` (solo si activas `smoothScroll`).

## Quickstart

```tsx
// app/layout.tsx o globals.css
import "@escarlet/feedflow/styles.css";

// app/page.tsx
"use client";

import {
  FeedFlowRoot,
  MobileScrollContainer,
  MobileStickyCTA,
  IntrigueSection,
  ProblemSection,
  SolutionSection,
  CaseVisualsSection,
  ProcessSection,
  CredibilitySection,
  CTASection,
} from "@escarlet/feedflow";

export default function Page() {
  return (
    <>
      <MobileStickyCTA label="Contacto" href="#contacto" />
      <FeedFlowRoot>
        <MobileScrollContainer>
          <IntrigueSection title="Tu titular de intriga" />
          <ProblemSection title="El problema" subtitle="Breve" />
          <SolutionSection title="La solución" />
          <CaseVisualsSection cases={[{ id: "1", label: "Caso A" }]} />
          <ProcessSection steps={[{ title: "Paso 1" }]} />
          <CredibilitySection items={[{ quote: "Testimonio", author: "Nombre" }]} />
          <CTASection
            title="¿Listo?"
            buttonLabel="Hablemos"
            buttonHref="#contacto"
          />
        </MobileScrollContainer>
      </FeedFlowRoot>
    </>
  );
}
```

Demo completa: `pnpm dev` en la raíz del repo feedflow (app en puerto **3939**).

## Exports públicos (`@escarlet/feedflow`)

| Categoría | Export |
|-----------|--------|
| Layout | `FeedFlowRoot`, `MobileScrollContainer`, `MobileFullSection`, `MobileStorySection`, `MobileStickyCTA`, `FeedFlowMotion` |
| Secciones preset | `IntrigueSection`, `ProblemSection`, `SolutionSection`, `CaseVisualsSection`, `ProcessSection`, `CredibilitySection`, `CTASection` |
| Hooks | `useReducedMotion`, `useFeedFlowViewport`, `useLenis` |
| Motion | `fadeUpMotion`, `fadeUpReduced`, `headlineReveal`, `viewportOnce`, `viewportReelPanel`, `fadeUpInView`, `transition`, `transitionFast` |
| Util | `cn`, `MOBILE_FULL_SECTION_CLASS` |
| Estilos | `@escarlet/feedflow/styles.css` → snap en `body` bajo `max-width: 767px` para `main[data-feedflow]` |

## Principios (no negociables)

1. **Mobile-first narrativo** — Cada sección es un “slide” en una historia vertical.
2. **Secciones full-viewport + scroll snap** — CSS recomendado vía `styles.css`; clases Tailwind `snap-start` + `h-[100svh]` sin CSS.
3. **Copy mínimo** — Titulares grandes; evitar párrafos largos.
4. **Motion con respeto** — Framer Motion; siempre `useReducedMotion` / `prefers-reduced-motion`.
5. **Engagement ético** — Sin scroll infinito manipulativo; CTA y cierre claros.
6. **A11y y rendimiento** — Teclado, ARIA en CTAs, imágenes optimizadas.

## Stack recomendado

| Capa | Herramienta |
|------|-------------|
| Framework | Next.js (App Router) |
| Paquete | `@escarlet/feedflow` |
| Animación | `framer-motion` (peer) |
| Scroll suave | `lenis` (opcional, `smoothScroll` en `FeedFlowRoot`) |
| Estilos | Tailwind + `import "@escarlet/feedflow/styles.css"` |

## Componentes núcleo

| Componente | Responsabilidad |
|------------|-----------------|
| `FeedFlowRoot` | `main[data-feedflow]`; viewport CSS vars; `smoothScroll` opcional |
| `MobileScrollContainer` | Contenedor snap o delegación al `body` (modo por defecto con CSS) |
| `MobileFullSection` | Panel full-viewport, tonos de fondo |
| `MobileStorySection` | Layout flexible título + media + children |
| `MobileStickyCTA` | Barra inferior `data-feedflow-cta` |
| `FeedFlowMotion` | Wrapper `whileInView` con reduced motion |

**Desktop:** FeedFlow activo solo en móvil (`max-width: 767px` en CSS); layout desktop aparte.

## Arco narrativo (orden típico Umbral)

1. **Intrigue** — `IntrigueSection`
2. **Problema** — `ProblemSection`
3. **Solución** — `SolutionSection`
4. **Casos** — `CaseVisualsSection`
5. **Proceso** — `ProcessSection`
6. **Credibilidad** — `CredibilitySection`
7. **CTA** — `CTASection`

## Checklist de implementación

1. Inventariar contenido desktop → bloques narrativos.
2. Importar `@escarlet/feedflow/styles.css` y montar `FeedFlowRoot` + secciones.
3. Lenis solo si `smoothScroll` y el paquete `lenis` está instalado.
4. Probar iOS/Android, reduced motion, teclado.
5. Validar foco al hacer snap.

## Checklist legal/ético

- [ ] Fin de contenido visible (no bucle infinito).
- [ ] Navegación para volver atrás o salir del flujo.
- [ ] WCAG 2.1; RGPD/cookies si hay tracking (skill `eu-cookie-consent` en proyectos UE).

## Documentación extendida

Especificación completa: [reference.md](reference.md)

Fuente PDF: `docs/sources/version-movil-umbral.pdf`

Código de referencia en producción (no migrado aún): repositorio Umbral (`MobileImmersiveSection`, reel móvil).
