import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { CountUp } from "@/components/count-up";
import { HighlightCard } from "@/components/highlight-card";
import { PortraitRing } from "@/components/portrait-ring";
import { Marquee } from "@/components/marquee";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { HeroReveal } from "@/components/hero-reveal";
import { JsonLd } from "@/components/json-ld";
import { imageAlt } from "@/sanity/lib/image";
import {
  getAuthor,
  getFeaturedHighlights,
  getSiteSettings,
  getStats,
} from "@/sanity/lib/queries";
import { personId } from "@/lib/seo";

export default async function HomePage() {
  const [settings, author, stats, highlights] = await Promise.all([
    getSiteSettings(),
    getAuthor(),
    getStats(),
    getFeaturedHighlights(3),
  ]);

  const portrait = settings.profileImage ?? author.photo;
  const greeting = settings.heroGreeting || "Hello, I'm";
  const marqueeItems = settings.marqueeItems?.length
    ? settings.marqueeItems
    : ["Rohan Yashraj Gupta", "Actuary", "Researcher", "Educator", "Portfolio", "2026"];

  // The home page IS the profile page; its main entity is the sitewide Person
  // node (emitted once in the site layout), referenced here by @id.
  const profilePageLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.name} — Actuary, Researcher, Educator`,
    mainEntity: { "@id": personId },
  };

  return (
    <>
      <JsonLd data={profilePageLd} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col overflow-hidden lg:min-h-[calc(100vh-4.5rem)]">
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-0">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {/* left */}
            <HeroReveal>
              <p className="font-display text-2xl font-medium text-muted sm:text-3xl">
                {greeting}
              </p>
              <h1 className="mt-1 font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-indigo sm:text-6xl xl:text-7xl">
                {author.name}
              </h1>
              {(author.credentials || author.roleTitle) && (
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-base uppercase tracking-[0.12em]">
                  {author.credentials && (
                    <span className="text-indigo">{author.credentials}</span>
                  )}
                  {author.credentials && author.roleTitle && (
                    <span
                      aria-hidden
                      className="hidden h-4 w-px bg-outline sm:inline-block"
                    />
                  )}
                  {author.roleTitle && (
                    <span className="text-ink">{author.roleTitle}</span>
                  )}
                </p>
              )}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                {settings.heroStatement}
              </p>

              {/* CTAs + social */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <TrackedLink
                  href="/contact"
                  eventName="primary_cta_clicked"
                  eventProperties={{ placement: "homepage_hero" }}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
                >
                  {settings.primaryCtaLabel}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </TrackedLink>
                <TrackedLink
                  href="/resume"
                  eventName="resume_cta_clicked"
                  eventProperties={{ placement: "homepage_hero" }}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-indigo hover:text-indigo"
                >
                  {settings.secondaryCtaLabel}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </TrackedLink>
                <SocialLinks links={settings.socialLinks} className="ml-1" />
              </div>

              {/* stats — inline, in the left column */}
              <dl className="mt-9 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat._id} className="flex items-start gap-2.5">
                    <dd className="font-display text-3xl font-black leading-none text-indigo sm:text-4xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="text-xs leading-tight text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </HeroReveal>

            {/* right */}
            <div className="flex w-full justify-center lg:justify-end">
              <PortraitRing image={portrait} alt={imageAlt(portrait, author.name)} />
            </div>
          </div>
          </div>
        </div>
        <Marquee items={marqueeItems} className="border-y-[1.5px] border-outline" />
      </section>

      {/* ── Recent highlights ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Recent</p>
            <h2 className="section-heading text-5xl sm:text-6xl">
              Highlights <span className="sparkle align-middle text-2xl">✦</span>
            </h2>
          </div>
          <Link
            href="/highlights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo transition-colors hover:text-indigo-ink"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, i) => (
            <Reveal key={highlight._id} delay={i * 0.06} className="h-full">
              <HighlightCard highlight={highlight} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
