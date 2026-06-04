"use client";

import { useEffect, useState } from "react";

/** Returns true on small screens. SSR-safe (defaults to false). */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

/** Detects coarse pointers (touch) to tune interactions. */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return touch;
}

/** Quality tier used to scale particle counts / effects. */
export function useQualityTier(): "low" | "high" {
  const isMobile = useIsMobile();
  return isMobile ? "low" : "high";
}
