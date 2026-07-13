"use client";

import { useEffect, useState } from "react";
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

type Props = {
  entries: ArchiveEntry[];
};

/**
 * The index drawer: FilterBar + year-subdivided compact rows. Entries are
 * server-rendered in full (SSG carries one HTML for every query string);
 * filtering — including the ?type= deep link — is a hydration enhancement.
 */
export function ArchiveList({ entries }: Props) {
  const [active, setActive] = useState<WorkKind | null>(null);

  const counts: Record<WorkKind, number> = { project: 0, paper: 0, talk: 0 };
  for (const entry of entries) counts[entry.kind] += 1;

  useEffect(() => {
    const type = parseType(
      new URLSearchParams(window.location.search).get("type")
    );
    /* A deep link to an empty kind falls back to All — same "no empty
       room" rule the disabled chips enforce. */
    if (type && counts[type] > 0) setActive(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only deep-link read
  }, []);

  const select = (kind: WorkKind | null) => {
    setActive(kind);
    const url = new URL(window.location.href);
    if (kind) url.searchParams.set("type", kind);
    else url.searchParams.delete("type");
    window.history.replaceState(null, "", url);
  };

  const visible = active
    ? entries.filter((entry) => entry.kind === active)
    : entries;

  let lastYear: string | null = null;

  return (
    <>
      <div className={styles.filter}>
        <FilterBar counts={counts} active={active} onChange={select} />
      </div>
      <ul className={styles.list}>
        {visible.map((entry) => {
          const year = entry.date.slice(0, 4);
          const newYear = year !== lastYear;
          lastYear = year;
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
