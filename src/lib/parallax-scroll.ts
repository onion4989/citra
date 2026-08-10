import { useRef, useSyncExternalStore, type RefObject } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** 0 when about to enter, 1 when nearly left. */
function visibilityProgress(rect: DOMRect, viewH: number) {
  const travel = viewH + rect.height;
  if (travel <= 0) return 0;
  return clamp((viewH - rect.top) / travel, 0, 1);
}

function computeShift(el: HTMLElement | null): number {
  if (!el || typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return 0;
  }

  const rect = el.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const inView = rect.bottom > 0 && rect.top < viewH;

  if (!inView) {
    return rect.top >= viewH ? -1 : 1;
  }

  return visibilityProgress(rect, viewH) * 2 - 1;
}

/**
 * Subscribe to viewport scroll and expose a -1→1 shift for the observed element.
 */
export function useParallaxShift(rootRef: RefObject<HTMLElement | null>) {
  const snapshotRef = useRef(0);

  return useSyncExternalStore(
    (onStoreChange) => {
      let rafId = 0;

      const publish = () => {
        const next = computeShift(rootRef.current);
        if (!Object.is(next, snapshotRef.current)) {
          snapshotRef.current = next;
          onStoreChange();
        }
      };

      const onScrollOrResize = () => {
        if (rafId !== 0) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          publish();
        });
      };

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize, { passive: true });
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onScrollOrResize);
      onScrollOrResize();

      return () => {
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
        media.removeEventListener("change", onScrollOrResize);
        if (rafId !== 0) {
          window.cancelAnimationFrame(rafId);
        }
      };
    },
    () => snapshotRef.current,
    () => 0,
  );
}
