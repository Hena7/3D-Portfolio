"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft } from "lucide-react";
import { personalInfo } from "@/lib/data";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-[#00f5a0] font-semibold">
            HENOCK-OS v4.2.0-LTS [Quantum Terminal Active]
          </p>
          <p className="text-text-secondary">
            Welcome, visitor. Type <span className="text-[#00d4ff] font-bold">help</span> or click a quick-action command below.
          </p>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll only the terminal output box — NOT the whole page
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    sound.playClick();
    const cleanCmd = cmd.trim().toLowerCase();

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (cleanCmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-text-secondary">
            <p className="text-white font-semibold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-[#00f5a0]">bio</span> - Who I am</div>
              <div><span className="text-[#00d4ff]">skills</span> - Tech stack breakdown</div>
              <div><span className="text-[#ffb800]">projects</span> - Featured architectures</div>
              <div><span className="text-emerald-400">contact</span> - Get in touch</div>
              <div><span className="text-cyan-400">hire</span> - Employment availability</div>
              <div><span className="text-red-400">clear</span> - Clear terminal window</div>
            </div>
          </div>
        );
        break;

      case "bio":
        output = (
          <div className="text-xs space-y-1 text-text-secondary">
            <p><strong className="text-white">Name:</strong> {personalInfo.name}</p>
            <p><strong className="text-white">Role:</strong> Senior Full Stack Engineer</p>
            <p><strong className="text-white">Location:</strong> {personalInfo.location}</p>
            <p className="text-[#00f5a0] pt-1">
              &quot;Building enterprise web products with extreme precision, high scalability, and seamless user experiences.&quot;
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs space-y-1">
            <p><span className="text-[#00f5a0] font-semibold">Frontend:</span> React, Next.js 15, TypeScript, Tailwind, Three.js, Framer Motion</p>
            <p><span className="text-[#00d4ff] font-semibold">Backend:</span> Spring Boot, Java, Node.js, PostgreSQL, Redis, MongoDB</p>
            <p><span className="text-[#ffb800] font-semibold">DevOps:</span> Docker, Kubernetes, CI/CD Actions, AWS Cloud</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-xs space-y-1 text-text-secondary">
            <p>1. <strong className="text-white">ERP HR System</strong> — Enterprise HR & SSO platform (Next.js + Spring Boot)</p>
            <p>2. <strong className="text-white">3D Portfolio</strong> — React Three Fiber + Next.js 15 showcase</p>
            <p>3. <strong className="text-white">Microservices Gateway</strong> — Spring Cloud with resilience & discovery</p>
            <p className="text-text-muted text-[11px] mt-1">Scroll down to view full interactive live cards.</p>
          </div>
        );
        break;

      case "contact":
      case "hire":
        output = (
          <div className="text-xs space-y-1">
            <p className="text-[#00f5a0] font-semibold">Status: Available for Full-Time Roles & Consulting</p>
            <p className="text-text-secondary">Email: <a href={`mailto:${personalInfo.email}`} className="text-[#00d4ff] underline">{personalInfo.email}</a></p>
            <p className="text-text-secondary">GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-white underline">{personalInfo.github}</a></p>
          </div>
        );
        break;

      case "":
        output = null;
        break;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: {cleanCmd}. Type <span className="text-[#00f5a0] underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> to see valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput("");
  };

  const handleChipClick = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const handleKeyDown = () => {
    sound.playTerminalKey();
  };

  return (
    <div className="rounded-2xl glass-strong border border-white/10 overflow-hidden shadow-2xl flex flex-col font-mono text-sm max-w-full">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#00f5a0]/80 hover:bg-[#00f5a0] transition-colors cursor-pointer" />
          <span className="text-xs text-text-muted ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-[#00f5a0]" />
            henock@terminal: ~ (zsh)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#00f5a0]/70">
          <Sparkles size={11} />
          <span>Interactive CLI</span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div 
        ref={terminalBodyRef}
        className="p-4 sm:p-5 h-64 overflow-y-auto space-y-3 bg-[#050510]/80 select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#00f5a0]">➜</span>
              <span className="text-[#00d4ff]">~</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            {item.output && <div className="pl-4">{item.output}</div>}
          </div>
        ))}
      </div>

      {/* Quick Action Chips */}
      <div className="px-4 py-2 bg-black/50 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] text-text-muted uppercase tracking-wider mr-1">Quick:</span>
        {["help", "bio", "skills", "projects", "contact", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleChipClick(cmd)}
            className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-[#00f5a0]/15 hover:text-[#00f5a0] border border-white/10 text-text-secondary transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Input Bar */}
      <form onSubmit={handleSubmit} className="px-4 py-3 bg-black/60 border-t border-white/10 flex items-center gap-2">
        <span className="text-[#00f5a0] text-sm font-bold">➜</span>
        <span className="text-[#00d4ff] text-xs font-semibold">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' or command..."
          className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder-text-muted/60"
        />
        <button
          type="submit"
          className="text-text-muted hover:text-[#00f5a0] transition-colors p-1"
          aria-label="Send command"
        >
          <CornerDownLeft size={14} />
        </button>
      </form>
    </div>
  );
}
