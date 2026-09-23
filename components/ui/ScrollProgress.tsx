"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

/**
 * A thin neon line at the very top of the viewport showing scroll depth.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    scaleX.set(progress);
  }, [progress, scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9997] h-0.5 origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #00f5a0 0%, #00d4ff 50%, #ffb800 100%)",
        boxShadow: "0 0 10px rgba(0,245,160,0.7)",
      }}
      aria-hidden="true"
    />
  );
}
