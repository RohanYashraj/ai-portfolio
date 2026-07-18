"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ORDER = ["system", "light", "dark"] as const;
type Mode = (typeof ORDER)[number];

function Icon({ mode }: { mode: Mode }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none" } as const;
  if (mode === "light") {
    return (
      <svg {...common} aria-hidden>
        <path
          d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg {...common} aria-hidden>
        <path
          d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // system
  return (
    <svg {...common} aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Before mount, assume the default (system) so server and client agree.
  const current: Mode = mounted && ORDER.includes(theme as Mode)
    ? (theme as Mode)
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      type="button"
      aria-label={`Theme: ${current}. Switch to ${next} mode`}
      title={`Theme: ${current}`}
      onClick={() => setTheme(next)}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-wash"
    >
      <Icon mode={current} />
    </button>
  );
}
