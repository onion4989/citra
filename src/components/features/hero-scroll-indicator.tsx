const SCROLL_NAVI_ICON = {
  src: "/assets/pages/top/hero/ill_top_scroll_navi_icon.svg",
  width: 58,
  height: 188,
} as const;

type HeroScrollIndicatorProps = {
  className?: string;
};

/** Decorative scroll cue beside the product panel strip (not interactive). */
export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  return (
    <img
      src={SCROLL_NAVI_ICON.src}
      alt=""
      width={SCROLL_NAVI_ICON.width}
      height={SCROLL_NAVI_ICON.height}
      className={["pointer-events-none select-none", className ?? ""].join(" ")}
      aria-hidden
    />
  );
}
