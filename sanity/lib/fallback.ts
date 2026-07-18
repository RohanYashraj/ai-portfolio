// Local seed content — real facts about Dr Rohan Yashraj Gupta plus clearly
// marked [placeholders] for specifics that are unknown. Used to render the site
// before a Sanity project exists, and exported to NDJSON by scripts/seed (see
// scripts/export-seed.ts). Do NOT invent papers, awards, or publications here.

import type { PortableTextBlock } from "@portabletext/react";
import type {
  Author,
  Credential,
  Education,
  Experience,
  Highlight,
  Milestone,
  Post,
  Publication,
  SiteSettings,
  SkillGroup,
  Stat,
} from "./types";

// --- Portable Text helpers ---------------------------------------------------
let keyCounter = 0;
const key = () => `k${(keyCounter += 1)}`;

function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}
function h(text: string, style: "h2" | "h3" = "h2"): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}
function code(codeText: string, language = "python", filename?: string): PortableTextBlock {
  return {
    _type: "code",
    _key: key(),
    language,
    filename,
    code: codeText,
  } as unknown as PortableTextBlock;
}

const img = (src: string, alt: string) => ({ src, alt });

// --- Site settings -----------------------------------------------------------
export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "Rohan Yashraj Gupta",
  tagline: "Actuary · Researcher · Educator",
  heroGreeting: "Hello, I'm",
  heroStatement:
    "I price risk, detect insurance fraud with machine learning, and teach the next generation of actuaries.",
  profileImage: img("/placeholders/profile.svg", "Portrait of Dr Rohan Yashraj Gupta"),
  marqueeItems: [
    "Rohan Yashraj Gupta",
    "Actuary",
    "Researcher",
    "Educator",
    "Portfolio",
    "2026",
  ],
  primaryCtaLabel: "Contact",
  secondaryCtaLabel: "Resume",
  resumePdfUrl: null,
  navLinks: [
    { label: "Highlights", url: "/highlights" },
    { label: "Resume", url: "/resume" },
    { label: "Blog", url: "/blog" },
    { label: "Contact", url: "/contact" },
  ],
  socialLinks: [
    { platform: "linkedin", url: "https://www.linkedin.com/in/rohanyashraj" },
    { platform: "scholar", url: "https://scholar.google.com/" },
    { platform: "sssia", url: "https://www.sssia.org/" },
    { platform: "email", url: "mailto:rohanyashraj@gmail.com" },
  ],
  footerNote: "Built with Next.js and Sanity.",
  seo: {
    metaTitle: "Dr Rohan Yashraj Gupta — Actuary, Researcher, Educator",
    metaDescription:
      "Actuarial Associate Principal at Accenture, Adjunct Professor at SSSIA, and holder of India's first PhD in Actuarial Science.",
  },
};

// --- Author ------------------------------------------------------------------
export const fallbackAuthor: Author = {
  name: "Dr Rohan Yashraj Gupta",
  credentials: "FIA, FIAI",
  roleTitle: "Actuarial Associate Principal, Accenture",
  email: "rohanyashraj@gmail.com",
  photo: img("/placeholders/profile.svg", "Portrait of Dr Rohan Yashraj Gupta"),
  sameAs: [
    "https://www.linkedin.com/in/rohanyashraj",
    "https://scholar.google.com/",
  ],
  bio: [
    p(
      "Rohan is an Actuarial Associate Principal at Accenture and an Adjunct Professor at the Sri Sathya Sai Institute of Actuaries. He holds India's first PhD in Actuarial Science, on fraud detection in insurance.",
    ),
    p(
      "Over 8+ years he has worked across group health, crop insurance, cancer pricing, and pricing-platform engineering. He is co-author of Agentic AI for Actuaries (ACTEX/ArchiMedia, 2026) and has published 9 papers and book chapters.",
    ),
  ],
};

// --- Stats -------------------------------------------------------------------
export const fallbackStats: Stat[] = [
  { _id: "stat-papers", label: "Papers & chapters", value: 9, order: 0 },
  { _id: "stat-years", label: "Years in practice", value: 8, suffix: "+", order: 1 },
  { _id: "stat-workshops", label: "Workshops led", value: 20, order: 2 },
  { _id: "stat-talks", label: "Conference talks", value: 15, order: 3 },
];

