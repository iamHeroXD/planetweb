"use client";

import { motion } from "framer-motion";
import { JOURNEY_PLANETS, PLANETS } from "@/lib/planets";
import { useUniverse } from "@/lib/store";

export default function Hud() {
  const launched = useUniverse((s) => s.launched);
  const scroll = useUniverse((s) => s.scroll);
  const active = useUniverse((s) => s.active);
  const requestFlyTo = useUniverse((s) => s.requestFlyTo);
  const hovered = useUniverse((s) => s.hovered);
  const setHovered = useUniverse((s) => s.setHovered);
  const vaultUnlocked = useUniverse((s) => s.vaultUnlocked);
  const achievements = useUniverse((s) => s.achievements);

  if (!launched) return null;

  // Approximate current planet from scroll for highlighting nav.
  const segs = JOURNEY_PLANETS.length - 1;
  const currentIdx = Math.round(scroll * segs);

  const navPlanets = PLANETS.filter((p) => !p.secret || vaultUnlocked);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 0.15 : 1 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none fixed inset-0 z-30"
    >
      {/* Logo */}
      <div className="absolute left-6 top-6 md:left-10 md:top-8">
        <button
          onClick={() => requestFlyTo("home")}
          className="pointer-events-auto group flex items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg glass holo-border">
            <span className="font-bold text-accent text-sm">R</span>
            <span className="pulse-ring absolute inset-0 rounded-lg border border-accent/40" />
          </span>
          <div className="text-left">
            <div className="font-bold tracking-tight text-sm leading-none gradient-text">
              RCN UNIVERSE
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
              explore the digital universe
            </div>
          </div>
        </button>
      </div>

      {/* Right-side planet navigation */}
      <nav className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
        {navPlanets.map((p) => {
          const isCurrent = !p.secret && currentIdx === p.index;
          const isHover = hovered === p.id;
          return (
            <button
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => requestFlyTo(p.id)}
              className="pointer-events-auto group flex items-center gap-3"
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  isHover || isCurrent
                    ? "text-accent opacity-100 translate-x-0"
                    : "text-white/40 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {p.label}
              </span>
              <span
                className="h-2.5 w-2.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: p.atmosphere,
                  backgroundColor:
                    isCurrent || isHover ? p.atmosphere : "transparent",
                  boxShadow:
                    isCurrent || isHover
                      ? `0 0 12px ${p.atmosphere}`
                      : "none",
                  transform: isCurrent ? "scale(1.4)" : "scale(1)",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom: scroll progress + hint */}
      <div className="absolute bottom-6 left-1/2 w-[min(420px,80vw)] -translate-x-1/2">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          <span>Sector {String(currentIdx + 1).padStart(2, "0")}</span>
          <span className="animate-pulse">↓ scroll to travel</span>
          <span>{String(JOURNEY_PLANETS.length).padStart(2, "0")}</span>
        </div>
        <div className="mt-2 h-px w-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-[width] duration-150"
            style={{ width: `${Math.max(2, scroll * 100)}%` }}
          />
        </div>
      </div>

      {/* Achievements / vault indicator */}
      <div className="absolute right-6 bottom-6 hidden items-center gap-2 md:flex">
        {vaultUnlocked && (
          <span className="glass rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300">
            🔓 Vault unlocked
          </span>
        )}
        {achievements.length > 0 && (
          <span className="glass rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
            🏆 {achievements.length}
          </span>
        )}
      </div>
    </motion.div>
  );
}
