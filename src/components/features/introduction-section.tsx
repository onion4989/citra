import { IntroductionParallax } from "@/components/features/introduction-parallax";

const STAR_PATH =
  "M24 0L29.3883 16.5836H46.8254L32.7185 26.8328L38.1068 43.4164L24 33.1672L9.89315 43.4164L15.2815 26.8328L1.17464 16.5836H18.6117L24 0Z";

const STAR_CENTERS = [24, 82, 140, 198, 256] as const;

function IntroductionStars({
  className,
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
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
          id={gradientId}
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
          fill={`url(#${gradientId})`}
          transform={cx === 24 ? undefined : `translate(${cx - 24} 0)`}
        />
      ))}
    </svg>
  );
}

function FiveDrinksLine({ className }: { className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-noto-sans-jp leading-none md:gap-x-6 ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-0.5">
        <span className="text-[clamp(2rem,8vw,2.5rem)] font-bold md:text-[clamp(2.5rem,5vw,4rem)]">
          ５
        </span>
        <span className="text-[clamp(1.125rem,4.5vw,1.5rem)] font-normal md:text-[clamp(1.5rem,3.5vw,2.5rem)]">
          ドリンク
        </span>
      </span>
      <span
        className="text-[clamp(1.125rem,4.5vw,1.5rem)] font-normal md:text-[clamp(1.5rem,3.5vw,2.5rem)]"
        aria-hidden
      >
        /
      </span>
      <span className="inline-flex items-center gap-0.5">
        <span className="text-[clamp(2rem,8vw,2.5rem)] font-bold md:text-[clamp(2.5rem,5vw,4rem)]">
          ５
        </span>
        <span className="text-[clamp(1.125rem,4.5vw,1.5rem)] font-normal md:text-[clamp(1.5rem,3.5vw,2.5rem)]">
          フレーバー
        </span>
      </span>
    </p>
  );
}

export function IntroductionSection() {
  return (
    <section
      id="introduction"
      className="relative overflow-x-clip bg-white pt-[60px] text-black md:pt-[200px]"
      aria-label="CITRA 紹介"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6">
        {/* Desktop header */}
        <header className="hidden flex-col items-center text-center md:flex">
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

          <FiveDrinksLine className="mt-10" />
          <IntroductionStars
            className="mt-8"
            gradientId="intro-star-grad-desktop"
          />
        </header>

        {/* Mobile header */}
        <header className="flex flex-col items-center text-center md:hidden">
          <h2 className="sr-only">CITRA 紹介</h2>
          <FiveDrinksLine />
          <IntroductionStars
            className="mt-2 h-[34px] w-[198px]"
            gradientId="intro-star-grad-mobile"
          />
        </header>
      </div>

      <IntroductionParallax />
    </section>
  );
}
