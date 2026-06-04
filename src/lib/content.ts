export interface Project {
  title: string;
  description: string;
  tech: string[];
  href: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Orbital Commerce",
    description:
      "A headless e-commerce platform with real-time inventory and a 3D product configurator.",
    tech: ["Next.js", "Three.js", "Stripe", "Edge"],
    href: "#",
    accent: "#60a5fa",
  },
  {
    title: "Nova Bot",
    description:
      "Multi-server Discord automation bot with AI moderation and custom command pipelines.",
    tech: ["Node.js", "Discord.js", "OpenAI", "Redis"],
    href: "#",
    accent: "#a855f7",
  },
  {
    title: "Pulse Dashboard",
    description:
      "Real-time analytics dashboard visualizing millions of events with buttery-smooth charts.",
    tech: ["React", "WebSockets", "D3", "Postgres"],
    href: "#",
    accent: "#34d399",
  },
  {
    title: "Aether Portfolio",
    description:
      "An award-style interactive portfolio experience built around a WebGL particle engine.",
    tech: ["R3F", "GSAP", "GLSL", "Lenis"],
    href: "#",
    accent: "#f472b6",
  },
  {
    title: "Flux Automation",
    description:
      "No-code automation suite connecting 40+ services with a visual workflow builder.",
    tech: ["TypeScript", "tRPC", "Queues", "Docker"],
    href: "#",
    accent: "#fbbf24",
  },
  {
    title: "Halo Chat",
    description:
      "End-to-end encrypted real-time chat with presence, reactions, and rich media.",
    tech: ["Next.js", "WebRTC", "libsodium", "Supabase"],
    href: "#",
    accent: "#22d3ee",
  },
];

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    title: "Website Development",
    description:
      "High-performance, immersive websites & web apps engineered for scale and delight.",
    features: ["Next.js / React", "WebGL & 3D", "SEO & performance"],
    icon: "🛰️",
  },
  {
    title: "Bot Development",
    description:
      "Custom Discord, Telegram & automation bots that run your community on autopilot.",
    features: ["Discord / Telegram", "AI integrations", "24/7 reliability"],
    icon: "🤖",
  },
  {
    title: "UI / UX Design",
    description:
      "Premium, futuristic interfaces with motion design that feels alive and intentional.",
    features: ["Design systems", "Motion & micro-interactions", "Prototyping"],
    icon: "🎛️",
  },
  {
    title: "Automation",
    description:
      "Workflow automation & integrations that connect your stack and save hundreds of hours.",
    features: ["API integrations", "Pipelines & queues", "Self-hosting"],
    icon: "⚙️",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  signal: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aria V.",
    role: "Founder, Lumen Studio",
    quote:
      "RCN delivered an experience our users genuinely talk about. The 3D work is unreal.",
    signal: "98%",
  },
  {
    name: "Kane M.",
    role: "Community Lead",
    quote:
      "Their bot transformed how we run our 50k-member server. Rock solid and fast.",
    signal: "100%",
  },
  {
    name: "Sora T.",
    role: "Product Manager",
    quote:
      "Pixel-perfect, performant, and shipped ahead of schedule. A rare combination.",
    signal: "95%",
  },
  {
    name: "Devon R.",
    role: "CTO, Flux Labs",
    quote:
      "The automation suite paid for itself in a month. RCN thinks in systems.",
    signal: "97%",
  },
];

export interface TeamMember {
  handle: string;
  role: string;
  bio: string;
  color: string;
  specialty: string;
}

export const TEAM: TeamMember[] = [
  {
    handle: "Hero.X",
    role: "Founder · Full-Stack",
    bio: "Architects the universe. Lives in the render loop.",
    color: "#8b5cf6",
    specialty: "WebGL / Systems",
  },
  {
    handle: "Jenish",
    role: "Frontend Engineer",
    bio: "Turns designs into pixel-perfect, buttery interfaces.",
    color: "#60a5fa",
    specialty: "React / Motion",
  },
  {
    handle: "Vortex",
    role: "Backend / Bots",
    bio: "Builds the engines that never sleep.",
    color: "#34d399",
    specialty: "Automation / APIs",
  },
  {
    handle: "DeAdHellion",
    role: "Designer · Creative",
    bio: "Crafts the look that makes people stare.",
    color: "#f472b6",
    specialty: "UI / Brand",
  },
];

export const DEV_LOGS: string[] = [
  "v0.1 — Spawned the first nebula. It promptly ate the framerate.",
  "v0.4 — Taught the camera to fly. It flew into a planet.",
  "v0.7 — Added bloom. Everything glowed. Including the bugs.",
  "v1.0 — Shipped the universe. The stars aligned.",
];

export const FUN_FACTS: string[] = [
  "This site renders thousands of stars in a single draw call.",
  "The nebulas are 100% procedural GLSL — no textures.",
  "Scrolling doesn't move the page; it pilots a spaceship.",
  "You found a planet most visitors never will.",
];
