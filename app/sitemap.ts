import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getHighlightSlugs, getPostSlugs } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [highlightSlugs, postSlugs] = await Promise.all([
    getHighlightSlugs(),
    getPostSlugs(),
  ]);

  const staticRoutes = ["", "/highlights", "/resume", "/blog", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const highlightRoutes = highlightSlugs.map((slug) => ({
    url: `${siteUrl}/highlights/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = postSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...highlightRoutes, ...postRoutes];
}
