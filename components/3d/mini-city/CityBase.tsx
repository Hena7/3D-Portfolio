"use client";

import { useRef } from "react";
import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

/**
 * CityBase component creates the floating platform for the mini city.
 * It features a hexagonal shape with glowing emissive edges and a 
 * bottom "energy core" effect.
 */
export function CityBase() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Main Platform (Hexagon) */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[4.5, 4.8, 0.4, 6]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
          emissive="#001122"
        />
      </mesh>

      {/* Glowing Rim */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[4.52, 4.52, 0.05, 6]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Energy Core / Bottom Detail */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[4, 1.5, 6]} />
        <MeshDistortMaterial
          color="#00f5a0"
          emissive="#008855"
          emissiveIntensity={0.6}
          speed={2}
          distort={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Subtle bottom ring */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
