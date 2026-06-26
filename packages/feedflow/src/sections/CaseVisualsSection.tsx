"use client";

import type { ReactNode } from "react";
import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";
import { cn } from "../lib/cn";

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
      reel={false}
      {...rest}
    >
      <div
        className={cn(
          "flex gap-4 overflow-x-auto pb-2",
          "snap-x snap-mandatory scrollbar-hide",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {cases.map((item) => (
          <article
            key={item.id}
            className="min-w-[72%] shrink-0 snap-start rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm"
          >
            {item.image ? (
              <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-black/5">
                {item.image}
              </div>
            ) : null}
            <p className="text-sm font-medium">{item.label}</p>
          </article>
        ))}
      </div>
    </MobileStorySection>
  );
}
