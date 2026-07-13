"use client";

import styles from "./FilterBar.module.css";

export type WorkKind = "project" | "paper" | "talk";

const chips: { kind: WorkKind | null; label: string }[] = [
  { kind: null, label: "All" },
  { kind: "project", label: "Projects" },
  { kind: "paper", label: "Papers" },
  { kind: "talk", label: "Talks" },
];

const countNouns: Record<WorkKind, [string, string]> = {
  project: ["project", "projects"],
  paper: ["paper", "papers"],
  talk: ["talk", "talks"],
};

type Props = {
  counts: Record<WorkKind, number>;
  active: WorkKind | null;
  onChange: (kind: WorkKind | null) => void;
};

/**
 * One-gesture narrowing, zero learning curve (spec 2.1). A kind with zero
 * entries is disabled up-front — an empty result screen is unreachable.
 */
export function FilterBar({ counts, active, onChange }: Props) {
  const activeCount = active ? counts[active] : null;

  return (
    <div className={styles.bar} role="group" aria-label="Filter by type">
      {chips.map(({ kind, label }) => {
        const disabled = kind !== null && counts[kind] === 0;
        return (
          <button
            key={label}
            type="button"
            className={styles.chip}
            aria-pressed={active === kind}
            disabled={disabled}
            onClick={() => onChange(kind)}
          >
            {label}
          </button>
        );
      })}
      {active && activeCount !== null ? (
        <span className={styles.count} aria-live="polite">
          {activeCount} {countNouns[active][activeCount === 1 ? 0 : 1]}
        </span>
      ) : null}
    </div>
  );
}
