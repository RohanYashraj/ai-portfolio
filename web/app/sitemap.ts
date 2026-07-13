import type { MetadataRoute } from "next";
import { getWorkSlugs } from "../lib/content";
import { siteUrl } from "../lib/site";

/* Built rooms only — routes join the sitemap as their units ship. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorkSlugs();
  return [
    { url: new URL("/", siteUrl).href, changeFrequency: "monthly", priority: 1 },
    {
      url: new URL("/archive", siteUrl).href,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    /* Case pages are citation targets (spec 2.2) */
    ...works.map(({ slug, date }) => ({
      url: new URL(`/archive/${slug}`, siteUrl).href,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
