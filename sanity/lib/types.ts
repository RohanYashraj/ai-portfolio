import type { PortableTextBlock } from "@portabletext/react";

// Image can be a real Sanity image object or a local fallback ({ src, alt }).
export type ContentImage =
  | { src: string; alt?: string }
  | ({ asset?: unknown; alt?: string } & Record<string, unknown>);

export type LinkItem = { label: string; url: string };

export type SocialLink = {
  platform: "linkedin" | "email" | "scholar" | "sssia" | "other";
  url: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ContentImage;
};

export type SiteSettings = {
  siteTitle: string;
  tagline?: string;
  heroEyebrow?: string;
  heroGreeting?: string;
  heroStatement: string;
  profileImage?: ContentImage;
  marqueeItems?: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  resumePdfUrl?: string | null;
  navLinks: LinkItem[];
  socialLinks: SocialLink[];
  footerNote?: string;
  seo?: Seo;
};

export type Author = {
  name: string;
  credentials?: string;
  roleTitle?: string;
  bio?: PortableTextBlock[];
  photo?: ContentImage;
  email?: string;
  sameAs?: string[];
};

export type Stat = {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  order: number;
};

export type HighlightCategory =
  | "book"
  | "conference"
  | "teaching"
  | "research"
  | "client";

export type Highlight = {
  _id: string;
  title: string;
  slug: string;
  category: HighlightCategory;
  date: string;
  summary: string;
  coverImage?: ContentImage;
  body?: PortableTextBlock[];
  gallery?: ContentImage[];
  links?: LinkItem[];
  featured?: boolean;
  seo?: Seo;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: ContentImage;
  publishedAt: string;
  tags?: string[];
  body: PortableTextBlock[];
  relatedPosts?: Pick<Post, "title" | "slug" | "excerpt" | "publishedAt">[];
  seo?: Seo;
};

export type Education = {
  _id: string;
  institution: string;
  qualification: string;
  field?: string;
  start?: string;
  end?: string;
  note?: string;
  order: number;
};

export type Experience = {
  _id: string;
  org: string;
  role: string;
  location?: string;
  start?: string;
  end?: string;
  current?: boolean;
  bullets?: string[];
  order: number;
};

export type Milestone = {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  order: number;
};

export type SkillGroup = {
  _id: string;
  groupName: string;
  skills: string[];
  order: number;
};

export type Credential = {
  _id: string;
  name: string;
  issuer?: string;
  year?: string;
  order: number;
};

export type Publication = {
  _id: string;
  title: string;
  venue?: string;
  year?: string;
  type: "paper" | "chapter" | "presentation";
  url?: string;
  order: number;
};

export type ResumeData = {
  education: Education[];
  experience: Experience[];
  milestones: Milestone[];
  skillGroups: SkillGroup[];
  credentials: Credential[];
  publications: Publication[];
};
