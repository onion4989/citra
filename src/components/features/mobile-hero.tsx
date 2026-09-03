import Image from "next/image";

const HERO_MIN_HEIGHT_PX = 600;
/** Inner top/bottom padding — at least 60px. */
const HERO_INSET_PX = 60;
const CAN_WIDTH = 114;
const CAN_HEIGHT = 304;

const NEW_RELEASE_BADGE = {
  src: "/assets/pages/top/hero/ill_top_new-release_black.svg",
  /** ~140px wide keeps lettering readable under CITRA. */
  width: 140,
  height: 83,
} as const;

/**
 * Mobile-only hero (below md). Static can + gradient — no video scrub.
 */
export function MobileHero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden px-6 md:hidden"
      style={{
        minHeight: HERO_MIN_HEIGHT_PX,
        paddingTop: HERO_INSET_PX,
        paddingBottom: HERO_INSET_PX,
        backgroundImage: "linear-gradient(180deg, #94C145 0%, #3096A3 100%)",
      }}
      aria-label="CITRA hero"
    >
      <header className="relative z-10 flex flex-col items-center text-center text-black">
        <h1 className="font-display text-[clamp(3.5rem,18vw,4.5rem)] leading-none tracking-tight">
          CITRA
        </h1>

        <img
          src={NEW_RELEASE_BADGE.src}
          alt=""
          width={NEW_RELEASE_BADGE.width}
          height={NEW_RELEASE_BADGE.height}
          className="mt-3 max-h-none max-w-none"
          style={{
            width: NEW_RELEASE_BADGE.width,
            height: NEW_RELEASE_BADGE.height,
          }}
          aria-hidden
        />

        <div
          className="-mt-4 mb-2 flex items-start gap-x-2"
          aria-label="シトラス × スパークリング"
        >
          <div className="flex flex-col items-center">
            <span className="font-noto-sans-jp text-[20px] leading-none font-bold whitespace-nowrap">
              シトラス
            </span>
            <span className="mt-1 font-sans text-[14px] tracking-[0.3em]">
              CITRAS
            </span>
          </div>
          <span
            className="flex h-[20px] items-center font-noto-sans-jp text-[16px] leading-none font-bold"
            aria-hidden
          >
            ×
          </span>
          <div className="flex flex-col items-center">
            <span className="font-noto-sans-jp text-[20px] leading-none font-bold whitespace-nowrap">
              スパークリング
            </span>
            <span className="mt-1 font-sans text-[14px] tracking-[0.3em]">
              SPARKLING
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mt-6 flex flex-1 items-start justify-center">
        <Image
          src="/assets/pages/top/products/img_top_product_01.png"
          alt="CITRA Grove"
          width={CAN_WIDTH}
          height={CAN_HEIGHT}
          className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)]"
          style={{ width: CAN_WIDTH, height: CAN_HEIGHT }}
          sizes="114px"
          priority
        />
      </div>
    </section>
  );
}
