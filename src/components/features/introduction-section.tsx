import Image from "next/image";

import { CITRA_PRODUCTS } from "@/lib/citra-products";

const SECTION_TOP_PADDING_PX = 150;
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

const STAR_PATH =
  "M24 0L29.3883 16.5836H46.8254L32.7185 26.8328L38.1068 43.4164L24 33.1672L9.89315 43.4164L15.2815 26.8328L1.17464 16.5836H18.6117L24 0Z";

const STAR_CENTERS = [24, 82, 140, 198, 256] as const;

function IntroductionStars({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={280}
      height={48}
      viewBox="0 0 280 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="intro-star-grad"
          x1="24"
          y1="20"
          x2="24"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEE06" />
          <stop offset="1" stopColor="#998F03" />
        </linearGradient>
      </defs>
      {STAR_CENTERS.map((cx) => (
        <path
          key={cx}
          d={STAR_PATH}
          fill="url(#intro-star-grad)"
          transform={cx === 24 ? undefined : `translate(${cx - 24} 0)`}
        />
      ))}
    </svg>
  );
}

export function IntroductionSection() {
  return (
    <section
      id="introduction"
      className="relative overflow-x-clip bg-white text-black"
      style={{ paddingTop: SECTION_TOP_PADDING_PX }}
      aria-labelledby="introduction-title"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6">
        <header className="flex flex-col items-center text-center">
          <h2
            id="introduction-title"
            className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-none tracking-tight"
          >
            CITRA
          </h2>

          <p className="mt-2 flex items-center gap-3 font-noto-sans-jp text-[clamp(1.5rem,4vw,2.5rem)] leading-none font-normal">
            <span className="text-base leading-none" aria-hidden>
              ー
            </span>
            <span>シトラ</span>
            <span className="text-base leading-none" aria-hidden>
              ー
            </span>
          </p>

          <p className="mt-10 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 font-noto-sans-jp leading-none">
            <span className="inline-flex items-baseline gap-1">
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold">５</span>
              <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal">
                ドリンク
              </span>
            </span>
            <span className="inline-flex items-baseline gap-1">
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold">５</span>
              <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal">
                フレーバー
              </span>
            </span>
          </p>

          <IntroductionStars className="mt-8" />
        </header>
      </div>

      <div className="relative mt-16 w-full pb-16 sm:mt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute top-[60%] left-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2"
          aria-hidden
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

        <ul
          className="relative z-10 flex w-full list-none items-stretch justify-center p-0"
          style={{ gap: PRODUCT_GAP_PX }}
          aria-label="CITRA product lineup"
        >
          {CITRA_PRODUCTS.map((product, index) => {
            const size = PRODUCT_DISPLAY[index]!;

            return (
              <li
                key={product.id}
                className="flex shrink-0 items-center justify-center"
                style={{ height: PRODUCT_SLOT_HEIGHT_PX }}
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
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
