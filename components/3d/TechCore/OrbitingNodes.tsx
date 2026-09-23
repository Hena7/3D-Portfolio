"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface NodeConfig {
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: THREE.Euler;
  phase: number;        // initial angle offset
  size: number;
  color: string;
  emissive: string;
}

interface NodeProps extends NodeConfig {}

function OrbitingNode({ orbitRadius, orbitSpeed, orbitTilt, phase, size, color, emissive }: NodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * orbitSpeed + phase;

    if (groupRef.current) {
      // Orbit in the XZ plane of the group (tilt is applied on the group)
      groupRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle * 0.4) * 0.15, // slight vertical bobbing
        Math.sin(angle) * orbitRadius
      );
    }

    // Self-rotation + emissive ping
    if (meshRef.current) meshRef.current.rotation.y += 0.02;
    if (matRef.current) {
      matRef.current.emissiveIntensity = 2.2 + Math.sin(t * 2.5 + phase) * 0.6;
    }
  });

  return (
    <group rotation={orbitTilt}>
      <group ref={groupRef}>
        <Sphere ref={meshRef} args={[size, 16, 16]}>
          <meshStandardMaterial
            ref={matRef}
            color={color}
            emissive={emissive}
            emissiveIntensity={2.2}
            roughness={0.05}
            metalness={0.8}
          />
        </Sphere>
        {/* Small halo on each node */}
        <pointLight color={emissive} intensity={0.6} distance={1.2} decay={2} />
      </group>
    </group>
  );
}

/**
 * OrbitingNodes — 6 small glowing spheres orbiting the core.
 *
 * Each has a unique orbit radius, speed, tilt, and color
 * to create layered, independent movement at all times.
 */
export function OrbitingNodes() {
  const nodes = useMemo<NodeConfig[]>(() => [
    // Inner cyan nodes
    { orbitRadius: 1.52, orbitSpeed: 0.65,  orbitTilt: new THREE.Euler(0, 0, 0),             phase: 0,              size: 0.09, color: "#00d4ff", emissive: "#00aaff" },
    { orbitRadius: 1.52, orbitSpeed: 0.65,  orbitTilt: new THREE.Euler(0, 0, 0),             phase: Math.PI,        size: 0.09, color: "#00d4ff", emissive: "#00aaff" },
    // Mid emerald nodes (different tilt)
    { orbitRadius: 1.88, orbitSpeed: -0.40, orbitTilt: new THREE.Euler(Math.PI / 3, 0, 0.5), phase: Math.PI / 4,    size: 0.08, color: "#00f5a0", emissive: "#00bb77" },
    { orbitRadius: 1.88, orbitSpeed: -0.40, orbitTilt: new THREE.Euler(Math.PI / 3, 0, 0.5), phase: Math.PI + Math.PI / 4, size: 0.08, color: "#00f5a0", emissive: "#00bb77" },
    // Outer amber lone node
    { orbitRadius: 2.32, orbitSpeed: 0.22,  orbitTilt: new THREE.Euler(-Math.PI / 5, 0, 0),  phase: Math.PI / 3,   size: 0.11, color: "#ffb800", emissive: "#ff8800" },
    // Inner fast node
    { orbitRadius: 1.18, orbitSpeed: 1.1,   orbitTilt: new THREE.Euler(Math.PI / 4, Math.PI / 6, 0), phase: 0,     size: 0.065, color: "#22d3ee", emissive: "#06b6d4" },
  ], []);

  return (
    <group>
      {nodes.map((node, i) => (
        <OrbitingNode key={i} {...node} />
      ))}
    </group>
  );
}
