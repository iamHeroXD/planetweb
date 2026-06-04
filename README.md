# 🪐 RCN Universe

> **Explore the Digital Universe of RCN** — an interactive 3D space-exploration portfolio that feels like a AAA game menu, not a website.

Scrolling doesn't move the page — it pilots a spaceship through deep space. Each planet is a section. Land on one to open it.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Three.js](https://img.shields.io/badge/Three.js-R3F-8B5CF6) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## ✨ Features

- **Living 3D universe** — thousands of stars (instanced), procedural GLSL nebulas, drifting space dust, shooting stars, an instanced asteroid field.
- **6 themed planets** — Home, Projects, Services, Clients, Team, Contact — each with a unique material, atmosphere (fresnel glow), rings and orbiting moons.
- **Scroll = camera flight** — Lenis smooth-scroll drives a damped camera journey between planets. No traditional page scrolling.
- **Click to land** — cinematic fly-to focus, then an animated holographic section panel slides in.
- **Hover interactions** — planets glow, rings light up, labels appear.
- **🔒 Secret Developer Vault** — find the hidden artifact drifting in space to unlock a 7th planet with dev logs, fun facts & achievements.
- **Post-processing** — bloom, vignette, chromatic aberration, film grain.
- **Performance** — adaptive DPR, instancing, single-draw-call particle systems, quality tiers, and a reduced-geometry mobile experience.

## 🛠️ Tech Stack

Next.js · React · TypeScript · Tailwind CSS · Three.js · React Three Fiber · Drei · @react-three/postprocessing · GSAP · Framer Motion · Lenis · Zustand

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## 🧭 How to explore

1. **Scroll** to travel between planets.
2. **Hover** a planet (or use the right-side nav) to preview it.
3. **Click** a planet to land and open its section.
4. **Look around** — something is hiding in the dark. 🟢

## 📂 Structure

```
src/
├─ app/                  # Next.js app router (layout, page, globals)
├─ components/
│  ├─ Universe.tsx       # Canvas + Lenis scroll driver
│  ├─ Experience.tsx     # client composition (canvas + UI overlays)
│  ├─ scene/             # 3D: planets, starfield, nebula, effects, camera rig…
│  └─ ui/                # HUD, loader, section panels
└─ lib/                  # planet config, content, store, hooks
```

## ☁️ Deploy

Optimized for **Vercel** — push to the connected repo and it deploys automatically.

---

Built with ❤️ by **RCN** — Hero.X · Jenish · Vortex · DeAdHellion
