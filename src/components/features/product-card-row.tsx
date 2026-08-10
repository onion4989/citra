"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CITRA_PRODUCTS, PRODUCT_PANEL } from "@/lib/citra-products";
import { HERO_SCROLL } from "@/lib/hero-scroll";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";
import {
  lerp,
  panelWidthsForExpand,
  PRODUCT_STORY,
  resolveShowcaseFrame,
} from "@/lib/product-story";

const ENTER_DURATION_MS = 520;
const ENTER_STAGGER_MS = 100;
const ENTER_OFFSET_PX = 32;
const COLLAPSING_SLOT_START = 2;

type ProductCardRowProps = {
  storyProgress?: number;
};

function activeDropShadowFor(expandT: number) {
  if (expandT < 0.01) return "none";
  const shadowX = 2 + 4 * expandT;
  const shadowY = 3 + 6 * expandT;
  const shadowBlur = 2 + 6 * expandT;
  const shadowAlpha = 0.2 + 0.35 * expandT;
  return [
    `drop-shadow(0 0 1px rgba(0, 0, 0, ${(0.15 + 0.2 * expandT).toFixed(3)}))`,
    `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha.toFixed(3)}))`,
  ].join(" ");
}

/**
 * Accordion expand (0–20%), then instant swaps at boundaries.
 * Left hero alone: time-based R→L fade-in (opacity 0→1) on each swap.
 */
