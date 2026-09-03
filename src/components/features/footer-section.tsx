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

const LEGAL_PRIMARY = [
  "ご利用にあたって",
  "アクセスマップ",
] as const;

const LEGAL_PRIVACY = "プライバシーポリシー";

const COPYRIGHT_TEXT = "COPYRIGHT © CITRA. ALL RIGHTS RESERVED.";

const FOOTER_BG_SRC = "/assets/pages/top/footer/bg_top_footer.webp";

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

      <img
        src={FOOTER_BG_SRC}
        alt=""
        className="footer-water-underlay absolute inset-0 h-full w-full object-cover object-top"
      />

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
          <li key={item} className="flex gap-1">
            <span className="shrink-0" aria-hidden>
              ・
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterDivider() {
  return <div className="border-t border-[#1f3d2c]/80" aria-hidden />;
}

function DesktopFooterBar() {
  return (
    <div className="shrink-0 border-t border-[#1f3d2c]/80 pt-4 pb-8 xl:pb-10">
      <div className="flex flex-col gap-3 font-noto-sans-jp text-sm leading-8 text-black md:flex-row md:items-center md:justify-between xl:gap-4 xl:text-base xl:leading-10">
        <p className="whitespace-nowrap">{COPYRIGHT_TEXT}</p>
        <ul className="flex list-none flex-wrap gap-x-4 gap-y-1 p-0 md:gap-x-6 xl:gap-x-10">
          {[...LEGAL_PRIMARY, LEGAL_PRIVACY].map((item) => (
            <li key={item} className="whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileFooterBar() {
  return (
    <div className="shrink-0 pb-8">
      <FooterDivider />
      <p className="pt-6 text-center font-noto-sans-jp text-xs leading-6 text-black">
        {COPYRIGHT_TEXT}
      </p>
    </div>
  );
}

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="footer-section relative flex min-h-[min(640px,90vh)] flex-col overflow-hidden text-black md:min-h-[672px]"
      aria-label="サイトフッター"
    >
      <FooterWaterBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 sm:px-8 lg:px-10 xl:px-16">
        {/* Mobile: main + Footer Bar */}
        <div className="flex flex-1 flex-col md:hidden">
          <div className="flex flex-1 flex-col justify-end gap-6 pt-[100px] pb-6">
            <div className="flex flex-col items-center text-center">
              <p className="font-display text-[clamp(2.75rem,14vw,3.5rem)] leading-none tracking-tight">
                CITRA
              </p>
              <p className="mt-2 font-noto-sans-jp text-[clamp(1.25rem,5vw,1.5rem)] leading-none">
                シトラ
              </p>
            </div>

            <FooterDivider />

            <div className="grid grid-cols-2 gap-x-6 gap-y-6 font-noto-sans-jp">
              <FooterNavColumn title="商品一覧" items={PRODUCT_ITEMS} />
              <FooterNavColumn title="企業情報" items={COMPANY_ITEMS} />
              <div className="col-span-1">
                <FooterNavColumn title="お問い合わせ" items={CONTACT_ITEMS} />
              </div>
            </div>

            <FooterDivider />

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-noto-sans-jp text-sm leading-7 text-[#1e1d1d]">
              <div className="flex flex-col gap-y-1">
                <p>{LEGAL_PRIMARY[0]}</p>
                <p>{LEGAL_PRIVACY}</p>
              </div>
              <p>{LEGAL_PRIMARY[1]}</p>
            </div>
          </div>

          <MobileFooterBar />
        </div>

        {/* Desktop: main (vertically centered) + Footer Bar */}
        <div className="hidden min-h-0 flex-1 flex-col md:flex">
          <div className="flex flex-1 flex-col justify-end pt-[100px] pb-10 lg:pb-24">
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
          </div>

          <DesktopFooterBar />
        </div>
      </div>
    </footer>
  );
}
