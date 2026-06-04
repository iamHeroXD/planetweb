"use client";

import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUniverse } from "@/lib/store";

export default function Loader() {
  const { progress, active } = useProgress();
  const launched = useUniverse((s) => s.launched);
  const launch = useUniverse((s) => s.launch);
  const ready = useUniverse((s) => s.ready);
  const setReady = useUniverse((s) => s.setReady);

  const done = progress >= 100 && !active;

  useEffect(() => {
    if (done && !ready) {
      const t = setTimeout(() => setReady(true), 400);
      return () => clearTimeout(t);
    }
  }, [done, ready, setReady]);

  return (
    <AnimatePresence>
      {!launched && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* ambient radial backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.25), transparent 60%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-accent/80">
              RCN
            </span>
            <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight gradient-text text-glow">
              RCN&nbsp;UNIVERSE
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base font-light text-white/60">
              Explore the Digital Universe of RCN
            </p>

            {/* Progress */}
            <div className="mt-10 w-64">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                <span>{ready ? "Systems online" : "Calibrating warp core"}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="mt-2 h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Launch */}
            <AnimatePresence>
              {ready && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={launch}
                  className="group relative mt-10 overflow-hidden rounded-full px-9 py-3.5 holo-border glass-strong"
                >
                  <span className="relative z-10 font-mono text-xs uppercase tracking-[0.35em] text-white transition-colors group-hover:text-accent">
                    Enter Universe
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </motion.button>
              )}
            </AnimatePresence>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Scroll to travel · Click a planet to land
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
