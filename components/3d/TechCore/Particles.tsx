"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 220;

/**
 * Particles — Floating point-cloud around the TechCore.
 *
 * Geometry is built imperatively (THREE.BufferGeometry) to avoid
 * JSX bufferAttribute typing issues across R3F versions.
 * Uses additive blending for a soft neon glow feel.
 */
export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Build the geometry + store base positions & phases
  const { geometry, basePositions, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const phases: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute particles in a spherical shell (r = 1.2 → 3.2)
      const r = 1.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      phases.push(Math.random() * Math.PI * 2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return {
      geometry: geo,
      basePositions: Float32Array.from(positions),
      phases,
    };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ph = phases[i];
      posAttr.setXYZ(
        i,
        basePositions[i * 3]     + Math.sin(t * 0.30 + ph) * 0.08,
        basePositions[i * 3 + 1] + Math.cos(t * 0.25 + ph) * 0.08,
        basePositions[i * 3 + 2] + Math.sin(t * 0.20 + ph + 1) * 0.06
      );
    }

    posAttr.needsUpdate = true;
    // Very slow global drift rotation
    pointsRef.current.rotation.y += 0.0008;
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#00d4ff",
        size: 0.028,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
