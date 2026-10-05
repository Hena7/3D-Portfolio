"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Send, Phone, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setFormState("submitting");
    
    // Simulate API call
    setTimeout(() => {
      sound.playModeSwitch();
      setFormState("success");
      // Reset after 3 seconds
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding container-max relative overflow-hidden pb-28 sm:pb-32">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f5a0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Left side: Text & Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[#00a86b] dark:text-[#00f5a0] text-sm tracking-widest uppercase mb-4 block">
            04. What's Next?
          </span>
          <h2 className="section-title mb-6">
            Let's build something <span className="gradient-text">exceptional</span> together.
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Whether you have an enterprise project in mind, need help scaling 
            your architecture, or want to discuss full-stack opportunities, my inbox and direct lines are open.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Email */}
            <div 
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-sm dark:shadow-none hover:border-[#00a86b] dark:hover:border-[#00f5a0] transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#0284c7] dark:text-[#00d4ff] group-hover:scale-110 transition-transform">
                <Mail size={19} strokeWidth={2.3} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider font-bold">Email</p>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="text-xs sm:text-sm text-slate-950 dark:text-white font-bold hover:text-[#00a86b] dark:hover:text-[#00f5a0] transition-colors truncate block"
                  title={personalInfo.email}
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div 
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-sm dark:shadow-none hover:border-[#00a86b] dark:hover:border-[#00f5a0] transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#008855] dark:text-[#00f5a0] group-hover:scale-110 transition-transform">
                <Phone size={19} strokeWidth={2.3} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider font-bold">Phone</p>
                <a 
                  href={`tel:${personalInfo.phoneRaw}`} 
                  className="text-xs sm:text-sm text-slate-950 dark:text-white font-bold hover:text-[#00a86b] dark:hover:text-[#00f5a0] transition-colors truncate block"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            {/* Telegram */}
            <div 
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-sm dark:shadow-none hover:border-[#00a86b] dark:hover:border-[#00f5a0] transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#0284c7] dark:text-[#00d4ff] group-hover:scale-110 transition-transform">
                <Send size={19} strokeWidth={2.3} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider font-bold">Telegram</p>
                <a 
                  href={personalInfo.telegram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs sm:text-sm text-slate-950 dark:text-white font-bold hover:text-[#00a86b] dark:hover:text-[#00f5a0] transition-colors truncate block"
                >
                  {personalInfo.telegramHandle}
                </a>
              </div>
            </div>

            {/* Location */}
            <div 
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-sm dark:shadow-none group"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#d97706] dark:text-[#ffb800] group-hover:scale-110 transition-transform">
                <MapPin size={19} strokeWidth={2.3} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider font-bold">Location</p>
                <p className="text-xs sm:text-sm text-slate-950 dark:text-white font-bold truncate">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 pt-6 border-t border-slate-300/80 dark:border-white/5">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mr-1 font-bold">Profiles:</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-[#00a86b] dark:hover:text-[#00f5a0] hover:border-[#00a86b] transition-all shadow-sm dark:shadow-none hover:scale-105"
            >
              <Github size={15} strokeWidth={2.3} />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-[#0284c7] dark:hover:text-[#00d4ff] hover:border-[#0284c7] transition-all shadow-sm dark:shadow-none hover:scale-105"
            >
              <Linkedin size={15} strokeWidth={2.3} />
              <span>LinkedIn</span>
            </a>
            <a
              href={personalInfo.telegram}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-[#0284c7] dark:hover:text-[#00d4ff] hover:border-[#0284c7] transition-all shadow-sm dark:shadow-none hover:scale-105"
            >
              <Send size={15} strokeWidth={2.3} />
              <span>Telegram</span>
            </a>
          </div>
        </motion.div>

        {/* ── Right side: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-white/90 dark:glass-strong rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-slate-200 dark:border-white/10 shadow-card relative overflow-hidden transition-colors duration-300"
          >
            {/* Background glow specific to form */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00f5a0]/10 rounded-full blur-[80px]" />

            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-6 sm:mb-8 text-slate-900 dark:text-white relative z-10 flex items-center gap-3">
              Transmit Message
              <span className="w-2 h-2 rounded-full bg-[#00a86b] dark:bg-[#00f5a0] animate-pulse" />
            </h3>

            <div className="space-y-4 sm:space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-text-secondary mb-2 font-mono text-xs">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    onFocus={() => sound.playTerminalKey()}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-text-muted transition-all focus:border-[#00a86b]/60 dark:focus:border-[#00f5a0]/60 focus:bg-white dark:focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,168,107,0.15)] dark:focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                    placeholder="Alex Mercer"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-text-secondary mb-2 font-mono text-xs">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    onFocus={() => sound.playTerminalKey()}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-text-muted transition-all focus:border-[#00a86b]/60 dark:focus:border-[#00f5a0]/60 focus:bg-white dark:focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,168,107,0.15)] dark:focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                    placeholder="alex@enterprise.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-600 dark:text-text-secondary mb-2 font-mono text-xs">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  onFocus={() => sound.playTerminalKey()}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-text-muted transition-all focus:border-[#00a86b]/60 dark:focus:border-[#00f5a0]/60 focus:bg-white dark:focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,168,107,0.15)] dark:focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                  placeholder="Project Architecture / Full-Time Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-text-secondary mb-2 font-mono text-xs">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  onFocus={() => sound.playTerminalKey()}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-text-muted transition-all focus:border-[#00a86b]/60 dark:focus:border-[#00f5a0]/60 focus:bg-white dark:focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,168,107,0.15)] dark:focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] resize-none text-sm font-mono"
                  placeholder="Tell me about your system requirements and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={formState !== "idle"}
                onMouseEnter={() => sound.playHover()}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 font-mono tracking-wider",
                  formState === "success" 
                    ? "bg-[#00f5a0]/20 text-[#00f5a0] border border-[#00f5a0]/50" 
                    : "btn-emerald"
                )}
              >
                {formState === "idle" && (
                  <>
                    TRANSMIT MESSAGE
                    <Send size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {formState === "submitting" && (
                  <span className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                )}
                {formState === "success" && (
                  <>
                    MESSAGE TRANSMITTED
                    <CheckCircle2 size={20} className="text-[#00f5a0]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
