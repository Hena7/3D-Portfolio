"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTheme } from "@/components/ui/ThemeProvider";
import { TechCore } from "./TechCore";
import { FloatingWorkspace } from "./workspace/FloatingWorkspace";
import { MiniCity } from "./mini-city/MiniCity";

export type SceneMode = "core" | "workspace" | "city";

interface HeroSceneProps {
  activeScene?: SceneMode;
  wireframe?: boolean;
}

/**
 * HeroScene — Three.js Canvas for the portfolio hero section.
 * Supports dynamic switching between:
 *   1. TechCore (Abstract digital quantum sphere)
 *   2. FloatingWorkspace (Isometric developer desk + glowing laptop)
 *   3. MiniCity (Cyberpunk floating island city)
 */
export function HeroScene({ activeScene = "core" }: HeroSceneProps) {
  const { normalX, normalY } = useMousePosition();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>

        {/* ── Lighting Rig (Zero Purple, Theme Adaptive) ── */}

        {/* Ambient lighting */}
        <ambientLight intensity={isDark ? 0.16 : 0.8} color={isDark ? "#051015" : "#e2e8f0"} />

        {/* Cool key light from upper-left */}
        <directionalLight
          position={[-5, 8, 4]}
          intensity={isDark ? 0.7 : 1.2}
          color="#c8f5ff"
        />

        {/* Cyan fill from front-right */}
        <pointLight position={[3, 2, 5]} intensity={isDark ? 1.4 : 1.8} color="#00d4ff" distance={15} decay={2} />

        {/* Cyber Emerald counter-light from behind */}
        <pointLight position={[-3, 1, -7]} intensity={isDark ? 2.2 : 2.5} color="#00f5a0" distance={15} decay={2} />

        {/* Solar Amber accent — bottom right */}
        <pointLight position={[6, -3, 2]} intensity={isDark ? 1.0 : 1.4} color="#ffb800" distance={12} decay={2} />

        {/* ── Star field (Dark mode only) ── */}
        {isDark && (
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={3.5}
            saturation={0.15}
            fade
            speed={0.25}
          />
        )}

        {/* ── Dynamic 3D Scene Composition ── */}
        {activeScene === "core" && (
          <TechCore mouseX={normalX} mouseY={normalY} />
        )}

        {activeScene === "workspace" && (
          <group position={[0, -0.3, 0]} scale={0.78}>
            <FloatingWorkspace mouseX={normalX} mouseY={normalY} />
          </group>
        )}

        {activeScene === "city" && (
          <group position={[0, -0.7, 0]} scale={0.88}>
            <MiniCity mouseX={normalX} mouseY={normalY} />
          </group>
        )}

        {/* ── Environment map for metallic reflections ── */}
        <Environment preset={isDark ? "night" : "city"} />

        {/* ── Interactive gentle orbit controls ── */}
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.5} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3} />

        {/* ── Post-processing ── */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={isDark ? 0.55 : 0.65}
            mipmapBlur
            intensity={isDark ? 2.0 : 1.2}
            radius={0.75}
          />
          <Noise opacity={isDark ? 0.03 : 0.015} />
          <Vignette offset={0.28} darkness={isDark ? 0.55 : 0} />
        </EffectComposer>

      </Suspense>
    </Canvas>
  );
}
