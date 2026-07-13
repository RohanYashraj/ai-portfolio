"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import styles from "./CaseBreadcrumb.module.css";

/* The archive stores its current ?type= in sessionStorage (soft navigations
   carry no referrer). Stable within a page view, so the no-op subscribe is
   correct; the server snapshot keeps SSR at the plain /archive href. */
const subscribe = () => () => {};

function useArchiveSearch(): string {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return sessionStorage.getItem("archive-search") ?? "";
      } catch {
        return "";
      }
    },
    () => ""
  );
}

/**
 * "← The Archive" — returns Rahul to the archive with his filter intact;
 * direct/external arrivals get the unfiltered room.
 */
export function CaseBreadcrumb() {
  const search = useArchiveSearch();

  return (
    <Link href={`/archive${search}`} className={styles.breadcrumb}>
      ← The Archive
    </Link>
  );
}
