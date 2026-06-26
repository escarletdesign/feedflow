import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion", "lenis", "@studio-freight/lenis", "gsap"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
