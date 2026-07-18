import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || siteName;
  const eyebrow = searchParams.get("eyebrow")?.slice(0, 60) || "Actuary · Researcher · Educator";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          padding: "72px",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, #E7E7E2 1px, transparent 1px), linear-gradient(to bottom, #E7E7E2 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#5B6472",
            fontFamily: "monospace",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#14181F",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 120, height: 4, background: "#2E3A87" }} />
          <div style={{ fontSize: 26, color: "#2E3A87", fontFamily: "monospace" }}>
            {siteName}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
