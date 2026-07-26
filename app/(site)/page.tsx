import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { CountUp } from "@/components/count-up";
import { PortraitRing } from "@/components/portrait-ring";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { HeroReveal } from "@/components/hero-reveal";
import { JsonLd } from "@/components/json-ld";
import { imageAlt } from "@/sanity/lib/image";
import { categoryLabel, formatMonthYear } from "@/lib/utils";
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

  // The home page IS the profile page; its main entity is the sitewide Person
  // node (emitted once in the site layout), referenced here by @id.
  const profilePageLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.name}, Actuary, Researcher, Educator`,
    mainEntity: { "@id": personId },
  };

  return (
    <>
      <JsonLd data={profilePageLd} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 lg:min-h-[calc(100vh-4.5rem)] lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* left */}
          <HeroReveal>
            <p className="text-lg font-medium text-muted sm:text-xl">{greeting}</p>
            <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl xl:text-7xl">
              {author.name}
            </h1>
            {(author.credentials || author.roleTitle) && (
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                {author.credentials && (
                  <span className="font-medium text-ink">{author.credentials}</span>
                )}
                {author.credentials && author.roleTitle && (
                  <span aria-hidden className="hidden h-3.5 w-px bg-line sm:inline-block" />
                )}
                {author.roleTitle && <span>{author.roleTitle}</span>}
              </p>
            )}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {settings.heroStatement}
            </p>

            {/* CTAs + social */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <TrackedLink
                href="/contact"
                eventName="primary_cta_clicked"
                eventProperties={{ placement: "homepage_hero" }}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
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
            <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat._id} className="flex items-start gap-2.5">
                  <dd className="font-display text-3xl font-semibold leading-none text-ink sm:text-4xl">
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
      </section>

      {/* ── Recent highlights ────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="section-heading text-4xl sm:text-5xl">Highlights</h2>
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

          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              {highlights.map((highlight) => (
                <li key={highlight._id}>
                  <TrackedLink
                    href={`/highlights/${highlight.slug}`}
                    eventName="highlight_opened"
                    eventProperties={{ highlight_category: highlight.category }}
                    className="group flex items-baseline gap-4 py-5 sm:gap-8"
                  >
                    <span className="hidden shrink-0 basis-40 text-sm text-muted sm:block">
                      {categoryLabel(highlight.category)}
                    </span>
                    <span className="flex-1 font-display text-lg font-medium text-ink transition-colors group-hover:text-indigo sm:text-xl">
                      {highlight.title}
                    </span>
                    <time
                      className="tnum hidden shrink-0 text-sm text-muted sm:block"
                      dateTime={highlight.date}
                    >
                      {formatMonthYear(highlight.date)}
                    </time>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 self-center text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-indigo"
                    >
                      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
