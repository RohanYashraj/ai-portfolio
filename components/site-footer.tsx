import Link from "next/link";
import { BackToTop } from "./back-to-top";
import { Marquee } from "./marquee";
import type { SiteSettings } from "@/sanity/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  // Short display name for the oversized wordmark (e.g. "Rohan Gupta").
  const parts = settings.siteTitle
    .replace(/^(dr\.?|prof\.?|mr\.?|ms\.?|mrs\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  const shortName =
    parts.length > 1
      ? `${parts[0]} ${parts[parts.length - 1]}`
      : parts[0] ?? settings.siteTitle;

  const marqueeItems = settings.marqueeItems?.length
    ? settings.marqueeItems
    : ["Portfolio", "2026", settings.siteTitle, "Get in touch"];

  return (
    <footer className="mt-24">
      <Marquee items={marqueeItems} className="border-y-[1.5px] border-outline" />

      {/* centered giant outlined name */}
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p
          className="select-none whitespace-nowrap text-center font-display font-black tracking-[-0.03em]"
          style={{
            fontSize: "clamp(2.5rem, 13.2vw, 11.5rem)",
            lineHeight: 1,
            paddingBottom: "0.14em",
            color: "transparent",
            WebkitTextStroke:
              "1.5px color-mix(in srgb, var(--ink) 30%, transparent)",
          }}
          aria-hidden
        >
          {shortName}
        </p>
      </div>

      {/* full-bleed baseline line spanning the whole window */}
      <div className="border-t-[1.5px] border-outline">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 text-xs text-muted sm:px-8">
          <p className="tnum">
            © {year} {settings.siteTitle}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/studio" className="hover:text-indigo">
              Studio ↗
            </Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
