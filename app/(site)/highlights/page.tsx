import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { HighlightsGrid } from "@/components/highlights-grid";
import { getHighlights } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Highlights",
  description:
    "Selected work across research, teaching, publications, and client engagements.",
  alternates: { canonical: "/highlights" },
  openGraph: {
    title: "Highlights · Dr Rohan Yashraj Gupta",
    description:
      "Selected work across research, teaching, publications, and client engagements.",
    url: "/highlights",
    type: "website",
  },
};

export default async function HighlightsPage() {
  const highlights = await getHighlights();
  return (
    <>
      <PageHeader
        title="Highlights"
        intro="Research, teaching, publications, and client engagements. Filter by category below."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <HighlightsGrid highlights={highlights} />
      </section>
    </>
  );
}
