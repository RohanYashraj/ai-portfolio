import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import {
  getCase,
  getSiteSettings,
  getWorkSlugs,
  type CaseDetail,
} from "../../../lib/content";
import { sanityClient } from "../../../lib/sanity";
import { DOCENT_SETTINGS_QUERY } from "../../../../studio/lib/queries";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { CaseBreadcrumb } from "../../../components/CaseBreadcrumb";
import { PlacardCard } from "../../../components/PlacardCard";
import { DocentLauncher } from "../../../components/DocentLauncher";
import styles from "./page.module.css";

const kindLabels = { project: "Project", paper: "Paper", talk: "Talk" } as const;

/* One layout, three types — the type only changes vocabulary and schema.org
   shape, never the skeleton (spec 2.2). */
const jsonLdTypes = {
  project: "CreativeWork",
  paper: "ScholarlyArticle",
  talk: "PresentationDigitalDocument",
} as const;

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [work, settings] = await Promise.all([getCase(slug), getSiteSettings()]);
  if (!work) return {};
  const title = `${work.title} — ${settings?.heroName ?? "Rohan Gupta"}`;
  return {
    title,
    description: work.headlineResult,
    alternates: { canonical: `/archive/${work.slug}` },
    openGraph: {
      title,
      description: work.headlineResult,
      url: `/archive/${work.slug}`,
      siteName: settings?.siteName,
      type: "article",
    },
  };
}

async function getDocentSuggestion(): Promise<string | null> {
  try {
    const docent = await sanityClient.fetch<{
      suggestedTaps?: { case?: string };
    } | null>(DOCENT_SETTINGS_QUERY, {}, { next: { revalidate: 3600, tags: ["content"] } });
    return docent?.suggestedTaps?.case ?? null;
  } catch {
    return null;
  }
}

/* Body rich text: images arrive with GROQ-dereferenced URLs; lazy always. */
const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.url ? (
        // eslint-disable-next-line @next/next/no-img-element -- CMS asset with unknown dimensions; aspect-ratio box + lazy covers CLS
        <img
          src={value.url}
          alt={value.alt ?? ""}
          loading="lazy"
          className={styles.bodyImage}
          style={{ aspectRatio: value.aspectRatio || undefined }}
        />
      ) : null,
  },
};

function BodySection({
  heading,
  blocks,
}: {
  heading: string;
  blocks: CaseDetail["context"];
}) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <section className={styles.bodySection}>
      <h2 className={styles.bodyHeading}>{heading}</h2>
      <div className={styles.bodyText}>
        <PortableText value={blocks} components={portableComponents} />
      </div>
    </section>
  );
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [work, settings, docentSuggestion] = await Promise.all([
    getCase(slug),
    getSiteSettings(),
    getDocentSuggestion(),
  ]);

  if (!work || !settings) notFound();

  const year = work.date.slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": jsonLdTypes[work.kind],
    name: work.title,
    headline: work.title,
    description: work.headlineResult,
    datePublished: work.date,
    author: { "@type": "Person", name: settings.heroName },
  };

  return (
    <>
      <SiteHeader siteName={settings.siteName} />
      <main className={styles.page}>
        {/* CASE HEADER — repay the tap instantly: what, when, the result */}
        <header className={styles.caseHeader}>
          <CaseBreadcrumb />
          <p className={styles.metadata}>
            {year} · {kindLabels[work.kind]}
          </p>
          <h1 className={styles.title}>{work.title}</h1>
          <p className={styles.result}>{work.headlineResult}</p>
        </header>

        {/* ARTIFACTS — verifiability beats adjectives; omitted when none */}
        {work.artifacts && work.artifacts.length > 0 ? (
          <ul className={styles.artifacts}>
            {work.artifacts.map((artifact) => (
              <li key={artifact.url}>
                <a
                  className={styles.artifactChip}
                  href={artifact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artifact.label} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {/* THE PLACARD — empty sections omitted cleanly (Minimal state) */}
        <BodySection heading="Context" blocks={work.context} />
        <BodySection heading="Approach" blocks={work.approach} />
        <BodySection heading="Results" blocks={work.results} />

        {/* RELATED — keep the trail warm */}
        {work.related && work.related.length > 0 ? (
          <section className={styles.related}>
            <h2 className={styles.bodyHeading}>Related</h2>
            <ul className={styles.relatedList}>
              {work.related.map((entry) => (
                <li key={entry._id} className={styles.relatedRow}>
                  <PlacardCard work={entry} compact />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <SiteFooter
        siteName={settings.siteName}
        contactEmail={settings.contactEmail}
        socialLinks={settings.socialLinks}
      />
      <DocentLauncher suggestion={docentSuggestion} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
