"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cx } from "@/lib/utils";
import type { LinkItem } from "@/sanity/lib/types";

export function SiteHeader({
  siteTitle,
  navLinks,
}: {
  siteTitle: string;
  navLinks: LinkItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  // Wordmark: first word of the site title + an accent dot.
  const mark = siteTitle.split(" ")[0];

  return (
    <header className="sticky top-0 z-40 border-b-[1.5px] border-outline bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          {mark}
          <span className="text-indigo">.</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.url)
                    ? "bg-indigo-soft text-indigo"
                    : "text-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <Link
            href="/contact"
            className="btn-primary hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-bg px-5 py-3 md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              onClick={() => setOpen(false)}
              className={cx(
                "block rounded-lg px-3 py-3 text-sm font-medium",
                isActive(link.url) ? "text-indigo" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
