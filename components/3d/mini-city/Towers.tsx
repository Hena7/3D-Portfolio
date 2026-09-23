"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function SkillTower({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const topRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (topRef.current) {
      topRef.current.rotation.y = t * 2;
    }
    if (coreRef.current) {
      coreRef.current.position.y = (height / 2) + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Tower Base */}
      <mesh position={[0, height / 2.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, height * 0.8, 6]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Pulsing Core */}
      <mesh ref={coreRef} position={[0, height * 0.8, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        <pointLight intensity={2} distance={3} color={color} />
      </mesh>

      {/* Rotating Signal Piece */}
      <mesh ref={topRef} position={[0, height * 0.9, 0]}>
        <torusGeometry args={[0.4, 0.05, 3, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, height, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshBasicMaterial color="#555" />
      </mesh>
    </group>
  );
}

export function Towers() {
  return (
    <group>
      <SkillTower position={[0, 0, 0]} height={6} color="#00f2ff" /> {/* Central Hub */}
      <SkillTower position={[-3, 0, -2]} height={4.5} color="#00f5a0" />
      <SkillTower position={[3, 0, 2]} height={4.5} color="#ffb800" />
    </group>
  );
}
