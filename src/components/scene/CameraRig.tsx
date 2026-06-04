"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverse } from "@/lib/store";
import { buildJourney, getPlanet, JOURNEY_PLANETS } from "@/lib/planets";

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Frame-rate independent damping toward a target vector. */
function dampV3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  delta: number,
) {
  const f = 1 - Math.exp(-lambda * delta);
  current.lerp(target, f);
}

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useUniverse((s) => s.scroll);
  const active = useUniverse((s) => s.active);
  const flyTo = useUniverse((s) => s.flyTo);
  const open = useUniverse((s) => s.open);
  const requestFlyTo = useUniverse((s) => s.requestFlyTo);

  const { stations, targets } = useMemo(() => buildJourney(), []);

  const lookAtCurrent = useRef(new THREE.Vector3(0, 0, 0));
  const desiredPos = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());
  const arrived = useRef(false);

  // Reset arrival flag whenever a new fly-to begins.
  useEffect(() => {
    arrived.current = false;
  }, [flyTo]);

  // Initialize camera at the first station.
  useEffect(() => {
    camera.position.copy(stations[0]);
    lookAtCurrent.current.copy(targets[0]);
    camera.lookAt(lookAtCurrent.current);
  }, [camera, stations, targets]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp to avoid jumps on tab refocus
    const t = state.clock.elapsedTime;

    // Determine which planet we're focusing (fly target takes priority).
    const focusId = flyTo ?? active;

    if (focusId) {
      const planet = getPlanet(focusId);
      const pos = new THREE.Vector3(...planet.position);
      const offset = new THREE.Vector3(...planet.focusOffset);
      desiredPos.current.copy(pos).add(offset);
      desiredLook.current.copy(pos);

      dampV3(camera.position, desiredPos.current, 2.6, d);
      dampV3(lookAtCurrent.current, desiredLook.current, 3.5, d);

      // Detect arrival to open the section panel.
      if (
        flyTo &&
        !arrived.current &&
        camera.position.distanceTo(desiredPos.current) < 1.2
      ) {
        arrived.current = true;
        open(flyTo);
        requestFlyTo(null);
      }
    } else {
      // Scroll-driven journey along the camera stations.
      const segments = stations.length - 1;
      const raw = THREE.MathUtils.clamp(scroll, 0, 1) * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const te = smoothstep(raw - i);

      desiredPos.current.copy(stations[i]).lerp(stations[i + 1], te);
      desiredLook.current.copy(targets[i]).lerp(targets[i + 1], te);

      // Living-camera breathing drift.
      desiredPos.current.x += Math.sin(t * 0.25) * 0.6;
      desiredPos.current.y += Math.cos(t * 0.2) * 0.5;

      dampV3(camera.position, desiredPos.current, 3.2, d);
      dampV3(lookAtCurrent.current, desiredLook.current, 4, d);
    }

    camera.lookAt(lookAtCurrent.current);
  });

  return null;
}

export { JOURNEY_PLANETS };
