"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { fadeUpInView, headlineReveal, viewportReelPanel } from "../motion/variants";
import { transition } from "../motion/transitions";
import {
  MobileFullSection,
  type MobileFullSectionProps,
} from "./MobileFullSection";

export type MobileStoryAlign = "center" | "start";

export type MobileStorySectionProps = Omit<MobileFullSectionProps, "children"> & {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  media?: ReactNode;
  align?: MobileStoryAlign;
  /** Use headline reveal animation for title */
  heroTitle?: boolean;
};

export function MobileStorySection({
  title,
  subtitle,
  children,
  media,
  align = "center",
  heroTitle = false,
  className,
  ...sectionProps
}: MobileStorySectionProps) {
  const reduce = useReducedMotion();
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <MobileFullSection className={className} {...sectionProps}>
      <div className={cn("flex flex-col gap-6", alignClass)}>
        {media ? <div className="w-full">{media}</div> : null}
        {title ? (
          heroTitle ? (
            <motion.h1
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={viewportReelPanel}
              variants={headlineReveal}
            >
              {title}
            </motion.h1>
          ) : (
            <motion.h2
              className="text-2xl font-semibold leading-tight sm:text-3xl"
              {...fadeUpInView(reduce)}
            >
              {title}
            </motion.h2>
          )
        ) : null}
        {subtitle ? (
          <motion.p
            className="text-base text-[var(--feedflow-muted-fg,rgba(0,0,0,0.6))] sm:text-lg"
            {...fadeUpInView(reduce)}
            transition={{ ...transition, delay: 0.05 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div className="w-full" {...fadeUpInView(reduce)}>
            {children}
          </motion.div>
        ) : null}
      </div>
    </MobileFullSection>
  );
}
