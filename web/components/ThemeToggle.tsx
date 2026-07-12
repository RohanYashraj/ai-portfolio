"use client";

import { useCallback, useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") ?? "light");
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }, [theme]);

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
