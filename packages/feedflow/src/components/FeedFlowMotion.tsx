"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { fadeUpInView } from "../motion/variants";

export type FeedFlowMotionProps = HTMLMotionProps<"div">;

/** Motion wrapper with reduced-motion and whileInView defaults. */
export function FeedFlowMotion({ children, className, ...rest }: FeedFlowMotionProps) {
  const reduce = useReducedMotion();
  const motionProps = fadeUpInView(reduce);

  return (
    <motion.div className={className} {...motionProps} {...rest}>
      {children}
    </motion.div>
  );
}
