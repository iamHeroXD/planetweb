"use client";

import { motion } from "framer-motion";
import {
  PROJECTS,
  SERVICES,
  TESTIMONIALS,
  TEAM,
  DEV_LOGS,
  FUN_FACTS,
} from "@/lib/content";
import { useUniverse } from "@/lib/store";

/* shared animation helpers */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <motion.span
        variants={item}
        className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent/80"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={item}
        className="mt-3 text-4xl md:text-5xl font-bold tracking-tight gradient-text"
      >
        {title}
      </motion.h2>
      <motion.p variants={item} className="mt-4 text-white/60 font-light">
        {desc}
      </motion.p>
    </div>
  );
}

/* ---------------- HOME ---------------- */
export function HomeSection() {
  const requestFlyTo = useUniverse((s) => s.requestFlyTo);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Welcome aboard"
        title="We build digital universes."
        desc="RCN is a creative dev collective crafting immersive websites, intelligent bots, and futuristic interfaces. Pick a destination — every planet is a part of what we do."
      />
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { k: "Projects", id: "projects", d: "Our work in orbit" },
          { k: "Services", id: "services", d: "What we engineer" },
          { k: "Clients", id: "clients", d: "Signals from those we serve" },
          { k: "Team", id: "team", d: "The crew" },
          { k: "Contact", id: "contact", d: "Start a mission" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => requestFlyTo(c.id as never)}
            className="glass holo-border rounded-2xl p-5 text-left transition-transform hover:-translate-y-1"
          >
            <div className="text-lg font-semibold text-white">{c.k}</div>
            <div className="mt-1 text-sm text-white/50">{c.d}</div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              warp →
            </div>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---------------- PROJECTS ---------------- */
export function ProjectsSection() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Orbiting stations"
        title="Projects"
        desc="Each project is a station carrying real, shipped work. Hover to bring it online."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <motion.a
            key={p.title}
            href={p.href}
            variants={item}
            className="group relative flex flex-col overflow-hidden rounded-2xl glass holo-border p-5 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div
              className="mb-4 h-28 w-full rounded-xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${p.accent}55, transparent 70%), linear-gradient(135deg, ${p.accent}33, rgba(3,7,18,0.6))`,
              }}
            >
              <div className="scanlines h-full w-full rounded-xl opacity-40" />
            </div>
            <h3 className="text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-white/55">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Live demo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- SERVICES ---------------- */
export function ServicesSection() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Futuristic cities"
        title="Services"
        desc="Four pillars powering the RCN cityscape. Everything we deploy, end to end."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {SERVICES.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            className="group relative overflow-hidden rounded-2xl glass holo-border p-6 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass-strong text-2xl">
                {s.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/55">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
              style={{ background: "#a855f7" }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- CLIENTS ---------------- */
export function ClientsSection() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Incoming transmissions"
        title="Clients"
        desc="Holographic signals from the people and teams we've launched with."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={item}
            className="holo-flicker relative rounded-2xl glass holo-border p-6"
          >
            <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">
              ◉ signal {t.signal}
            </div>
            <blockquote className="text-white/80 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full glass-strong font-semibold text-accent"
              >
                {t.name.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {t.role}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- TEAM ---------------- */
export function TeamSection() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Crew capsules"
        title="Team"
        desc="The operators behind RCN. Four minds, one universe."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m) => (
          <motion.div
            key={m.handle}
            variants={item}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl glass holo-border p-6 text-center transition-transform hover:-translate-y-1.5"
          >
            <div
              className="float-y relative mb-4 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${m.color}, ${m.color}22)`,
                boxShadow: `0 0 30px ${m.color}66`,
              }}
            >
              {m.handle.charAt(0)}
              <span
                className="pulse-ring absolute inset-0 rounded-full border"
                style={{ borderColor: m.color }}
              />
            </div>
            <h3 className="text-lg font-semibold text-white">{m.handle}</h3>
            <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {m.role}
            </div>
            <p className="mt-3 text-sm text-white/55">{m.bio}</p>
            <span
              className="mt-4 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ background: `${m.color}22`, color: m.color }}
            >
              {m.specialty}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- CONTACT ---------------- */
export function ContactSection() {
  const addAchievement = useUniverse((s) => s.addAchievement);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Terminus station"
        title="Contact"
        desc="Dock at the station and start a mission with RCN."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          variants={item}
          onSubmit={(e) => {
            e.preventDefault();
            addAchievement("First Contact");
          }}
          className="rounded-2xl glass holo-border p-6"
        >
          <div className="grid gap-4">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Your name
              </span>
              <input
                required
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent/60"
                placeholder="Commander…"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Email
              </span>
              <input
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent/60"
                placeholder="you@galaxy.com"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Mission brief
              </span>
              <textarea
                required
                rows={4}
                className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent/60"
                placeholder="Tell us what you want to build…"
              />
            </label>
            <button
              type="submit"
              className="group relative mt-1 overflow-hidden rounded-full px-6 py-3 holo-border glass-strong"
            >
              <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-white group-hover:text-accent">
                Transmit message
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </motion.form>

        <motion.div variants={item} className="flex flex-col gap-4">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl glass holo-border p-5 transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="text-sm font-semibold text-white">Discord</div>
              <div className="font-mono text-[11px] text-white/40">
                Join the RCN comms channel
              </div>
            </div>
            <span className="text-2xl">💬</span>
          </a>
          <a
            href="mailto:hello@rcn.dev"
            className="flex items-center justify-between rounded-2xl glass holo-border p-5 transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="text-sm font-semibold text-white">Email</div>
              <div className="font-mono text-[11px] text-white/40">
                hello@rcn.dev
              </div>
            </div>
            <span className="text-2xl">✉️</span>
          </a>
          <div className="flex flex-1 flex-col justify-center rounded-2xl glass-strong holo-border p-6 text-center">
            <div className="text-lg font-semibold text-white">
              Ready for liftoff?
            </div>
            <p className="mt-2 text-sm text-white/55">
              Let&apos;s build something the galaxy hasn&apos;t seen.
            </p>
            <a
              href="mailto:hello@rcn.dev?subject=Hire%20RCN"
              className="group relative mx-auto mt-5 overflow-hidden rounded-full px-8 py-3 holo-border bg-gradient-to-r from-primary to-secondary"
            >
              <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-white">
                Hire RCN
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------------- VAULT (secret) ---------------- */
export function VaultSection() {
  const achievements = useUniverse((s) => s.achievements);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <SectionHeader
        eyebrow="Restricted · access granted"
        title="Developer Vault"
        desc="You found the hidden planet. Welcome to the back rooms of the build."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div variants={item} className="rounded-2xl glass holo-border p-6">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-300">
            ◈ Dev logs
          </h3>
          <ul className="space-y-3 font-mono text-[13px] text-white/60">
            {DEV_LOGS.map((l) => (
              <li key={l} className="border-l border-emerald-400/30 pl-3">
                {l}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl glass holo-border p-6">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            ◈ Fun facts
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            {FUN_FACTS.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">✦</span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl glass-strong holo-border p-6 lg:col-span-2"
        >
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-yellow-300">
            🏆 Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-300">
              ✓ Vault Breaker
            </span>
            {achievements
              .filter((a) => a !== "Vault Breaker")
              .map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-accent/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-accent"
                >
                  ✓ {a}
                </span>
              ))}
            <span className="rounded-full border border-dashed border-white/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/30">
              ? more hidden out there
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
