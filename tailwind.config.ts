import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050510",
        surface: "#0d0d1f",
        "surface-2": "#13132a",
        border: "#1e1e3f",
        primary: {
          DEFAULT: "#00d4ff",
          dark: "#0099bb",
          glow: "rgba(0,212,255,0.3)",
        },
        accent: {
          pink: "#ff006e",
          emerald: "#00f5a0",
          "emerald-light": "#5dfdc7",
          amber: "#ffb800",
          "amber-light": "#ffcf52",
          cyan: "#00d4ff",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          muted: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "monospace"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        marquee: "marquee 25s linear infinite",
        "gradient-x": "gradientX 4s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00d4ff, 0 0 10px #00d4ff" },
          "100%": {
            boxShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient":
          "linear-gradient(135deg, #00f5a0 0%, #00d4ff 50%, #0284c7 100%)",
        "amber-gradient":
          "linear-gradient(135deg, #ffb800 0%, #ff7700 100%)",
        "glass-gradient":
          "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        "card-gradient":
          "linear-gradient(135deg, rgba(13,13,31,0.8) 0%, rgba(19,19,42,0.6) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.1)",
        "neon-emerald":
          "0 0 20px rgba(0,245,160,0.4), 0 0 40px rgba(0,245,160,0.1)",
        "neon-amber":
          "0 0 20px rgba(255,184,0,0.4), 0 0 40px rgba(255,184,0,0.1)",
        "neon-pink":
          "0 0 20px rgba(255,0,110,0.4), 0 0 40px rgba(255,0,110,0.1)",
        glass:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        card: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover":
          "0 8px 40px rgba(0,245,160,0.2), 0 0 0 1px rgba(0,245,160,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
