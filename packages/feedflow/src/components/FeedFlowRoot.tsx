"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { useFeedFlowViewport } from "../hooks/useFeedFlowViewport";
import { useLenis } from "../hooks/useLenis";

export type FeedFlowRootProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional Lenis smooth scroll (requires lenis peer installed). */
  smoothScroll?: boolean;
  /** Lock scroll restoration on mobile entry (recommended for snap). */
  manualScrollRestoration?: boolean;
};

const MOBILE_MQ = "(max-width: 767px)";

function scrollFeedFlowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Root `<main data-feedflow>` — enables feedflow.css body snap and viewport sync.
 */
export function FeedFlowRoot({
  children,
  className,
  id = "feedflow",
  smoothScroll = false,
  manualScrollRestoration = true,
}: FeedFlowRootProps) {
  useFeedFlowViewport(true);
  useLenis({ enabled: smoothScroll });

  useLayoutEffect(() => {
    if (!manualScrollRestoration) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.matchMedia(MOBILE_MQ).matches) return;
    scrollFeedFlowToTop();
  }, [manualScrollRestoration]);

  useEffect(() => {
    if (!manualScrollRestoration) return;

    const mq = window.matchMedia(MOBILE_MQ);
    let wasMobile = mq.matches;

    const alignOnce = () => {
      if (!mq.matches) return;
      scrollFeedFlowToTop();
      requestAnimationFrame(() => requestAnimationFrame(scrollFeedFlowToTop));
    };

    const onBreakpoint = () => {
      const isMobile = mq.matches;
      if (isMobile && !wasMobile) alignOnce();
      wasMobile = isMobile;
    };

    if (mq.matches) alignOnce();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && mq.matches) alignOnce();
    };

    mq.addEventListener("change", onBreakpoint);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      mq.removeEventListener("change", onBreakpoint);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [manualScrollRestoration]);

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
