import { HERO_SCROLL, clamp } from "@/lib/hero-scroll";

/**
 * Product showcase story:
 * - 0–20%: accordion expand then hold Grove (hero=0, preview=1)
 * - 20–40% … 80–100%: keep expanded; instant swap at segment boundaries
 * - Final preview wraps to product 0
 */
export const PRODUCT_STORY = {
  mode: "showcase" as const,
  /** Left hero: R→L entrance after segment boundary swap. */
  heroSwapSlidePx: 48,
  heroSwapDurationMs: 480,
  /** Right preview: shorter R→L than the hero can. */
  previewSwapSlidePx: 28,
  /**
   * Accordion expandT at which the right can first plays its entrance.
   * After copy has started to appear, before expand fully locks.
   */
  previewRevealExpandT: 0.38,
  /**
   * Within segment 0 local progress: expand finishes at this point,
   * remainder holds expandT=1 so Grove stays readable longer.
   */
  firstSegmentExpandEnd: 0.4,
} as const;

export type ShowcaseFrame = {
  /** Accordion open 0→1 (locks at 1 after first segment). */
  expandT: number;
  /** Active hero product index (left panel). */
  heroIndex: number;
  /** Active preview product index (right panel). */
  previewIndex: number;
  segmentIndex: number;
};

export function resolveShowcaseFrame(
  storyProgress: number,
  productCount = HERO_SCROLL.productCount,
): ShowcaseFrame {
  const p = clamp(storyProgress, 0, 1);
  const segment = 1 / productCount;
  const segmentIndex = Math.min(
    productCount - 1,
    Math.floor(p / segment + 1e-9),
  );
  const local = clamp((p - segmentIndex * segment) / segment, 0, 1);

  if (segmentIndex === 0) {
    const expandEnd = PRODUCT_STORY.firstSegmentExpandEnd;
    const expandT =
      expandEnd <= 0 ? 1 : clamp(local / expandEnd, 0, 1);
    return {
      expandT,
      heroIndex: 0,
      previewIndex: 1,
      segmentIndex: 0,
    };
  }

  return {
    expandT: 1,
    heroIndex: segmentIndex,
    previewIndex: (segmentIndex + 1) % productCount,
    segmentIndex,
  };
}

/** Panel widths for accordion; slot 0 expands, slot 1 stays, 2–4 collapse to 0. */
export function panelWidthsForExpand(
  expandT: number,
  slotCount: number,
  slotWidth: number,
  expandedWidth: number,
) {
  const t = clamp(expandT, 0, 1);

  if (t <= 0.001) {
    return Array.from({ length: slotCount }, () => slotWidth);
  }

  if (t >= 0.999) {
    const widths = Array.from({ length: slotCount }, () => 0);
    widths[0] = expandedWidth;
    widths[1] = slotWidth;
    return widths;
  }

  const w0 = slotWidth + (expandedWidth - slotWidth) * t;
  const collapsed = slotWidth * (1 - t);
  const rest: number[] = [];
  for (let i = 2; i < slotCount; i += 1) {
    rest.push(collapsed < 0.75 ? 0 : collapsed);
  }
  const collapsedSum = rest.reduce((sum, w) => sum + w, 0);
  const w1 = slotWidth * slotCount - w0 - collapsedSum;
  return [w0, w1, ...rest];
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
