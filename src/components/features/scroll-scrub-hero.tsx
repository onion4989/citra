"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";

import { ProductCardRow } from "@/components/features/product-card-row";
import {
  HERO_SCROLL,
  heroTotalVh,
  productStoryProgressFromY,
  videoProgressFromY,
} from "@/lib/hero-scroll";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";

/** Scrub-optimized all-intra encode (see public/videos). */
const CITRUS_VIDEO_SRC = "/videos/Fruit_Citrus_Splash_scrub.mp4";
const BRAND_NAME = "CITRA";
const REDUCED_MOTION_SCRUB = 0.55;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** 0 at early fall → 1 around impact / crown (for tighten + mesh). */
function tightenFor(progress: number) {
  return clamp((progress - 0.28) / 0.42, 0, 1);
}

function applyTightenEffects(
  progress: number,
  refs: {
    video: HTMLVideoElement | null;
    mesh: HTMLDivElement | null;
    vignette: HTMLDivElement | null;
    bars: HTMLDivElement | null;
    overlayRoot: HTMLDivElement | null;
  },
) {
  const tighten = tightenFor(progress);
  const brightness = 0.97 - tighten * 0.16;
  const contrast = 1.04 + tighten * 0.14;
  const saturate = 1.06 + tighten * 0.1;
  const meshOpacity = 0.2 + tighten * 0.08;
  const vignetteOpacity = 0.7 + tighten * 0.3;
  const barsOpacity = 0.85 + tighten * 0.15;

  if (refs.video) {
    refs.video.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  }
  if (refs.mesh) {
    refs.mesh.style.setProperty("--mesh-opacity", String(meshOpacity));
  }
  if (refs.vignette) {
    refs.vignette.style.opacity = String(vignetteOpacity);
  }
  if (refs.bars) {
    refs.bars.style.opacity = String(barsOpacity);
  }
  refs.overlayRoot?.style.setProperty("--tighten", String(tighten));
}

type TightenOverlayRefs = {
  mesh: HTMLDivElement | null;
  vignette: HTMLDivElement | null;
  bars: HTMLDivElement | null;
  overlayRoot: HTMLDivElement | null;
};

function initReducedMotionHero(
  video: HTMLVideoElement,
  overlayRefs: TightenOverlayRefs,
) {
  applyTightenEffects(REDUCED_MOTION_SCRUB, {
    video,
    ...overlayRefs,
  });
  void video.play().catch(() => {
    // Autoplay may be blocked; still show first frame.
  });
}

