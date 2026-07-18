import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-monospace, monospace",
          padding: "2rem",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            Studio not configured
          </h1>
          <p style={{ maxWidth: "36rem", color: "#5B6472" }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> in your environment, then
            reload this page to open the embedded Sanity Studio.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
