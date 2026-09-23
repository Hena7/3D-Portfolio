"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats, timeline } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Terminal } from "@/components/ui/Terminal";

// ─── Animated Counter ─────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-black gradient-text">
        {count}
        {suffix}
      </div>
      <div className="text-text-secondary text-sm mt-1">{label}</div>
    </div>
  );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="section-padding container-max relative">
      {/* Section Header */}
      <FadeIn className="mb-16">
        <span className="font-mono text-[#00f5a0] text-sm tracking-widest uppercase">
          01. About Me
        </span>
        <h2 className="section-title mt-2">
          The <span className="gradient-text">Architect</span> behind the code
        </h2>
      </FadeIn>

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
        {/* Left — Bio & Quick Facts */}
        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <p className="text-text-secondary text-lg leading-relaxed">
              I&apos;m a passionate{" "}
              <span className="text-[#00f5a0] font-semibold">Full Stack Developer</span>{" "}
              based in {personalInfo.location}, with over 6 years of experience
              building enterprise-grade web applications.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-text-secondary leading-relaxed">
              My journey started with curiosity about distributed systems, which
              evolved into deep expertise across the modern web: React, Next.js, and Spring Boot microservices.
            </p>
          </FadeIn>

          {/* Quick facts in Spotlight Card */}
          <FadeIn delay={0.2}>
            <SpotlightCard className="p-6 space-y-3 mt-4">
              {[
                ["📍", "Location", personalInfo.location],
                ["🎓", "Degree", "BSc. Computer Science, AAiT"],
                ["🌐", "Languages", "Amharic, English, TypeScript, Java"],
                ["⚡", "Focus", "High-performance full stack & 3D Web"],
              ].map(([icon, key, val]) => (
                <div key={key} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-center">{icon}</span>
                  <span className="text-text-muted w-24 font-mono text-xs">{key}</span>
                  <span className="text-text-primary font-medium">{val}</span>
                </div>
              ))}
            </SpotlightCard>
          </FadeIn>
        </div>

        {/* Right — Interactive Terminal */}
        <div>
          <FadeIn delay={0.15}>
            <Terminal />
          </FadeIn>
        </div>
      </div>

      {/* Secondary Row — Stats + Timeline */}
      <div className="grid lg:grid-cols-2 gap-12 items-start pt-6 border-t border-white/5">
        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <SpotlightCard key={stat.label} className="p-6 text-center">
                <AnimatedCounter {...stat} />
              </SpotlightCard>
            ))}
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (Zero Purple: Emerald to Cyan) */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5a0]/70 via-[#00d4ff]/40 to-transparent" />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full glass border border-[#00f5a0]/50 flex items-center justify-center">
                    {item.type === "work" ? (
                      <Briefcase size={14} className="text-[#00f5a0]" />
                    ) : (
                      <GraduationCap size={14} className="text-[#00d4ff]" />
                    )}
                  </div>

                  <SpotlightCard className="p-4 group">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm group-hover:text-[#00f5a0] transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-[#00f5a0]/80 whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs mb-2 font-mono">{item.company}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </SpotlightCard>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
