"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type MobileFullSectionTone = "default" | "muted" | "dark" | "accent";

export type MobileFullSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: MobileFullSectionTone;
  /** One viewport panel (default). Set false for a section taller than one screen. */
  reel?: boolean;
  minHeightClassName?: string;
};

export const MOBILE_FULL_SECTION_CLASS = "shrink-0 box-border";

const toneClass: Record<MobileFullSectionTone, string> = {
  default: "bg-[var(--feedflow-bg,transparent)]",
  muted: "bg-[var(--feedflow-muted,#f3f4f6)]",
  dark: "bg-[var(--feedflow-dark,#111)] text-[var(--feedflow-dark-fg,#fafafa)]",
  accent: "bg-[var(--feedflow-accent,#e8e0d5)]",
};

/**
 * One full-viewport “screen” in the vertical story (PDF: MobileFullSection).
 */
export function MobileFullSection({
  children,
  className,
  id,
  tone = "default",
  reel = true,
  minHeightClassName,
}: MobileFullSectionProps) {
  return (
    <section
      id={id}
      data-feedflow-tall={reel ? undefined : ""}
      className={cn(
        "relative flex w-full flex-col justify-center px-5 sm:px-6 md:py-14",
        "max-md:snap-start max-md:snap-always feedflow-full-section",
        minHeightClassName ?? MOBILE_FULL_SECTION_CLASS,
        toneClass[tone],
        className,
      )}
    >
      <div className="relative z-[1] mx-auto w-full max-w-lg">{children}</div>
    </section>
  );
}
