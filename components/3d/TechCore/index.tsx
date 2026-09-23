"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CoreSphere } from "./CoreSphere";
import { OrbitalRings } from "./OrbitalRings";
import { OrbitingNodes } from "./OrbitingNodes";
import { Particles } from "./Particles";

interface TechCoreProps {
  /** Normalized mouse X in [-1, 1] */
  mouseX?: number;
  /** Normalized mouse Y in [-1, 1] */
  mouseY?: number;
}

/**
 * TechCore — Abstract 3D "digital energy core" for the portfolio hero.
 *
 * Structure:
 *   ├── CoreSphere     — Pulsing central glow sphere
 *   ├── OrbitalRings   — 4 independently rotating tori
 *   ├── OrbitingNodes  — 6 small glowing satellites
 *   └── Particles      — 220 floating ambient particles
 *
 * Interactivity:
 *   - Mouse drag → subtle parallax tilt on the whole group
 *   - Hover      → increased glow + slight scale-up on core
 */
export function TechCore({ mouseX = 0, mouseY = 0 }: TechCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Smoothed rotation targets driven by mouse
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;

    // Parallax target — invert Y so moving mouse up tilts up
    targetRotX.current = -mouseY * 0.35;
    targetRotY.current =  mouseX * 0.45;

    // Smooth lerp toward target (lag = 0.04 ≈ "floating" feel)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX.current,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY.current,
      0.04
    );

    // Hover scale — smoothly spring toward 1.08 or 1.0
    const targetScale = hovered ? 1.08 : 1.0;
    const currentScale = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 0.06)
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* ── 1. Central glowing sphere ── */}
      <CoreSphere hovered={hovered} />

      {/* ── 2. Rotating orbital rings ── */}
      <OrbitalRings />

      {/* ── 3. Orbiting satellite nodes ── */}
      <OrbitingNodes />

      {/* ── 4. Ambient particle cloud ── */}
      <Particles />
    </group>
  );
}
