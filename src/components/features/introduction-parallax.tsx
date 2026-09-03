"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { CITRA_PRODUCTS } from "@/lib/citra-products";
import { useParallaxShift } from "@/lib/parallax-scroll";

const PRODUCT_GAP_PX = 45;
const WAVE_HEIGHT_PX = 458;

const PRODUCT_DISPLAY = [
  { width: 114, height: 304 },
  { width: 138, height: 366 },
  { width: 209, height: 556 },
  { width: 138, height: 366 },
  { width: 114, height: 304 },
] as const;

const PRODUCT_SLOT_HEIGHT_PX = Math.max(
  ...PRODUCT_DISPLAY.map((size) => size.height),
);

/** Mobile can size — fits 3-across on ~390px. */
const MOBILE_CAN = { width: 88, height: 234 } as const;

/** Clearly readable while the block is on screen. */
const WAVE_PARALLAX_PX = 100;
/** Desktop-only: less downward travel so the wave stays above Whats. */
const WAVE_PARALLAX_DOWN_PX = 40;
const CAN_PARALLAX_PX = 64;
const CAN_DEPTH = [0.55, 0.8, 1, 0.8, 0.55] as const;

/** Desktop bottom padding = section gap (150) + room for downward travel. */
const DESKTOP_SECTION_GAP_PX = 150;
const DESKTOP_WAVE_CLEARANCE_PX = 100;
const DESKTOP_BOTTOM_PADDING_PX =
  DESKTOP_SECTION_GAP_PX + DESKTOP_WAVE_CLEARANCE_PX;

const TOP_ROW = CITRA_PRODUCTS.slice(0, 3);
const BOTTOM_ROW = CITRA_PRODUCTS.slice(3, 5);

function waveTranslateY(shift: number, maxDownPx: number) {
  return shift < 0 ? shift * WAVE_PARALLAX_PX : shift * maxDownPx;
}

/**
 * Wave + product cans with scroll parallax while the block is on screen.
 * Desktop: 5-across row. Mobile: 3 + 2 grid over the wave.
 *
 * Desktop wave: raised anchor, asymmetric Y (full up / shorter down),
 * and extra bottom padding so travel stays inside the white section.
 */
export function IntroductionParallax() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shift = useParallaxShift(rootRef);
  const waveYMobile = waveTranslateY(shift, WAVE_PARALLAX_PX);
  const waveYDesktop = waveTranslateY(shift, WAVE_PARALLAX_DOWN_PX);

  return (
    <div
      ref={rootRef}
      className="relative mt-10 w-full pb-[60px] md:mt-20 md:pb-[var(--intro-desktop-pb)]"
      style={
        {
          "--intro-desktop-pb": `${DESKTOP_BOTTOM_PADDING_PX}px`,
        } as CSSProperties
      }
    >
      {/* Mobile wave */}
      <div
        className="pointer-events-none absolute top-[55%] left-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2 md:hidden"
        aria-hidden
      >
        <div
          className="will-change-transform"
          style={{ transform: `translate3d(0, ${waveYMobile}px, 0)` }}
        >
          <Image
            src="/assets/pages/top/introduction/bg_top_wave.webp"
            alt=""
            width={1440}
            height={WAVE_HEIGHT_PX}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Desktop wave — higher anchor, less downward travel */}
      <div
        className="pointer-events-none absolute top-[50%] left-1/2 z-0 hidden w-screen -translate-x-1/2 -translate-y-1/2 md:block"
        aria-hidden
      >
        <div
          className="will-change-transform"
          style={{ transform: `translate3d(0, ${waveYDesktop}px, 0)` }}
        >
          <Image
            src="/assets/pages/top/introduction/bg_top_wave.webp"
            alt=""
            width={1440}
            height={WAVE_HEIGHT_PX}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Mobile: 3 + 2 */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-4 md:hidden"
        aria-label="CITRA product lineup"
      >
        <ul className="flex list-none items-end justify-center gap-3 p-0">
          {TOP_ROW.map((product, index) => {
            const depth = CAN_DEPTH[index] ?? 1;
            const canY = shift * -CAN_PARALLAX_PX * depth;
            return (
              <li key={product.id} className="shrink-0">
                <span
                  className="inline-block will-change-transform"
                  style={{ transform: `translate3d(0, ${canY}px, 0)` }}
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={MOBILE_CAN.width}
                    height={MOBILE_CAN.height}
                    className="object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]"
                    style={{
                      width: MOBILE_CAN.width,
                      height: MOBILE_CAN.height,
                    }}
                    sizes="100px"
                  />
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="flex list-none items-end justify-center gap-4 p-0">
          {BOTTOM_ROW.map((product, index) => {
            const depth = CAN_DEPTH[index + 3] ?? 1;
            const canY = shift * -CAN_PARALLAX_PX * depth;
            return (
              <li key={product.id} className="shrink-0">
                <span
                  className="inline-block will-change-transform"
                  style={{ transform: `translate3d(0, ${canY}px, 0)` }}
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={MOBILE_CAN.width}
                    height={MOBILE_CAN.height}
                    className="object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]"
                    style={{
                      width: MOBILE_CAN.width,
                      height: MOBILE_CAN.height,
                    }}
                    sizes="100px"
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop: single row */}
      <ul
        className="relative z-10 hidden w-full list-none items-stretch justify-center p-0 md:flex"
        style={{ gap: PRODUCT_GAP_PX }}
        aria-label="CITRA product lineup"
      >
        {CITRA_PRODUCTS.map((product, index) => {
          const size = PRODUCT_DISPLAY[index]!;
          const depth = CAN_DEPTH[index] ?? 1;
          const canY = shift * -CAN_PARALLAX_PX * depth;

          return (
            <li
              key={product.id}
              className="flex shrink-0 items-center justify-center"
              style={{ height: PRODUCT_SLOT_HEIGHT_PX }}
            >
              <span
                className="inline-block will-change-transform"
                style={{ transform: `translate3d(0, ${canY}px, 0)` }}
              >
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  width={size.width}
                  height={size.height}
                  className="object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)]"
                  style={{
                    width: size.width,
                    height: size.height,
                  }}
                  sizes={`${size.width}px`}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
