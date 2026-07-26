import { TrackedLink } from "./tracked-link";
import { SmartImage } from "./smart-image";
import { categoryLabel, formatMonthYear } from "@/lib/utils";
import type { Highlight } from "@/sanity/lib/types";

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <TrackedLink
      href={`/highlights/${highlight.slug}`}
      eventName="highlight_opened"
      eventProperties={{ highlight_category: highlight.category }}
      className="card group flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-indigo/40"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b border-line bg-surface-2">
        <SmartImage
          image={highlight.coverImage}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-muted">
            {categoryLabel(highlight.category)}
          </span>
          <time className="tnum text-xs text-muted" dateTime={highlight.date}>
            {formatMonthYear(highlight.date)}
          </time>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {highlight.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {highlight.summary}
        </p>
      </div>
    </TrackedLink>
  );
}
