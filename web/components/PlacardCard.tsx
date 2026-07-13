"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ArchiveEntry, SelectedWork } from "../lib/content";
import styles from "./PlacardCard.module.css";

const kindLabels = { project: "Project", paper: "Paper", talk: "Talk" } as const;

type Props = {
  work: SelectedWork | ArchiveEntry;
  featured?: boolean;
  /* Archive index-drawer row (spec 2.1): metadata leads (currency signal
     first), no visual, no caption animation — density over theatre. */
  compact?: boolean;
};

/**
 * Exhibit placard: title, year-first metadata, one-line result. Text is
 * server-rendered (the 15-second proof cannot wait for hydration); the
 * caption type-in is a one-shot enhancement, static under reduced motion.
 */
export function PlacardCard({ work, featured = false, compact = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  /* Reduced-motion needs no branch here: the "pending" clip-path only
     applies under prefers-reduced-motion: no-preference (see module CSS). */
  const [animate, setAnimate] = useState<"pending" | "play">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el || compact) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setAnimate("play");
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [compact]);

  const year = work.date.slice(0, 4);

  if (compact) {
    return (
      <Link href={`/archive/${work.slug}`} className={styles.compact}>
        <p className={styles.metadata}>
          {year} · {kindLabels[work.kind]}
        </p>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.result}>{work.headlineResult}</p>
      </Link>
    );
  }

  return (
    <Link
      ref={ref}
      href={`/archive/${work.slug}`}
      className={`${styles.placard} ${featured ? styles.featured : ""}`}
      data-animate={animate}
    >
      {"visual" in work && work.visual ? (
        <div
          className={styles.visual}
          style={{ aspectRatio: work.visual.aspectRatio || 16 / 9 }}
        >
          <Image
            src={work.visual.url}
            alt={work.visual.alt}
            fill
            loading="lazy"
            sizes="(max-width: 767px) 100vw, 640px"
          />
        </div>
      ) : null}
      <h3 className={styles.title}>{work.title}</h3>
      <p className={styles.metadata}>
        {year} · {kindLabels[work.kind]}
      </p>
      <p className={styles.result}>{work.headlineResult}</p>
    </Link>
  );
}
