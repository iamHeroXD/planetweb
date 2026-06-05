"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Kept intentionally lean and with a *stable* child tree. Toggling effects
 * (or empty fragments) inside EffectComposer can re-init the pipeline and
 * flash the screen black, so the same effects always render — only their
 * strength changes with quality.
 */
export default function Effects({ quality }: { quality: "low" | "high" }) {
  const high = quality === "high";

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={high ? 1.0 : 0.7}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.75}
      />
      <Vignette eskil={false} offset={0.28} darkness={0.78} />
    </EffectComposer>
  );
}
