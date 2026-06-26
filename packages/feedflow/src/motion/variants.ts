import type { Transition, Variants, ViewportOptions } from "framer-motion";
import { transition } from "./transitions";

export const fadeUpMotion: Variants = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 1, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export const headlineReveal: Variants = {
  hidden: { opacity: 1, y: 14, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOnce: ViewportOptions = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
};

export const viewportReelPanel: ViewportOptions = {
  once: true,
  amount: 0.18,
  margin: "0px",
};

export function fadeUpInView(reduce: boolean) {
  return {
    initial: reduce ? false : ("hidden" as const),
    whileInView: reduce ? undefined : ("visible" as const),
    viewport: viewportOnce,
    variants: reduce ? fadeUpReduced : fadeUpMotion,
    transition,
  };
}
