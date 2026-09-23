"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";

// ─── Filter Tabs ───
const categories = ["All", "Web App", "API", "Mobile", "AI/ML", "Other"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

  return (
    <section id="projects" className="section-padding container-max relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <span className="font-mono text-[#00f5a0] text-sm tracking-widest uppercase mb-2 block">
          03. Showcase
        </span>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle mx-auto">
          High-performance production systems and digital experiences
        </p>
      </motion.div>

      {/* ── Filter Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-16"
      >
        {categories.map((cat) => {
          const hasProjects = cat === "All" || projects.some((p) => p.category === cat);
          if (!hasProjects) return null;

          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={cn(
                "relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 font-mono",
                isActive
                  ? "text-black font-semibold"
                  : "text-text-secondary hover:text-white glass-strong"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-[#00f5a0] rounded-xl shadow-neon-emerald"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Projects Grid ── */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-full"
            >
              <div className="group relative flex flex-col h-full glass rounded-3xl overflow-hidden border border-white/10 hover:border-[#00f5a0]/40 transition-all duration-500 hover:shadow-card-hover bg-[#080d12]/90">
                {/* Simulated Browser Frame Header */}
                <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f5a0]/70" />
                  </div>
                  <div className="text-[11px] font-mono text-text-muted px-2 py-0.5 rounded bg-white/5 border border-white/5 truncate max-w-[170px]">
                    https://{project.id}.dev
                  </div>
                  <div className="w-6" />
                </div>

                {/* Abstract Visual Header Banner */}
                <div
                  className={cn(
                    "h-44 relative overflow-hidden bg-gradient-to-br flex items-center justify-center",
                    project.gradient || "from-cyan-500/20 to-emerald-500/20"
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#00f5a0_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  {/* Category blueprint illustration */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-14 h-14 rounded-2xl glass border border-white/15 flex items-center justify-center text-[#00f5a0] group-hover:scale-110 transition-transform duration-500 shadow-neon-emerald">
                      <Code2 size={28} />
                    </div>
                    <span className="font-mono text-xs text-white/90 mt-2 font-semibold tracking-wider">
                      {project.title.toUpperCase()}
                    </span>
                  </div>

                  {/* Featured Tag */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 glass px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#00f5a0] border border-[#00f5a0]/40 backdrop-blur-md">
                      ★ FEATURED
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10 bg-[#070b0e]">
                   {/* Top info line */}
                   <div className="flex items-center justify-between mb-3">
                       <span className="font-mono text-xs text-[#00f5a0] tracking-wider uppercase font-semibold">
                           {project.category}
                       </span>
                       
                       <div className="flex items-center gap-3">
                          {project.github !== "#" && (
                             <a
                               href={project.github}
                               target="_blank"
                               rel="noreferrer"
                               onMouseEnter={() => sound.playHover()}
                               className="text-text-muted hover:text-white transition-colors p-1"
                               aria-label="GitHub Repository"
                             >
                                 <Github size={18} />
                             </a>
                          )}
                          {project.live !== "#" && (
                             <a
                               href={project.live}
                               target="_blank"
                               rel="noreferrer"
                               onMouseEnter={() => sound.playHover()}
                               className="text-text-muted hover:text-[#00f5a0] transition-colors p-1"
                               aria-label="Live Demo"
                             >
                                 <ExternalLink size={18} />
                             </a>
                          )}
                       </div>
                   </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00f5a0] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 text-[#00d4ff] font-mono border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
