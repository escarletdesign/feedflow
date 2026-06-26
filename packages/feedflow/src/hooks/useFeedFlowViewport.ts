"use client";

import { useEffect } from "react";

const MOBILE_MQ = "(max-width: 767px)";

function measureChromeInsets(root: HTMLElement) {
  const header = document.querySelector("header");
  const headerInset = header
    ? Math.ceil(header.getBoundingClientRect().bottom)
    : 0;

  const cta = document.querySelector("[data-feedflow-cta]");
  const footerInset = cta ? Math.ceil(cta.getBoundingClientRect().height) : 0;

  root.style.setProperty("--feedflow-header-inset", `${headerInset}px`);
  root.style.setProperty("--feedflow-footer-inset", `${footerInset}px`);
}

function observeChromeInsets(root: HTMLElement) {
  const header = document.querySelector("header");
  const cta = document.querySelector("[data-feedflow-cta]");

  const ro =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => measureChromeInsets(root))
      : null;

  if (ro) {
    if (header) ro.observe(header);
    if (cta) ro.observe(cta);
  }

  return ro;
}

/** Syncs panel height and header/CTA insets for mobile snap (use inside FeedFlowRoot). */
export function useFeedFlowViewport(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const mq = window.matchMedia(MOBILE_MQ);
    const root = document.documentElement;

    const sync = () => {
      if (!mq.matches) {
        root.style.removeProperty("--feedflow-panel-h");
        root.style.removeProperty("--feedflow-header-inset");
        root.style.removeProperty("--feedflow-footer-inset");
        return;
      }

      const h = window.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty("--feedflow-panel-h", `${Math.round(h)}px`);
      measureChromeInsets(root);
    };

    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync, { passive: true });
    window.visualViewport?.addEventListener("resize", sync);

    const chromeRo = observeChromeInsets(root);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      chromeRo?.disconnect();
      root.style.removeProperty("--feedflow-panel-h");
      root.style.removeProperty("--feedflow-header-inset");
      root.style.removeProperty("--feedflow-footer-inset");
    };
  }, [enabled]);
}
