"use client";

import { useEffect } from "react";

type LenisInstance = {
  destroy: () => void;
  raf: (time: number) => void;
};

type LenisConstructor = new (options?: {
  wrapper?: HTMLElement | Window;
  content?: HTMLElement;
  smoothWheel?: boolean;
}) => LenisInstance;

/** Runtime-only import so bundlers do not resolve optional peer `lenis`. */
async function importLenisPackage(specifier: string): Promise<LenisConstructor | null> {
  try {
    const importer = new Function("s", "return import(s)") as (
      s: string,
    ) => Promise<{ default?: LenisConstructor } & LenisConstructor>;
    const mod = await importer(specifier);
    return (mod.default ?? mod) as LenisConstructor;
  } catch {
    return null;
  }
}

async function loadLenis(): Promise<LenisConstructor | null> {
  for (const pkg of ["lenis", "@studio-freight/lenis"]) {
    const Lenis = await importLenisPackage(pkg);
    if (Lenis) return Lenis;
  }
  return null;
}

export type UseLenisOptions = {
  enabled?: boolean;
  wrapper?: HTMLElement | null;
  content?: HTMLElement | null;
};

/**
 * Optional smooth scroll via Lenis. No-op if `lenis` / `@studio-freight/lenis` is not installed.
 */
export function useLenis({ enabled = true, wrapper, content }: UseLenisOptions = {}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let lenis: LenisInstance | null = null;
    let rafId = 0;
    let cancelled = false;

    void (async () => {
      const Lenis = await loadLenis();
      if (cancelled || !Lenis) return;

      lenis = new Lenis({
        wrapper: wrapper ?? window,
        content: content ?? document.documentElement,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [enabled, wrapper, content]);
}
