"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

interface RingProps {
  radius: number;
  tube: number;
  rotationAxis: "x" | "y" | "z";
  speed: number;
  tilt: [number, number, number]; // initial Euler rotation
  color: string;
  emissive: string;
  opacity: number;
}

function Ring({ radius, tube, rotationAxis, speed, tilt, color, emissive, opacity }: RingProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation[rotationAxis] += delta * speed;
  });

  return (
    <Torus ref={ref} args={[radius, tube, 6, 96]} rotation={tilt}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.8}
        roughness={0.05}
        metalness={0.9}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </Torus>
  );
}

/**
 * OrbitalRings — Three glowing tori, each rotating on a different axis.
 *
 * Ring 1: Equatorial, cyan,  slow clockwise
 * Ring 2: Tilted 60°,  purple, medium counter-clockwise
 * Ring 3: Tilted 30°,  pink,   fast clockwise (inner)
 */
export function OrbitalRings() {
  return (
    <group>
      {/* ── Ring 1 — Equatorial cyan ── */}
      <Ring
        radius={1.55}
        tube={0.022}
        rotationAxis="y"
        speed={0.28}
        tilt={[0, 0, 0]}
        color="#00d4ff"
        emissive="#00aaff"
        opacity={0.85}
      />

      {/* ── Ring 2 — Tilted Cyber Emerald ── */}
      <Ring
        radius={1.9}
        tube={0.016}
        rotationAxis="x"
        speed={-0.18}
        tilt={[Math.PI / 3, 0, Math.PI / 6]}
        color="#00f5a0"
        emissive="#00bb77"
        opacity={0.8}
      />

      {/* ── Ring 3 — Inner angled Solar Amber ── */}
      <Ring
        radius={1.22}
        tube={0.018}
        rotationAxis="z"
        speed={0.42}
        tilt={[Math.PI / 4, Math.PI / 6, 0]}
        color="#ffb800"
        emissive="#ff9900"
        opacity={0.7}
      />

      {/* ── Ring 4 — Outer wide slow dim ring ── */}
      <Ring
        radius={2.35}
        tube={0.009}
        rotationAxis="y"
        speed={-0.08}
        tilt={[Math.PI / 12, 0, 0]}
        color="#00d4ff"
        emissive="#00d4ff"
        opacity={0.25}
      />
    </group>
  );
}
