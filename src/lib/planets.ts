import * as THREE from "three";

export type SectionId =
  | "home"
  | "projects"
  | "services"
  | "clients"
  | "team"
  | "contact"
  | "vault";

export type PlanetMaterialKind =
  | "standard"
  | "distort"
  | "wobble"
  | "metal"
  | "gas"
  | "station";

export interface MoonConfig {
  radius: number;
  distance: number;
  speed: number;
  color: string;
  inclination: number;
  phase: number;
}

export interface PlanetConfig {
  id: SectionId;
  index: number;
  name: string;
  label: string;
  blurb: string;
  /** World position of the planet center */
  position: [number, number, number];
  radius: number;
  color: string;
  emissive: string;
  atmosphere: string;
  material: PlanetMaterialKind;
  rotationSpeed: number;
  rings: {
    enabled: boolean;
    inner: number;
    outer: number;
    color: string;
    tilt: number;
  };
  moons: MoonConfig[];
  /** Camera offset relative to the planet when flying TO it (focus mode) */
  focusOffset: [number, number, number];
  secret?: boolean;
}

/**
 * Planets are arranged along a winding journey through deep space.
 * The camera travels along -Z as the user scrolls, drifting side to side.
 */
export const PLANETS: PlanetConfig[] = [
  {
    id: "home",
    index: 0,
    name: "RCN Prime",
    label: "Home",
    blurb: "The heart of the RCN universe.",
    position: [0, 0, 0],
    radius: 5,
    color: "#8b5cf6",
    emissive: "#5b21b6",
    atmosphere: "#a855f7",
    material: "standard",
    rotationSpeed: 0.05,
    rings: { enabled: true, inner: 7, outer: 11, color: "#c084fc", tilt: 0.5 },
    moons: [
      {
        radius: 0.6,
        distance: 9,
        speed: 0.6,
        color: "#e9d5ff",
        inclination: 0.3,
        phase: 0,
      },
      {
        radius: 0.4,
        distance: 13,
        speed: -0.35,
        color: "#a855f7",
        inclination: -0.5,
        phase: 2,
      },
    ],
    focusOffset: [0, 1.5, 13],
  },
  {
    id: "projects",
    index: 1,
    name: "Nexus Forge",
    label: "Projects",
    blurb: "Space stations carrying our finest work.",
    position: [-20, 5, -55],
    radius: 4.2,
    color: "#3b82f6",
    emissive: "#1e3a8a",
    atmosphere: "#60a5fa",
    material: "distort",
    rotationSpeed: 0.08,
    rings: { enabled: false, inner: 0, outer: 0, color: "#60a5fa", tilt: 0 },
    moons: [
      {
        radius: 0.5,
        distance: 7,
        speed: 0.5,
        color: "#bfdbfe",
        inclination: 0.4,
        phase: 1,
      },
    ],
    focusOffset: [3, 1, 12],
  },
  {
    id: "services",
    index: 2,
    name: "Helios Works",
    label: "Services",
    blurb: "Futuristic cities of capability.",
    position: [20, -7, -115],
    radius: 4.6,
    color: "#f59e0b",
    emissive: "#b45309",
    atmosphere: "#fbbf24",
    material: "metal",
    rotationSpeed: 0.06,
    rings: { enabled: true, inner: 6.5, outer: 9, color: "#fcd34d", tilt: -0.6 },
    moons: [
      {
        radius: 0.5,
        distance: 8,
        speed: -0.45,
        color: "#fde68a",
        inclination: -0.3,
        phase: 0.5,
      },
      {
        radius: 0.35,
        distance: 11,
        speed: 0.3,
        color: "#f59e0b",
        inclination: 0.6,
        phase: 3,
      },
    ],
    focusOffset: [-3, 1.5, 13],
  },
  {
    id: "clients",
    index: 3,
    name: "Echo Halo",
    label: "Clients",
    blurb: "Holographic transmissions from those we serve.",
    position: [-18, 9, -175],
    radius: 4,
    color: "#10b981",
    emissive: "#065f46",
    atmosphere: "#34d399",
    material: "wobble",
    rotationSpeed: 0.07,
    rings: { enabled: true, inner: 6, outer: 8.5, color: "#6ee7b7", tilt: 0.8 },
    moons: [
      {
        radius: 0.45,
        distance: 7.5,
        speed: 0.4,
        color: "#a7f3d0",
        inclination: 0.2,
        phase: 1.5,
      },
    ],
    focusOffset: [3, 1, 12],
  },
  {
    id: "team",
    index: 4,
    name: "Vanguard",
    label: "Team",
    blurb: "The crew behind the universe.",
    position: [21, 4, -235],
    radius: 4.4,
    color: "#ec4899",
    emissive: "#9d174d",
    atmosphere: "#f472b6",
    material: "gas",
    rotationSpeed: 0.05,
    rings: { enabled: true, inner: 6.5, outer: 10, color: "#f9a8d4", tilt: -0.4 },
    moons: [
      {
        radius: 0.5,
        distance: 8,
        speed: -0.5,
        color: "#fbcfe8",
        inclination: -0.4,
        phase: 0,
      },
      {
        radius: 0.4,
        distance: 12,
        speed: 0.32,
        color: "#ec4899",
        inclination: 0.5,
        phase: 2.5,
      },
    ],
    focusOffset: [-3, 1.5, 13],
  },
  {
    id: "contact",
    index: 5,
    name: "Terminus",
    label: "Contact",
    blurb: "A colossal station — your gateway to RCN.",
    position: [0, -5, -295],
    radius: 5.4,
    color: "#06b6d4",
    emissive: "#155e75",
    atmosphere: "#22d3ee",
    material: "station",
    rotationSpeed: 0.04,
    rings: { enabled: true, inner: 7.5, outer: 12, color: "#67e8f9", tilt: 0.3 },
    moons: [
      {
        radius: 0.6,
        distance: 10,
        speed: 0.4,
        color: "#a5f3fc",
        inclination: 0.3,
        phase: 1,
      },
    ],
    focusOffset: [0, 1.5, 15],
  },
  {
    id: "vault",
    index: 6,
    name: "Developer Vault",
    label: "Vault",
    blurb: "A hidden world of easter eggs & developer logs.",
    position: [48, 34, -150],
    radius: 3.4,
    color: "#22c55e",
    emissive: "#14532d",
    atmosphere: "#4ade80",
    material: "distort",
    rotationSpeed: 0.12,
    rings: { enabled: true, inner: 5, outer: 7.5, color: "#86efac", tilt: 1.0 },
    moons: [
      {
        radius: 0.4,
        distance: 6,
        speed: 0.7,
        color: "#bbf7d0",
        inclination: 0.6,
        phase: 0,
      },
    ],
    focusOffset: [0, 1, 11],
    secret: true,
  },
];

/** Main planets that participate in the scroll journey (excludes secret). */
export const JOURNEY_PLANETS = PLANETS.filter((p) => !p.secret);

export const getPlanet = (id: SectionId) =>
  PLANETS.find((p) => p.id === id) as PlanetConfig;

/**
 * Builds the camera "stations" — one viewing position per journey planet.
 * Scroll progress (0..1) interpolates the camera between these stations,
 * while the look-at target interpolates between the planet centers.
 */
export function buildJourney() {
  const stations = JOURNEY_PLANETS.map((p) => {
    const pos = new THREE.Vector3(...p.position);
    const offset = new THREE.Vector3(...p.focusOffset).multiplyScalar(1.35);
    return pos.clone().add(offset);
  });
  const targets = JOURNEY_PLANETS.map((p) => new THREE.Vector3(...p.position));
  return { stations, targets };
}
