// Converts the local fallback content into a Sanity NDJSON file you can import:
//   node scripts/export-seed.ts
//   npx sanity dataset import sanity/seed.ndjson production
//
// Images are intentionally omitted — upload the real profile photo and covers in
// the Studio after import. Text, portable-text bodies, and structure are seeded.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  fallbackAuthor,
  fallbackCredentials,
  fallbackEducation,
  fallbackExperience,
  fallbackHighlights,
  fallbackMilestones,
  fallbackPosts,
  fallbackPublications,
  fallbackSiteSettings,
  fallbackSkillGroups,
  fallbackStats,
} from "../sanity/lib/fallback.ts";

type Doc = Record<string, unknown>;
const docs: Doc[] = [];
const keyed = <T extends object>(arr: T[]): (T & { _key: string })[] =>
  arr.map((item, i) => ({ _key: `k${i}`, ...item }));

// Site settings (singleton) — drop image + pdf, keep everything else.
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: fallbackSiteSettings.siteTitle,
  tagline: fallbackSiteSettings.tagline,
  heroGreeting: fallbackSiteSettings.heroGreeting,
  heroStatement: fallbackSiteSettings.heroStatement,
  marqueeItems: fallbackSiteSettings.marqueeItems,
  primaryCtaLabel: fallbackSiteSettings.primaryCtaLabel,
  secondaryCtaLabel: fallbackSiteSettings.secondaryCtaLabel,
  navLinks: keyed(fallbackSiteSettings.navLinks),
  socialLinks: keyed(fallbackSiteSettings.socialLinks),
  footerNote: fallbackSiteSettings.footerNote,
  seo: fallbackSiteSettings.seo,
});

// Author (singleton)
docs.push({
  _id: "author",
  _type: "author",
  name: fallbackAuthor.name,
  credentials: fallbackAuthor.credentials,
  roleTitle: fallbackAuthor.roleTitle,
  email: fallbackAuthor.email,
  sameAs: fallbackAuthor.sameAs,
  bio: fallbackAuthor.bio,
});

// Stats
for (const s of fallbackStats) {
  docs.push({ _id: s._id, _type: "stat", label: s.label, value: s.value, suffix: s.suffix, order: s.order });
}

// Highlights
for (const h of fallbackHighlights) {
  docs.push({
    _id: h._id,
    _type: "highlight",
    title: h.title,
    slug: { _type: "slug", current: h.slug },
    category: h.category,
    date: h.date,
    summary: h.summary,
    body: h.body,
    links: h.links ? keyed(h.links) : undefined,
    featured: h.featured ?? false,
  });
}

// Posts
for (const p of fallbackPosts) {
  docs.push({
    _id: p._id,
    _type: "post",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    tags: p.tags,
    body: p.body,
  });
}

// Resume documents
for (const e of fallbackEducation) docs.push({ ...e, _type: "education" });
for (const x of fallbackExperience) docs.push({ ...x, _type: "experience" });
for (const m of fallbackMilestones) docs.push({ ...m, _type: "milestone" });
for (const g of fallbackSkillGroups) docs.push({ ...g, _type: "skillGroup" });
for (const c of fallbackCredentials) docs.push({ ...c, _type: "credential" });
for (const pub of fallbackPublications) docs.push({ ...pub, _type: "publication" });

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "sanity", "seed.ndjson");
writeFileSync(outPath, ndjson + "\n");
console.log(`Wrote ${docs.length} documents to sanity/seed.ndjson`);
