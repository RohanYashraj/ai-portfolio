import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "nav", title: "Navigation & footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroGreeting",
      title: "Hero greeting",
      type: "string",
      description: 'Line above your name, e.g. "Hello, I\'m".',
      group: "hero",
      initialValue: "Hello, I'm",
    }),
    defineField({
      name: "heroStatement",
      title: "Hero statement",
      type: "text",
      rows: 3,
      description: "One-line positioning statement.",
      group: "hero",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee ticker words",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short words/phrases that scroll in the ticker bars (hero + footer).",
      group: "hero",
      options: { layout: "tags" },
      initialValue: [
        "Rohan Yashraj Gupta",
        "Actuary",
        "Researcher",
        "Educator",
        "Portfolio",
        "2026",
      ],
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA label",
      type: "string",
      group: "hero",
      initialValue: "Contact",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA label",
      type: "string",
      group: "hero",
      initialValue: "Resume",
    }),
    defineField({
      name: "resumePdf",
      title: "Resume PDF",
      type: "file",
      description: "Downloadable resume linked from the Resume page.",
      group: "hero",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "nav",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Email", value: "email" },
                  { title: "Google Scholar", value: "scholar" },
                  { title: "SSSIA", value: "sssia" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https", "mailto"] }),
            },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "nav",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
