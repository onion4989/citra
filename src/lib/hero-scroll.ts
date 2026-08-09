/**
 * Hero scroll split: video scrub and product story are independent progresses.
 * Toggle `enableProductStory` to remove the product chapter without deleting UI.
 */
export const HERO_SCROLL = {
  /** Viewport-heights used for video scrub range (first chapter). */
  videoVh: 300,
  /** Viewport-heights for product story (0–100% across all SKUs). */
  productStoryVh: 500,
  productCount: 5,
  /** Flip to false to drop product scroll height + accordion drive. */
  enableProductStory: true,
} as const;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function heroTotalVh() {
  if (!HERO_SCROLL.enableProductStory) {
    return HERO_SCROLL.videoVh;
  }
  return HERO_SCROLL.videoVh + HERO_SCROLL.productStoryVh;
}

/** Fraction of total scrollable that belongs to the video-only lead-in. */
export function videoScrollShare() {
  const total = heroTotalVh();
  return HERO_SCROLL.videoVh / total;
}

/**
 * Video always advances with overall scroll (0→1 across the full hero section).
 */
export function videoProgressFromY(y: number, scrollable: number) {
  if (scrollable <= 0) return 0;
  return clamp(y / scrollable, 0, 1);
}

/**
 * Product story progress (0→1) only over the product chapter after the video lead-in.
 */
export function productStoryProgressFromY(y: number, scrollable: number) {
  if (!HERO_SCROLL.enableProductStory || scrollable <= 0) return 0;
  const start = scrollable * videoScrollShare();
  const span = scrollable - start;
  if (span <= 0) return 0;
  return clamp((y - start) / span, 0, 1);
}

/** Map global story progress → local 0–1 for a product slot (each gets 1/N). */
export function productLocalProgress(
  storyProgress: number,
  productIndex: number,
  productCount = HERO_SCROLL.productCount,
) {
  const segment = 1 / productCount;
  const start = productIndex * segment;
  return clamp((storyProgress - start) / segment, 0, 1);
}
