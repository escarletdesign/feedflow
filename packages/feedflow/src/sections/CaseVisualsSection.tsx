"use client";

import type { CSSProperties, ReactNode } from "react";
import type { MobileFullSectionTone } from "../components/MobileFullSection";
import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";
import { cn } from "../lib/cn";

const RAIL_TONE: Record<MobileFullSectionTone, string> = {
  default: "var(--feedflow-bg, #faf9f6)",
  muted: "var(--feedflow-muted, #f3f4f6)",
  dark: "var(--feedflow-dark, #111)",
  accent: "var(--feedflow-accent, #e4ddd2)",
};

export type CaseVisualsSectionProps = MobileStorySectionProps & {
  title?: string;
  cases: { id: string; label: string; image?: ReactNode }[];
};

export function CaseVisualsSection({
  title = "Proyectos que hablan solos",
  cases,
  id = "casos",
  tone = "accent",
  ...rest
}: CaseVisualsSectionProps) {
  return (
    <MobileStorySection
      id={id}
      title={title}
      align="start"
      tone={tone}
      {...rest}
    >
      <div
        className="feedflow-rail"
        style={{ "--feedflow-rail-tone": RAIL_TONE[tone] } as CSSProperties}
      >
        {cases.map((item) => (
          <article
            key={item.id}
            className={cn(
              "rounded-2xl border border-black/10 p-4 shadow-sm",
              item.image ? "bg-white/80" : "feedflow-rail-plain",
            )}
          >
            {item.image ? (
              <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-black/5">
                {item.image}
              </div>
            ) : null}
            <p className="feedflow-rail-body text-sm font-medium">{item.label}</p>
          </article>
        ))}
      </div>
    </MobileStorySection>
  );
}
