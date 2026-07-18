import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";
import { Providers } from "@/components/theme-provider";
import { siteName, siteUrl } from "@/lib/site";
import { ogImage, siteDescription, siteKeywords } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next"
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
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Actuarial Science",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Actuary, Researcher, Educator`,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Actuary, Researcher, Educator`,
    description: siteDescription,
    images: [ogImage.url],
  },
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
        <Analytics />
        <Providers>
          {children}
          {isSanityConfigured && <SanityLive />}
          {isDraft && <VisualEditing />}
        </Providers>
      </body>
    </html>
  );
}
