import type { PortableTextBlock } from "@portabletext/react";

/** Estimate reading time (minutes) from Portable Text blocks. */
export function readingTime(blocks: PortableTextBlock[] | undefined): number {
  if (!blocks?.length) return 1;
  let words = 0;
  for (const block of blocks) {
    if (block._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children as { text?: string }[]) {
        if (typeof child.text === "string") {
          words += child.text.trim().split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  return Math.max(1, Math.round(words / 200));
}
