// Centralised SEO + AEO (answer-engine) helpers: shared metadata constants and
// JSON-LD builders. Kept in one place so the site speaks with a single, factual
// voice across pages, social cards, and structured data. Everything here is
// derived from real CMS/author data — no invented facts.

import { resolveImageUrl } from "@/sanity/lib/image";
import type { Author, Highlight, Post } from "@/sanity/lib/types";
import { siteName, siteUrl } from "./site";

/** One canonical sentence describing the subject — reused for meta + JSON-LD. */
export const siteDescription =
  "Dr Rohan Yashraj Gupta is an actuary, researcher, and educator — Actuarial Associate Principal at Accenture, Adjunct Professor at SSSIA, and holder of India's first PhD in Actuarial Science.";

/** Topics the site demonstrably covers — surfaced to answer engines via Person. */
export const knowsAbout = [
  "Actuarial Science",
  "Insurance Pricing",
  "Reserving",
  "Machine Learning",
  "Insurance Fraud Detection",
  "Agentic AI",
  "Health Insurance",
  "Crop Insurance",
];

export const siteKeywords = [
  "Rohan Yashraj Gupta",
  "actuary",
  "actuarial science",
  "insurance pricing",
  "insurance fraud detection",
  "machine learning",
  "agentic AI",
  "Accenture actuary",
  "SSSIA",
  "FIA",
  "FIAI",
  "PhD actuarial science India",
];

/** The static social share image (public/opengraph.png — 1254×1254 square). */
export const ogImage = {
  url: "/opengraph.png",
  width: 1254,
  height: 1254,
  alt: `${siteName} — Actuary, Researcher, Educator`,
};

const HTTP = /^https?:\/\//;
const PLACEHOLDER = /^\[.*\]$/;

/** Prefix a relative path with siteUrl; pass absolute URLs through unchanged. */
export function absoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;
  if (HTTP.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

const isPlaceholder = (v?: string) => !!v && PLACEHOLDER.test(v.trim());

/** Stable @id for the one Person node, referenced from every other node. */
export const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

/** schema.org Person — the primary entity search + answer engines resolve to. */
export function personLd(author: Author) {
  const image = absoluteUrl(resolveImageUrl(author.photo, { width: 800, height: 800 }));

  // Split "Role, Org" / "Role @ Org" / "Role at Org" → jobTitle + worksFor,
  // when the CMS role supplies an organisation; otherwise use it verbatim.
  let jobTitle: string | undefined;
  let worksFor: { "@type": "Organization"; name: string } | undefined;
  if (author.roleTitle) {
    const split = author.roleTitle.match(/^(.*?)(?:\s*,\s*|\s+@\s+|\s+at\s+)(.+)$/i);
    if (split) {
      jobTitle = split[1].trim();
      worksFor = { "@type": "Organization", name: split[2].trim() };
    } else {
      jobTitle = author.roleTitle;
    }
  }

  return {
    "@type": "Person",
    "@id": personId,
    name: author.name,
    url: siteUrl,
    description: siteDescription,
    knowsAbout,
    ...(author.credentials && !isPlaceholder(author.credentials)
      ? { honorificSuffix: author.credentials }
      : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(worksFor ? { worksFor } : {}),
    ...(image ? { image } : {}),
    ...(author.email ? { email: `mailto:${author.email}` } : {}),
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
  };
}

/** schema.org WebSite — ties the domain to the Person as its publisher. */
export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

/** Sitewide identity graph (WebSite + Person) emitted once from the layout. */
export function identityLd(author: Author) {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteLd(), personLd(author)],
  };
}

/** BreadcrumbList for a detail page: pass [{name, path}, …] root → current. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** schema.org BlogPosting for a blog article, authored/published by #person. */
export function blogPostingLd(post: Post) {
  const image =
    absoluteUrl(resolveImageUrl(post.coverImage, { width: 1200, height: 800 })) ?? absoluteUrl(ogImage.url);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(image ? { image } : {}),
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

/** schema.org Article for a highlight entry, authored by #person. */
export function highlightLd(highlight: Highlight) {
  const image =
    absoluteUrl(resolveImageUrl(highlight.coverImage, { width: 1200, height: 800 })) ??
    absoluteUrl(ogImage.url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: highlight.title,
    description: highlight.summary,
    datePublished: highlight.date,
    url: `${siteUrl}/highlights/${highlight.slug}`,
    mainEntityOfPage: `${siteUrl}/highlights/${highlight.slug}`,
    ...(image ? { image } : {}),
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}
