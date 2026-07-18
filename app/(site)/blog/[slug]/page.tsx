import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@/components/portable-text";
import { SmartImage } from "@/components/smart-image";
import { JsonLd } from "@/components/json-ld";
import { getPost, getPostSlugs } from "@/sanity/lib/queries";
import { readingTime } from "@/lib/reading-time";
import { formatFullDate } from "@/lib/utils";
import { siteName } from "@/lib/site";
import { blogPostingLd, breadcrumbLd } from "@/lib/seo";
import { resolveImageUrl } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  const cover = resolveImageUrl(post.coverImage, { width: 1200, height: 630 });
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: siteName }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: [siteName],
      ...(post.tags?.length ? { tags: post.tags } : {}),
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const minutes = readingTime(post.body);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <JsonLd data={blogPostingLd(post)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <Link
        href="/blog"
        className="eyebrow inline-flex items-center gap-1.5 hover:text-indigo"
      >
        ← All posts
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-slate">
        <time className="tnum" dateTime={post.publishedAt}>
          {formatFullDate(post.publishedAt)}
        </time>
        <span aria-hidden>·</span>
        <span className="tnum">{minutes} min read</span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate">{post.excerpt}</p>

      {post.coverImage && (
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-lg border border-line bg-wash">
          <SmartImage
            image={post.coverImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10">
        <RichText value={post.body} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <p className="eyebrow mb-4">Related</p>
          <ul className="space-y-4">
            {post.relatedPosts.map((rp) => (
              <li key={rp.slug}>
                <Link
                  href={`/blog/${rp.slug}`}
                  className="group block"
                >
                  <h3 className="font-display text-lg text-ink transition-colors group-hover:text-indigo">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-slate">{rp.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
