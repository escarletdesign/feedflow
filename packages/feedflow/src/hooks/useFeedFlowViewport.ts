"use client";

import { useEffect } from "react";
import { feedSnapIndex, feedSnapTop } from "../lib/snapAnchor";

const MOBILE_MQ = "(max-width: 767px)";
const IDLE_MS = 120;

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

/** Syncs panel height and re-anchors the visible section after the gesture ends. */
export function useFeedFlowViewport(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const mq = window.matchMedia(MOBILE_MQ);
    const root = document.documentElement;
    let prevH = 0;
    let touching = 0;
    let pendingIndex: number | null = null;
    let pendingH = 0;
    let idleTimer = 0;
    let armed = false;
    let chromeRo: ResizeObserver | null = null;

    const clearVars = () => {
      root.style.removeProperty("--feedflow-panel-h");
      root.style.removeProperty("--feedflow-header-inset");
      root.style.removeProperty("--feedflow-footer-inset");
      root.style.removeProperty("--feedflow-vv-top");
    };

    const applyOffset = () => {
      const top = window.visualViewport?.offsetTop ?? 0;
      root.style.setProperty("--feedflow-vv-top", `${Math.round(top)}px`);
    };

    const flush = () => {
      if (touching || pendingIndex === null) return;
      const top = feedSnapTop(pendingIndex, pendingH);
      pendingIndex = null;
      window.clearTimeout(idleTimer);
      if (Math.abs(window.scrollY - top) < 1) return;
      window.scrollTo({ top, left: 0, behavior: "auto" });
    };

    const schedule = () => {
      window.clearTimeout(idleTimer);
      if (touching || pendingIndex === null) return;
      const y = window.scrollY;
      idleTimer = window.setTimeout(() => {
        if (touching || pendingIndex === null) return;
        if (window.scrollY !== y) return;
        flush();
      }, IDLE_MS);
    };

    const onScrollEnd = () => {
      flush();
    };

    const onScroll = () => {
      if (pendingIndex === null) return;
      schedule();
    };

    const onDown = () => {
      touching += 1;
    };

    const onUp = () => {
      touching = Math.max(0, touching - 1);
      if (!touching) schedule();
    };

    const syncHeight = () => {
      const h = Math.round(window.visualViewport?.height ?? window.innerHeight);
      applyOffset();
      measureChromeInsets(root);
      if (prevH > 0 && h !== prevH) {
        pendingIndex = feedSnapIndex(window.scrollY, prevH);
        pendingH = h;
        prevH = h;
        root.style.setProperty("--feedflow-panel-h", `${h}px`);
        schedule();
        return;
      }
      prevH = h || prevH;
      if (h > 0) root.style.setProperty("--feedflow-panel-h", `${h}px`);
    };

    const onVvScroll = () => {
      if (!mq.matches) return;
      applyOffset();
      measureChromeInsets(root);
    };

    const arm = () => {
      if (armed) return;
      armed = true;
      prevH = 0;
      pendingIndex = null;
      window.addEventListener("resize", syncHeight, { passive: true });
      window.visualViewport?.addEventListener("resize", syncHeight);
      window.visualViewport?.addEventListener("scroll", onVvScroll);
      window.addEventListener("scrollend", onScrollEnd);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointerdown", onDown, true);
      window.addEventListener("pointerup", onUp, true);
      window.addEventListener("pointercancel", onUp, true);
      chromeRo = observeChromeInsets(root);
      syncHeight();
    };

    const disarm = () => {
      if (!armed) return;
      armed = false;
      window.clearTimeout(idleTimer);
      pendingIndex = null;
      prevH = 0;
      touching = 0;
      window.removeEventListener("resize", syncHeight);
      window.visualViewport?.removeEventListener("resize", syncHeight);
      window.visualViewport?.removeEventListener("scroll", onVvScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onUp, true);
      chromeRo?.disconnect();
      chromeRo = null;
      clearVars();
    };

    const onMq = () => {
      if (mq.matches) arm();
      else disarm();
    };

    onMq();
    mq.addEventListener("change", onMq);

    return () => {
      mq.removeEventListener("change", onMq);
      disarm();
    };
  }, [enabled]);
}
