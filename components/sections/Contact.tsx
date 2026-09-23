"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
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
    <section id="contact" className="section-padding container-max relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f5a0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left side: Text & Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[#00f5a0] text-sm tracking-widest uppercase mb-4 block">
            04. What's Next?
          </span>
          <h2 className="section-title mb-6">
            Let's build something <span className="gradient-text">exceptional</span> together.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md">
            Whether you have an enterprise project in mind, need help scaling 
            your architecture, or want to discuss full-stack opportunities, my inbox is open.
          </p>

          <div className="space-y-6">
            <div 
              className="flex items-center gap-4 group cursor-pointer"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[#00d4ff] group-hover:bg-[#00d4ff]/10 transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1 font-mono">Email Channel</p>
                <a href={`mailto:${personalInfo.email}`} className="text-white font-medium hover:text-[#00f5a0] transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-4 group"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[#00f5a0] group-hover:bg-[#00f5a0]/10 transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1 font-mono">Location</p>
                <p className="text-white font-medium">
                  {personalInfo.location}
                </p>
              </div>
            </div>
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
            className="glass-strong rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-card relative overflow-hidden"
          >
            {/* Background glow specific to form */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00f5a0]/10 rounded-full blur-[80px]" />

            <h3 className="text-2xl font-display font-semibold mb-8 text-white relative z-10 flex items-center gap-3">
              Transmit Message
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse" />
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2 font-mono text-xs">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    onFocus={() => sound.playTerminalKey()}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted transition-all focus:border-[#00f5a0]/60 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                    placeholder="Alex Mercer"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2 font-mono text-xs">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    onFocus={() => sound.playTerminalKey()}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted transition-all focus:border-[#00f5a0]/60 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                    placeholder="alex@enterprise.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2 font-mono text-xs">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  onFocus={() => sound.playTerminalKey()}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted transition-all focus:border-[#00f5a0]/60 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] text-sm font-mono"
                  placeholder="Project Architecture / Full-Time Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2 font-mono text-xs">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  onFocus={() => sound.playTerminalKey()}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted transition-all focus:border-[#00f5a0]/60 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,245,160,0.15)] resize-none text-sm font-mono"
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
