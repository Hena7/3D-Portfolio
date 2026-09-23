"use client";
import { useEffect, useState } from "react";

interface MousePosition {
  x: number; // 0 to 1
  y: number; // 0 to 1
  normalX: number; // -1 to 1
  normalY: number; // -1 to 1
}

/**
 * Tracks the mouse position and returns it both as 0-1 and -1 to 1 normalized forms.
 * Useful for driving 3D camera/object rotation based on mouse movement.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0.5,
    y: 0.5,
    normalX: 0,
    normalY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setPos({
        x,
        y,
        normalX: (x - 0.5) * 2,
        normalY: (y - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return pos;
}
