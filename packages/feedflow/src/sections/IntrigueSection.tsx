"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type IntrigueSectionProps = Omit<MobileStorySectionProps, "heroTitle"> & {
  title: string;
};

export function IntrigueSection({ title, id = "inicio", tone = "default", ...rest }: IntrigueSectionProps) {
  return (
    <MobileStorySection
      id={id}
      title={title}
      heroTitle
      align="center"
      tone={tone}
      {...rest}
    />
  );
}
