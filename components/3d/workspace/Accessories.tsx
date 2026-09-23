"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Accessories — Supporting desk objects:
 *   - External mechanical keyboard (left side)
 *   - Mouse (right side)
 *   - Coffee mug (far left corner)
 *   - Secondary monitor (behind laptop)
 */

// ── Keyboard ─────────────────────────────────────────────────────────────────
export function Keyboard() {
  return (
    <group position={[-0.6, 0.07, 0.65]}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[1.1, 0.05, 0.42]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Key rows — 4 strips of subtle glow */}
      {[0.12, 0.04, -0.04, -0.12].map((zOff, i) => (
        <mesh key={i} position={[0, 0.026, zOff]}>
          <boxGeometry args={[1.02, 0.003, 0.06]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5 + i * 0.15}
            roughness={0}
            metalness={0}
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Space bar glow */}
      <mesh position={[0, 0.026, 0.14]}>
        <boxGeometry args={[0.55, 0.003, 0.05]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={1.2}
          roughness={0}
          metalness={0}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ── Mouse ─────────────────────────────────────────────────────────────────────
export function Mouse() {
  return (
    <group position={[1.6, 0.07, 0.55]}>
      {/* Body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.1, 0.22, 8, 16]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Scroll wheel glow */}
      <mesh position={[0, 0.11, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 12]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Side button glow */}
      <mesh position={[0.1, 0.05, -0.05]}>
        <boxGeometry args={[0.01, 0.04, 0.08]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={1.8}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ── Coffee Mug ────────────────────────────────────────────────────────────────
function useSteamPositions(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 0.06,
        z: (Math.random() - 0.5) * 0.06,
        speed: 0.4 + Math.random() * 0.3,
        phase: (i / count) * Math.PI * 2,
      })),
    [count]
  );
}

export function CoffeeMug() {
  const steamRefs = useRef<THREE.Mesh[]>([]);
  const particles = useSteamPositions(5);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    steamRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = particles[i];
      const progress = ((t * p.speed + p.phase) % (Math.PI * 2)) / (Math.PI * 2);
      mesh.position.y = 0.28 + progress * 0.18;
      mesh.position.x = p.x + Math.sin(t * p.speed + p.phase) * 0.02;
      const scale = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
      mesh.scale.setScalar(scale * 0.8 + 0.1);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, scale * 0.3);
    });
  });

  return (
    <group position={[-2.3, 0.07, 0.8]}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.085, 0.22, 18]} />
        <meshStandardMaterial color="#0a0a18" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Mug rim glow */}
      <mesh position={[0, 0.11, 0]}>
        <torusGeometry args={[0.1, 0.008, 8, 24]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.065, 0.015, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#0a0a18" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.1, 0]}>
        <circleGeometry args={[0.088, 16]} />
        <meshStandardMaterial color="#1a0800" roughness={0.9} metalness={0} />
      </mesh>

      {/* Steam particles */}
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) steamRefs.current[i] = el;
          }}
          position={[p.x, 0.28, p.z]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial
            color="#aaddff"
            transparent
            opacity={0.2}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Secondary Monitor ─────────────────────────────────────────────────────────
function useMonitorTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const W = 256;
    const H = 160;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    // Terminal header
    ctx.fillStyle = "#0d0d20";
    ctx.fillRect(0, 0, W, 18);
    ctx.fillStyle = "#00d4ff";
    ctx.font = "9px monospace";
    ctx.fillText("Terminal  ×", 6, 12);

    // Terminal output lines
    const lines = [
      { text: "$ npm run dev", color: "#e2e8f0" },
      { text: "  ▶ Next.js 15.1", color: "#555580" },
      { text: "  ✓ Compiled in 0.4s", color: "#28c840" },
      { text: "  ○ Ready on :3000", color: "#28c840" },
      { text: "", color: "" },
      { text: "$ git status", color: "#e2e8f0" },
      { text: "  On branch main", color: "#00d4ff" },
      { text: "  M components/3d/", color: "#ffbd2e" },
      { text: "  M app/page.tsx", color: "#ffbd2e" },
      { text: "", color: "" },
      { text: "$ git commit -m", color: "#e2e8f0" },
      { text: "  'feat: workspace'", color: "#28c840" },
      { text: "  [main a3f91c2]", color: "#555580" },
      { text: "$ ▌", color: "#00d4ff" },
    ];

    ctx.font = "8px monospace";
    lines.forEach((line, i) => {
      if (!line.text) return;
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 6, 30 + i * 9);
    });

    return new THREE.CanvasTexture(canvas);
  }, []);
}

export function SecondaryMonitor() {
  const screenRef = useRef<THREE.Mesh>(null);
  const tex = useMonitorTexture();

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group position={[2.0, 0.06, -0.6]} rotation={[0, -0.35, 0]}>
      {/* Monitor stand */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.06, 0.55, 0.06]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Monitor body */}
      <mesh castShadow position={[0, 0.56, 0]}>
        <boxGeometry args={[1.4, 0.82, 0.06]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.56, 0.032]}>
        <boxGeometry args={[1.3, 0.74, 0.001]} />
        <meshStandardMaterial
          map={tex}
          emissive="#001133"
          emissiveIntensity={0.4}
          roughness={0.05}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Neon base glow */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.35, 0.006, 0.25]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={2}
          roughness={0}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      <pointLight position={[0, 0.56, 0.2]} intensity={0.8} distance={2} color="#0088ff" />
    </group>
  );
}
