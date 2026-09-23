"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import * as SiIcons from "react-icons/si";

// ─── Map category to custom colors (Zero Purple) ───
const categoryColors = {
  Frontend: "text-[#00d4ff] border-[#00d4ff]/40 bg-[#00d4ff]/10",
  Backend: "text-[#00f5a0] border-[#00f5a0]/40 bg-[#00f5a0]/10",
  DevOps: "text-[#ffb800] border-[#ffb800]/40 bg-[#ffb800]/10",
  Tools: "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10",
};

// ─── Icon Mapper ───
function getIcon(iconName: string) {
  // @ts-ignore
  const Icon = SiIcons[iconName];
  if (!Icon) return <div className="w-8 h-8 rounded-full bg-white/10" />;
  return <Icon className="w-7 h-7 transition-colors duration-300" />;
}

// ─── Card Component ───
function SkillCard({ skill, index }: { skill: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="bg-white/80 dark:bg-transparent glass rounded-2xl p-5 flex flex-col items-center justify-center gap-4 group relative overflow-hidden border border-slate-200 dark:border-white/10 hover:border-[#00a86b]/40 dark:hover:border-[#00f5a0]/40 transition-all duration-300 hover:shadow-card-hover shadow-sm dark:shadow-none"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
        }}
      />

      {/* Icon with explicit brand color on hover */}
      <div
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-slate-100/90 dark:glass group-hover:shadow-[0_0_20px_rgba(0,245,160,0.25)] transition-all duration-300"
        style={
          {
            "--hover-color": skill.color,
          } as any
        }
      >
        <div
          className="text-text-secondary group-hover:text-[var(--hover-color)] transition-colors duration-300"
          style={{ transitionProperty: "color, stroke, fill" }}
        >
           {getIcon(skill.icon)}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
         <span className="font-semibold text-sm text-text-primary text-center mb-2 font-mono">
            {skill.name}
         </span>
         
         {/* Level bar */}
         <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-1">
             <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + index * 0.04, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
             />
         </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───
export function Skills() {
  const categories = ["Frontend", "Backend", "DevOps", "Tools"];

  return (
    <section id="skills" className="section-padding container-max relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="font-mono text-primary text-sm tracking-widest uppercase mb-2 block">
          02. Expertise
        </span>
        <h2 className="section-title">
          My <span className="gradient-text">Tech</span> Stack
        </h2>
        <p className="section-subtitle mx-auto">
          Technologies I've been working with recently
        </p>
      </motion.div>

      <div className="space-y-16">
        {categories.map((category, catIdx) => {
          const categorySkills = skills.filter((s) => s.category === category);
          
          return (
            <div key={category} className="relative">
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="mb-8 flex items-center gap-4"
              >
                <div
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-mono border backdrop-blur-sm",
                    categoryColors[category as keyof typeof categoryColors]
                  )}
                >
                  {category}
                </div>
                <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
              </motion.div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categorySkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
