"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { useFeedFlowViewport } from "../hooks/useFeedFlowViewport";
import { useLenis } from "../hooks/useLenis";

export type FeedFlowRootProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional Lenis smooth scroll (requires lenis peer installed). */
  smoothScroll?: boolean;
};

/**
 * Root `<main data-feedflow>` — enables feedflow.css document snap and viewport sync.
 * Does not scroll to top: a reload must keep its position, and the first gesture must snap.
 */
export function FeedFlowRoot({
  children,
  className,
  id = "feedflow",
  smoothScroll = false,
}: FeedFlowRootProps) {
  useFeedFlowViewport(true);
  useLenis({ enabled: smoothScroll });

  return (
    <main
      id={id}
      data-feedflow
      className={cn("relative block w-full", className)}
    >
      {children}
    </main>
  );
}
