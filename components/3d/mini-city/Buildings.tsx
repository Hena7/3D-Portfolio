"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  color: string;
}

function SingleBuilding({ position, height, width, color }: BuildingProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const emissiveRef = useRef<THREE.MeshStandardMaterial>(null);

  // Subtle pulsing emissive
  useFrame((state) => {
    if (emissiveRef.current) {
      const pulse = hovered ? 2.5 : 0.5 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
      emissiveRef.current.emissiveIntensity = pulse;
    }
    
    // Smooth scaling on hover
    if (meshRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], height / 2, position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[width, height, width]} />
      <meshStandardMaterial
        ref={emissiveRef}
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={1}
      />
      {/* Decorative window grid (simplified) */}
      <mesh position={[0, 0, width / 2 + 0.01]}>
        <planeGeometry args={[width * 0.8, height * 0.8]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.4 : 0.1} />
      </mesh>
      <mesh position={[0, 0, -width / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.8, height * 0.8]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.4 : 0.1} />
      </mesh>
    </mesh>
  );
}

export function Buildings() {
  const buildingData = useMemo(() => {
    const data = [];
    const count = 7;
    const colors = ["#00f2ff", "#00f5a0", "#ffb800", "#00d4ff"];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 1.5;
      data.push({
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ] as [number, number, number],
        height: 1 + Math.random() * 2.5,
        width: 0.6 + Math.random() * 0.4,
        color: colors[i % colors.length]
      });
    }
    return data;
  }, []);

  return (
    <group>
      {buildingData.map((b, i) => (
        <SingleBuilding key={i} {...b} />
      ))}
    </group>
  );
}
