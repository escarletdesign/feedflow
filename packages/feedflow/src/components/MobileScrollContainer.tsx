"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { useLenis } from "../hooks/useLenis";

export type MobileScrollContainerProps = {
  children: ReactNode;
  className?: string;
  /** Enable Lenis when the package is installed (optional peer). */
  smoothScroll?: boolean;
  /** Use internal scroll container instead of body snap (feedflow.css body mode). */
  mode?: "body" | "container";
};

/**
 * Parent for vertical narrative blocks. With `mode="container"`, applies snap on this element.
 * With `mode="body"` (default), pair with FeedFlowRoot + feedflow.css.
 */
export function MobileScrollContainer({
  children,
  className,
  smoothScroll = false,
  mode = "body",
}: MobileScrollContainerProps) {
  useLenis({ enabled: smoothScroll && mode === "container" });

  if (mode === "body") {
    return <div className={cn("flex flex-col", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "feedflow-scroll-container h-[100dvh] w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