// --- Highlights --------------------------------------------------------------
export const fallbackHighlights: Highlight[] = [
  {
    _id: "hl-book",
    title: "Agentic AI for Actuaries",
    slug: "agentic-ai-for-actuaries",
    category: "book",
    date: "2026-01-15",
    summary:
      "Co-authored book on applying agentic AI to actuarial work, published by ACTEX/ArchiMedia.",
    featured: true,
    coverImage: img("/placeholders/cover-book.svg", "Agentic AI for Actuaries book cover"),
    links: [{ label: "Publisher", url: "https://www.actexlearning.com/" }],
    body: [
      p(
        "Agentic AI for Actuaries introduces how autonomous, tool-using AI systems can support pricing, reserving, and reporting workflows.",
      ),
      p(
        "The book pairs practical patterns with worked examples aimed at practising actuaries and students. Full description to follow — [add chapter overview and endorsements].",
      ),
    ],
  },
  {
    _id: "hl-phd",
    title: "India's first PhD in Actuarial Science",
    slug: "first-phd-actuarial-science",
    category: "research",
    date: "2023-06-01",
    summary:
      "Doctoral research on fraud detection in insurance — the first PhD awarded in Actuarial Science in India.",
    featured: true,
    coverImage: img("/placeholders/cover-research.svg", "Research on insurance fraud detection"),
    body: [
      p(
        "The thesis developed machine-learning approaches to detect fraudulent insurance claims, combining actuarial judgement with modern classification methods.",
      ),
      p("Awarding institution and defence date — [add details]."),
    ],
  },
  {
    _id: "hl-teaching",
    title: "Adjunct Professor at SSSIA",
    slug: "adjunct-professor-sssia",
    category: "teaching",
    date: "2024-01-01",
    summary:
      "Teaching actuarial students at the Sri Sathya Sai Institute of Actuaries.",
    featured: true,
    coverImage: img("/placeholders/cover-teaching.svg", "Teaching at SSSIA"),
    body: [p("Courses and modules taught — [add syllabus and cohorts].")],
  },
  {
    _id: "hl-pricing-platform",
    title: "Pricing platform engineering",
    slug: "pricing-platform-engineering",
    category: "client",
    date: "2023-09-01",
    summary:
      "Built and productionised pricing models on a modern actuarial pricing platform (hyperexponential).",
    coverImage: img("/placeholders/cover-client.svg", "Pricing platform engineering"),
    body: [p("Scope, lines of business, and outcomes — [add project detail].")],
  },
  {
    _id: "hl-crop",
    title: "Crop insurance pricing",
    slug: "crop-insurance-pricing",
    category: "client",
    date: "2021-05-01",
    summary: "Pricing and portfolio work across crop insurance schemes.",
    coverImage: img("/placeholders/cover-client.svg", "Crop insurance pricing"),
    body: [p("Programme details and results — [add project detail].")],
  },
  {
    _id: "hl-conference",
    title: "[Conference name] — invited talk",
    slug: "conference-invited-talk",
    category: "conference",
    date: "2024-11-01",
    summary: "[One-line summary of the talk and audience].",
    coverImage: img("/placeholders/cover-conference.svg", "Conference talk"),
    body: [p("[Add talk abstract, slides, and recording link.]")],
  },
];

// --- Blog posts --------------------------------------------------------------
export const fallbackPosts: Post[] = [
  {
    _id: "post-agentic",
    title: "Why actuaries should care about agentic AI",
    slug: "why-actuaries-should-care-about-agentic-ai",
    excerpt:
      "Agentic AI moves models from answering questions to completing tasks. Here is what that shift means for pricing and reserving work.",
    publishedAt: "2026-02-01T09:00:00Z",
    tags: ["AI", "Actuarial", "Pricing"],
    coverImage: img("/placeholders/cover-post.svg", "Agentic AI for actuaries"),
    body: [
      p(
        "A traditional model answers a question you pose. An agent decides which questions to ask, calls tools, and works toward a goal you set. For actuarial work, that is a meaningful change in how software fits into the day.",
      ),
      h("A small example"),
      p(
        "Consider a pricing check you run every month. An agent can pull the exposure data, run the model, compare against last month, and flag what moved — before you open the workbook.",
      ),
      code(
        `def price_check(portfolio):\n    exposure = load_exposure(portfolio)\n    result = run_pricing_model(exposure)\n    delta = compare_to_prior(result)\n    return flag_material_moves(delta, threshold=0.05)`,
        "python",
        "price_check.py",
      ),
      p(
        "The actuary stays in control of judgement and sign-off. The agent removes the mechanical steps in between.",
      ),
    ],
  },
  {
    _id: "post-fraud",
    title: "What my PhD taught me about insurance fraud",
    slug: "what-my-phd-taught-me-about-insurance-fraud",
    excerpt:
      "Fraud detection is not just a classification problem. It is a question of where actuarial judgement and machine learning meet.",
    publishedAt: "2025-11-10T09:00:00Z",
    tags: ["Fraud", "Machine learning", "Research"],
    coverImage: img("/placeholders/cover-post.svg", "Insurance fraud detection"),
    body: [
      p(
        "Most fraud is rare, which makes it a hard signal to learn. The interesting work is less about the algorithm and more about how you frame the label, the cost of a false positive, and the feedback loop with claims teams.",
      ),
      h("The cost matrix matters more than the model"),
      p(
        "A model that catches more fraud but blocks honest claimants can cost more than the fraud it prevents. Getting the cost matrix right is an actuarial question first.",
      ),
    ],
  },
];

