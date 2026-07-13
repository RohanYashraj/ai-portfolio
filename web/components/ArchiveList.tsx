"use client";

import { useSyncExternalStore } from "react";
import type { ArchiveEntry } from "../lib/content";
import { FilterBar, type WorkKind } from "./FilterBar";
import { PlacardCard } from "./PlacardCard";
import styles from "./ArchiveList.module.css";

const kinds: readonly WorkKind[] = ["project", "paper", "talk"];

/* Canonical param is the singular kind value (?type=paper — matches the
   schema and Home's stat links); plural spellings are tolerated on read. */
function parseType(raw: string | null): WorkKind | null {
  if (!raw) return null;
  const value = raw.toLowerCase().replace(/s$/, "");
  return (kinds as readonly string[]).includes(value)
    ? (value as WorkKind)
    : null;
}

/* The URL is the single filter store: chips write it (replaceState + a
   popstate ping), back/forward and the ?type= deep link read the same way.
   The server snapshot is null — static HTML always carries the full list;
   the deep link applies at hydration. */
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function useTypeParam(): WorkKind | null {
  return useSyncExternalStore(
    subscribe,
    () => parseType(new URLSearchParams(window.location.search).get("type")),
    () => null
  );
}

function setTypeParam(kind: WorkKind | null) {
  const url = new URL(window.location.href);
  if (kind) url.searchParams.set("type", kind);
  else url.searchParams.delete("type");
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

type Props = {
  entries: ArchiveEntry[];
};

/** The index drawer: FilterBar + year-subdivided compact rows. */
export function ArchiveList({ entries }: Props) {
  const requested = useTypeParam();

  const counts: Record<WorkKind, number> = { project: 0, paper: 0, talk: 0 };
  for (const entry of entries) counts[entry.kind] += 1;

  /* A deep link to an empty kind falls back to All — same "no empty room"
     rule the disabled chips enforce. */
  const active = requested && counts[requested] > 0 ? requested : null;

  const visible = active
    ? entries.filter((entry) => entry.kind === active)
    : entries;

  return (
    <>
      <div className={styles.filter}>
        <FilterBar counts={counts} active={active} onChange={setTypeParam} />
      </div>
      <ul className={styles.list}>
        {visible.map((entry, index) => {
          const year = entry.date.slice(0, 4);
          const newYear =
            index === 0 || visible[index - 1].date.slice(0, 4) !== year;
          return (
            <li key={entry._id} className={styles.row}>
              {newYear ? <p className={styles.year}>{year}</p> : null}
              <PlacardCard work={entry} compact />
            </li>
          );
        })}
      </ul>
    </>
  );
}
