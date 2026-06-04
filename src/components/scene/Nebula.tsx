"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;

  // hash + value noise + fbm
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 q = vec2(fbm(uv * 3.0 + uTime * 0.02), fbm(uv * 3.0 - uTime * 0.015));
    float n = fbm(uv * 4.0 + q * 2.5 + uTime * 0.01);

    // radial falloff so the plane fades to transparent at the edges
    float d = distance(uv, vec2(0.5));
    float mask = smoothstep(0.55, 0.05, d);

    vec3 col = mix(uColorA, uColorB, n);
    col = mix(col, uColorC, smoothstep(0.4, 0.9, q.x));

    float alpha = pow(n, 1.6) * mask * uIntensity;
    gl_FragColor = vec4(col, alpha);
  }
`;

function NebulaPlane({
  position,
  rotation,
  scale,
  colorA,
  colorB,
  colorC,
  intensity,
  drift,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  colorA: string;
  colorB: string;
  colorC: string;
  intensity: number;
  drift: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: Math.random() * 100 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
      uIntensity: { value: intensity },
    }),
    [colorA, colorB, colorC, intensity],
  );

  useFrame((_, delta) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta * drift;
    }
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Nebula({ quality }: { quality: "low" | "high" }) {
  const high = quality === "high";
  return (
    <group>
      <NebulaPlane
        position={[-30, 10, -60]}
        rotation={[0, 0, 0.4]}
        scale={140}
        colorA="#4c1d95"
        colorB="#7c3aed"
        colorC="#2563eb"
        intensity={0.9}
        drift={1}
      />
      <NebulaPlane
        position={[40, -20, -150]}
        rotation={[0, 0, -0.6]}
        scale={170}
        colorA="#1e3a8a"
        colorB="#6d28d9"
        colorC="#db2777"
        intensity={0.8}
        drift={0.7}
      />
      <NebulaPlane
        position={[0, 25, -250]}
        rotation={[0, 0, 0.2]}
        scale={200}
        colorA="#5b21b6"
        colorB="#3b82f6"
        colorC="#9333ea"
        intensity={0.85}
        drift={0.9}
      />
      {high && (
        <NebulaPlane
          position={[-50, -10, -200]}
          rotation={[0, 0, 1.1]}
          scale={150}
          colorA="#7e22ce"
          colorB="#2563eb"
          colorC="#c026d3"
          intensity={0.7}
          drift={1.2}
        />
      )}
    </group>
  );
}
