"use client";

import Image from "next/image";
import { useRef } from "react";

import { useParallaxShift } from "@/lib/parallax-scroll";

const PRODUCT_CAN = {
  src: "/products/Product_1.png",
  width: 200,
  height: 531,
} as const;

const MOBILE_HALFCUT = {
  src: "/whats/mobile/mb_Citras_HerfCut.png",
  width: 212,
  height: 217,
} as const;

const MOBILE_CAN = {
  src: "/products/Product_1.png",
  width: 90,
  height: 240,
} as const;

/** Mobile text plate — already vertical (350×586). Display height slightly shorter. */
const MOBILE_TEXT_BG = {
  src: "/whats/mobile/mb_Text_Background.svg",
  width: 350,
  height: 586,
  displayHeight: 560,
} as const;

const MOBILE_REEF = {
  src: "/whats/reef.webp",
  width: 108,
  height: 107,
} as const;

const MOBILE_TWO_CITRAS = {
  src: "/whats/two_citras.webp",
  width: 105,
  height: 68,
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
      className="whats-citra-section relative overflow-x-clip bg-white pt-0 pb-[60px] text-black md:pt-0 md:pb-[50px]"
      aria-label={WHATS_TITLE}
    >
      {/* Mobile layout */}
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-8 px-5 md:hidden">
        <div
          className="relative mx-auto"
          style={{
            width: MOBILE_HALFCUT.width + 40,
            height: Math.max(MOBILE_HALFCUT.height, MOBILE_CAN.height),
          }}
        >
          <Image
            src={MOBILE_HALFCUT.src}
            alt=""
            width={MOBILE_HALFCUT.width}
            height={MOBILE_HALFCUT.height}
            className="absolute bottom-0 left-0 z-0 object-contain"
            style={{
              width: MOBILE_HALFCUT.width,
              height: MOBILE_HALFCUT.height,
            }}
            sizes="212px"
            aria-hidden
          />
          <Image
            src={MOBILE_CAN.src}
            alt="CITRA Grove"
            width={MOBILE_CAN.width}
            height={MOBILE_CAN.height}
            className="absolute right-0 bottom-0 z-10 origin-bottom object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)]"
            style={{
              width: MOBILE_CAN.width,
              height: MOBILE_CAN.height,
              transform: "rotate(-7deg)",
            }}
            sizes="90px"
          />
        </div>

        {/* Contents */}
        <div className="relative mx-auto w-full max-w-[350px]">
          <h2 className="relative z-20 text-center font-noto-sans-jp text-2xl leading-10 font-bold">
            {WHATS_TITLE}
          </h2>

          <div className="relative mt-[60px]">
            <div className="relative mx-auto w-full max-w-[350px]">
              <img
                src={MOBILE_TEXT_BG.src}
                alt=""
                width={MOBILE_TEXT_BG.width}
                height={MOBILE_TEXT_BG.height}
                className="w-full object-fill"
                style={{ height: MOBILE_TEXT_BG.displayHeight }}
                aria-hidden
              />

              <p className="absolute inset-x-[36px] inset-y-[18%] z-10 overflow-y-auto font-noto-sans-jp text-sm leading-[26px] text-white">
                {WHATS_BODY}
              </p>
            </div>

            <Image
              src={MOBILE_REEF.src}
              alt=""
              width={MOBILE_REEF.width}
              height={MOBILE_REEF.height}
              className="pointer-events-none absolute top-[-48px] right-0 z-20 object-contain"
              style={{
                width: MOBILE_REEF.width,
                height: MOBILE_REEF.height,
              }}
              sizes="108px"
              aria-hidden
            />

            <Image
              src={MOBILE_TWO_CITRAS.src}
              alt=""
              width={MOBILE_TWO_CITRAS.width}
              height={MOBILE_TWO_CITRAS.height}
              className="pointer-events-none absolute bottom-0 left-0 z-20 object-contain"
              style={{
                width: MOBILE_TWO_CITRAS.width,
                height: MOBILE_TWO_CITRAS.height,
              }}
              sizes="105px"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div
        ref={rootRef}
        className="mx-auto hidden w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid md:min-h-[min(560px,68vh)] md:grid-cols-[minmax(200px,0.38fr)_minmax(0,1fr)] md:gap-8 lg:min-h-[min(680px,72vh)] lg:gap-10 xl:min-h-[776px] xl:gap-12 xl:px-8"
      >
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

        <div className="relative z-10 flex min-w-0 items-center justify-center md:justify-start">
          <div
            className="relative w-full max-w-[min(775px,100%)] will-change-transform"
            style={{ transform: `translate3d(0, ${textY}px, 0)` }}
          >
            <h2 className="relative z-20 pl-[8%] font-noto-sans-jp text-[clamp(1.25rem,2.5vw,2.25rem)] leading-tight font-bold sm:pl-[10%]">
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
