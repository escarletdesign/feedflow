declare module "lenis" {
  const Lenis: new (options?: Record<string, unknown>) => {
    destroy: () => void;
    raf: (time: number) => void;
  };
  export default Lenis;
}

declare module "@studio-freight/lenis" {
  const Lenis: new (options?: Record<string, unknown>) => {
    destroy: () => void;
    raf: (time: number) => void;
  };
  export default Lenis;
}
