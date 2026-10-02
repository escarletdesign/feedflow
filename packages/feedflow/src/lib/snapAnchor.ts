/** Section index before a viewport-height change. */
export function feedSnapIndex(scrollY: number, prevHeight: number): number {
  if (prevHeight <= 0) return 0;
  return Math.round(scrollY / prevHeight);
}

/** Document scroll offset for that section at the new height. */
export function feedSnapTop(index: number, nextHeight: number): number {
  return Math.max(0, index) * nextHeight;
}
