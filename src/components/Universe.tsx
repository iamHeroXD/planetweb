"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Lenis from "lenis";

import Scene from "./scene/Scene";
import { useUniverse } from "@/lib/store";
import { useQualityTier } from "@/lib/hooks";

/** Length (in viewport heights) of the virtual scroll track that drives the journey. */
const SCROLL_PAGES = 7;

export default function Universe() {
  const quality = useQualityTier();
  const setScroll = useUniverse((s) => s.setScroll);
  const active = useUniverse((s) => s.active);
  const lenisRef = useRef<Lenis | null>(null);

  // Virtual scroll → camera progress (Lenis drives a tall invisible track).
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    lenis.on("scroll", (e: { progress: number }) => {
      setScroll(e.progress ?? 0);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScroll]);

  // Lock scrolling while a section panel is open so the camera stays put.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (active) lenis.stop();
    else lenis.start();
  }, [active]);

  return (
    <>
      {/* Fixed full-screen WebGL canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: false,
          }}
          dpr={quality === "high" ? [1, 2] : [1, 1.5]}
          camera={{ fov: 60, near: 0.1, far: 1200, position: [0, 2, 14] }}
          onCreated={({ gl }) => {
            gl.setClearColor("#030712", 1);
          }}
        >
          <Suspense fallback={null}>
            <Scene quality={quality} />
          </Suspense>
        </Canvas>
      </div>

      {/* Invisible scroll track that gives Lenis something to scroll */}
      <div
        aria-hidden
        style={{ height: `${SCROLL_PAGES * 100}vh` }}
        className="pointer-events-none relative z-[1] w-full"
      />
    </>
  );
}
