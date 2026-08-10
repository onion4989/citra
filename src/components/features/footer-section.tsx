const PRODUCT_ITEMS = [
  "Grove（グルーブ）",
  "Half Cut（ハーフカット）",
  "Mist（ミスト）",
  "Duo（デュオ）",
  "Ribbon（リボン）",
] as const;

const COMPANY_ITEMS = [
  "企業概要",
  "グループ企業一覧",
  "採用情報",
] as const;

const CONTACT_ITEMS = [
  "お問い合わせ",
  "Q&A",
  "よくあるご質問",
] as const;

const LEGAL_ITEMS = [
  "ご利用にあたって",
  "アクセスマップ",
  "プライバシーポリシー",
] as const;

const FOOTER_BG_SRC = "/footer/footer_background.webp";

/**
 * REMOVABLE experiment: SVG water displacement on the footer background.
 * To revert: delete FooterWaterBackground usage + restore CSS background-image.
 *
 * Keep the photo’s natural wavy waterline; shimmer warps that silhouette
 * (no top blur / white wash that would flatten it into a straight edge).
 */
function FooterWaterBackground() {
  return (
    <div
      className="footer-water-stack pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id="footer-water-displace"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="3"
              seed="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.01 0.015;0.018 0.026;0.013 0.02;0.01 0.015"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="24"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Sharp base — top waterline stays unfiltered */}
      <img
        src={FOOTER_BG_SRC}
        alt=""
        className="footer-water-underlay absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Shimmer from ~100px down, with a soft gradient lead-in */}
      <img
        src={FOOTER_BG_SRC}
        alt=""
        className="footer-water-media absolute inset-0 h-full w-full origin-center scale-[1.08] object-cover object-top"
      />
    </div>
  );
}

function FooterNavColumn({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-noto-sans-jp text-sm leading-8 font-bold text-black xl:text-base xl:leading-10">
        {title}
      </h3>
      <ul className="mt-1 list-none space-y-0.5 p-0 font-noto-sans-jp text-sm leading-7 text-[#1e1d1d] xl:mt-1 xl:space-y-1 xl:text-base xl:leading-[30px]">
        {items.map((item) => (
          <li key={item}>・{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="footer-section relative flex min-h-[min(672px,85vh)] flex-col overflow-hidden text-black md:min-h-[672px]"
      aria-label="サイトフッター"
    >
      <FooterWaterBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-8 sm:px-8 lg:px-10 xl:px-16 xl:pb-10">
        <div className="mt-auto flex flex-col gap-8 md:gap-10 xl:gap-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-6 lg:gap-8 xl:gap-16">
            <div className="flex w-fit shrink-0 flex-col items-center">
              <p className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-none tracking-tight">
                CITRA
              </p>
              <p className="mt-2 font-noto-sans-jp text-[clamp(1.25rem,3vw,2.5rem)] leading-none">
                シトラ
              </p>
            </div>

            <div
              className="hidden h-[min(200px,32vw)] w-px shrink-0 bg-[#1f3d2c]/70 md:block xl:h-[min(240px,40vw)]"
              aria-hidden
            />

            <div className="grid min-w-0 flex-1 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 lg:gap-5 xl:gap-12">
              <FooterNavColumn title="商品一覧" items={PRODUCT_ITEMS} />
              <FooterNavColumn title="企業情報" items={COMPANY_ITEMS} />
              <FooterNavColumn title="お問い合わせ" items={CONTACT_ITEMS} />
            </div>
          </div>

          <div className="border-t border-[#1f3d2c]/80 pt-4">
            <div className="flex flex-col gap-3 font-noto-sans-jp text-sm leading-8 text-black sm:text-sm md:flex-row md:items-center md:justify-between xl:gap-4 xl:text-base xl:leading-10">
              <p className="whitespace-nowrap">
                COPYRIGHT © CITRA. ALL RIGHTS RESERVED.
              </p>
              <ul className="flex list-none flex-wrap gap-x-4 gap-y-1 p-0 md:gap-x-6 xl:gap-x-10">
                {LEGAL_ITEMS.map((item) => (
                  <li key={item} className="whitespace-nowrap">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
