"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUniverse } from "@/lib/store";
import { getPlanet, type SectionId } from "@/lib/planets";
import {
  HomeSection,
  ProjectsSection,
  ServicesSection,
  ClientsSection,
  TeamSection,
  ContactSection,
  VaultSection,
} from "./sections";

const CONTENT: Record<SectionId, React.FC> = {
  home: HomeSection,
  projects: ProjectsSection,
  services: ServicesSection,
  clients: ClientsSection,
  team: TeamSection,
  contact: ContactSection,
  vault: VaultSection,
};

export default function SectionPanel() {
  const active = useUniverse((s) => s.active);
  const close = useUniverse((s) => s.close);

  // Close on Escape.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  const planet = active ? getPlanet(active) : null;
  const Body = active ? CONTENT[active] : null;

  return (
    <AnimatePresence>
      {active && planet && Body && (
        <motion.div
          key={active}
          className="fixed inset-0 z-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* dim / click-away */}
          <button
            aria-label="Back to space"
            onClick={close}
            className="absolute inset-0 cursor-default bg-gradient-to-l from-background/70 via-background/20 to-transparent"
          />

          {/* sliding panel */}
          <motion.section
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="relative h-full w-full max-w-3xl overflow-y-auto glass-strong border-l border-accent/20 px-6 py-20 md:px-12"
          >
            {/* top bar */}
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-5 md:px-12">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: planet.atmosphere,
                    boxShadow: `0 0 14px ${planet.atmosphere}`,
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {planet.name}
                </span>
              </div>
              <button
                onClick={close}
                className="group flex items-center gap-2 rounded-full glass px-4 py-1.5 transition-colors hover:border-accent/60"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 group-hover:text-accent">
                  Back to space
                </span>
                <span className="text-white/60 group-hover:text-accent">✕</span>
              </button>
            </div>

            <Body />

            <div className="mt-16 border-t border-white/10 pt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              RCN Universe · {planet.label} sector
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