// --- Resume ------------------------------------------------------------------
export const fallbackEducation: Education[] = [
  {
    _id: "edu-phd",
    institution: "[University]",
    qualification: "PhD, Actuarial Science",
    field: "Fraud detection in insurance",
    start: "[year]",
    end: "2023",
    note: "India's first PhD awarded in Actuarial Science.",
    order: 0,
  },
  {
    _id: "edu-masters",
    institution: "[University]",
    qualification: "[Master's degree]",
    field: "[Field]",
    start: "[year]",
    end: "[year]",
    order: 1,
  },
];

export const fallbackExperience: Experience[] = [
  {
    _id: "exp-accenture",
    org: "Accenture",
    role: "Actuarial Associate Principal",
    location: "[Location]",
    start: "[year]",
    end: "Present",
    current: true,
    bullets: [
      "Lead actuarial pricing and modelling work across health and specialty lines.",
      "Build and productionise pricing on modern actuarial platforms.",
    ],
    order: 0,
  },
  {
    _id: "exp-sssia",
    org: "Sri Sathya Sai Institute of Actuaries (SSSIA)",
    role: "Adjunct Professor",
    location: "[Location]",
    start: "[year]",
    end: "Present",
    current: true,
    bullets: ["Teach actuarial students; supervise coursework and projects."],
    order: 1,
  },
  {
    _id: "exp-prior",
    org: "[Previous employer]",
    role: "[Actuarial role]",
    location: "[Location]",
    start: "[year]",
    end: "[year]",
    bullets: [
      "Group health pricing and reserving.",
      "Crop insurance and cancer pricing engagements.",
    ],
    order: 2,
  },
];

export const fallbackMilestones: Milestone[] = [
  {
    _id: "ms-phd",
    title: "India's first PhD in Actuarial Science",
    year: "2023",
    description: "Doctoral research on fraud detection in insurance.",
    order: 0,
  },
  {
    _id: "ms-book",
    title: "Co-authored Agentic AI for Actuaries",
    year: "2026",
    description: "Published by ACTEX/ArchiMedia.",
    order: 1,
  },
  {
    _id: "ms-prof",
    title: "Adjunct Professor at SSSIA",
    year: "2024",
    description: "Teaching the next generation of actuaries.",
    order: 2,
  },
  {
    _id: "ms-fellow",
    title: "Fellowship: FIA and FIAI",
    year: "[year]",
    description: "Fellow of the IFoA and the Institute of Actuaries of India.",
    order: 3,
  },
];

export const fallbackSkillGroups: SkillGroup[] = [
  {
    _id: "skill-actuarial",
    groupName: "Actuarial",
    skills: ["Pricing", "Reserving", "Health insurance", "Crop insurance", "Cancer pricing"],
    order: 0,
  },
  {
    _id: "skill-ai",
    groupName: "Data & AI",
    skills: ["Python", "R", "Machine learning", "Fraud detection", "Agentic AI"],
    order: 1,
  },
  {
    _id: "skill-platforms",
    groupName: "Platforms & tools",
    skills: ["hyperexponential (hx Renew)", "SQL", "Excel / VBA"],
    order: 2,
  },
];

export const fallbackCredentials: Credential[] = [
  {
    _id: "cred-fia",
    name: "Fellow (FIA)",
    issuer: "Institute and Faculty of Actuaries",
    year: "[year]",
    order: 0,
  },
  {
    _id: "cred-fiai",
    name: "Fellow (FIAI)",
    issuer: "Institute of Actuaries of India",
    year: "[year]",
    order: 1,
  },
];

export const fallbackPublications: Publication[] = [
  {
    _id: "pub-book",
    title: "Agentic AI for Actuaries",
    venue: "ACTEX / ArchiMedia",
    year: "2026",
    type: "chapter",
    order: 0,
  },
  ...Array.from({ length: 8 }, (_, i): Publication => ({
    _id: `pub-${i + 1}`,
    title: `[Paper title ${i + 1}]`,
    venue: "[Journal / venue]",
    year: "[year]",
    type: "paper",
    order: i + 1,
  })),
];
