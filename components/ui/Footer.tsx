"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#050510] overflow-hidden">
      {/* Glow highlight on top edge (Emerald) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00f5a0]/60 to-transparent" />

      <div className="container-max px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-bold text-xl neon-text cursor-pointer"
          >
            HM<span className="text-white">.</span>
          </button>
          <p className="text-sm text-text-muted font-mono">
            Zero-Compromise Engineering & Exceptional UI
          </p>
        </div>

        {/* Center / Copyright */}
        <div className="text-center text-sm text-text-muted order-last md:order-none">
          <p>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs opacity-60">
            Designed & Built with curiosity.
          </p>
        </div>

        {/* Right Side / Socials */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-text-secondary hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
