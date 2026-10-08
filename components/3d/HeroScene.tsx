"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTheme } from "@/components/ui/ThemeProvider";
import { SciFiComputer } from "./SciFiComputer";

/**
 * HeroScene — Three.js Canvas for the portfolio hero section.
 * Renders the high-fidelity sci-fi computer terminal from sci_-_fi_computer_game_ready.glb
 * with dynamic lighting, interactive mouse parallax, floating physics, and OrbitControls.
 */
export function HeroScene() {
  const { normalX, normalY } = useMousePosition();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.8], fov: 45 }}
      gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* ── Lighting Rig tailored for metallic reflections & cyber glow ── */}
        <ambientLight intensity={isDark ? 0.35 : 0.9} color={isDark ? "#08131d" : "#f1f5f9"} />

        {/* Key light from upper-left */}
        <directionalLight
          position={[-4, 7, 5]}
          intensity={isDark ? 1.6 : 2.2}
          color="#e0f7ff"
        />

        {/* Cyan front-right fill */}
        <pointLight position={[3.5, 2.5, 4]} intensity={isDark ? 2.5 : 2.0} color="#00d4ff" distance={12} decay={2} />

        {/* Cyber emerald counter-light */}
        <pointLight position={[-3.5, 1, -4]} intensity={isDark ? 3.0 : 2.5} color="#00f5a0" distance={12} decay={2} />

        {/* Solar amber bottom accent */}
        <pointLight position={[4, -3, 2]} intensity={isDark ? 1.5 : 1.2} color="#ffb800" distance={10} decay={2} />

        {/* ── Star field (Dark mode only) ── */}
        {isDark && (
          <Stars
            radius={80}
            depth={40}
            count={1800}
            factor={3}
            saturation={0.2}
            fade
            speed={0.2}
          />
        )}

        {/* ── The Sci-Fi Computer 3D Model ── */}
        <SciFiComputer mouseX={normalX} mouseY={normalY} isMobile={isMobile} />

        {/* ── Environment map for metallic reflections ── */}
        <Environment key={isDark ? "dark-env" : "light-env"} resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={isDark ? 3.5 : 2}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={3}
              color={isDark ? "#00d4ff" : "#38bdf8"}
            />
            <Lightformer
              form="ring"
              intensity={isDark ? 3.0 : 2.0}
              rotation-y={Math.PI / 2}
              position={[-5, 2, -1]}
              scale={2.5}
              color={isDark ? "#00f5a0" : "#ffffff"}
            />
            <Lightformer
              form="rect"
              intensity={isDark ? 2.5 : 1.5}
              position={[8, 2, 2]}
              scale={6}
              color={isDark ? "#00d4ff" : "#cbd5e1"}
              target={[0, 0, 0]}
            />
          </group>
        </Environment>

        {/* ── Interactive OrbitControls ── */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.2}
        />

        {/* ── Post-processing Bloom for glowing sci-fi holographic screens ── */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={isDark ? 0.45 : 0.65}
            mipmapBlur
            intensity={isDark ? 1.8 : 1.0}
            radius={0.7}
          />
          <Noise opacity={isDark ? 0.025 : 0.01} />
          <Vignette offset={0.3} darkness={isDark ? 0.5 : 0} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