export function ProductCardRow({ storyProgress = 0 }: ProductCardRowProps) {
  const {
    width,
    height,
    imageWidth,
    imageHeight,
    endRadius,
    activeImageLeft,
    activeCopyLeft,
    expandedWidth,
  } = PRODUCT_PANEL;

  const [entered, setEntered] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  /** Time-based R→L reveal after heroIndex boundary swap (segment ≥ 1). */
  const [heroSwapIn, setHeroSwapIn] = useState(true);
  const [trackedHeroIndex, setTrackedHeroIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [reduceMotion]);

  const frame =
    HERO_SCROLL.enableProductStory && !reduceMotion
      ? resolveShowcaseFrame(storyProgress)
      : resolveShowcaseFrame(0);

  const { expandT, heroIndex, previewIndex, segmentIndex } = frame;
  const heroProduct = CITRA_PRODUCTS[heroIndex]!;
  const previewProduct = CITRA_PRODUCTS[previewIndex]!;

  // Sync swap-out on the same render as the boundary change (avoids a full-opacity flash).
  if (heroIndex !== trackedHeroIndex) {
    setTrackedHeroIndex(heroIndex);
    if (!reduceMotion && segmentIndex >= 1) {
      setHeroSwapIn(false);
    } else {
      setHeroSwapIn(true);
    }
  }

  // Time-based swap-in after the out frame paints.
  useEffect(() => {
    if (reduceMotion || segmentIndex === 0 || heroSwapIn) return;

    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
      innerId = window.requestAnimationFrame(() => setHeroSwapIn(true));
    });
    return () => {
      window.cancelAnimationFrame(outerId);
      window.cancelAnimationFrame(innerId);
    };
  }, [heroIndex, heroSwapIn, segmentIndex, reduceMotion]);

  const widths = panelWidthsForExpand(
    expandT,
    CITRA_PRODUCTS.length,
    width,
    expandedWidth,
  );
  const stripWidth = width * CITRA_PRODUCTS.length;
  const closedImageLeft = (width - imageWidth) / 2;
  const heroImageLeft = lerp(closedImageLeft, activeImageLeft, expandT);

  const activeScale =
    1 + (PRODUCT_PANEL.activeImageScale - 1) * expandT;
  const activeRotate = PRODUCT_PANEL.activeImageRotateDeg * expandT;
  const dropShadow = activeDropShadowFor(expandT);
  const overflowVisible = expandT > 0.15;
  const copyOpacity = Math.min(1, Math.max(0, (expandT - 0.28) / 0.45));
  const enterY = entered ? 0 : ENTER_OFFSET_PX;
  const heroSlideX =
    segmentIndex >= 1 && !heroSwapIn
      ? PRODUCT_STORY.heroSwapSlidePx
      : 0;
  const heroOpacity =
    entered && (segmentIndex === 0 || heroSwapIn) ? 1 : 0;
  const heroTransitionNone =
    reduceMotion || (segmentIndex === 0 && expandT > 0.001);
  const heroTransitionMs =
    segmentIndex >= 1
      ? PRODUCT_STORY.heroSwapDurationMs
      : ENTER_DURATION_MS;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      aria-label="CITRA products"
      data-story-segment={frame.segmentIndex}
    >
      <div
        className="flex translate-y-[32%] flex-col items-stretch"
        style={{ width: stripWidth }}
      >
        <ul
          className="relative flex list-none gap-0 p-0"
          style={{
            width: stripWidth,
            height,
            overflowX: "clip",
            overflowY: "visible",
          }}
        >
        {widths.map((panelW, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isRightEdge =
            index === widths.findLastIndex((w) => w > 1);
          const collapsedAway = panelW < 0.5;
          const delayMs = reduceMotion ? 0 : index * ENTER_STAGGER_MS;

          if (isFirst) {
            return (
              <li
                key={`slot-${index}`}
                className={`relative flex shrink-0 grow-0 ${
                  overflowVisible ? "overflow-visible" : "overflow-hidden"
                }`}
                style={{
                  width: Math.max(0, panelW),
                  minWidth: 0,
                  height,
                  backgroundColor: heroProduct.panelColor,
                  borderTopLeftRadius: endRadius,
                  borderBottomLeftRadius: endRadius,
                  borderTopRightRadius: isRightEdge ? endRadius : 0,
                  borderBottomRightRadius: isRightEdge ? endRadius : 0,
                  zIndex: 2,
                }}
              >
                <Image
                  key={heroProduct.id}
                  src={heroProduct.imageSrc}
                  alt={heroProduct.name}
                  width={imageWidth}
                  height={imageHeight}
                  sizes="114px"
                  priority
                  className="absolute h-[304px] w-[114px] object-contain will-change-transform"
                  style={{
                    left: heroImageLeft,
                    top: "50%",
                    opacity: heroOpacity,
                    transform: `translateY(calc(-50% + ${enterY}px)) translateX(${heroSlideX}px) rotate(${activeRotate}deg) scale(${activeScale})`,
                    filter: dropShadow,
                    transformOrigin: "center center",
                    transitionProperty: heroTransitionNone
                      ? "none"
                      : "opacity, transform",
                    transitionDuration: heroTransitionNone
                      ? "0ms"
                      : `${heroTransitionMs}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay:
                      entered &&
                      expandT < 0.001 &&
                      segmentIndex === 0
                        ? `${delayMs}ms`
                        : "0ms",
                  }}
                />

                {copyOpacity > 0.01 ? (
                  <div
                    className="absolute top-1/2 max-w-[360px] -translate-y-1/2 text-black"
                    style={{
                      left: activeCopyLeft,
                      opacity: copyOpacity,
                    }}
                  >
                    <h2 className="text-[40px] font-bold leading-tight tracking-tight text-black">
                      {heroProduct.name}
                    </h2>
                    <p className="mt-2 text-[24px] leading-snug text-black">
                      {heroProduct.flavor}
                    </p>
                    <p className="mt-4 text-[20px] leading-[1.6] text-black">
                      {heroProduct.blurb}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          }

          if (isSecond) {
            const previewOpacity = !entered
              ? 0
              : Math.min(1, panelW > 1 ? 1 : panelW / 36);

            return (
              <li
                key={`slot-${index}`}
                className="relative flex shrink-0 grow-0 overflow-hidden"
                style={{
                  width: Math.max(0, panelW),
                  minWidth: 0,
                  height,
                  backgroundColor: collapsedAway
                    ? "transparent"
                    : previewProduct.panelColor,
                  opacity: collapsedAway ? 0 : 1,
                  visibility: collapsedAway ? "hidden" : "visible",
                  borderTopRightRadius: isRightEdge ? endRadius : 0,
                  borderBottomRightRadius: isRightEdge ? endRadius : 0,
                  zIndex: 1,
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={previewProduct.imageSrc}
                    alt={previewProduct.name}
                    width={imageWidth}
                    height={imageHeight}
                    sizes="114px"
                    priority
                    className="h-[304px] w-[114px] object-contain will-change-transform"
                    style={{
                      opacity: previewOpacity,
                      visibility: previewOpacity < 0.02 ? "hidden" : "visible",
                      transform: entered
                        ? "translateY(0)"
                        : `translateY(${ENTER_OFFSET_PX}px)`,
                      transitionProperty: reduceMotion
                        ? "none"
                        : "opacity, transform",
                      transitionDuration: reduceMotion
                        ? "0ms"
                        : `${ENTER_DURATION_MS}ms`,
                      transitionTimingFunction:
                        "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay:
                        entered && expandT < 0.001 ? `${delayMs}ms` : "0ms",
                    }}
                  />
                </div>
              </li>
            );
          }

          const imageOpacity = !entered
            ? 0
            : index >= COLLAPSING_SLOT_START
              ? Math.min(1, panelW / 36)
              : 1;
          const product = CITRA_PRODUCTS[index]!;

          return (
            <li
              key={`slot-${index}`}
              className="relative flex shrink-0 grow-0 overflow-hidden"
              style={{
                width: Math.max(0, panelW),
                minWidth: 0,
                height,
                backgroundColor: collapsedAway
                  ? "transparent"
                  : product.panelColor,
                opacity: collapsedAway ? 0 : 1,
                visibility: collapsedAway ? "hidden" : "visible",
                borderTopRightRadius: isRightEdge ? endRadius : 0,
                borderBottomRightRadius: isRightEdge ? endRadius : 0,
                zIndex: 1,
              }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  width={imageWidth}
                  height={imageHeight}
                  sizes="114px"
                  className="h-[304px] w-[114px] object-contain"
                  style={{
                    opacity: imageOpacity,
                    visibility: imageOpacity < 0.02 ? "hidden" : "visible",
                    transform: entered
                      ? "translateY(0)"
                      : `translateY(${ENTER_OFFSET_PX}px)`,
                    transitionProperty: reduceMotion
                      ? "none"
                      : "opacity, transform",
                    transitionDuration: reduceMotion
                      ? "0ms"
                      : `${ENTER_DURATION_MS}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay:
                      entered && expandT < 0.001 ? `${delayMs}ms` : "0ms",
                  }}
                />
              </div>
            </li>
          );
        })}
        </ul>

        <div
          className="relative mt-5 h-0.5 w-full rounded-full bg-[var(--citrus-foam)]/20"
          aria-hidden
        >
          <div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[var(--citrus-foam)]/75"
            style={{
              transform: "scaleX(var(--scrub-progress, 0))",
            }}
          />
          <div
            className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--citrus-foam)] shadow-[0_0_0_2px_rgba(255,255,255,0.25)]"
            style={{
              left: "calc(var(--scrub-progress, 0) * 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
