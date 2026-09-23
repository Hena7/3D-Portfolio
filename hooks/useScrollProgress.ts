"use client";
import { useEffect, useState } from "react";

/**
 * Tracks the current scroll progress as a 0-1 value.
 * 0 = top of page, 1 = bottom of page.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(totalHeight > 0 ? current / totalHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
