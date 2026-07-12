"use client";

import { useEffect, useState } from "react";
import styles from "./DocentLauncher.module.css";

type Props = {
  /** Contextual suggested tap for this room (from docentSettings, AD-9) */
  suggestion: string | null;
};

/**
 * Renders nothing until a successful /health probe (AD-2): the page is fully
 * excellent with the agent off. Probe result is cached per session; one
 * retry after 5s on failure. Chip appears after 3s, dismissible per visit,
 * never re-interrupts. Panel opening lands with the DocentPanel unit (3.2).
 */
export function DocentLauncher({ suggestion }: Props) {
  const [healthy, setHealthy] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const probe = async (): Promise<boolean> => {
      try {
        const res = await fetch("/api/docent/health");
        const data = (await res.json()) as { ok: boolean };
        return data.ok;
      } catch {
        return false;
      }
    };

    const run = async () => {
      try {
        if (sessionStorage.getItem("docent-health") === "ok") {
          setHealthy(true);
          return;
        }
        if (sessionStorage.getItem("docent-health") === "down") return;
      } catch {}

      let ok = await probe();
      if (!ok && !cancelled) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (cancelled) return;
        ok = await probe();
      }
      if (cancelled) return;
      try {
        sessionStorage.setItem("docent-health", ok ? "ok" : "down");
      } catch {}
      setHealthy(ok);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!healthy || !suggestion) return;
    try {
      if (sessionStorage.getItem("docent-chip-dismissed") === "1") return;
    } catch {}
    const timer = setTimeout(() => setChipVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [healthy, suggestion]);

  if (!healthy) return null;

  const dismissChip = () => {
    setChipVisible(false);
    try {
      sessionStorage.setItem("docent-chip-dismissed", "1");
    } catch {}
  };

  return (
    <div className={styles.launcher}>
      {chipVisible ? (
        <span className={styles.chip}>
          <button type="button" className={styles.chipAsk}>
            {suggestion}
          </button>
          <button
            type="button"
            className={styles.chipDismiss}
            aria-label="Dismiss suggestion"
            onClick={dismissChip}
          >
            ✕
          </button>
        </span>
      ) : null}
      <button type="button" className={styles.button} aria-label="Ask the docent">
        ✳
      </button>
    </div>
  );
}
