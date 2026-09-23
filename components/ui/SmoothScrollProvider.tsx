"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Mounts the Lenis smooth scroll engine.
 * This is a headless component — renders nothing visible.
 */
export function SmoothScrollProvider() {
  useSmoothScroll();
  return null;
}
