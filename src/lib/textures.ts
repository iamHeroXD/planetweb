import * as THREE from "three";

/** Soft, round, glowing star sprite — replaces the fake square points. */
export function makeStarTexture(): THREE.Texture {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(255,255,255,0.9)");
  g.addColorStop(0.5, "rgba(200,180,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function hex(color: THREE.Color, mul = 1) {
  return "#" + color.clone().multiplyScalar(mul).getHexString();
}

/**
 * Procedural planet surface so rotating planets show real detail
 * (continents / gas bands / techno-panels) without loading any assets.
 */
export function makePlanetTexture(
  baseHex: string,
  type: "gas" | "rocky" | "tech",
): THREE.Texture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const base = new THREE.Color(baseHex);

  // base fill
  ctx.fillStyle = hex(base, 0.45);
  ctx.fillRect(0, 0, w, h);

  if (type === "gas") {
    // horizontal turbulent bands
    for (let y = 0; y < h; y++) {
      const t = y / h;
      const band =
        Math.sin(t * Math.PI * 9 + Math.sin(t * 20) * 0.6) * 0.5 + 0.5;
      const swirl = Math.sin(t * 40 + Math.random() * 0.4) * 0.05;
      const shade = 0.35 + band * 0.55 + swirl;
      ctx.fillStyle = hex(base, shade);
      ctx.fillRect(0, y, w, 1);
    }
    // storm spots
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 8 + Math.random() * 40;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hex(base, 1.1));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "tech") {
    // metallic panels + emissive grid lines
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const pw = 10 + Math.random() * 60;
      const ph = 10 + Math.random() * 40;
      ctx.fillStyle = hex(base, 0.35 + Math.random() * 0.5);
      ctx.fillRect(x, y, pw, ph);
    }
    ctx.strokeStyle = hex(base, 1.4);
    ctx.globalAlpha = 0.5;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else {
    // rocky: layered continent blobs
    for (let i = 0; i < 240; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 6 + Math.random() * 70;
      const lighten = Math.random() > 0.5;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hex(base, lighten ? 0.9 : 0.25));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // icy poles
    const pole = ctx.createLinearGradient(0, 0, 0, h);
    pole.addColorStop(0, "rgba(255,255,255,0.25)");
    pole.addColorStop(0.12, "rgba(255,255,255,0)");
    pole.addColorStop(0.88, "rgba(255,255,255,0)");
    pole.addColorStop(1, "rgba(255,255,255,0.25)");
    ctx.fillStyle = pole;
    ctx.fillRect(0, 0, w, h);
  }

  // fine grain speckle
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** Wispy cloud layer (alpha) for atmospheric planets. */
export function makeCloudTexture(): THREE.Texture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 20 + Math.random() * 90;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${0.18 + Math.random() * 0.22})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.8, r, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
