"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type ProcessStep = { title: string; description?: string };

export type ProcessSectionProps = MobileStorySectionProps & {
  title?: string;
  steps: ProcessStep[];
};

export function ProcessSection({
  title = "Cómo trabajamos",
  steps,
  id = "proceso",
  tone = "muted",
  reel = false,
  ...rest
}: ProcessSectionProps) {
  return (
    <MobileStorySection
      id={id}
      title={title}
      align="start"
      tone={tone}
      reel={reel}
      {...rest}
    >
      <ol className="flex flex-col gap-6 border-l-2 border-[var(--feedflow-accent,#9a7653)] pl-5">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-[1.65rem] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--feedflow-accent,#9a7653)] text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="font-semibold">{step.title}</p>
            {step.description ? (
              <p className="mt-1 text-sm text-[var(--feedflow-muted-fg,rgba(0,0,0,0.55))]">
                {step.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </MobileStorySection>
  );
}
