import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = `${SITE_CONFIG.name}, software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STARS = [
  { x: 90, y: 70, s: 4 },
  { x: 260, y: 150, s: 3 },
  { x: 520, y: 60, s: 3 },
  { x: 760, y: 120, s: 5 },
  { x: 980, y: 80, s: 3 },
  { x: 1100, y: 220, s: 4 },
  { x: 880, y: 330, s: 3 },
  { x: 1040, y: 460, s: 5 },
  { x: 700, y: 540, s: 3 },
  { x: 430, y: 590, s: 4 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          position: "relative",
          background:
            "radial-gradient(circle at 82% 12%, #172a55 0%, #05070d 58%)",
          color: "#e8ecf4",
        }}
      >
        {STARS.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: star.x,
              top: star.y,
              width: star.s,
              height: star.s,
              borderRadius: 999,
              background: "#ffffff",
              opacity: 0.8,
            }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 30, color: "#8d99ad" }}>
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 960,
          }}
        >
          {SITE_CONFIG.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#4c8dff" }}>
          Angular · Node.js · MongoDB · AWS
        </div>
      </div>
    ),
    { ...size },
  );
}