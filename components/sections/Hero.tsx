"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, Orbit } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { sound } from "@/lib/audio";
import type { SceneMode } from "@/components/3d/HeroScene";

// Lazy-load the 3D canvas — prevents SSR issues with Three.js
const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

const socialLinks = [
  { href: personalInfo.github, Icon: Github, label: "GitHub" },
  { href: personalInfo.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
];

// Framer Motion variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Hero() {
  const [sceneMode, setSceneMode] = useState<SceneMode>("core");

  const scrollToProjects = () => {
    sound.playClick();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    sound.playClick();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── 3D Canvas (right side / background) ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full opacity-95">
          <HeroScene activeScene={sceneMode} />
        </div>
      </div>

      {/* ── Interactive 3D Scene Switcher HUD ── */}
      <div className="absolute right-4 sm:right-8 top-20 sm:top-24 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
        <div className="flex items-center gap-1 p-1 rounded-xl glass border border-white/10 backdrop-blur-md shadow-card">
          {[
            { id: "core", label: "Quantum Core" },
            { id: "workspace", label: "DNA Helix" },
            { id: "city", label: "Holo Planet" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                sound.playModeSwitch();
                setSceneMode(mode.id as SceneMode);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                sceneMode === mode.id
                  ? "bg-[#00f5a0] text-black shadow-neon-emerald font-semibold"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono tracking-wider uppercase pr-1">
          <Orbit size={11} className="text-[#00f5a0]" />
          <span>Interactive 3D // Drag to Orbit</span>
        </div>
      </div>

      {/* ── Gradient fade to let text be readable ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #050510 38%, rgba(5,5,16,0.65) 65%, transparent 100%)",
        }}
      />

      {/* ── Text Content ── */}
      <div className="relative z-10 container-max section-padding w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Greeting badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00f5a0]/40 text-[#00f5a0] text-sm font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]" />
              </span>
              Available for opportunities // 2026
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-none"
          >
            <span className="block text-white">Hi, I&apos;m</span>
            <span className="block gradient-text mt-1">{personalInfo.name}</span>
          </motion.h1>

          {/* Typing Role */}
          <motion.div
            variants={itemVariants}
            className="font-mono text-xl sm:text-2xl text-[#00d4ff] mb-6 h-9"
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "React & Next.js Engineer",
                2000,
                "Spring Boot Backend Dev",
                2000,
                "UI/UX Enthusiast",
                2000,
                "Open Source Contributor",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="border-r-2 border-[#00f5a0] pr-1"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-lg leading-relaxed mb-10 max-w-lg"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={scrollToProjects}
              onMouseEnter={() => sound.playHover()}
              id="hero-view-projects"
              className="btn-emerald text-base px-8 py-4 font-bold"
            >
              View Projects
            </button>
            <button
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              id="hero-contact-me"
              className="btn-outline text-base px-8 py-4"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-[#00f5a0] hover:border-[#00f5a0]/40 transition-all duration-200 hover:shadow-neon-emerald hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}

            <span className="text-text-muted text-sm ml-2 font-mono">
              @{personalInfo.github.split("/").pop()}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs tracking-widest uppercase font-mono text-[#00f5a0]/80">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#00f5a0]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
