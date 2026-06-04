"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { useMemo } from "react";

export default function Effects({ quality }: { quality: "low" | "high" }) {
  const high = quality === "high";
  const caOffset = useMemo(() => new Vector2(0.0006, 0.0009), []);

  return (
    <EffectComposer multisampling={high ? 4 : 0} enableNormalPass={false}>
      <Bloom
        intensity={high ? 1.15 : 0.8}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      {high ? <ChromaticAberration offset={caOffset} /> : <></>}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
      {high ? (
        <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
}
