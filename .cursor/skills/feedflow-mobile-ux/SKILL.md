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
  );
}
```

Demo completa: `pnpm dev` en la raíz del repo feedflow (app en puerto **3939**).

## Exports públicos (`@escarlet/feedflow`)

| Categoría | Export |
|-----------|--------|
| Layout | `FeedFlowRoot`, `MobileScrollContainer`, `MobileFullSection`, `MobileStorySection`, `FeedFlowMotion` |
| Secciones preset | `IntrigueSection`, `ProblemSection`, `SolutionSection`, `CaseVisualsSection`, `ProcessSection`, `CredibilitySection`, `CTASection` |
| Hooks | `useReducedMotion`, `useFeedFlowViewport`, `useLenis` |
| Motion | `fadeUpMotion`, `fadeUpReduced`, `headlineReveal`, `viewportOnce`, `viewportReelPanel`, `fadeUpInView`, `transition`, `transitionFast` |
| Util | `cn`, `MOBILE_FULL_SECTION_CLASS` |
| Estilos | `@escarlet/feedflow/styles.css` → snap en `html` bajo `max-width: 767px` para `main[data-feedflow]`. Con Tailwind 4, `@source` tiene que apuntar al paquete; si no, sus clases no se generan. |

## Principios (no negociables)

1. **Mobile-first narrativo** — Cada sección es un “slide” en una historia vertical.
2. **Secciones full-viewport + scroll snap** — El scroll es el del documento. Reglas de campo abajo; pisan al PDF si chocan.
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
| `MobileStickyCTA` | No usar: una barra `fixed` tapa la última línea. El botón va dentro de la sección (`CTASection`). |
| `FeedFlowMotion` | Wrapper `whileInView` con reduced motion |

**Desktop:** sin feed. El CSS del snap vive en `max-width: 767px`. Al salir de móvil se quitan listeners de `visualViewport` y las variables de alto.

## Arco narrativo (orden típico Umbral)

1. **Intrigue** — `IntrigueSection`
2. **Problema** — `ProblemSection`
3. **Solución** — `SolutionSection`
4. **Casos** — `CaseVisualsSection`
5. **Proceso** — `ProcessSection`
6. **Credibilidad** — `CredibilitySection`
7. **CTA** — `CTASection`

## Reglas de campo

Estas reglas pisan a [reference.md](reference.md) cuando chocan (`100vh`, contenedor con scroll propio).

### Feed

- Cada sección ocupa el alto visible. `scroll-snap-type: y mandatory` en `html`. La sección no tiene scroll propio: nada de `overflow-y: auto` ahí.
- Alto: `100svh` de reserva y `100dvh` o el alto de `visualViewport` como valor real. `100svh` se queda corto cuando la barra del navegador se esconde.
- Al cambiar el alto, la sección actual es `round(scrollY / alto anterior)`. `scrollTo(índice * alto nuevo)` cuando el gesto terminó (`scrollend`, o un timeout si `scrollY` no se movió). Corregir con el dedo puesto cancela el cambio de sección.
- Un header `fixed` usa `visualViewport.offsetTop` (`--feedflow-vv-top`). Si no, al esconderse la barra queda despegado.
- `viewport-fit=cover` y `padding-bottom: env(safe-area-inset-bottom)`. La barra del navegador no es el safe area. El home indicator sí.
- `scroll-padding-top: 0` en el feed. Un padding global, aunque sea de una capa CSS, enseña una tira de la sección anterior.
- No forzar `scrollTo(0)` al entrar ni retrasar la clase de snap. La primera visita tiene que encajar desde el primer gesto.
- En el router, si no hay navegación previa (`!from.name`), no fuerces `top: 0`. Pisa la posición al recargar.
- El orden del DOM en móvil es el orden visual. `order` de flex en móvil hace que al recargar el snap caiga en otra sección. En escritorio, `order` solo desde `min-width`.

### Carriles

- El carril (`.feedflow-rail`) es `overflow-x: auto` y `overflow-y: clip`. `hidden` en Y corta la base de las cards.
- Hijos: `flex: 0 0 86%`, `align-self: stretch`, `height: auto`. Un `h-full` impide que estiren y queden a la misma altura.
- Snap del hijo solo en X: `scroll-snap-align: none center`. `center` en los dos ejes secuestra el snap vertical.
- Sin `scroll-snap-stop` en los hijos del carril.
- No poner todas las secciones en horizontal. Alternar carril y bloque. Un bloque largo puede ser 2 pantallas. En escritorio, el wrapper `[data-feedflow-join]` vuelve a una sola rejilla con `display: contents`.

### Dentro de la pantalla

- La sección es flex en columna, `justify-content: center`, con padding superior del header fijo (`--feedflow-header-inset`). El contenido queda centrado en lo que queda debajo del header.
- El botón va dentro de la sección. Uno fijo encima del feed tapa la última línea.
- Una card sin foto rellena con un degradado del mismo tono que el fondo. El cuerpo es `flex: 1`. Si es más corto que la card, asoma una línea del fondo.
- Preguntas en una sola pantalla: lista arriba y abajo una zona de respuesta que cambia con la selección. Animación corta, salvo si `prefers-reduced-motion` apaga las animaciones.
- El selector de idioma en un menú en columna va con `self-start`. `mx-auto` lo centra. Sin ancho fijo se estira a todo el ancho.
- El color de texto de un botón claro se define en el botón, por superficie. Un color global más oscuro cambia botones que tenían que llevar el color de marca.

### Build

- Sin `await` en la raíz del módulo si el target es `es2020` / Chrome 87. Un idioma u otro chunk diferido se carga con `import().then()`. El idioma por defecto sigue siendo síncrono.

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
