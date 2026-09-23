"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * ThemeToggle — Animated sun/moon toggle button for the Navbar.
 * 
 * - Smooth rotation + scale animation on switch
 * - Pill track with sliding indicator
 * - Glows cyan in dark mode, amber in light mode
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center gap-1.5 px-2 py-1.5 rounded-xl transition-all duration-300 group"
      style={{
        background: isDark
          ? "rgba(0, 212, 255, 0.08)"
          : "rgba(217, 119, 6, 0.08)",
        border: isDark
          ? "1px solid rgba(0, 212, 255, 0.2)"
          : "1px solid rgba(217, 119, 6, 0.3)",
      }}
    >
      {/* Sliding pill track */}
      <div className="relative w-10 h-5 rounded-full overflow-hidden"
        style={{
          background: isDark
            ? "rgba(0, 212, 255, 0.15)"
            : "rgba(217, 119, 6, 0.15)",
        }}
      >
        {/* Sliding knob */}
        <motion.div
          layout
          animate={{ x: isDark ? 0 : 20 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-sm"
          style={{
            background: isDark ? "#00d4ff" : "#d97706",
            boxShadow: isDark
              ? "0 0 8px rgba(0,212,255,0.6)"
              : "0 0 8px rgba(217,119,6,0.6)",
          }}
        />
      </div>

      {/* Icon */}
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon size={14} className="text-[#00d4ff]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun size={14} className="text-amber-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
