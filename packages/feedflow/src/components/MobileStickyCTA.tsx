"use client";

import { cn } from "../lib/cn";

export type MobileStickyCTAProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Shown on md+ only if set */
  desktopHidden?: boolean;
};

export function MobileStickyCTA({
  label,
  href,
  onClick,
  className,
  desktopHidden = true,
}: MobileStickyCTAProps) {
  const base = cn(
    "fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[var(--feedflow-cta-bg,#faf9f6)]/95 px-4 py-3 backdrop-blur-md",
    desktopHidden && "md:hidden",
    className,
  );

  const buttonClass =
    "flex w-full items-center justify-center rounded-full bg-[var(--feedflow-cta-fg,#1a3d33)] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90";

  if (href) {
    return (
      <div data-feedflow-cta className={base}>
        <a href={href} className={buttonClass}>
          {label}
        </a>
      </div>
    );
  }

  return (
    <div data-feedflow-cta className={base}>
      <button type="button" onClick={onClick} className={buttonClass}>
        {label}
      </button>
    </div>
  );
}
