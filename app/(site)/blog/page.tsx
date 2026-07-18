import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on actuarial science, AI, and teaching.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Blog · Dr Rohan Yashraj Gupta",
    description: "Notes on actuarial science, AI, and teaching.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        intro="Notes on actuarial science, machine learning, and teaching."
      />
      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
