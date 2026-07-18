"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Props = { value: number; suffix?: string; durationMs?: number };

// Count up to `value` when scrolled into view (GSAP tween). Reduced-motion shows
// the final value immediately.
export function CountUp({ value, suffix = "", durationMs = 1200 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }
      const counter = { v: 0 };
      gsap.to(counter, {
        v: value,
        duration: durationMs / 1000,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => setDisplay(Math.round(counter.v)),
      });
    },
    { scope: ref, dependencies: [value] },
  );

  // Failsafe: always land on the real value even if the tween is interrupted.
  useEffect(() => {
    const t = window.setTimeout(() => setDisplay(value), durationMs + 1200);
    return () => window.clearTimeout(t);
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tnum">
      {display}
      {suffix}
    </span>
  );
}
