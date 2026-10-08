"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, Send, Orbit } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { sound } from "@/lib/audio";

// Lazy-load the 3D canvas — prevents SSR issues with Three.js
const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

const socialLinks = [
  { href: personalInfo.github, Icon: Github, label: "GitHub" },
  { href: personalInfo.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: personalInfo.telegram, Icon: Send, label: "Telegram" },
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
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 sm:py-28 lg:py-32"
    >
      {/* ── 3D Canvas (right side / background) ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-40 w-full md:w-[60%] h-full opacity-95">
          <HeroScene />
        </div>
      </div>

      {/* ── Interactive 3D Status Badge (Desktop) ── */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/85 dark:bg-surface/85 glass border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-card font-mono text-xs text-text-secondary pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a86b] dark:bg-[#00f5a0]" />
        </span>
         <span className="text-slate-800 dark:text-slate-200 font-bold tracking-wider uppercase text-[11px]">
          
        </span> 
      </div> 

      {/* ── Gradient fade to let text be readable (Theme Adaptive) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#f0f4f8] via-[#f0f4f8]/85 to-transparent dark:from-[#050510] dark:via-[#050510]/80 dark:to-transparent transition-colors duration-300"
      />

      {/* ── Text Content ── */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4 leading-[1.08]"
          >
            <span className="block text-slate-900 dark:text-white">Hi, I&apos;m</span>
            <span className="block gradient-text mt-1">{personalInfo.name}</span>
          </motion.h1>

          {/* Typing Role */}
          <motion.div
            variants={itemVariants}
            className="font-mono text-lg sm:text-2xl font-bold text-[#0077aa] dark:text-[#00d4ff] mb-4 sm:mb-6 min-h-[2rem]"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "React.js & Next.js Engineer",
                2000,
                "Node.js & Express Specialist",
                2000,
                "Spring Boot & PostgreSQL Dev",
                2000,
                "Software Engineering @ Mekelle Univ",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="border-r-2 border-[#00a86b] dark:border-[#00f5a0] pr-1"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-700 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xl font-medium"
          >
            {personalInfo.summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <button
              onClick={scrollToProjects}
              onMouseEnter={() => sound.playHover()}
              id="hero-view-projects"
              className="btn-emerald text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 font-bold justify-center"
            >
              View Projects
            </button>
            <button
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              id="hero-contact-me"
              className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-slate-900 dark:text-white justify-center"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
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
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-200 hover:text-[#00a86b] dark:hover:text-[#00f5a0] border border-slate-300 dark:border-white/10 hover:border-[#00a86b] dark:hover:border-[#00f5a0] transition-all duration-200 hover:shadow-md hover:scale-110 shadow-sm dark:shadow-none"
              >
                <Icon size={18} strokeWidth={2.3} />
              </a>
            ))}

            <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm ml-1 sm:ml-2 font-mono font-bold truncate">
              {/* @{personalInfo.github.split("/").pop()} */}
            </span> 
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator (desktop only) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-text-muted"
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
