"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface CoreSphereProps {
  hovered: boolean;
}

/**
 * CoreSphere — The bright pulsing center of the TechCore.
 *
 * - MeshStandardMaterial with high emissive intensity
 * - Inner glow sphere (additive blending, slightly larger)
 * - Pulsing scale + emissive driven by sin wave
 * - Icosahedron wireframe overlay that counter-rotates
 */
export function CoreSphere({ hovered }: CoreSphereProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const ico2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Smooth pulse — scale oscillates subtly
    const pulse = 1 + Math.sin(t * 1.6) * 0.045 + (hovered ? 0.07 : 0);
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);

    // Emissive intensity breathes with the pulse
    if (matRef.current) {
      matRef.current.emissiveIntensity =
        2.8 + Math.sin(t * 1.6) * 0.6 + (hovered ? 1.2 : 0);
    }

    // Outer glow halo scales a touch more
    const glowPulse = 1 + Math.sin(t * 1.6 + 0.4) * 0.07 + (hovered ? 0.12 : 0);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(glowPulse);
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity =
        0.12 + Math.sin(t * 1.6) * 0.04 + (hovered ? 0.08 : 0);
    }

    // Icosahedron wireframes counter-rotate
    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.18;
      icoRef.current.rotation.x = t * 0.09;
    }
    if (ico2Ref.current) {
      ico2Ref.current.rotation.y = -t * 0.14;
      ico2Ref.current.rotation.z = t * 0.07;
    }
  });

  return (
    <group>
      {/* ── Core sphere ── */}
      <Sphere ref={coreRef} args={[0.65, 64, 64]}>
        <meshStandardMaterial
          ref={matRef}
          color="#00d4ff"
          emissive="#00aaff"
          emissiveIntensity={2.8}
          roughness={0.1}
          metalness={0.6}
          envMapIntensity={1.2}
        />
      </Sphere>

      {/* ── Outer translucent glow shell ── */}
      <Sphere ref={glowRef} args={[0.82, 32, 32]}>
        <meshStandardMaterial
          ref={glowMatRef}
          color="#00d4ff"
          emissive="#00ccff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      {/* ── Icosahedron wireframe 1 (inner) ── */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color={hovered ? "#00f5a0" : "#00d4ff"}
          wireframe
          transparent
          opacity={hovered ? 0.22 : 0.13}
        />
      </mesh>

      {/* ── Icosahedron wireframe 2 (outer, sparser) ── */}
      <mesh ref={ico2Ref}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color="#ffb800"
          wireframe
          transparent
          opacity={hovered ? 0.12 : 0.06}
        />
      </mesh>

      {/* ── Point light emanating from the core ── */}
      <pointLight color="#00d4ff" intensity={hovered ? 6 : 4} distance={8} decay={2} />
      <pointLight color="#00f5a0" intensity={2.5} distance={6} decay={2} position={[0, 0, 0]} />
    </group>
  );
}
