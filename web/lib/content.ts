import { sanityClient } from "./sanity";
import type { PortableTextBlock } from "next-sanity";
import {
  ARCHIVE_QUERY,
  CASE_QUERY,
  STATS_QUERY,
  SELECTED_WORKS_QUERY,
  SITE_SETTINGS_QUERY,
  WORK_SLUGS_QUERY,
} from "../../studio/lib/queries";

export type SiteSettings = {
  siteName: string;
  heroName: string;
  heroNiche: string;
  heroAnchor: string;
  seoDescription: string;
  contactEmail: string;
  socialLinks: { label: string; url: string }[] | null;
};

export type Stats = {
  years: number;
  papers: number;
  talks: number;
};

export type SelectedWork = {
  _id: string;
  title: string;
  slug: string;
  kind: "project" | "paper" | "talk";
  date: string;
  headlineResult: string;
  visual: { url: string; alt: string; aspectRatio: number } | null;
};

/* Sanity publish → webhook → revalidateTag("content") is the only content-
   update path (AD-3); time-based revalidate is the safety net. */
const fetchOptions = { next: { revalidate: 3600, tags: ["content"] } };

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch(SITE_SETTINGS_QUERY, {}, fetchOptions);
  } catch {
    return null;
  }
}

/** Null when the CMS is unreachable or incomplete — the strip hides, never zeros. */
export async function getStats(): Promise<Stats | null> {
  try {
    const raw = await sanityClient.fetch<{
      papers: number;
      talks: number;
      careerStartYear: number | null;
    }>(STATS_QUERY, {}, fetchOptions);
    if (!raw || raw.careerStartYear == null) return null;
    const years = new Date().getFullYear() - raw.careerStartYear;
    if (years <= 0 || raw.papers === 0 || raw.talks === 0) return null;
    return { years, papers: raw.papers, talks: raw.talks };
  } catch {
    return null;
  }
}

export type ArchiveEntry = {
  _id: string;
  title: string;
  slug: string;
  kind: "project" | "paper" | "talk";
  date: string;
  headlineResult: string;
};

/** Every work, newest first. Sparse-safe: [] on failure, never placeholders. */
export async function getArchiveEntries(): Promise<ArchiveEntry[]> {
  try {
    return (await sanityClient.fetch(ARCHIVE_QUERY, {}, fetchOptions)) ?? [];
  } catch {
    return [];
  }
}

export type CaseDetail = {
  _id: string;
  title: string;
  slug: string;
  kind: "project" | "paper" | "talk";
  date: string;
  headlineResult: string;
  context: PortableTextBlock[] | null;
  approach: PortableTextBlock[] | null;
  results: PortableTextBlock[] | null;
  artifacts: { label: string; url: string }[] | null;
  related: ArchiveEntry[] | null;
};

/** Null = unknown slug (or CMS unreachable) → the route 404s honestly. */
export async function getCase(slug: string): Promise<CaseDetail | null> {
  try {
    return await sanityClient.fetch(CASE_QUERY, { slug }, fetchOptions);
  } catch {
    return null;
  }
}

export async function getWorkSlugs(): Promise<{ slug: string; date: string }[]> {
  try {
    return (await sanityClient.fetch(WORK_SLUGS_QUERY, {}, fetchOptions)) ?? [];
  } catch {
    return [];
  }
}

/** Sparse-safe: renders what exists, never placeholders. */
export async function getSelectedWorks(): Promise<SelectedWork[]> {
  try {
    return (
      (await sanityClient.fetch(SELECTED_WORKS_QUERY, {}, fetchOptions)) ?? []
    );
  } catch {
    return [];
  }
}
