"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type MobileFullSectionTone = "default" | "muted" | "dark" | "accent";

export type MobileFullSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: MobileFullSectionTone;
  /** Fixed 100svh reel panel (default). Set false for tall scrollable sections. */
  reel?: boolean;
  minHeightClassName?: string;
};

export const MOBILE_FULL_SECTION_CLASS =
  "min-h-[100svh] h-[100svh] shrink-0 box-border";

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
  const heightClass = minHeightClassName ?? (reel ? MOBILE_FULL_SECTION_CLASS : "min-h-[100svh]");

  return (
    <section
      id={id}
      data-feedflow-tall={reel ? undefined : ""}
      className={cn(
        "relative flex w-full flex-col justify-center px-5 py-14 sm:px-6",
        "max-md:snap-start max-md:snap-always feedflow-full-section",
        heightClass,
        toneClass[tone],
        className,
      )}
    >
      <div className="relative z-[1] mx-auto w-full max-w-lg">{children}</div>
    </section>
  );
}
