"use client";

import {
  CaseVisualsSection,
  CredibilitySection,
  CTASection,
  FeedFlowRoot,
  IntrigueSection,
  MobileScrollContainer,
  ProblemSection,
  ProcessSection,
  SolutionSection,
} from "@escarlet/feedflow";

const CASES = [
  { id: "1", label: "Residencial Costa — lanzamiento 2024" },
  { id: "2", label: "Torre urbana — posicionamiento premium" },
  { id: "3", label: "Desarrollo mixto — narrativa de marca" },
];

export default function DemoPage() {
  return (
    <>
      <header
        className="fixed inset-x-0 z-40 border-b border-black/10 bg-[var(--feedflow-bg)]/90 px-4 py-3 backdrop-blur md:hidden"
        style={{ top: "var(--feedflow-vv-top, 0px)" }}
      >
        <p className="text-center text-xs font-semibold tracking-wide text-[var(--feedflow-dark)]">
          FEEDFLOW DEMO
        </p>
      </header>

      <FeedFlowRoot>
        <MobileScrollContainer>
          <IntrigueSection title="Los proyectos inmobiliarios no se venden. Se perciben." />

          <ProblemSection
            title="Tu web explica, pero no emociona"
            subtitle="En móvil, el usuario desliza sin detenerse. Si no hay ritmo ni historia, el mensaje se pierde."
          />

          <SolutionSection
            title="FeedFlow: narrativa vertical con scroll snap"
            subtitle="Cada pantalla es un capítulo. Copy mínimo, motion ético y CTA claro al final del recorrido."
          />

          <CaseVisualsSection cases={CASES} />

          <ProcessSection
            steps={[
              { title: "Auditoría de contenido", description: "Qué conservar del desktop." },
              { title: "Arquitectura narrativa", description: "Intriga → problema → solución." },
              { title: "Implementación", description: "Componentes @escarlet/feedflow." },
            ]}
          />

          <CredibilitySection
            items={[
              {
                quote: "Por fin una experiencia móvil que se siente pensada, no comprimida.",
                author: "Director de marketing",
                role: "Promotora inmobiliaria",
              },
            ]}
          />

          <CTASection
            title="¿Tu proyecto parece uno más?"
            subtitle="Construyamos una historia vertical que refleje lo que realmente vendes."
            buttonLabel="Agendar conversación"
            buttonHref="#contacto"
          />
        </MobileScrollContainer>
      </FeedFlowRoot>
    </>
  );
}
