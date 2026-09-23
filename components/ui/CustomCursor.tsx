"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom magnetic cursor that replaces the browser default.
 * Shows a ring that follows the mouse, and scales up on interactive elements.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX - 4}px, ${targetY - 4}px)`;
      }
    };

    const animateRing = () => {
      // Smooth lag for ring
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", checkPointer);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", checkPointer);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Small dot — instant */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-primary transition-opacity duration-200"
        style={{
          opacity: isHidden ? 0 : 1,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
        aria-hidden="true"
      />
      {/* Large ring — lagged */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border border-primary/60 transition-all duration-100"
        style={{
          opacity: isHidden ? 0 : 1,
          transform: "translate(-50%, -50%)",
          scale: isPointer ? "1.8" : isClicking ? "0.8" : "1",
          borderColor: isPointer ? "#00f5a0" : undefined,
          boxShadow: isPointer
            ? "0 0 14px rgba(0,245,160,0.6)"
            : "0 0 8px rgba(0,212,255,0.3)",
          transition: "scale 0.2s ease, border-color 0.2s ease, opacity 0.2s",
        }}
        aria-hidden="true"
      />
    </>
  );
}
