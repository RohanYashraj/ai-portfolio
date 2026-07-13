import type { Metadata } from "next";
import { getArchiveEntries, getSiteSettings } from "../../lib/content";
import { sanityClient } from "../../lib/sanity";
import { DOCENT_SETTINGS_QUERY } from "../../../studio/lib/queries";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { RoomTitle } from "../../components/RoomTitle";
import { ArchiveList } from "../../components/ArchiveList";
import { DocentLauncher } from "../../components/DocentLauncher";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return { title: "The Archive" };
  return {
    title: `The Archive — ${settings.heroName}`,
    description: `Every project, paper, and talk by ${settings.heroName}, dated and filterable.`,
  };
}

async function getDocentSuggestion(): Promise<string | null> {
  try {
    const docent = await sanityClient.fetch<{
      suggestedTaps?: { archive?: string };
    } | null>(DOCENT_SETTINGS_QUERY, {}, { next: { revalidate: 3600, tags: ["content"] } });
    return docent?.suggestedTaps?.archive ?? null;
  } catch {
    return null;
  }
}

/* The ?type= deep link is deliberately NOT read here: the route stays static
   (one HTML for every query string, readable pre-hydration on mid-range
   Android); ArchiveList applies the param on hydration. */
export default async function Archive() {
  const [settings, entries, docentSuggestion] = await Promise.all([
    getSiteSettings(),
    getArchiveEntries(),
    getDocentSuggestion(),
  ]);

  /* AD-1: every visitor-readable fact resolves from Sanity. */
  if (!settings) {
    return (
      <main className={styles.page}>
        <p>The gallery is being hung. Please check back shortly.</p>
      </main>
    );
  }

  return (
    <>
      <SiteHeader siteName={settings.siteName} />
      <main className={styles.page}>
        <RoomTitle
          as="h1"
          title="The Archive"
          subtitle="All of it — filter as you like."
        />
        {entries.length > 0 ? <ArchiveList entries={entries} /> : null}
      </main>
      <SiteFooter
        siteName={settings.siteName}
        contactEmail={settings.contactEmail}
        socialLinks={settings.socialLinks}
      />
      <DocentLauncher suggestion={docentSuggestion} />
    </>
  );
}
