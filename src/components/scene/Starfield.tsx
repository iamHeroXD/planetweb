"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeStarTexture } from "@/lib/textures";

/**
 * A dense, multi-coloured starfield spread across the entire journey volume.
 * Stars twinkle subtly and drift, selling the "millions of stars" feel
 * while staying performant via a single Points draw call per layer.
 */
function StarLayer({
  count,
  spread,
  depth,
  size,
  speed,
}: {
  count: number;
  spread: number;
  depth: number;
  size: number;
  speed: number;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const starTex = useMemo(() => makeStarTexture(), []);
  useEffect(() => () => starTex.dispose(), [starTex]);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#93c5fd"),
      new THREE.Color("#f0abfc"),
      new THREE.Color("#a5f3fc"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = -Math.random() * depth + 30;
      const c = palette[Math.floor(Math.random() * palette.length)];
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = c.r * intensity;
      colors[i * 3 + 1] = c.g * intensity;
      colors[i * 3 + 2] = c.b * intensity;
    }
    return { positions, colors };
  }, [count, spread, depth]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.z += speed * 0.0002;
    if (material.current) {
      // gentle global twinkle
      material.current.opacity =
        0.75 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={starTex}
        alphaMap={starTex}
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Starfield({ quality }: { quality: "low" | "high" }) {
  const high = quality === "high";
  return (
    <group>
      <StarLayer
        count={high ? 9000 : 3000}
        spread={600}
        depth={700}
        size={1.0}
        speed={1}
      />
      <StarLayer
        count={high ? 6000 : 2000}
        spread={400}
        depth={600}
        size={1.7}
        speed={-0.6}
      />
      <StarLayer
        count={high ? 2500 : 900}
        spread={260}
        depth={500}
        size={2.8}
        speed={0.3}
      />
    </group>
  );
}
