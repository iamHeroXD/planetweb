import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "RCN Universe — Explore the Digital Universe of RCN";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Code-generated social card — no external assets or fonts, so it renders
// reliably at build time on any platform.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 35%, #1e1145 0%, #0a0420 45%, #030712 100%)",
          color: "#e9e6ff",
          position: "relative",
        }}
      >
        {/* glowing orb */}
        <div
          style={{
            position: "absolute",
            top: 70,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 38% 32%, #e9d5ff 0%, #a855f7 45%, #5b21b6 100%)",
            boxShadow: "0 0 160px 40px rgba(168,85,247,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 300,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 18,
              textTransform: "uppercase",
              color: "#c084fc",
              display: "flex",
            }}
          >
            RCN
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -2,
              marginTop: 8,
              backgroundImage:
                "linear-gradient(120deg, #c084fc 0%, #8b5cf6 50%, #60a5fa 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            RCN UNIVERSE
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(233,230,255,0.65)",
              marginTop: 18,
              display: "flex",
            }}
          >
            Explore the Digital Universe of RCN
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "rgba(233,230,255,0.35)",
              marginTop: 40,
              display: "flex",
            }}
          >
            Scroll to travel · Click a planet to land
          </div>
        </div>
        {/* hint of SITE name for branding consistency */}
        <span style={{ display: "none" }}>{SITE.name}</span>
      </div>
    ),
    { ...size },
  );
}
