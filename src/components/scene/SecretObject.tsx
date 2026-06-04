"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useUniverse } from "@/lib/store";

/**
 * A tiny, easily-missed glowing artifact drifting off the beaten path.
 * Clicking it unlocks the hidden Developer Vault planet.
 */
export default function SecretObject() {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const vaultUnlocked = useUniverse((s) => s.vaultUnlocked);
  const unlockVault = useUniverse((s) => s.unlockVault);
  const requestFlyTo = useUniverse((s) => s.requestFlyTo);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.013;
    ref.current.position.y =
      -14 + Math.sin(state.clock.elapsedTime * 0.7) * 1.2;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = (hover ? 3 : 1.4) + Math.sin(state.clock.elapsedTime * 3) * 0.4;
  });

  // Hidden away below & to the side of the journey early on.
  return (
    <group position={[26, -14, -25]}>
      <mesh
        ref={ref}
        scale={hover ? 1.5 : 1.1}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          const wasLocked = !vaultUnlocked;
          unlockVault();
          // After unlocking, fly straight to the vault to reveal it.
          if (wasLocked) {
            setTimeout(() => requestFlyTo("vault"), 600);
          } else {
            requestFlyTo("vault");
          }
        }}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#22c55e"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={!vaultUnlocked}
        />
      </mesh>

      {hover && (
        <Html center distanceFactor={20} position={[0, 2.4, 0]} style={{ pointerEvents: "none" }}>
          <div className="no-select glass-strong holo-border rounded-full px-3 py-1 whitespace-nowrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">
              {vaultUnlocked ? "Enter Vault" : "??? — Inspect"}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
