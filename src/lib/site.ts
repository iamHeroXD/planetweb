/**
 * Canonical site URL, shared by metadata, sitemap, robots and manifest.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  — set this to your custom domain in prod.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain.
 *  3. A sensible local/preview fallback.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://planetweb.vercel.app");

export const SITE = {
  name: "RCN Universe",
  shortName: "RCN",
  title: "RCN Universe — Explore the Digital Universe of RCN",
  description:
    "An interactive 3D space exploration experience. Travel between procedural planets to discover the projects, services, team and universe of RCN.",
  themeColor: "#030712",
  accent: "#a855f7",
} as const;
