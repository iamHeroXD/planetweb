import { chromium } from "playwright";

const errors = [];
const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// Click Enter Universe
const btn = page.getByText("Enter Universe", { exact: false });
try {
  await btn.click({ timeout: 8000 });
  console.log("Clicked Enter Universe OK");
} catch {
  console.log("Could NOT find Enter Universe button");
}
await page.waitForTimeout(3500);

// Sample the canvas: average brightness + colour variance (detect black screen)
const stats = await page.evaluate(() => {
  const cv = document.querySelector("canvas");
  if (!cv) return { error: "no canvas" };
  const w = 200, h = 120;
  const tmp = document.createElement("canvas");
  tmp.width = w; tmp.height = h;
  const ctx = tmp.getContext("2d");
  ctx.drawImage(cv, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  let sum = 0, max = 0, nonDark = 0;
  for (let i = 0; i < d.length; i += 4) {
    const b = (d[i] + d[i + 1] + d[i + 2]) / 3;
    sum += b;
    if (b > max) max = b;
    if (b > 25) nonDark++;
  }
  const px = d.length / 4;
  return {
    avgBrightness: +(sum / px).toFixed(2),
    maxBrightness: max,
    litPixelPct: +((nonDark / px) * 100).toFixed(1),
    canvasSize: `${cv.width}x${cv.height}`,
  };
});
console.log("Canvas stats:", JSON.stringify(stats));

await page.screenshot({ path: "verify-home.png" });

// Scroll to travel and screenshot again
await page.mouse.wheel(0, 1600);
await page.waitForTimeout(2500);
await page.screenshot({ path: "verify-scrolled.png" });

console.log("Console errors (" + errors.length + "):");
errors.slice(0, 15).forEach((e) => console.log(" -", e));

await browser.close();
