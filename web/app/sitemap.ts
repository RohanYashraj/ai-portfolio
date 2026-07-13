import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

/* Built rooms only — routes join the sitemap as their units ship. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL("/", siteUrl).href, changeFrequency: "monthly", priority: 1 },
    {
      url: new URL("/archive", siteUrl).href,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
