"use client";

import { useMemo, useState } from "react";
import { HighlightCard } from "./highlight-card";
import { Reveal } from "./reveal";
import { categoryLabel, cx } from "@/lib/utils";
import type { Highlight } from "@/sanity/lib/types";

export function HighlightsGrid({ highlights }: { highlights: Highlight[] }) {
  const categories = useMemo(() => {
    const set = new Set(highlights.map((h) => h.category));
    return ["all", ...Array.from(set)];
  }, [highlights]);

  const [active, setActive] = useState("all");
  const filtered =
    active === "all"
      ? highlights
      : highlights.filter((h) => h.category === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cx(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
              active === cat
                ? "border-indigo bg-indigo text-paper"
                : "border-line text-slate hover:text-ink",
            )}
          >
            {cat === "all" ? "All" : categoryLabel(cat)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((highlight, i) => (
          <Reveal key={highlight._id} delay={i * 0.05} className="h-full">
            <HighlightCard highlight={highlight} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-slate">
          Nothing here yet in this category.
        </p>
      )}
    </>
  );
}
