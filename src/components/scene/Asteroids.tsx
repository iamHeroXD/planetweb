"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * An instanced asteroid field drifting & tumbling through the journey volume.
 * One draw call for the whole field.
 */
export default function Asteroids({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 220,
          (Math.random() - 0.5) * 90,
          -Math.random() * 320 + 20,
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ),
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6,
        ),
        scale: 0.3 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 2,
      })),
    [count],
  );

  useLayoutEffect(() => {
    if (!mesh.current) return;
    data.forEach((d, i) => {
      dummy.position.copy(d.position);
      dummy.rotation.copy(d.rotation);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [data, dummy]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    data.forEach((d, i) => {
      d.rotation.x += d.spin.x * delta;
      d.rotation.y += d.spin.y * delta;
      d.rotation.z += d.spin.z * delta;
      d.position.x += d.drift * delta * 0.4;
      dummy.position.copy(d.position);
      dummy.rotation.copy(d.rotation);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#6b7280"
        roughness={0.9}
        metalness={0.3}
        emissive="#312e81"
        emissiveIntensity={0.15}
        flatShading
      />
    </instancedMesh>
  );
}
