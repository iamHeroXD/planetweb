"use client";

import dynamic from "next/dynamic";
import Loader from "./ui/Loader";
import Hud from "./ui/Hud";
import SectionPanel from "./ui/SectionPanel";

// The WebGL universe must run client-side only (no SSR for the Canvas).
const Universe = dynamic(() => import("./Universe"), { ssr: false });

export default function Experience() {
  return (
    <main className="relative h-full w-full">
      <Universe />
      <Hud />
      <SectionPanel />
      <Loader />

      {/* SEO / no-JS fallback */}
      <noscript>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-8 text-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">RCN Universe</h1>
            <p className="mt-3 text-white/60">
              Explore the Digital Universe of RCN. This experience requires
              JavaScript & WebGL.
            </p>
          </div>
        </div>
      </noscript>
    </main>
  );
}
