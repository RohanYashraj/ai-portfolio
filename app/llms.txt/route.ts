// /llms.txt — a plain-language, link-first summary of the site for LLMs and
// answer engines (see llmstxt.org). Built from the same CMS content the pages
// render, so it stays factual and in sync.

import {
  getAuthor,
  getHighlights,
  getPosts,
} from "@/sanity/lib/queries";
import { siteName, siteUrl } from "@/lib/site";
import { siteDescription } from "@/lib/seo";

export async function GET() {
  const [author, posts, highlights] = await Promise.all([
    getAuthor(),
    getPosts(),
    getHighlights(),
  ]);

  const lines: string[] = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "## About",
    author.roleTitle ? `- Role: ${author.roleTitle}` : "",
    author.credentials ? `- Credentials: ${author.credentials}` : "",
    "- Focus: actuarial pricing and reserving, insurance fraud detection with machine learning, agentic AI, and actuarial education.",
    "",
    "## Pages",
    `- [Home](${siteUrl}/): Overview, headline stats, and recent highlights.`,
    `- [Highlights](${siteUrl}/highlights): Selected work across research, teaching, publications, and client engagements.`,
    `- [Resume](${siteUrl}/resume): Education, experience, skills, certifications, and publications.`,
    `- [Blog](${siteUrl}/blog): Notes on actuarial science, AI, and teaching.`,
    `- [Contact](${siteUrl}/contact): Enquiries about actuarial work, teaching, speaking, or writing.`,
  ];

  if (posts.length) {
    lines.push("", "## Blog posts");
    for (const post of posts) {
      lines.push(`- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt}`);
    }
  }

  if (highlights.length) {
    lines.push("", "## Highlights");
    for (const hl of highlights) {
      lines.push(`- [${hl.title}](${siteUrl}/highlights/${hl.slug}): ${hl.summary}`);
    }
  }

  if (author.sameAs?.length) {
    lines.push("", "## Elsewhere");
    for (const url of author.sameAs) lines.push(`- ${url}`);
  }

  // Drop empty entries from optional fields, then collapse blank-line runs.
  const body =
    lines.filter((l, i) => l !== "" || lines[i - 1] !== "").join("\n").replace(/\n{3,}/g, "\n\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
