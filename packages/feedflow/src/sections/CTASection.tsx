"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type CTASectionProps = MobileStorySectionProps & {
  title: string;
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
};

export function CTASection({
  title,
  buttonLabel,
  buttonHref = "#contacto",
  onButtonClick,
  subtitle,
  id = "contacto",
  tone = "dark",
  ...rest
}: CTASectionProps) {
  return (
    <MobileStorySection
      id={id}
      title={title}
      subtitle={subtitle}
      align="center"
      tone={tone}
      {...rest}
    >
      {buttonHref && !onButtonClick ? (
        <a
          href={buttonHref}
          className="inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--feedflow-dark,#111)] shadow-md"
        >
          {buttonLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--feedflow-dark,#111)] shadow-md"
        >
          {buttonLabel}
        </button>
      )}
    </MobileStorySection>
  );
}
