import Link from "next/link";
import { SmartImage } from "./smart-image";
import { categoryLabel, formatMonthYear } from "@/lib/utils";
import type { Highlight } from "@/sanity/lib/types";

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <Link
      href={`/highlights/${highlight.slug}`}
      className="card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo/40"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b-[1.5px] border-outline bg-indigo-soft">
        {/* Graceful placeholder shown until a cover image is uploaded. */}
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center font-display text-4xl font-bold text-indigo/25"
        >
          {categoryLabel(highlight.category)}
        </div>
        <SmartImage
          image={highlight.coverImage}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-wash px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-indigo">
            {categoryLabel(highlight.category)}
          </span>
          <time className="font-mono text-xs text-slate tnum" dateTime={highlight.date}>
            {formatMonthYear(highlight.date)}
          </time>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {highlight.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          {highlight.summary}
        </p>
      </div>
    </Link>
  );
}
