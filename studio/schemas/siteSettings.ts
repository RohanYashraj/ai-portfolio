import { defineField, defineType } from "sanity";

/**
 * Singleton. Every visitor-readable fact about Rohan lives in Sanity (AD-1) —
 * including the hero identity block.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      type: "string",
      description: "Header wordmark.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroName",
      type: "string",
      description: "The name at the Entrance.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroNiche",
      type: "string",
      description: 'The niche line, e.g. "the AI Actuary".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroAnchor",
      type: "string",
      description: 'Credential anchor, e.g. "actuary (FIA, FIAI) × data scientist".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "careerStartYear",
      type: "number",
      description:
        "Years-of-experience stat is derived from this (AD-11) — never a manually maintained count.",
      validation: (rule) => rule.required().integer().min(1990),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
