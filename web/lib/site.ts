/* Canonical origin for absolute og/canonical/sitemap URLs (ISS-001/002/003).
   Override via env for previews; the domain is the launch target (AD-6). */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rohanyashraj.com"
);
