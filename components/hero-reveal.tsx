"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Orchestrated hero entrance: fades + rises each direct child in sequence on
// load. Robust by design — a setTimeout failsafe (independent of the animation
// frame loop) always lands the content in its final visible state, so the
// above-the-fold hero can never get stuck hidden if the ticker is interrupted.
export function HeroReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.children);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 },
      );
    },
    { scope: ref },
  );

  // Failsafe: guarantee visible final state even if the animation is interrupted.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      gsap.set(Array.from(el.children), { autoAlpha: 1, y: 0 });
    }, 1600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
