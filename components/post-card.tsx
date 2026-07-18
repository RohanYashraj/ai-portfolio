import Link from "next/link";
import { formatMonthYear } from "@/lib/utils";
import type { Post } from "@/sanity/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-t border-line py-8 transition-colors first:border-t-0 hover:bg-wash/40"
    >
      <div className="grid gap-3 md:grid-cols-[140px_1fr]">
        <time
          className="font-mono text-xs text-slate tnum md:pt-1"
          dateTime={post.publishedAt}
        >
          {formatMonthYear(post.publishedAt)}
        </time>
        <div>
          <h2 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-indigo">
            {post.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[0.68rem] uppercase tracking-wider text-slate"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
}
