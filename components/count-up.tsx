"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = { value: number; suffix?: string; durationMs?: number };

/** Count up to `value` once in view. Reduced-motion shows the final value. */
export function CountUp({ value, suffix = "", durationMs = 1100 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, durationMs]);

  return (
    <span ref={ref} className="tnum">
      {display}
      {suffix}
    </span>
  );
}
