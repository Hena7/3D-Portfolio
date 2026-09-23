"use client";
import { useEffect, useRef } from "react";

/**
 * Initializes Lenis smooth scroll and keeps it in sync with the RAF loop.
 * Must be called inside a Client Component.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<import("@studio-freight/lenis").default | null>(null);

  useEffect(() => {
    let Lenis: typeof import("@studio-freight/lenis").default;
    let animFrame: number;

    (async () => {
      const mod = await import("@studio-freight/lenis");
      Lenis = mod.default;

      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        animFrame = requestAnimationFrame(raf);
      }

      animFrame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelAnimationFrame(animFrame);
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
}
