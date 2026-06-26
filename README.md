# FeedFlow

Monorepo del marco UX **FeedFlow** y del paquete React **`@escarlet/feedflow`**: experiencias web móviles con scroll vertical narrativo (scroll snap, secciones full-viewport), derivado de la especificación *Versión móvil Umbral* para proyectos Escarlet / Umbral.

## Estructura

| Ruta | Descripción |
|------|-------------|
| [`packages/feedflow`](packages/feedflow) | Librería `@escarlet/feedflow` (componentes, secciones, hooks, motion, CSS) |
| [`apps/demo`](apps/demo) | App Next.js 16 de demostración (puerto 3939) |
| [`.cursor/skills/feedflow-mobile-ux`](.cursor/skills/feedflow-mobile-ux/SKILL.md) | Cursor Agent Skill |
| [`.cursor/skills/feedflow-mobile-ux/reference.md`](.cursor/skills/feedflow-mobile-ux/reference.md) | Especificación en Markdown |
| [`docs/sources/version-movil-umbral.pdf`](docs/sources/version-movil-umbral.pdf) | PDF fuente |

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io) 9+

## Quickstart (desarrollo en este repo)

```bash
pnpm install
pnpm dev          # levanta apps/demo en http://localhost:3939
pnpm build        # construye paquete + demo
pnpm typecheck    # TypeScript en todo el workspace
```

Probar scroll snap: DevTools → modo móvil (&lt; 768px) o dispositivo real. Activar **prefers-reduced-motion** en el SO para ver animaciones simplificadas.

## Consumir desde otro proyecto Next.js

### 1. Dependencia

**Mismo monorepo pnpm** (`pnpm-workspace.yaml`):

```yaml
packages:
  - "packages/*"
  - "apps/*"
  - "../feedflow/packages/feedflow"   # o path al clone
```

En `apps/tu-app/package.json`:

```json
{
  "dependencies": {
    "@escarlet/feedflow": "workspace:*",
    "framer-motion": "^12.0.0"
  }
}
```

**Proyecto separado** (cuando el paquete esté publicado o vía `file:`):

```bash
pnpm add @escarlet/feedflow framer-motion
# desarrollo local: pnpm add @escarlet/feedflow@file:../feedflow/packages/feedflow
```

### 2. Estilos (recomendado en producción)

```css
/* globals.css */
@import "@escarlet/feedflow/styles.css";
```

El CSS aplica scroll snap en `body` bajo `max-width: 767px` para `main[data-feedflow]`, con variables `--feedflow-panel-h`, `--feedflow-header-inset`, `--feedflow-footer-inset`.

### 3. Página

```tsx
"use client";

import "@escarlet/feedflow/styles.css"; // o en globals.css
import {
  FeedFlowRoot,
  MobileScrollContainer,
  MobileStickyCTA,
  IntrigueSection,
  CTASection,
  // … resto de secciones
} from "@escarlet/feedflow";

export default function MobileLanding() {
  return (
    <>
      <MobileStickyCTA label="Contacto" href="#contacto" />
      <FeedFlowRoot smoothScroll={false}>
        <MobileScrollContainer>
          <IntrigueSection title="Tu titular" />
          {/* arco narrativo completo */}
          <CTASection title="¿Empezamos?" buttonLabel="Hablemos" buttonHref="#contacto" />
        </MobileScrollContainer>
      </FeedFlowRoot>
    </>
  );
}
```

`smoothScroll` requiere instalar `lenis` (o `@studio-freight/lenis`) en el proyecto consumidor.

### 4. Next.js

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ["@escarlet/feedflow"],
};
```

## API resumida

- **Layout:** `FeedFlowRoot`, `MobileScrollContainer`, `MobileFullSection`, `MobileStorySection`, `MobileStickyCTA`, `FeedFlowMotion`
- **Secciones:** `IntrigueSection`, `ProblemSection`, `SolutionSection`, `CaseVisualsSection`, `ProcessSection`, `CredibilitySection`, `CTASection`
- **Hooks:** `useReducedMotion`, `useFeedFlowViewport`, `useLenis`
- **Motion:** `fadeUpInView`, `fadeUpMotion`, `viewportOnce`, etc.

Ver exports en [`packages/feedflow/src/index.ts`](packages/feedflow/src/index.ts).

## Usar la skill en Cursor

### En este repositorio

La skill está en `.cursor/skills/feedflow-mobile-ux/`. Invócala en el chat:

- «Implementa la landing móvil con `@escarlet/feedflow`»
- «Monta el arco narrativo FeedFlow según la skill»

### En otros proyectos

```bash
mkdir -p ~/.cursor/skills
cp -R .cursor/skills/feedflow-mobile-ux ~/.cursor/skills/
```

## Roadmap

- [ ] Publicar `@escarlet/feedflow` en npm
- [ ] Migrar [_Landigs/umbral](https://github.com/escarletdesign/umbral) al paquete (fuera de alcance de la v0.1)
- [ ] GSAP / ScrollTrigger como extensión opcional

## Relación con otros skills

En sitios Next.js con analítica en la UE, combinar con `eu-cookie-consent` (consentimiento previo a scripts no esenciales).

## Licencia y origen

Especificación de diseño Escarlet/Umbral. Código del paquete bajo el monorepo feedflow (`escarletdesign/feedflow`).
