"use client";

import Image from "next/image";
import { useRef } from "react";

import { useParallaxShift } from "@/lib/parallax-scroll";

const SECTION_TOP_PADDING_PX = 150;
const SECTION_BOTTOM_PADDING_PX = 150;

const PRODUCT_CAN = {
  src: "/products/Product_1.png",
  width: 200,
  height: 531,
} as const;

const TEXT_BG = {
  src: "/whats/text_background.svg",
  width: 775,
  height: 384,
} as const;

const REEF = {
  src: "/whats/reef.webp",
  width: 103,
  height: 102,
} as const;

const TWO_CITRAS = {
  src: "/whats/two_citras.webp",
  width: 167,
  height: 108,
} as const;

const WHATS_TITLE = "CITRA（シトラ）とは？";

const WHATS_BODY =
  "CITRAは、オレンジの産地である愛媛県で生まれたブランドです。きっかけは、完熟を待たずとも強い香りの出る青みのある果皮と、みずみずしい果肉の対比に惹かれたことでした。甘さを足すより、果皮の清涼感と炭酸の軽さをどう閉じ込めるかを繰り返し試し、風味豊かなフレーバーに合うレシピを開発しました。現在では Grove（グルーブ）、Half Cut（ハーフカット）、Mist（ミスト）、Duo（デュオ）、Ribbon（リボン）の五つのタイプがあり、同じ緑柑橘でも酸味と豊富なフレーバーをお楽しみいただけます。";

/** Match Introduction: clearly readable opposite-direction parallax. */
const CAN_PARALLAX_PX = 64;
const TEXT_PARALLAX_PX = 40;

export function WhatsCitraSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shift = useParallaxShift(rootRef);
  const canY = shift * -CAN_PARALLAX_PX;
  const textY = shift * TEXT_PARALLAX_PX;

  return (
    <section
      id="whats-citra"
      className="whats-citra-section relative overflow-x-clip bg-white text-black"
      style={{
        paddingTop: SECTION_TOP_PADDING_PX,
        paddingBottom: SECTION_BOTTOM_PADDING_PX,
      }}
      aria-labelledby="whats-citra-title"
    >
      <div
        ref={rootRef}
        className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 sm:px-10 md:min-h-[min(560px,68vh)] md:grid-cols-[minmax(200px,0.38fr)_minmax(0,1fr)] md:gap-8 lg:min-h-[min(680px,72vh)] lg:gap-10 xl:min-h-[776px] xl:gap-12 xl:px-8"
      >
        {/* Left box: product can */}
        <div className="relative z-10 flex items-center justify-center md:justify-center lg:justify-end lg:pr-4">
          <div
            className="will-change-transform"
            style={{ transform: `translate3d(0, ${canY}px, 0)` }}
          >
            <Image
              src={PRODUCT_CAN.src}
              alt="CITRA Grove"
              width={PRODUCT_CAN.width}
              height={PRODUCT_CAN.height}
              className="h-auto w-[min(160px,42vw)] object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.2)] md:w-[min(170px,22vw)] lg:w-[min(190px,18vw)] xl:w-[200px]"
              sizes="(min-width: 1280px) 200px, (min-width: 1024px) 190px, (min-width: 768px) 170px, 160px"
              priority={false}
            />
          </div>
        </div>

        {/* Right box: contents */}
        <div className="relative z-10 flex min-w-0 items-center justify-center md:justify-start">
          <div
            className="relative w-full max-w-[min(775px,100%)] will-change-transform"
            style={{ transform: `translate3d(0, ${textY}px, 0)` }}
          >
            <h2
              id="whats-citra-title"
              className="relative z-20 pl-[8%] font-noto-sans-jp text-[clamp(1.25rem,2.5vw,2.25rem)] leading-tight font-bold sm:pl-[10%]"
            >
              {WHATS_TITLE}
            </h2>

            <div className="relative mt-4 sm:mt-6">
              <img
                src={TEXT_BG.src}
                alt=""
                width={TEXT_BG.width}
                height={TEXT_BG.height}
                className="h-auto w-full"
                aria-hidden
              />

              <p className="absolute inset-x-[8%] top-[16%] z-10 max-h-[66%] overflow-y-auto font-noto-sans-jp text-[clamp(0.75rem,1.35vw,1rem)] leading-[1.875] text-white sm:inset-x-[10%] sm:top-[18%] md:top-[20%]">
                {WHATS_BODY}
              </p>

              <Image
                src={REEF.src}
                alt=""
                width={REEF.width}
                height={REEF.height}
                className="pointer-events-none absolute -top-6 right-[-2%] z-20 h-auto w-[clamp(3.5rem,10vw,6.4375rem)] object-contain sm:-top-8 sm:right-0"
                sizes="103px"
                aria-hidden
              />

              <Image
                src={TWO_CITRAS.src}
                alt=""
                width={TWO_CITRAS.width}
                height={TWO_CITRAS.height}
                className="pointer-events-none absolute -bottom-4 left-[-2%] z-20 h-auto w-[clamp(5rem,16vw,10.4375rem)] object-contain sm:-bottom-6 sm:left-0"
                sizes="167px"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
