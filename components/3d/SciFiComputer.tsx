"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface SciFiComputerProps {
  mouseX?: number;
  mouseY?: number;
  isMobile?: boolean;
}

export function SciFiComputer({ mouseX = 0, mouseY = 0, isMobile = false }: SciFiComputerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/sci_-_fi_computer_game_ready.glb");

  // Enhance materials for maximum visual impact & bloom
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.needsUpdate = true;

          // If it's the digital display, ensure emissive punch and transparency
          if (mat.name === "digital_displays" || mat.name === "digital_display_sides") {
            mat.toneMapped = false;
            if (mat.emissiveMap) {
              mat.emissive = new THREE.Color("#00f5a0");
              mat.emissiveIntensity = 2.4;
            }
          }

          // Polished metallic reflections
          if (mat.name === "metal_1") {
            mat.metalness = 0.85;
            mat.roughness = 0.25;
          }
          if (mat.name === "metal_2") {
            mat.metalness = 0.7;
            mat.roughness = 0.5;
          }
        }
      }
    });
  }, [scene]);

  // Subtle interactive floating & mouse-parallax rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Base idle rotation: gentle continuous yaw
    const idleYaw = Math.sin(t * 0.4) * 0.12 - 0.35;
    const idlePitch = Math.sin(t * 0.6) * 0.05 + 0.12;

    // Mouse parallax tilt
    const targetX = idlePitch - mouseY * 0.18;
    const targetY = idleYaw + mouseX * 0.22;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
  });

  // Responsive scale and position
  const scale = isMobile ? 0.46 : 0.68;
  const position: [number, number, number] = isMobile ? [0, 0.1, 0] : [0.15, -0.25, 0];

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.15}
      floatIntensity={0.25}
      floatingRange={[-0.06, 0.06]}
    >
      <group ref={groupRef} position={position} scale={scale}>
        <primitive object={scene} />

        {/* Localized cyber glow lights radiating from the computer displays */}
        <pointLight position={[0, 1.2, 0.8]} color="#00f5a0" intensity={2.8} distance={5} decay={2} />
        <pointLight position={[0, 0.4, 0.5]} color="#00d4ff" intensity={2.5} distance={4} decay={2} />
        <pointLight position={[0, -1.2, 0.4]} color="#ffb800" intensity={1.2} distance={3} decay={2} />
      </group>
    </Float>
  );
}

useGLTF.preload("/sci_-_fi_computer_game_ready.glb");
