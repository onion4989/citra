"use client";

import Image from "next/image";
import { useRef } from "react";

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

/** Clearly readable while the block is on screen. */
const WAVE_PARALLAX_PX = 100;
const CAN_PARALLAX_PX = 64;
const CAN_DEPTH = [0.55, 0.8, 1, 0.8, 0.55] as const;

/**
 * Wave + product cans with scroll parallax while the block is on screen.
 * Layout matches the previous static markup; only transforms are added.
 */
export function IntroductionParallax() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shift = useParallaxShift(rootRef);
  const waveY = shift * WAVE_PARALLAX_PX;

  return (
    <div
      ref={rootRef}
      className="relative mt-16 w-full pb-16 sm:mt-20 sm:pb-24"
    >
      <div
        className="pointer-events-none absolute top-[60%] left-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div
          className="will-change-transform"
          style={{ transform: `translate3d(0, ${waveY}px, 0)` }}
        >
          <Image
            src="/introduction/background_wave.webp"
            alt=""
            width={1440}
            height={WAVE_HEIGHT_PX}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <ul
        className="relative z-10 flex w-full list-none items-stretch justify-center p-0"
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
