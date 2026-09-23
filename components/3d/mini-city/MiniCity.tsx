"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Torus, Sphere } from "@react-three/drei";

interface MiniCityProps {
  mouseX: number;
  mouseY: number;
}

/**
 * MiniCity — Reborn as a spectacular Holographic Planet scene.
 *
 * Features:
 *   - Central glowing planet sphere with animated surface texture
 *   - Two orbital ring systems at different tilts
 *   - Orbiting moon satellites
 *   - Grid lines on planet surface (wireframe overlay)
 *   - Ambient particle field
 *   - Mouse parallax + float animation
 */
export function MiniCity({ mouseX, mouseY }: MiniCityProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow auto-rotation
    groupRef.current.rotation.y += delta * 0.12;

    // Mouse parallax tilt
    const targetX = mouseY * 0.18;
    const targetZ = -mouseX * 0.14;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.04);
  });

  return (
    <>
      {/* Ambient space particles */}
      <SpaceParticles />

      <Float speed={0.6} floatIntensity={0.25} floatingRange={[-0.1, 0.1]}>
        <group ref={groupRef}>
          {/* ── Planet core ── */}
          <Planet />

          {/* ── Ring system 1 — equatorial ── */}
          <PlanetRing
            radius={2.0}
            tube={0.055}
            tilt={[Math.PI / 2, 0, 0]}
            color="#00d4ff"
            emissive="#0099cc"
            speed={0.18}
          />

          {/* ── Ring system 2 — tilted ── */}
          <PlanetRing
            radius={2.55}
            tube={0.03}
            tilt={[Math.PI / 2.3, 0, Math.PI / 5]}
            color="#00f5a0"
            emissive="#007744"
            speed={-0.11}
          />

          {/* ── Outer dim halo ring ── */}
          <PlanetRing
            radius={3.1}
            tube={0.012}
            tilt={[Math.PI / 2.1, 0, -Math.PI / 7]}
            color="#ffb800"
            emissive="#995500"
            speed={0.07}
          />

          {/* ── Orbiting moons ── */}
          <OrbitingMoon radius={1.75} size={0.13} speed={0.7} offset={0} color="#00d4ff" tiltY={0.4} />
          <OrbitingMoon radius={2.2} size={0.09} speed={-0.45} offset={2.1} color="#00f5a0" tiltY={-0.6} />
          <OrbitingMoon radius={1.5} size={0.07} speed={1.1} offset={4.2} color="#ffb800" tiltY={0.9} />

          {/* ── Planet glow lights ── */}
          <pointLight position={[0, 0, 0]} color="#00d4ff" intensity={3.0} distance={8} decay={2} />
          <pointLight position={[1.5, 1.5, 0]} color="#00f5a0" intensity={1.5} distance={6} decay={2} />
        </group>
      </Float>
    </>
  );
}

/* ── Planet sphere with animated surface ─────────────────────────── */
function Planet() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  // Create a procedural canvas texture for planet surface
  const surfaceTexture = useMemo(() => {
    const W = 512;
    const H = 256;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Deep space background
    ctx.fillStyle = "#030820";
    ctx.fillRect(0, 0, W, H);

    // Continent-like patches
    const patches = [
      { x: 80, y: 60, rx: 60, ry: 40, color: "rgba(0,212,255,0.15)" },
      { x: 200, y: 90, rx: 80, ry: 50, color: "rgba(0,245,160,0.12)" },
      { x: 350, y: 70, rx: 50, ry: 35, color: "rgba(0,212,255,0.1)" },
      { x: 140, y: 170, rx: 70, ry: 45, color: "rgba(0,245,160,0.13)" },
      { x: 390, y: 180, rx: 55, ry: 40, color: "rgba(255,184,0,0.08)" },
      { x: 260, y: 150, rx: 90, ry: 55, color: "rgba(0,212,255,0.1)" },
    ];

    patches.forEach(({ x, y, rx, ry, color }) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Latitude grid lines
    ctx.strokeStyle = "rgba(0,212,255,0.12)";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 8; i++) {
      const y = (i / 8) * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Longitude grid lines
    for (let i = 0; i < 16; i++) {
      const x = (i / 16) * W;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame(({ clock }, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.08;
      // Pulse glow
      const mat = sphereRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.35 + Math.sin(clock.elapsedTime * 0.9) * 0.12;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.1) * 0.03;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.04;
      wireRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Core planet sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          map={surfaceTexture}
          color="#0a1a3a"
          emissive="#00d4ff"
          emissiveIntensity={0.35}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Atmosphere glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00aaff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe overlay — slowly counter-rotating */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

/* ── Planetary ring system ────────────────────────────────────────── */
function PlanetRing({
  radius,
  tube,
  tilt,
  color,
  emissive,
  speed,
}: {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  color: string;
  emissive: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <Torus ref={ref} args={[radius, tube, 4, 140]} rotation={tilt}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={2.0}
        roughness={0.05}
        metalness={0.9}
        transparent
        opacity={0.75}
        toneMapped={false}
      />
    </Torus>
  );
}

/* ── Orbiting moon ────────────────────────────────────────────────── */
function OrbitingMoon({
  radius,
  size,
  speed,
  offset,
  color,
  tiltY,
}: {
  radius: number;
  size: number;
  speed: number;
  offset: number;
  color: string;
  tiltY: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.4) * tiltY * 0.5,
      Math.sin(t) * radius
    );
  });

  return (
    <group ref={ref}>
      <Sphere args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          roughness={0.3}
          metalness={0.6}
          toneMapped={false}
        />
      </Sphere>
      {/* Moon trail light */}
      <pointLight color={color} intensity={0.8} distance={2.5} decay={2} />
    </group>
  );
}

/* ── Space particle field ─────────────────────────────────────────── */
function SpaceParticles() {
  const COUNT = 200;
  const ref = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 2.5;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.025,
      color: "#c8f0ff",
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    return { geometry: geo, material: mat };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}
