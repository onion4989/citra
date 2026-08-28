const DEFAULT_SCROLL_MS = 1600;
const SCROLL_TOLERANCE_PX = 2;
const SCROLL_WAIT_MAX_MS = 500;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type ScrollToSectionOptions = {
  durationMs?: number;
  instant?: boolean;
};

function scrollWindowTo(y: number) {
  window.scrollTo({ top: y, behavior: "instant" });
}

function waitUntilScrollAt(targetY: number): Promise<void> {
  return new Promise((resolve) => {
    const deadline = performance.now() + SCROLL_WAIT_MAX_MS;

    const check = () => {
      if (Math.abs(window.scrollY - targetY) <= SCROLL_TOLERANCE_PX) {
        resolve();
        return;
      }

      if (performance.now() >= deadline) {
        scrollWindowTo(targetY);
        resolve();
        return;
      }

      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
}

async function withInstantScrollBehavior<T>(run: () => Promise<T>): Promise<T> {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  try {
    return await run();
  } finally {
    root.style.scrollBehavior = prev;
  }
}

/** Scroll so the section top aligns with the viewport top. */
export function scrollToSectionTop(
  elementId: string,
  options: ScrollToSectionOptions = {},
): Promise<void> {
  return withInstantScrollBehavior(async () => {
    const el = document.getElementById(elementId);
    if (!el) {
      return;
    }

    const targetY = el.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (options.instant || distance === 0) {
      scrollWindowTo(targetY);
      await waitUntilScrollAt(targetY);
      return;
    }

    const durationMs = options.durationMs ?? DEFAULT_SCROLL_MS;
    const startTime = performance.now();

    await new Promise<void>((resolve) => {
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        scrollWindowTo(startY + distance * easeOutCubic(t));

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          scrollWindowTo(targetY);
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });

    await waitUntilScrollAt(targetY);
  });
}
