"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  varying vec3 vDir;
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uHaze;

  // cheap hash noise for subtle deep-space variation
  float hash(vec3 p){
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    float t = vDir.y * 0.5 + 0.5;
    vec3 col = mix(uBottom, uTop, smoothstep(0.0, 1.0, t));
    // diagonal haze band (galactic plane feel)
    float band = smoothstep(0.35, 0.0, abs(vDir.y - vDir.x * 0.3));
    col += uHaze * band * 0.5;
    // faint grain so it never reads as flat black
    col += (hash(vDir * 200.0) - 0.5) * 0.015;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * A huge inverted sphere that always sits behind everything. Guarantees the
 * scene never flashes to pure black and gives space real depth + a galactic haze.
 */
export default function SpaceBackdrop() {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color("#0a0420") },
      uBottom: { value: new THREE.Color("#02030a") },
      uHaze: { value: new THREE.Color("#2a1a52") },
    }),
    [],
  );

  return (
    <mesh scale={900} renderOrder={-1} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
