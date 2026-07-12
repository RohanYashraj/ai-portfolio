"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SelectedWork } from "../lib/content";
import styles from "./PlacardCard.module.css";

const kindLabels = { project: "Project", paper: "Paper", talk: "Talk" } as const;

type Props = {
  work: SelectedWork;
  featured?: boolean;
};

/**
 * Exhibit placard: title, year-first metadata, one-line result. Text is
 * server-rendered (the 15-second proof cannot wait for hydration); the
 * caption type-in is a one-shot enhancement, static under reduced motion.
 */
export function PlacardCard({ work, featured = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  /* Reduced-motion needs no branch here: the "pending" clip-path only
     applies under prefers-reduced-motion: no-preference (see module CSS). */
  const [animate, setAnimate] = useState<"pending" | "play">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, []);

  const year = work.date.slice(0, 4);

  return (
    <Link
      ref={ref}
      href={`/archive/${work.slug}`}
      className={`${styles.placard} ${featured ? styles.featured : ""}`}
      data-animate={animate}
    >
      {work.visual ? (
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
