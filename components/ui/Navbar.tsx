"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";
import { ThemeToggle } from "./ThemeToggle";

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
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500",
          "rounded-2xl px-6 py-3 flex items-center gap-8",
          scrolled
            ? "glass shadow-glass border border-slate-200/80 dark:border-white/10"
            : "bg-transparent border-transparent"
        )}
        style={{ minWidth: "min(700px, 90vw)" }}
      >
        {/* Logo */}
        <button
          onClick={() => {
            sound.playClick();
            scrollTo("#hero");
          }}
          onMouseEnter={() => sound.playHover()}
          className="font-display font-bold text-lg neon-text mr-auto whitespace-nowrap cursor-pointer"
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
                  "relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 font-mono",
                  isActive
                    ? "text-[#00a86b] dark:text-[#00f5a0]"
                    : "text-slate-600 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#00a86b]/10 dark:bg-[#00f5a0]/10 border border-[#00a86b]/30 dark:border-[#00f5a0]/30 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="btn-outline text-xs py-2 px-4 font-mono"
          >
            Resume.pdf
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-slate-800 dark:bg-white origin-center transition-all"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-slate-800 dark:bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-slate-800 dark:bg-white origin-center transition-all"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-[99] bg-white/95 dark:glass border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-2 md:hidden shadow-xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-center text-sm"
              >
                View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
