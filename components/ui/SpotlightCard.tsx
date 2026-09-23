"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  enableAudio?: boolean;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(0, 245, 160, 0.12)",
  className,
  enableAudio = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    if (enableAudio) {
      sound.playHover();
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl glass border border-white/10 overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Luminous dynamic spotlight following cursor */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Thin glowing outline on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-opacity duration-300 z-10"
        style={{
          opacity,
          borderColor: "rgba(0, 245, 160, 0.25)",
          boxShadow: `inset 0 0 20px rgba(0, 212, 255, 0.05)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
