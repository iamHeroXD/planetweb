"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import * as THREE from "three";

import Starfield from "./Starfield";
import Nebula from "./Nebula";
import Planet from "./Planet";
import SpaceDust from "./SpaceDust";
import ShootingStars from "./ShootingStars";
import Asteroids from "./Asteroids";
import SecretObject from "./SecretObject";
import CameraRig from "./CameraRig";
import Effects from "./Effects";

import { PLANETS } from "@/lib/planets";
import { useUniverse } from "@/lib/store";

/** A soft key light that trails the camera so planets light up as you approach. */
function TravelingLight() {
  const light = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (light.current) {
      light.current.position.set(
        camera.position.x + 6,
        camera.position.y + 8,
        camera.position.z + 4,
      );
    }
  });
  return <pointLight ref={light} intensity={2.2} distance={120} color="#c4b5fd" decay={1.5} />;
}

export default function Scene({ quality }: { quality: "low" | "high" }) {
  const vaultUnlocked = useUniverse((s) => s.vaultUnlocked);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#4c1d95" />
      <hemisphereLight args={["#7c3aed", "#030712", 0.5]} />
      <directionalLight position={[20, 30, 10]} intensity={1.1} color="#a78bfa" />
      <TravelingLight />

      {/* Deep space backdrop */}
      <Starfield quality={quality} />
      <Nebula quality={quality} />
      <SpaceDust count={quality === "high" ? 500 : 200} />
      <ShootingStars count={quality === "high" ? 6 : 3} />
      <Asteroids count={quality === "high" ? 70 : 28} />

      {/* Planets */}
      {PLANETS.map((p) =>
        p.secret ? (
          vaultUnlocked ? <Planet key={p.id} planet={p} /> : null
        ) : (
          <Planet key={p.id} planet={p} />
        ),
      )}

      {/* Hidden artifact that unlocks the vault */}
      <SecretObject />

      {/* Camera + post */}
      <CameraRig />
      <Effects quality={quality} />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
    </>
  );
}
