"use client";

import { useRef } from "react";
import * as THREE from "three";

/**
 * Desk — The floating platform the workspace sits on.
 * - Thin, modern rectangular slab
 * - Neon edge glow strips (emissive geometry)
 * - Soft underglow simulated via a point light placed beneath
 */
export function Desk() {
  const glowRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* ── Main desk surface ── */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[5.6, 0.12, 2.8]} />
        <meshStandardMaterial
          color="#0d0d1f"
          roughness={0.25}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* ── Desk undercarriage (slightly darker) ── */}
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[5.5, 0.04, 2.7]} />
        <meshStandardMaterial color="#08080f" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* ── Neon edge strips — long sides ── */}
      <mesh position={[0, -0.04, 1.41]} ref={glowRef}>
        <boxGeometry args={[5.6, 0.02, 0.012]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={4}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -0.04, -1.41]}>
        <boxGeometry args={[5.6, 0.02, 0.012]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={4}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Neon edge strips — short sides ── */}
      <mesh position={[2.8, -0.04, 0]}>
        <boxGeometry args={[0.012, 0.02, 2.8]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={3}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-2.8, -0.04, 0]}>
        <boxGeometry args={[0.012, 0.02, 2.8]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={3}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Under-glow point light ── */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={1.8}
        distance={4}
        color="#00d4ff"
      />
      <pointLight
        position={[0, -0.4, 0]}
        intensity={1.2}
        distance={3}
        color="#00f5a0"
      />

      {/* ── Subtle desk legs (corner pillars) ── */}
      {[
        [2.4, -0.45, 1.1],
        [-2.4, -0.45, 1.1],
        [2.4, -0.45, -1.1],
        [-2.4, -0.45, -1.1],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.78, 8]} />
          <meshStandardMaterial color="#141428" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
