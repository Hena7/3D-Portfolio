"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import * as SiIcons from "react-icons/si";

// ─── Map category to custom colors (Zero Purple, High Contrast) ───
const categoryColors: Record<string, string> = {
  Frontend: "text-sky-700 dark:text-[#00d4ff] border-sky-300 dark:border-[#00d4ff]/40 bg-sky-100/70 dark:bg-[#00d4ff]/10 font-bold shadow-sm",
  Backend: "text-emerald-700 dark:text-[#00f5a0] border-emerald-300 dark:border-[#00f5a0]/40 bg-emerald-100/70 dark:bg-[#00f5a0]/10 font-bold shadow-sm",
  Database: "text-blue-700 dark:text-[#60a5fa] border-blue-300 dark:border-blue-400/40 bg-blue-100/70 dark:bg-blue-500/10 font-bold shadow-sm",
  Tools: "text-teal-800 dark:text-[#2dd4bf] border-teal-300 dark:border-teal-400/40 bg-teal-100/70 dark:bg-teal-500/10 font-bold shadow-sm",
};

// ─── Icon Mapper ───
function getIcon(iconName: string) {
  // @ts-ignore
  const Icon = SiIcons[iconName];
  if (!Icon) return <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />;
  return <Icon className="w-8 h-8 transition-transform duration-300" />;
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
      className="bg-white dark:bg-[#080d14]/90 rounded-2xl p-5 flex flex-col items-center justify-center gap-4 group relative overflow-hidden border border-slate-300/90 dark:border-white/10 hover:border-[#00a86b] dark:hover:border-[#00f5a0] transition-all duration-300 hover:shadow-card-hover shadow-md dark:shadow-none"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
        }}
      />

      {/* Icon with bold contrast and brand color on hover */}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-[#00a86b]/40 dark:group-hover:border-[#00f5a0]/40 group-hover:shadow-[0_0_20px_rgba(0,245,160,0.25)] transition-all duration-300 shadow-inner dark:shadow-none"
        style={
          {
            "--hover-color": skill.color,
          } as any
        }
      >
        <div
          className="text-slate-800 dark:text-slate-100 group-hover:text-[var(--hover-color)] transition-colors duration-300 group-hover:scale-110"
        >
           {getIcon(skill.icon)}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
         <span className="font-bold text-sm text-slate-900 dark:text-white text-center mb-2 font-mono tracking-tight group-hover:text-[#00a86b] dark:group-hover:text-[#00f5a0] transition-colors">
            {skill.name}
         </span>
         
         {/* Level bar */}
         <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-1 p-0.5">
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
  const categories = ["Frontend", "Backend", "Database", "Tools"];

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
        <span className="font-mono text-[#00a86b] dark:text-[#00f5a0] text-sm tracking-widest uppercase mb-2 block font-bold">
          02. Expertise
        </span>
        <h2 className="section-title">
          My <span className="gradient-text">Tech</span> Stack
        </h2>
        <p className="section-subtitle mx-auto font-medium text-slate-600 dark:text-text-secondary">
          Technologies & tools from my professional production experience
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
                <div className="h-px bg-slate-300 dark:bg-white/10 flex-1" />
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
