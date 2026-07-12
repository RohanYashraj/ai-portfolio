import { sanityClient } from "./sanity";
import {
  STATS_QUERY,
  SELECTED_WORKS_QUERY,
  SITE_SETTINGS_QUERY,
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
