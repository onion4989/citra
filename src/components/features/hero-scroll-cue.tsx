"use client";

import { useCallback, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";
import { scrollToSectionTop } from "@/lib/scroll-to-section";

const INTRO_SECTION_ID = "introduction";
const SCROLL_DURATION_MS = 1600;

function ChevronDownIcon() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type HeroScrollCueProps = {
  className?: string;
};

export function HeroScrollCue({ className }: HeroScrollCueProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);

  const onClick = useCallback(() => {
    if (isScrolling) return;

    setIsScrolling(true);
    void scrollToSectionTop(INTRO_SECTION_ID, {
      instant: reduceMotion,
      durationMs: SCROLL_DURATION_MS,
    }).finally(() => {
      setIsScrolling(false);
    });
  }, [isScrolling, reduceMotion]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isScrolling}
      aria-label="次のセクションへ"
      className={[
        "flex size-10 cursor-pointer items-center justify-center rounded-full text-[var(--citrus-foam)] transition-opacity",
        "hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--citrus-foam)]",
        "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
        className ?? "",
      ].join(" ")}
    >
      <ChevronDownIcon />
    </button>
  );
}
