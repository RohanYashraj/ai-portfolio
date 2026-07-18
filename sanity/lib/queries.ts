import { isSanityConfigured } from "../env";
import { sanityFetch } from "./live";
import type {
  Author,
  Highlight,
  Post,
  ResumeData,
  SiteSettings,
  Stat,
} from "./types";
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
} from "./fallback";

// Tag every query so the /api/revalidate webhook can bust the right caches.
async function fetchOr<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const { data } = await sanityFetch({ query, params });
    return (data as T) ?? fallback;
  } catch (err) {
    console.error("Sanity fetch failed, using fallback:", err);
    return fallback;
  }
}

const IMAGE = `{..., "alt": alt}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchOr<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      siteTitle, tagline, heroGreeting, heroStatement,
      profileImage${IMAGE}, marqueeItems, primaryCtaLabel, secondaryCtaLabel,
      "resumePdfUrl": resumePdf.asset->url,
      navLinks[]{label, url},
      socialLinks[]{platform, url},
      footerNote,
      seo{metaTitle, metaDescription, ogImage${IMAGE}}
    }`,
    fallbackSiteSettings,
  );
}

export async function getAuthor(): Promise<Author> {
  return fetchOr<Author>(
    `*[_type == "author"][0]{
      name, credentials, roleTitle, bio, photo${IMAGE}, email, sameAs
    }`,
    fallbackAuthor,
  );
}

export async function getStats(): Promise<Stat[]> {
  return fetchOr<Stat[]>(
    `*[_type == "stat"] | order(order asc){_id, label, value, suffix, order}`,
    fallbackStats,
  );
}

const HIGHLIGHT_CARD = `{
  _id, title, "slug": slug.current, category, date, summary,
  coverImage${IMAGE}, featured
}`;

export async function getHighlights(): Promise<Highlight[]> {
  return fetchOr<Highlight[]>(
    `*[_type == "highlight"] | order(date desc)${HIGHLIGHT_CARD}`,
    fallbackHighlights,
  );
}

export async function getFeaturedHighlights(limit = 3): Promise<Highlight[]> {
  const all = await getHighlights();
  const featured = all.filter((h) => h.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getHighlight(slug: string): Promise<Highlight | null> {
  return fetchOr<Highlight | null>(
    `*[_type == "highlight" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, category, date, summary,
      coverImage${IMAGE}, body, gallery[]${IMAGE}, links[]{label, url},
      seo{metaTitle, metaDescription, ogImage${IMAGE}}
    }`,
    fallbackHighlights.find((h) => h.slug === slug) ?? null,
    { slug },
  );
}

export async function getHighlightSlugs(): Promise<string[]> {
  const all = await getHighlights();
  return all.map((h) => h.slug);
}

const POST_CARD = `{
  _id, title, "slug": slug.current, excerpt, coverImage${IMAGE}, publishedAt, tags
}`;

export async function getPosts(): Promise<Post[]> {
  return fetchOr<Post[]>(
    `*[_type == "post"] | order(publishedAt desc)${POST_CARD}`,
    fallbackPosts,
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return fetchOr<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, excerpt, coverImage${IMAGE},
      publishedAt, tags, body,
      relatedPosts[]->{title, "slug": slug.current, excerpt, publishedAt},
      seo{metaTitle, metaDescription, ogImage${IMAGE}}
    }`,
    fallbackPosts.find((p) => p.slug === slug) ?? null,
    { slug },
  );
}

export async function getPostSlugs(): Promise<string[]> {
  const all = await getPosts();
  return all.map((p) => p.slug);
}

export async function getResume(): Promise<ResumeData> {
  return fetchOr<ResumeData>(
    `{
      "education": *[_type == "education"] | order(order asc),
      "experience": *[_type == "experience"] | order(order asc),
      "milestones": *[_type == "milestone"] | order(order asc),
      "skillGroups": *[_type == "skillGroup"] | order(order asc),
      "credentials": *[_type == "credential"] | order(order asc),
      "publications": *[_type == "publication"] | order(order asc)
    }`,
    {
      education: fallbackEducation,
      experience: fallbackExperience,
      milestones: fallbackMilestones,
      skillGroups: fallbackSkillGroups,
      credentials: fallbackCredentials,
      publications: fallbackPublications,
    },
  );
}
