"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Laptop — The hero centerpiece.
 *
 * Built from pure Three.js geometry (no GLTF needed):
 *   - Base (keyboard body)
 *   - Screen hinge + lid (slightly open ~75°)
 *   - Emissive screen with a fake "code editor" texture drawn on Canvas
 *   - Glowing cursor blink on screen
 *   - Backlit keyboard key glow strip
 */

// ── Creates a 2D canvas texture that mimics a dark code editor ──────────────
function useScreenTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const W = 512;
    const H = 320;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    // ── Top bar (title bar) ──
    ctx.fillStyle = "#0d0d20";
    ctx.fillRect(0, 0, W, 22);

    // Traffic light dots
    const dots = ["#ff5f57", "#ffbd2e", "#28c840"];
    dots.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(14 + i * 18, 11, 5, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });

    // Tab labels
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillStyle = "#00d4ff";
    ctx.fillText("portfolio.tsx", 60, 14);
    ctx.fillStyle = "#555580";
    ctx.fillText("globals.css", 165, 14);
    ctx.fillText("page.tsx", 260, 14);

    // Active-tab underline
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(58, 20, 100, 1.5);

    // ── Line numbers gutter ──
    ctx.fillStyle = "#0d0d22";
    ctx.fillRect(0, 22, 30, H - 22);

    const lineH = 14;
    const startY = 32;
    ctx.font = "9px JetBrains Mono, monospace";
    for (let ln = 1; ln <= 20; ln++) {
      ctx.fillStyle = "#3a3a5c";
      ctx.fillText(String(ln).padStart(2, " "), 6, startY + (ln - 1) * lineH);
    }

    // ── Code lines ──
    const codeLines: { text: string; color: string; indent: number }[] = [
      { text: "import React from 'react';", color: "#555580", indent: 0 },
      { text: "import { FloatingWorkspace } from", color: "#555580", indent: 0 },
      { text: "  '@/components/3d';", color: "#00d4ff", indent: 0 },
      { text: "", color: "", indent: 0 },
      { text: "export default function Hero() {", color: "#00f5a0", indent: 0 },
      { text: "  return (", color: "#e2e8f0", indent: 0 },
      { text: "    <section className=\"hero\">", color: "#00d4ff", indent: 0 },
      { text: "      <h1 className=\"gradient-text\">", color: "#00d4ff", indent: 0 },
      { text: "        Full Stack Developer", color: "#00f5a0", indent: 0 },
      { text: "      </h1>", color: "#00d4ff", indent: 0 },
      { text: "      <FloatingWorkspace", color: "#ffbd2e", indent: 0 },
      { text: "        theme=\"cyber-emerald\"", color: "#00d4ff", indent: 0 },
      { text: "        interactive={true}", color: "#00f5a0", indent: 0 },
      { text: "        glow={2.4}", color: "#ffbd2e", indent: 0 },
      { text: "      />", color: "#ffbd2e", indent: 0 },
      { text: "    </section>", color: "#00d4ff", indent: 0 },
      { text: "  );", color: "#e2e8f0", indent: 0 },
      { text: "}", color: "#00f5a0", indent: 0 },
    ];

    ctx.font = "9.5px JetBrains Mono, monospace";
    codeLines.forEach((line, i) => {
      if (!line.text) return;
      ctx.fillStyle = line.color || "#e2e8f0";
      ctx.fillText(line.text, 36 + line.indent, startY + i * lineH);
    });

    // ── Bottom status bar ──
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(0, H - 16, W, 16);
    ctx.fillStyle = "#050510";
    ctx.font = "8px JetBrains Mono, monospace";
    ctx.fillText("● TypeScript   Ln 8, Col 24   UTF-8", 6, H - 5);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);
}

// ── Laptop component ──────────────────────────────────────────────────────
interface LaptopProps {
  hovered: boolean;
}

export function Laptop({ hovered }: LaptopProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const cursorRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const screenTexture = useScreenTexture();

  // Lid is open at ~70 degrees
  const lidAngle = -Math.PI * 0.38;

  // Animate screen glow pulse + cursor blink
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Pulse screen emissive intensity
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = hovered
        ? 0.65 + Math.sin(t * 2) * 0.1
        : 0.45 + Math.sin(t * 1.5) * 0.06;
    }

    // Glow strength
    if (glowRef.current) {
      glowRef.current.intensity = hovered
        ? 2.5 + Math.sin(t * 2) * 0.4
        : 1.5 + Math.sin(t * 1.5) * 0.2;
    }

    // Cursor blink (every ~1 second)
    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(t * Math.PI) > 0;
    }
  });

  return (
    <group position={[0, 0.06, -0.1]}>
      {/* ── Laptop base (keyboard body) ── */}
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[2.0, 0.08, 1.3]} />
        <meshStandardMaterial
          color="#111122"
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* ── Apple-logo-esque backlight on base ── */}
      <mesh position={[0, 0.101, 0]}>
        <boxGeometry args={[1.9, 0.002, 1.2]} />
        <meshStandardMaterial
          color="#0d0d1f"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* ── Keyboard key glow (subtle strip) ── */}
      <mesh position={[0, 0.103, 0.1]}>
        <boxGeometry args={[1.7, 0.001, 0.7]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.6}
          roughness={0}
          metalness={0}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* ── Trackpad ── */}
      <mesh position={[0, 0.103, 0.48]}>
        <boxGeometry args={[0.55, 0.001, 0.35]} />
        <meshStandardMaterial color="#0a0a1a" roughness={0.1} metalness={0.4} />
      </mesh>

      {/* ── Hinge group (lid opens backward) ── */}
      <group position={[0, 0.1, -0.65]}>
        {/* Hinge bar */}
        <mesh>
          <boxGeometry args={[1.9, 0.04, 0.04]} />
          <meshStandardMaterial color="#0a0a1a" roughness={0.3} metalness={0.95} />
        </mesh>

        {/* ── Screen lid (rotated open) ── */}
        <group rotation={[lidAngle, 0, 0]}>
          {/* Lid shell */}
          <mesh castShadow position={[0, 0.65, 0]}>
            <boxGeometry args={[2.0, 1.28, 0.06]} />
            <meshStandardMaterial
              color="#0d0d1f"
              roughness={0.15}
              metalness={0.95}
              envMapIntensity={2}
            />
          </mesh>

          {/* Screen bezel (inset from lid face) */}
          <mesh position={[0, 0.65, 0.032]}>
            <boxGeometry args={[1.88, 1.18, 0.005]} />
            <meshStandardMaterial color="#050510" roughness={0.8} metalness={0.1} />
          </mesh>

          {/* ── THE SCREEN ── */}
          <mesh ref={screenRef} position={[0, 0.65, 0.0355]}>
            <boxGeometry args={[1.78, 1.1, 0.001]} />
            <meshStandardMaterial
              map={screenTexture}
              emissive="#00aaff"
              emissiveIntensity={0.5}
              roughness={0.05}
              metalness={0}
              toneMapped={false}
            />
          </mesh>

          {/* ── Blinking cursor overlay ── */}
          <mesh ref={cursorRef} position={[0.02, 0.535, 0.0365]}>
            <boxGeometry args={[0.008, 0.022, 0.001]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={6}
              toneMapped={false}
            />
          </mesh>

          {/* ── Screen point light (illuminates desk/keyboard) ── */}
          <pointLight
            ref={glowRef}
            position={[0, 0.65, 0.15]}
            intensity={1.5}
            distance={3}
            color="#00aaff"
          />

          {/* Brand notch area (centered at top bezel) */}
          <mesh position={[0, 1.21, 0.031]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
