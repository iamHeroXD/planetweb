import { create } from "zustand";
import type { SectionId } from "./planets";

interface UniverseState {
  /** Normalized scroll progress 0..1 along the journey. */
  scroll: number;
  setScroll: (v: number) => void;

  /** Currently hovered planet (3D), drives glow + label. */
  hovered: SectionId | null;
  setHovered: (id: SectionId | null) => void;

  /** The section panel that is open (null = exploring). */
  active: SectionId | null;
  open: (id: SectionId) => void;
  close: () => void;

  /** Whether assets/intro are ready. */
  ready: boolean;
  setReady: (v: boolean) => void;

  /** Has the user launched past the intro screen. */
  launched: boolean;
  launch: () => void;

  /** Secret Developer Vault unlocked. */
  vaultUnlocked: boolean;
  unlockVault: () => void;

  /** Achievements collected in the vault / via easter eggs. */
  achievements: string[];
  addAchievement: (a: string) => void;

  /** Audio / ambient toggle. */
  muted: boolean;
  toggleMuted: () => void;

  /** Request to fly the camera to a planet by id (consumed by CameraRig). */
  flyTo: SectionId | null;
  requestFlyTo: (id: SectionId | null) => void;
}

export const useUniverse = create<UniverseState>((set) => ({
  scroll: 0,
  setScroll: (v) => set({ scroll: v }),

  hovered: null,
  setHovered: (id) => set({ hovered: id }),

  active: null,
  open: (id) => set({ active: id }),
  close: () => set({ active: null }),

  ready: false,
  setReady: (v) => set({ ready: v }),

  launched: false,
  launch: () => set({ launched: true }),

  vaultUnlocked: false,
  unlockVault: () =>
    set((s) =>
      s.vaultUnlocked
        ? s
        : {
            vaultUnlocked: true,
            achievements: s.achievements.includes("Vault Breaker")
              ? s.achievements
              : [...s.achievements, "Vault Breaker"],
          },
    ),

  achievements: [],
  addAchievement: (a) =>
    set((s) =>
      s.achievements.includes(a)
        ? s
        : { achievements: [...s.achievements, a] },
    ),

  muted: true,
  toggleMuted: () => set((s) => ({ muted: !s.muted })),

  flyTo: null,
  requestFlyTo: (id) => set({ flyTo: id }),
}));
