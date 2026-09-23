"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WorkspaceParticles — Small glowing orbs that drift around the workspace.
 * Gives the setup a "floating in space" cyberpunk feel.
 */
export function WorkspaceParticles() {
  const COUNT = 80;
  const ref = useRef<THREE.Points>(null);

  // Randomize starting positions in a cloud around the desk
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Spread particles in an ellipsoid around the workspace
      pos[i * 3 + 0] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      // Drift upward slowly and loop
      const baseY = ((((pos.getY(i) - 0.5) + 2 + t * speeds[i] * 0.08) % 4) - 2) + 0.5;
      pos.setY(i, baseY);
      // Gentle sway
      pos.setX(
        i,
        pos.getX(i) + Math.sin(t * speeds[i] + i) * 0.001
      );
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.025}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * OrbitalRing — A thin decorative ring floating around the workspace.
 * Slowly rotates on a tilted axis for visual interest.
 */
export function OrbitalRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]} rotation={[0.4, 0, 0]}>
      <torusGeometry args={[3.4, 0.008, 8, 80]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={1.5}
        roughness={0}
        metalness={0}
        transparent
        opacity={0.4}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * DataStreams — Small vertical lines that fall like digital rain, 
 * positioned behind the workspace at a distance.
 */
export function DataStreams() {
  const COUNT = 14;
  const streams = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        x: -3.5 + i * 0.52,
        z: -2.8 + Math.random() * 0.4,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        height: 0.3 + Math.random() * 0.8,
      })),
    []
  );

  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = streams[i];
      // Move downward, loop
      const yPos = (((t * s.speed + s.offset) % 4) - 2) * -1;
      mesh.position.y = yPos;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.1 + Math.abs(Math.sin(t * s.speed + s.offset)) * 0.3;
    });
  });

  return (
    <>
      {streams.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          position={[s.x, 0, s.z]}
        >
          <boxGeometry args={[0.01, s.height, 0.01]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
            transparent
            opacity={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}
