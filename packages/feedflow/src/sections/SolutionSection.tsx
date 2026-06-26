"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type SolutionSectionProps = MobileStorySectionProps & {
  title: string;
};

export function SolutionSection({ title, id = "solucion", tone = "default", ...rest }: SolutionSectionProps) {
  return (
    <MobileStorySection id={id} title={title} align="start" tone={tone} {...rest} />
  );
}
