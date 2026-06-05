"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Html,
  Ring,
} from "@react-three/drei";
import * as THREE from "three";
import type { PlanetConfig } from "@/lib/planets";
import { useUniverse } from "@/lib/store";
import { makePlanetTexture, makeCloudTexture } from "@/lib/textures";

/* ---------- Atmosphere glow (fresnel on a back-side shell) ---------- */
const atmoVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const atmoFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), uPower);
    gl_FragColor = vec4(uColor, f * uIntensity);
  }
`;

function Atmosphere({
  color,
  radius,
  boosted,
}: {
  color: string;
  radius: number;
  boosted: boolean;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uPower: { value: 3.0 },
      uIntensity: { value: 1.1 },
    }),
    [color],
  );
  useFrame(() => {
    if (mat.current) {
      const target = boosted ? 2.2 : 1.1;
      mat.current.uniforms.uIntensity.value +=
        (target - mat.current.uniforms.uIntensity.value) * 0.1;
    }
  });
  return (
    <mesh scale={radius * 1.35}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        ref={mat}
        vertexShader={atmoVertex}
        fragmentShader={atmoFragment}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------- Moon ---------- */
function Moon({
  config,
}: {
  config: PlanetConfig["moons"][number];
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * config.speed + config.phase;
    ref.current.position.set(
      Math.cos(t) * config.distance,
      Math.sin(t) * config.distance * Math.sin(config.inclination),
      Math.sin(t) * config.distance * Math.cos(config.inclination),
    );
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[config.radius, 24, 24]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={0.25}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

/* ---------- Cloud layer ---------- */
function Clouds({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeCloudTexture(), []);
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <mesh ref={ref} scale={radius * 1.03}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial
        map={tex}
        alphaMap={tex}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        roughness={1}
      />
    </mesh>
  );
}

/* ---------- Planet body material switch ---------- */
function PlanetBody({
  planet,
  hovered,
}: {
  planet: PlanetConfig;
  hovered: boolean;
}) {
  const emissiveIntensity = hovered ? 0.75 : 0.32;

  const kind: "gas" | "rocky" | "tech" =
    planet.material === "gas"
      ? "gas"
      : planet.material === "metal" || planet.material === "station"
        ? "tech"
        : "rocky";

  const map = useMemo(
    () => makePlanetTexture(planet.color, kind),
    [planet.color, kind],
  );
  useEffect(() => () => map.dispose(), [map]);

  // White base so the baked-in surface colour shows true; emissive adds glow.
  const common = {
    map,
    color: "#ffffff",
    emissive: planet.emissive,
    emissiveIntensity,
  };

  switch (planet.material) {
    case "distort":
      return (
        <MeshDistortMaterial
          {...common}
          speed={1.4}
          distort={0.22}
          roughness={0.65}
          metalness={0.25}
        />
      );
    case "wobble":
      return (
        <MeshWobbleMaterial
          {...common}
          factor={0.12}
          speed={1.2}
          roughness={0.7}
          metalness={0.2}
        />
      );
    case "metal":
      return (
        <meshStandardMaterial
          {...common}
          roughnessMap={map}
          roughness={0.45}
          metalness={0.6}
        />
      );
    case "gas":
      return (
        <meshStandardMaterial {...common} roughness={0.85} metalness={0.05} />
      );
    case "station":
      return (
        <meshStandardMaterial
          {...common}
          roughnessMap={map}
          roughness={0.5}
          metalness={0.5}
        />
      );
    default:
      return (
        <meshStandardMaterial {...common} roughness={0.7} metalness={0.2} />
      );
  }
}

export default function Planet({ planet }: { planet: PlanetConfig }) {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const hovered = useUniverse((s) => s.hovered);
  const active = useUniverse((s) => s.active);
  const setHovered = useUniverse((s) => s.setHovered);
  const requestFlyTo = useUniverse((s) => s.requestFlyTo);

  const isHovered = hovered === planet.id || localHover;
  const isActive = active === planet.id;
  const showLabel = isHovered && !active;

  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += planet.rotationSpeed * 0.01;
    }
    if (group.current) {
      // subtle idle bob
      group.current.position.y =
        planet.position[1] +
        Math.sin(state.clock.elapsedTime * 0.4 + planet.index) * 0.4;
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      const target = isHovered ? 0.85 : 0.4;
      mat.opacity += (target - mat.opacity) * 0.1;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    requestFlyTo(planet.id);
  };

  return (
    <group
      ref={group}
      position={planet.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setLocalHover(true);
        setHovered(planet.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setLocalHover(false);
        setHovered(null);
        document.body.style.cursor = "auto";
      }}
      onClick={handleClick}
    >
      {/* Body */}
      <mesh
        ref={bodyRef}
        scale={isHovered ? planet.radius * 1.04 : planet.radius}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <PlanetBody planet={planet} hovered={isHovered} />
      </mesh>

      {/* Clouds (atmospheric worlds only) */}
      {(planet.material === "standard" ||
        planet.material === "gas" ||
        planet.material === "wobble") && (
        <Clouds radius={planet.radius} color={planet.atmosphere} />
      )}

      {/* Atmosphere */}
      <Atmosphere
        color={planet.atmosphere}
        radius={planet.radius}
        boosted={isHovered || isActive}
      />

      {/* Rings */}
      {planet.rings.enabled && (
        <Ring
          ref={ringRef}
          args={[planet.rings.inner, planet.rings.outer, 96]}
          rotation={[Math.PI / 2 + planet.rings.tilt, 0, 0]}
        >
          <meshBasicMaterial
            color={planet.rings.color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Ring>
      )}

      {/* Moons */}
      {planet.moons.map((m, i) => (
        <Moon key={i} config={m} />
      ))}

      {/* Hover label */}
      {showLabel && (
        <Html
          center
          distanceFactor={28}
          position={[0, planet.radius + 2.5, 0]}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="no-select flex flex-col items-center">
            <div className="glass-strong holo-border rounded-full px-4 py-1.5 whitespace-nowrap">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                {planet.label}
              </span>
            </div>
            <span className="mt-1 text-[10px] font-light text-white/60 whitespace-nowrap">
              {planet.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
