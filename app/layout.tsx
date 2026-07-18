import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";
import { Providers } from "@/components/theme-provider";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

// Anton — condensed heavy poster type (marquee, big display, section labels).
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
// Archivo — grotesque for headings (up to 900) and body.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Actuary, Researcher, Educator`,
    template: `%s · ${siteName}`,
  },
  description:
    "Actuarial Associate Principal at Accenture, Adjunct Professor at SSSIA, and holder of India's first PhD in Actuarial Science.",
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/api/og"] },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled: isDraft } = await draftMode();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          {isSanityConfigured && <SanityLive />}
          {isDraft && <VisualEditing />}
        </Providers>
      </body>
    </html>
  );
}
