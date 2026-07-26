import Link from "next/link";
import { BackToTop } from "./back-to-top";
import type { SiteSettings } from "@/sanity/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="tnum">
          © {year} {settings.siteTitle}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/studio" className="transition-colors hover:text-indigo">
            Studio ↗
          </Link>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
