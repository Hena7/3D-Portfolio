"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats, timeline } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin, Code2, Sparkles, Building2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Terminal } from "@/components/ui/Terminal";
import { cn } from "@/lib/utils";

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
      <div className="text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider font-mono mt-1">
        {label}
      </div>
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
  const quickFacts = [
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      sub: "Open to Remote & Hybrid worldwide",
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.E. in Software Engineering",
      sub: "Mekelle University (Expected: June 2027)",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: "Software Engineering Intern",
      sub: "INSA (Information Network Security Admin)",
      color: "text-emerald-600 dark:text-[#00f5a0]",
    },
    {
      icon: Code2,
      label: "Core Stack",
      value: "React, Next.js, Node.js, Spring Boot, PostgreSQL",
      sub: "TypeScript, TailwindCSS, Express.js, MongoDB",
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Sparkles,
      label: "Soft Skills",
      value: "Problem Solving, Fast Learner",
      sub: "Team Collaboration & Clear Communication",
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section id="about" className="section-padding container-max relative overflow-hidden">
      {/* Section Header */}
      <FadeIn className="mb-16">
        <span className="font-mono text-[#00a86b] dark:text-[#00f5a0] text-sm tracking-widest uppercase font-bold">
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
            <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-bold">
              I&apos;m a dedicated{" "}
              <span className="text-[#00a86b] dark:text-[#00f5a0] font-black">
                Full-Stack Developer
              </span>{" "}
              specializing in React, Next.js, Node.js, and PostgreSQL.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Experienced in building scalable web applications including competitive tournament systems, modern e-commerce platforms, and real-time delivery management dashboards. Passionate about solving real-world challenges through clean architecture and modern development practices.
            </p>
          </FadeIn>

          {/* Quick facts in Spotlight Card — Bold and High Contrast */}
          <FadeIn delay={0.2}>
            <SpotlightCard className="p-6 sm:p-7 space-y-5 mt-4 bg-white dark:bg-[#0c1219]/90 border border-slate-300/90 dark:border-white/10 shadow-md dark:shadow-none">
              {quickFacts.map(({ icon: Icon, label, value, sub, color }, idx) => (
                <div
                  key={label}
                  className={cn(
                    "pb-5 border-b border-slate-200/80 dark:border-white/5 last:border-b-0 last:pb-0",
                    idx !== 0 && "pt-1"
                  )}
                >
                  {/* Title Header: Icon perfectly aligned with the Title */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm ${color}`}
                    >
                      <Icon size={15} strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-mono text-xs font-bold uppercase tracking-wider">
                      {label}
                    </span>
                  </div>

                  {/* Content indented cleanly below */}
                  <div className="pl-[38px]">
                    <h4 className="text-slate-950 dark:text-white font-bold text-sm sm:text-base leading-snug">
                      {value}
                    </h4>
                    {sub && (
                      <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold mt-1">
                        {sub}
                      </p>
                    )}
                  </div>
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
      <div className="grid lg:grid-cols-2 gap-12 items-start pt-6 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <SpotlightCard key={stat.label} className="p-6 text-center bg-white dark:bg-[#0c1219]/90 border border-slate-300/80 dark:border-white/10 shadow-sm dark:shadow-none">
                <AnimatedCounter {...stat} />
              </SpotlightCard>
            ))}
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (Emerald to Cyan) */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00a86b] dark:from-[#00f5a0] via-[#0284c7] dark:via-[#00d4ff] to-transparent" />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white dark:bg-[#080d14] border-2 border-[#00a86b] dark:border-[#00f5a0] flex items-center justify-center shadow-md dark:shadow-none">
                    {item.type === "work" ? (
                      <Briefcase size={14} className="text-[#00a86b] dark:text-[#00f5a0]" strokeWidth={2.5} />
                    ) : (
                      <GraduationCap size={14} className="text-[#0284c7] dark:text-[#00d4ff]" strokeWidth={2.5} />
                    )}
                  </div>

                  <SpotlightCard className="p-5 group bg-white dark:bg-[#0c1219]/90 border border-slate-300/80 dark:border-white/10 shadow-sm dark:shadow-none">
                    <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-bold text-slate-950 dark:text-white text-base group-hover:text-[#00a86b] dark:group-hover:text-[#00f5a0] transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs font-bold text-[#008855] dark:text-[#00f5a0] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-white/5 border border-emerald-200 dark:border-white/10 whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 text-xs mb-2 font-mono font-bold">
                      {item.company}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
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
