"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";

function HolographicScreen({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
        meshRef.current.position.y += Math.sin(t * 1.2) * 0.002;
        meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {text}
        </Text>
      </mesh>
      {/* Decorative scan lines or glow */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[1.6, 0.02, 0.02]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Drone({ orbitRadius, speed, offset, color }: { orbitRadius: number; speed: number; offset: number; color: string }) {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime * speed + offset;
        if (ref.current) {
            ref.current.position.x = Math.cos(t) * orbitRadius;
            ref.current.position.z = Math.sin(t) * orbitRadius;
            ref.current.position.y = Math.sin(t * 2) * 0.3 + 2;
            ref.current.rotation.y = -t + Math.PI / 2;
        }
    });

    return (
        <group ref={ref}>
            <mesh>
                <boxGeometry args={[0.2, 0.08, 0.15]} />
                <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.04]} />
                <meshBasicMaterial color={color} />
                <pointLight intensity={1} distance={1} color={color} />
            </mesh>
        </group>
    );
}

export function FloatingElements() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <HolographicScreen position={[2.5, 4, -1]} text="PROJECT: ALPHA" color="#00f2ff" />
        <HolographicScreen position={[-2.5, 3.5, 1]} text="SKILL: REACT" color="#00f5a0" />
        <HolographicScreen position={[0, 5.5, -2]} text="STATUS: NOMINAL" color="#ffb800" />
      </Float>

      <Drone orbitRadius={5.5} speed={0.4} offset={0} color="#00f2ff" />
      <Drone orbitRadius={6} speed={0.3} offset={Math.PI} color="#ffb800" />
    </group>
  );
}
