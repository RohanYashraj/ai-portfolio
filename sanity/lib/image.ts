import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

/** Build a Sanity CDN image URL from an image object. */
export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}

/**
 * Resolve an image reference to a plain URL string.
 * Accepts either a Sanity image object or a local fallback shape ({ src }).
 */
export function resolveImageUrl(
  source: unknown,
  opts?: { width?: number; height?: number },
): string | null {
  if (!source || typeof source !== "object") return null;
  const local = source as { src?: string };
  if (typeof local.src === "string") return local.src;

  const img = source as Image & { asset?: unknown };
  if (!img.asset) return null;
  let b = urlForImage(img);
  if (opts?.width) b = b.width(opts.width);
  if (opts?.height) b = b.height(opts.height);
  return b.url();
}

/** Read the alt text off either shape. */
export function imageAlt(source: unknown, fallback = ""): string {
  if (source && typeof source === "object" && "alt" in source) {
    const alt = (source as { alt?: unknown }).alt;
    if (typeof alt === "string" && alt) return alt;
  }
  return fallback;
}
