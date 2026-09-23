"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

interface FloatingWorkspaceProps {
  mouseX?: number;
  mouseY?: number;
}

/**
 * FloatingWorkspace — Reborn as a spectacular DNA Double Helix visualization.
 *
 * Two counter-rotating helices made of glowing spheres, connected by
 * bridge rungs, surrounded by animated particle trails.
 * Reacts to mouse parallax and auto-rotates smoothly.
 */
export function FloatingWorkspace({ mouseX = 0, mouseY = 0 }: FloatingWorkspaceProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Helix geometry parameters
  const TURNS = 3;
  const NODES_PER_TURN = 10;
  const TOTAL = TURNS * NODES_PER_TURN;
  const HELIX_RADIUS = 1.1;
  const HELIX_HEIGHT = 4.0;
  const BRIDGE_EVERY = 2;

  // Pre-compute helix node positions
  const helixData = useMemo(() => {
    const nodes: { posA: THREE.Vector3; posB: THREE.Vector3; t: number }[] = [];
    for (let i = 0; i < TOTAL; i++) {
      const t = i / (TOTAL - 1);
      const angle = t * Math.PI * 2 * TURNS;
      const y = (t - 0.5) * HELIX_HEIGHT;
      const ax = Math.cos(angle) * HELIX_RADIUS;
      const az = Math.sin(angle) * HELIX_RADIUS;
      const bx = Math.cos(angle + Math.PI) * HELIX_RADIUS;
      const bz = Math.sin(angle + Math.PI) * HELIX_RADIUS;
      nodes.push({
        posA: new THREE.Vector3(ax, y, az),
        posB: new THREE.Vector3(bx, y, bz),
        t,
      });
    }
    return nodes;
  }, []);

  // Bridge indices
  const bridgeIndices = useMemo(() => {
    const idx: number[] = [];
    for (let i = 0; i < TOTAL; i += BRIDGE_EVERY) idx.push(i);
    return idx;
  }, []);

  // Mouse-driven parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow self-rotation
    groupRef.current.rotation.y += delta * 0.22;

    // Mouse parallax
    const targetX = -mouseY * 0.25;
    const targetZ = -mouseX * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.04);
  });

  return (
    <>
      {/* ── Ambient particle halos ── */}
      <HelixParticles />

      {/* ── Orbital accent rings ── */}
      <AccentRings />

      <Float speed={0.8} floatIntensity={0.3} floatingRange={[-0.12, 0.12]}>
        <group ref={groupRef}>
          {/* ── Strand A nodes (cyan) ── */}
          {helixData.map(({ posA, t }, i) => (
            <HelixNode
              key={`a-${i}`}
              position={posA}
              color="#00d4ff"
              emissive="#0088cc"
              size={i % 5 === 0 ? 0.095 : 0.065}
              phase={t * Math.PI * 4}
            />
          ))}

          {/* ── Strand B nodes (emerald) ── */}
          {helixData.map(({ posB, t }, i) => (
            <HelixNode
              key={`b-${i}`}
              position={posB}
              color="#00f5a0"
              emissive="#00aa60"
              size={i % 5 === 0 ? 0.095 : 0.065}
              phase={t * Math.PI * 4 + Math.PI}
            />
          ))}

          {/* ── Connecting bridges ── */}
          {bridgeIndices.map((i) => (
            <Bridge
              key={`bridge-${i}`}
              from={helixData[i].posA}
              to={helixData[i].posB}
              t={helixData[i].t}
            />
          ))}

          {/* ── Central spine glow ── */}
          <mesh>
            <cylinderGeometry args={[0.012, 0.012, HELIX_HEIGHT, 8]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={0.8}
              transparent
              opacity={0.25}
              toneMapped={false}
            />
          </mesh>

          {/* ── Center point lights ── */}
          <pointLight position={[0, 1, 0]} color="#00d4ff" intensity={2.5} distance={6} decay={2} />
          <pointLight position={[0, -1, 0]} color="#00f5a0" intensity={2.0} distance={6} decay={2} />
          <pointLight position={[0, 0, 0]} color="#ffb800" intensity={0.8} distance={4} decay={2} />
        </group>
      </Float>
    </>
  );
}

/* ── Animated helix node ──────────────────────────────────────────── */
function HelixNode({
  position,
  color,
  emissive,
  size,
  phase,
}: {
  position: THREE.Vector3;
  color: string;
  emissive: string;
  size: number;
  phase: number;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.elapsedTime;
    matRef.current.emissiveIntensity = 1.6 + Math.sin(t * 1.8 + phase) * 0.8;
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={emissive}
        emissiveIntensity={1.6}
        roughness={0.05}
        metalness={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ── Bridge rung between two helix strands ────────────────────────── */
function Bridge({ from, to, t }: { from: THREE.Vector3; to: THREE.Vector3; t: number }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const mid = from.clone().lerp(to, 0.5);
  const dir = to.clone().sub(from);
  const length = dir.length();
  const color = t < 0.5 ? "#00d4ff" : "#00f5a0";

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const elapsed = clock.elapsedTime;
    matRef.current.opacity = 0.35 + Math.sin(elapsed * 2 + t * 8) * 0.2;
  });

  // Orient capsule along the bridge direction
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const axis = up.clone().cross(dir.clone().normalize());
    const angle = Math.acos(up.dot(dir.clone().normalize()));
    if (axis.length() > 0.001) q.setFromAxisAngle(axis.normalize(), angle);
    return q;
  }, [from, to]);

  return (
    <mesh position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.018, 0.018, length, 6]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.45}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ── Ambient particle halos ───────────────────────────────────────── */
function HelixParticles() {
  const COUNT = 180;
  const ref = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 1.4;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, speeds };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.006;
      if (arr[i * 3 + 1] > 2.75) arr[i * 3 + 1] = -2.75;
    }
    posAttr.needsUpdate = true;
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.032,
        color: "#00d4ff",
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        toneMapped: false,
      }),
    []
  );

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ── Decorative accent rings ──────────────────────────────────────── */
function AccentRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.15;
    if (r2.current) r2.current.rotation.x += delta * 0.12;
  });

  return (
    <>
      <Torus ref={r1} args={[2.5, 0.008, 4, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </Torus>
      <Torus ref={r2} args={[2.1, 0.006, 4, 120]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={1.5}
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </Torus>
    </>
  );
}