export function ScrollScrubHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRootRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const uiRootRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);

  const rafRef = useRef<number | null>(null);
  const pendingTimeRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);
  const durationRef = useRef(0);
  const storyProgressRef = useRef(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [storyProgress, setStoryProgress] = useState(0);

  const overlayRefs = useCallback(
    (): TightenOverlayRefs => ({
      mesh: meshRef.current,
      vignette: vignetteRef.current,
      bars: barsRef.current,
      overlayRoot: overlayRootRef.current,
    }),
    [],
  );

  const setupReducedMotionHero = useCallback(
    (video: HTMLVideoElement) => {
      initReducedMotionHero(video, overlayRefs());
    },
    [overlayRefs],
  );

  const handleVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node && prefersReducedMotion && node.readyState >= 1) {
        setupReducedMotionHero(node);
      }
    },
    [prefersReducedMotion, setupReducedMotionHero],
  );

  const handleVideoLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (!prefersReducedMotion) {
        return;
      }
      setupReducedMotionHero(event.currentTarget);
    },
    [prefersReducedMotion, setupReducedMotionHero],
  );

  // Scroll → video seek + product story progress (independent mappings).
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || prefersReducedMotion) {
      return;
    }

    const applyUi = (videoProgress: number, productProgress: number) => {
      const productLift = clamp((videoProgress - 0.15) / 0.55, 0, 1);

      applyTightenEffects(videoProgress, {
        video,
        mesh: meshRef.current,
        vignette: vignetteRef.current,
        bars: barsRef.current,
        overlayRoot: overlayRootRef.current,
      });

      if (brandRef.current) {
        brandRef.current.style.opacity = String(0.85 + productLift * 0.15);
        brandRef.current.style.transform = `translateY(${(1 - productLift) * 8}px)`;
      }

      section.style.setProperty("--scrub-progress", String(videoProgress));
      section.style.setProperty("--story-progress", String(productProgress));

      if (Math.abs(productProgress - storyProgressRef.current) > 0.002) {
        storyProgressRef.current = productProgress;
        setStoryProgress(productProgress);
      }
    };

    const flushSeek = () => {
      if (isSeekingRef.current) return;
      const target = pendingTimeRef.current;
      if (target === null) return;

      const delta = Math.abs(video.currentTime - target);
      if (delta < 1 / 48) {
        pendingTimeRef.current = null;
        return;
      }

      pendingTimeRef.current = null;
      isSeekingRef.current = true;
      video.currentTime = target;
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      flushSeek();
    };

    const update = () => {
      rafRef.current = null;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0 || durationRef.current <= 0) {
        return;
      }

      const y = clamp(-rect.top, 0, scrollable);
      const videoProgress = videoProgressFromY(y, scrollable);
      const productProgress = productStoryProgressFromY(y, scrollable);

      applyUi(videoProgress, productProgress);
      pendingTimeRef.current = videoProgress * durationRef.current;
      flushSeek();
    };

    const onScrollOrResize = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    const onLoadedMeta = () => {
      durationRef.current = video.duration;
      update();
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoadedMeta);
    if (video.readyState >= 1) {
      onLoadedMeta();
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    onScrollOrResize();

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden md:block"
      style={{ height: `${heroTotalVh()}vh` }}
      aria-label={`${BRAND_NAME} hero`}
      data-video-vh={HERO_SCROLL.videoVh}
      data-product-story-vh={
        HERO_SCROLL.enableProductStory ? HERO_SCROLL.productStoryVh : 0
      }
    >
      {/* overflow visible so active can may zoom past the panel */}
      <div className="sticky top-0 h-dvh w-full overflow-x-clip overflow-y-visible bg-[var(--citrus-ink)]">
        <video
          ref={handleVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={CITRUS_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          autoPlay={prefersReducedMotion}
          loop={prefersReducedMotion}
          onLoadedMetadata={handleVideoLoadedMetadata}
          aria-hidden
        />

        <div
          ref={overlayRootRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[var(--citrus-leaf)]/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[var(--citrus-peel)]/12 mix-blend-soft-light" />
          <div ref={vignetteRef} className="hero-video-vignette absolute inset-0" />
          <div
            ref={barsRef}
            className="absolute inset-0 bg-gradient-to-b from-[var(--citrus-ink)]/70 via-transparent via-40% to-[var(--citrus-ink)]/78"
          />
          <div ref={meshRef} className="hero-video-mesh absolute inset-0" />
        </div>

        <ProductCardRow
          storyProgress={
            HERO_SCROLL.enableProductStory ? storyProgress : 0
          }
        />

        <div
          ref={uiRootRef}
          className="relative z-30 flex h-full flex-col px-6 py-8 pointer-events-none sm:px-10 sm:py-10 lg:px-16"
        >
          <header className="flex items-baseline justify-between gap-4">
            <p
              ref={brandRef}
              className="font-[family-name:var(--font-display)] text-3xl tracking-[0.18em] text-[var(--citrus-foam)] sm:text-4xl"
            >
              {BRAND_NAME}
            </p>
            <p className="text-xs tracking-[0.22em] text-[var(--citrus-foam)]/70 uppercase">
              Sparkling citrus
            </p>
          </header>
        </div>
      </div>
    </section>
  );
}
