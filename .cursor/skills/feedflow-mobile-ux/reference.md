# FeedFlow UX Framework — Especificación completa

> Extraído de *Versión móvil Umbral.pdf* (FeedFlow UX Framework: Specifications).

## Contexto y propósito

La web pasa de centrada en desktop a consumo **mobile-first**. La mayoría de usuarios sostiene el teléfono en vertical e interactúa con contenido tipo feed. Apps como TikTok han normalizado scroll vertical infinito y formatos cortos; esos patrones empiezan a influir en sitios web.

No existe aún un estándar consolidado para experiencias narrativas tipo feed en webs móviles. Muchas guías desaconsejan vídeo vertical en web por retos de diseño. Patrones como **CSS scroll snap** ofrecen bloques para navegación por secciones a pantalla completa, pero falta un marco UX unificado.

**FeedFlow** cubre ese hueco: marco de diseño y desarrollo para webs móviles narrativas con scroll vertical, inspiradas en feeds sociales, combinando design thinking, UX, accesibilidad y tecnologías web actuales.

## Principios clave

1. **Mobile-first narrative flow** — La experiencia móvil es un producto distinto, no solo adaptación responsive. Contenido secuencial; cada sección actúa como “slide” en una historia vertical.

2. **Full-viewport sections with scroll snap** — Cada segmento ocupa ~100vh; `scroll-snap-type: y mandatory` alinea secciones en el viewport (swipe de pantalla en pantalla).

3. **Sequential storytelling** — Fragmentos digeribles: frases, imágenes y microinteracciones en arco intriga → problema → solución → ejemplos → credibilidad → CTA.

4. **Micro interactions and motion** — Animaciones sutiles (fade in, slide up, parallax) con Framer Motion o GSAP; respetar `prefers-reduced-motion`.

5. **Strong typography and minimal copy** — Titulares grandes y líneas cortas; evitar párrafos largos.

6. **Ethical engagement** — Mecánicas de engagement sin patrones adictivos; evitar scroll infinito manipulativo; endpoints y CTAs claros.

7. **Accessibility and performance** — WCAG: teclado, lectores de pantalla, modo reduced motion; optimizar imágenes (`next/image`); minimizar scripts bloqueantes.

## Implementación — visión general

### 1. Evaluar contenido existente

- Catalogar secciones y componentes del sitio desktop.
- Identificar mensajes y assets (copy, imágenes, vídeo) a preservar.
- Decidir qué reestructurar o condensar para el flujo narrativo móvil.

### 2. Preparar stack técnico

- **Base:** Next.js (ya en el proyecto).
- **Reutilizar si existen:** `framer-motion`, `gsap` + ScrollTrigger, `@studio-freight/lenis`.
- **Instalar solo si faltan y hacen falta** (evitar 3D pesado salvo necesidad):

```bash
npm install framer-motion @studio-freight/lenis gsap
```

### 3. Componentes de layout núcleo

| Componente | Detalle |
|------------|---------|
| `MobileFullSection` | `height: 100vh`, `scroll-snap-align: start`, fondo opcional |
| `MobileScrollContainer` | `overflow-y: scroll`, `scroll-snap-type: y mandatory`; opcional Lenis |
| `MobileStorySection` | Props: texto, media, opciones de animación; variantes de layout |
| `MobileStickyCTA` | CTA inferior o al final del flujo tras pasos clave |

Breakpoints: layout FeedFlow solo en pantallas pequeñas (`max-width: md`); desktop actual por encima.

### 4. Construir narrativa móvil

Transformar secciones desktop en bloques FeedFlow:

| Bloque | Contenido |
|--------|-----------|
| Intrigue | Afirmación o pregunta fuerte; tipografía grande, poco texto |
| Problem | Dolor o gap que aborda el servicio |
| Solution | Propuesta de valor concisa |
| Case visuals | Proyectos/resultados; scroll horizontal dentro del flujo si aplica |
| Process | Timeline vertical con pasos y animación sutil |
| Credibility | Testimonios o credenciales minimalistas |
| CTA | Invitación clara (ej. “¿Tu proyecto parece uno más?” + botón) |

Alternar fondos y motion; variants de Framer Motion para fade-in / slide-up al entrar en viewport.

### 5. Interactividad y motion

- Contenedor envuelto en Lenis para inercia suave (opcional).
- Scroll snap CSS como snap principal.
- Intersection Observer o ScrollTrigger para animaciones al entrar en vista.
- `prefers-reduced-motion`: desactivar o simplificar animaciones.

Ejemplo de sección (del documento original):

```tsx
import { motion } from "framer-motion";

export function IntrigueSection() {
  return (
    <section className="flex h-screen scroll-snap-start items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold"
      >
        Los proyectos inmobiliarios no se venden. Se perciben.
      </motion.h1>
    </section>
  );
}
```

### 6. Accesibilidad y pruebas

- `tabIndex` y controles de teclado en elementos interactivos.
- `aria-label` en CTAs y pistas de navegación.
- Skip links si procede.
- Pruebas con lectores de pantalla y dispositivos físicos (iOS, Android).
- Validar que el scroll no atrape foco ni cause problemas de orientación.

### 7. Estructura de repositorio sugerida (implementación de componentes)

```
/feedflow-ux/
  README.md
  /components/
    MobileFullSection.jsx
    MobileScrollContainer.jsx
    MobileStorySection.jsx
    MobileStickyCTA.jsx
  /sections/
    IntrigueSection.jsx
    ProblemSection.jsx
    ...
  /styles/
    globals.css
    feedflow.css
  /lib/
    useLenis.tsx
```

Incluir página de ejemplo (`pages/mobile.tsx` o ruta App Router equivalente), guía de personalización de marca (color, tipografía, espaciado).

### 8. Contribución

- PRs con descripción clara.
- ESLint + Prettier.
- Pruebas en varios dispositivos antes de merge.
- Documentar cambios en patrones de interacción núcleo.

### 9. Consideraciones éticas y legales

- Evitar bucles de scroll infinito que oculten el final.
- Navegación clara y posibilidad de volver a secciones anteriores.
- Cumplimiento WCAG 2.1, privacidad y RGPD según jurisdicción.

### 10. Direcciones futuras

- Visualizaciones de datos interactivas y contenido en tiempo real.
- Integración CMS para autoría de secciones FeedFlow sin código.
- Feedback de usuarios para refinar patrones.

## Conclusión

FeedFlow traduce mecánicas de feeds sociales en experiencias web móviles **éticas y narrativas**, con scroll snap, storytelling y herramientas front-end modernas, respetando al usuario y reforzando la marca.

## Referencias externas (documento original)

- [The Rise of Vertical Storytelling — Atilus](https://atilus.com/vertical-storytelling/)
- [How TikTok's Addicting UX is Influencing Website and App Design — Medium](https://medium.com/design-bootcamp/how-tiktoks-addicting-ux-is-subtly-influencing-website-and-app-design-60c535786f44)
- [Scrolling Designs: 8 Patterns — Lovable](https://lovable.dev/guides/scrolling-designs-patterns-when-to-use)
