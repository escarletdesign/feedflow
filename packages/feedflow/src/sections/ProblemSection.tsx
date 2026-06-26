"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type ProblemSectionProps = MobileStorySectionProps & {
  title: string;
};

export function ProblemSection({ title, id = "problema", tone = "muted", ...rest }: ProblemSectionProps) {
  return (
    <MobileStorySection id={id} title={title} align="start" tone={tone} {...rest} />
  );
}
