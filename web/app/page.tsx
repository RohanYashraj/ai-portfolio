import type { Metadata } from "next";
import Link from "next/link";
import {
  getSelectedWorks,
  getSiteSettings,
  getStats,
} from "../lib/content";
import { sanityClient } from "../lib/sanity";
import { DOCENT_SETTINGS_QUERY } from "../../studio/lib/queries";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { RoomTitle } from "../components/RoomTitle";
import { StatBlock } from "../components/StatBlock";
import { PlacardCard } from "../components/PlacardCard";
import { DocentLauncher } from "../components/DocentLauncher";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return {};
  const title = `${settings.heroName} — ${settings.heroNiche}`;
  return {
    title,
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description: settings.seoDescription,
      url: "/",
      siteName: settings.siteName,
      type: "profile",
    },
  };
}

async function getDocentSuggestion(): Promise<string | null> {
  try {
    const docent = await sanityClient.fetch<{
      suggestedTaps?: { home?: string };
    } | null>(DOCENT_SETTINGS_QUERY, {}, { next: { revalidate: 3600, tags: ["content"] } });
    return docent?.suggestedTaps?.home ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [settings, stats, works, docentSuggestion] = await Promise.all([
    getSiteSettings(),
    getStats(),
    getSelectedWorks(),
    getDocentSuggestion(),
  ]);

  /* AD-1: every visitor-readable fact resolves from Sanity. Until the
     dataset is seeded there is honestly nothing to show. */
  if (!settings) {
    return (
      <main className={styles.hero}>
        <p>The gallery is being hung. Please check back shortly.</p>
      </main>
    );
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.heroName,
    honorificPrefix: "Dr.",
    jobTitle: settings.heroNiche,
    description: settings.seoDescription,
    email: `mailto:${settings.contactEmail}`,
    sameAs: (settings.socialLinks ?? []).map((link) => link.url),
  };

  return (
    <>
      <SiteHeader siteName={settings.siteName} />
      <main>
        {/* ENTRANCE HERO — the <1s credibility hypothesis: who / what / how much */}
        <section className={styles.hero}>
          <h1>{settings.heroName}</h1>
          <p className={styles.niche}>{settings.heroNiche}</p>
          <p className={styles.anchor}>{settings.heroAnchor}</p>
          {stats ? (
            <div className={styles.stats}>
              <StatBlock
                value={stats.years}
                suffix="+"
                label="years in actuarial & AI"
              />
              <StatBlock
                value={stats.papers}
                label="research papers"
                href="/archive?type=paper"
              />
              <StatBlock
                value={stats.talks}
                label="conference talks"
                href="/speaking"
              />
            </div>
          ) : null}
          <a className={styles.cue} href="#selected-works">
            ↓ Enter: Selected Works
          </a>
        </section>

        {/* SELECTED WORKS — the 15-second proof room */}
        <section id="selected-works" className={styles.works}>
          <RoomTitle
            title="Selected Works"
            subtitle="Recent highlights — the work speaks first."
          />
          {works.length > 0 ? (
            <div className={styles.wall}>
              {works.map((work, index) => (
                <PlacardCard key={work._id} work={work} featured={index === 0} />
              ))}
            </div>
          ) : null}
          <div>
            <Link className={styles.archiveCue} href="/archive">
              See everything → The Archive
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter
        siteName={settings.siteName}
        contactEmail={settings.contactEmail}
        socialLinks={settings.socialLinks}
      />
      <DocentLauncher suggestion={docentSuggestion} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
