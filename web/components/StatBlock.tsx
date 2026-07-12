"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./StatBlock.module.css";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  href?: string;
};

const DURATION_MS = 900;

/**
 * Count-up number + label. The final value is server-rendered so the proof
 * never waits for JS; the count-up is progressive enhancement, one-shot on
 * first view, static under prefers-reduced-motion.
 */
export function StatBlock({ value, suffix = "", label, href }: Props) {
  const numberRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(value * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  const body = (
    <>
      <b ref={numberRef} className={styles.number}>
        {value}
        {suffix}
      </b>
      <span className={styles.label}>{label}</span>
    </>
  );

  return href ? (
    <Link href={href} className={styles.stat}>
      {body}
    </Link>
  ) : (
    <div className={styles.stat}>{body}</div>
  );
}
