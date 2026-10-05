"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";
import { ThemeToggle } from "./ThemeToggle";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section via scroll spy
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-3 sm:top-4 inset-x-0 z-[100] px-3 sm:px-6 pointer-events-none flex justify-center">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "pointer-events-auto transition-all duration-300 rounded-2xl flex items-center justify-between",
            "w-full max-w-4xl px-4 sm:px-6 py-2.5 sm:py-3",
            scrolled
              ? "glass shadow-glass border border-slate-200/80 dark:border-white/10"
              : "bg-white/70 dark:bg-[#0d0d1f]/60 backdrop-blur-md border border-slate-200/60 dark:border-white/10 sm:bg-transparent sm:border-transparent sm:backdrop-blur-none"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => {
              sound.playClick();
              scrollTo("#hero");
            }}
            onMouseEnter={() => sound.playHover()}
            className="font-display font-bold text-lg neon-text whitespace-nowrap cursor-pointer"
          >
            HM<span className="text-[#00a86b] dark:text-[#00f5a0]">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    sound.playClick();
                    scrollTo(link.href);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-bold rounded-lg transition-colors duration-200 font-mono",
                    isActive
                      ? "text-[#008855] dark:text-[#00f5a0]"
                      : "text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#00a86b]/15 dark:bg-[#00f5a0]/10 border border-[#00a86b]/40 dark:border-[#00f5a0]/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right actions: Desktop theme toggle & resume; Mobile theme toggle & hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="hidden md:inline-flex btn-outline text-xs py-2 px-4 font-mono font-bold text-slate-950 dark:text-white border-slate-300 dark:border-[#00f5a0]/40 shadow-sm"
            >
              Resume.pdf
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer ml-1"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-slate-800 dark:bg-white origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-slate-800 dark:bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-slate-800 dark:bg-white origin-center transition-all"
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 sm:top-20 left-3 right-3 sm:left-4 sm:right-4 z-[99] bg-white/95 dark:bg-[#0d0d1f]/95 glass border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-2 md:hidden shadow-2xl backdrop-blur-xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors font-mono",
                  activeSection === link.href.replace("#", "")
                    ? "text-[#008855] dark:text-[#00f5a0] bg-emerald-500/10"
                    : "text-slate-700 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald text-center text-sm py-3 font-mono font-bold justify-center"
            >
              Download Resume.pdf
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
