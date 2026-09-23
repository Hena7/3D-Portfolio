"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio";
import { Volume2, VolumeX, Activity, Compass, Radio } from "lucide-react";

export function TelemetryHUD() {
  const [time, setTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(18);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    setMuted(sound.isMuted());

    const handleMuteChange = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setMuted(custom.detail);
    };

    window.addEventListener("sound_mute_changed", handleMuteChange);

    // Live clock in UTC+3 (Addis Ababa)
    const updateTime = () => {
      const now = new Date();
      // Format time in East Africa Time
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Addis_Ababa",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(timeStr);
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Fluctuate latency slightly for realism
    const pingInterval = setInterval(() => {
      setLatency(Math.floor(14 + Math.random() * 8));
    }, 4000);

    return () => {
      window.removeEventListener("sound_mute_changed", handleMuteChange);
      clearInterval(clockInterval);
      clearInterval(pingInterval);
    };
  }, []);

  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setMuted(newMuted);
  };

  return (
    <aside
      aria-label="System Telemetry"
      className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex items-center justify-between font-mono text-[11px] text-text-secondary select-none"
    >
      {/* Left: System Status & Location */}
      <div className="pointer-events-auto flex items-center gap-3 bg-white/80 dark:bg-surface/80 glass px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-card transition-colors duration-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a86b] dark:bg-[#00f5a0]" />
          </span>
          <span className="font-semibold text-slate-900 dark:text-white tracking-wider hidden sm:inline">SYS: ONLINE</span>
        </div>

        <span className="text-slate-300 dark:text-white/20 hidden sm:inline">|</span>

        <div className="flex items-center gap-1.5 text-text-secondary">
          <Compass size={12} className="text-[#0099bb] dark:text-[#00d4ff]" />
          <span className="hidden md:inline">ADDIS ABABA</span>
          <span className="text-slate-800 dark:text-white/80 font-mono">{time || "12:00:00"} <span className="text-[9px] text-[#0099bb] dark:text-[#00d4ff]">EAT</span></span>
        </div>

        <span className="text-slate-300 dark:text-white/20 hidden lg:inline">|</span>

        <div className="hidden lg:flex items-center gap-1.5 text-text-secondary">
          <Activity size={12} className="text-[#d97706] dark:text-[#ffb800]" />
          <span>PING: <strong className="text-slate-900 dark:text-white font-mono">{latency}ms</strong></span>
        </div>
      </div>

      {/* Right: Audio FX & Telemetry Mode */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={handleToggleSound}
          onMouseEnter={() => sound.playHover()}
          className="bg-white/80 dark:bg-surface/80 glass px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 hover:border-[#00a86b]/50 dark:hover:border-[#00f5a0]/40 text-text-secondary hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2 cursor-pointer group shadow-card"
          title={muted ? "Unmute audio interactions" : "Mute audio interactions"}
        >
          {muted ? (
            <>
              <VolumeX size={13} className="text-text-muted group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-text-muted">AUDIO: MUTED</span>
            </>
          ) : (
            <>
              <Volume2 size={13} className="text-[#00a86b] dark:text-[#00f5a0] animate-pulse" />
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-1.5 bg-[#00a86b] dark:bg-[#00f5a0] animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 h-3 bg-[#0099bb] dark:bg-[#00d4ff] animate-[pulse_1.1s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2 bg-[#d97706] dark:bg-[#ffb800] animate-[pulse_0.9s_ease-in-out_infinite]" />
              </div>
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[#00a86b] dark:text-[#00f5a0]">AUDIO: ON</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
