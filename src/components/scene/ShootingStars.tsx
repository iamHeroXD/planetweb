"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Streak {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
}

function randomStreak(zCenter: number): Streak {
  const pos = new THREE.Vector3(
    (Math.random() - 0.5) * 300,
    (Math.random() - 0.2) * 120,
    zCenter - Math.random() * 300,
  );
  const dir = new THREE.Vector3(
    -0.6 - Math.random() * 0.6,
    -0.3 - Math.random() * 0.4,
    0.1 - Math.random() * 0.2,
  ).normalize();
  const speed = 60 + Math.random() * 80;
  return {
    pos,
    vel: dir.multiplyScalar(speed),
    life: 0,
    maxLife: 1.2 + Math.random() * 1.2,
  };
}

export default function ShootingStars({ count = 6 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const streaks = useRef<Streak[]>([]);
  const meshes = useRef<THREE.Mesh[]>([]);

  if (streaks.current.length === 0) {
    streaks.current = Array.from({ length: count }, () =>
      randomStreak(-150),
    );
  }

  const geo = useMemo(() => new THREE.SphereGeometry(0.35, 8, 8), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#e9d5ff",
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    streaks.current.forEach((s, i) => {
      s.life += delta;
      s.pos.addScaledVector(s.vel, delta);
      const mesh = meshes.current[i];
      if (!mesh) return;
      mesh.position.copy(s.pos);
      const t = s.life / s.maxLife;
      const fade = Math.sin(Math.min(t, 1) * Math.PI);
      mesh.scale.set(fade, fade, fade * (3 + s.vel.length() * 0.05));
      mesh.lookAt(s.pos.clone().add(s.vel));
      const m = mesh.material as THREE.MeshBasicMaterial;
      m.opacity = fade;
      if (s.life >= s.maxLife) {
        streaks.current[i] = randomStreak(-150);
      }
    });
  });

  return (
    <group ref={group}>
      {streaks.current.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          geometry={geo}
          material={mat.clone()}
        />
      ))}
    </group>
  );
}
