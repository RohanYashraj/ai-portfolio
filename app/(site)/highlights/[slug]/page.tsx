import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@/components/portable-text";
import { SmartImage } from "@/components/smart-image";
import { JsonLd } from "@/components/json-ld";
import { getHighlight, getHighlightSlugs } from "@/sanity/lib/queries";
import { categoryLabel, formatFullDate } from "@/lib/utils";
import { breadcrumbLd, highlightLd } from "@/lib/seo";
import { resolveImageUrl } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getHighlightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const highlight = await getHighlight(slug);
  if (!highlight) return { title: "Not found" };
  const cover = resolveImageUrl(highlight.coverImage, { width: 1200, height: 630 });
  return {
    title: highlight.seo?.metaTitle ?? highlight.title,
    description: highlight.seo?.metaDescription ?? highlight.summary,
    alternates: { canonical: `/highlights/${slug}` },
    openGraph: {
      title: highlight.title,
      description: highlight.summary,
      type: "article",
      url: `/highlights/${slug}`,
      publishedTime: highlight.date,
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: {
      title: highlight.title,
      description: highlight.summary,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function HighlightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const highlight = await getHighlight(slug);
  if (!highlight) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <JsonLd data={highlightLd(highlight)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Highlights", path: "/highlights" },
          { name: highlight.title, path: `/highlights/${highlight.slug}` },
        ])}
      />

      <Link
        href="/highlights"
        className="eyebrow inline-flex items-center gap-1.5 hover:text-indigo"
      >
        ← All highlights
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-wash px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-indigo">
          {categoryLabel(highlight.category)}
        </span>
        <time className="font-mono text-xs text-slate tnum" dateTime={highlight.date}>
          {formatFullDate(highlight.date)}
        </time>
      </div>

      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
        {highlight.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate">{highlight.summary}</p>

      {highlight.coverImage && (
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-lg border border-line bg-wash">
          <SmartImage
            image={highlight.coverImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10">
        <RichText value={highlight.body} />
      </div>

      {highlight.gallery && highlight.gallery.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {highlight.gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line bg-wash"
            >
              <SmartImage
                image={img}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {highlight.links && highlight.links.length > 0 && (
        <div className="mt-10 border-t border-line pt-6">
          <p className="eyebrow mb-3">Links</p>
          <ul className="space-y-2">
            {highlight.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo underline decoration-line underline-offset-4 hover:decoration-indigo"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
