"use client";

import { MobileStorySection, type MobileStorySectionProps } from "../components/MobileStorySection";

export type CredibilityItem = { quote: string; author?: string; role?: string };

export type CredibilitySectionProps = MobileStorySectionProps & {
  title?: string;
  items: CredibilityItem[];
};

export function CredibilitySection({
  title = "Lo que dicen",
  items,
  id = "credibilidad",
  tone = "default",
  ...rest
}: CredibilitySectionProps) {
  return (
    <MobileStorySection id={id} title={title} align="start" tone={tone} {...rest}>
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li
            key={`${item.author ?? "quote"}-${i}`}
            className="rounded-xl border border-black/8 bg-white/60 p-4 text-sm"
          >
            <p className="italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            {item.author ? (
              <p className="mt-2 font-medium not-italic">
                {item.author}
                {item.role ? (
                  <span className="font-normal text-[var(--feedflow-muted-fg,rgba(0,0,0,0.5))]">
                    {" "}
                    — {item.role}
                  </span>
                ) : null}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </MobileStorySection>
  );
}
