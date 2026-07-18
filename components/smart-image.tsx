import Image from "next/image";
import { resolveImageUrl, imageAlt } from "@/sanity/lib/image";

type Props = {
  image: unknown;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders either a Sanity image or a local fallback ({ src, alt }) through
 * next/image. Returns null when there is no image so callers can show a
 * placeholder frame.
 */
export function SmartImage({
  image,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
}: Props) {
  const url = resolveImageUrl(image, { width, height });
  if (!url) return null;
  const resolvedAlt = alt ?? imageAlt(image, "");

  if (fill) {
    return (
      <Image
        src={url}
        alt={resolvedAlt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={resolvedAlt}
      width={width ?? 1200}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
