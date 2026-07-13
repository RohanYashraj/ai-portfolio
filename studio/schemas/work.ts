import { defineField, defineType } from "sanity";

/**
 * The one content type behind Selected Works, the Archive, and Speaking &
 * Writing — "one template, three types" (spec 2.2). Schema is the contract
 * (AD-10): renames here are breaking changes for web/ and agent/.
 */
export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description:
        "Immutable after publish (AD-10). Changing a published slug is a redirect-map event (AD-6).",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Paper", value: "paper" },
          { title: "Talk", value: "talk" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      description: "Placard metadata is year-first; the date always shows.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineResult",
      title: "Headline result",
      type: "string",
      description:
        "One-line, dated, verifiable result — the placard caption. Required for publish.",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "selected",
      type: "boolean",
      description: "Hangs on the Selected Works wall (3–5 pieces).",
      initialValue: false,
    }),
    defineField({
      name: "pinOrder",
      title: "Pin order",
      type: "number",
      description:
        "Optional manual override on the wall. Lower = higher. Unpinned works order newest-first.",
      hidden: ({ document }) => !document?.selected,
    }),
    defineField({
      name: "visual",
      type: "image",
      description:
        "Optional — text-first placards; add an image only when it earns its place.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    /* Case-detail body (spec 2.2) — one skeleton, three types. All optional:
       a case publishes in Minimal state and sections appear as they're
       written. Additive only (AD-10). */
    defineField({
      name: "context",
      type: "array",
      description:
        "The problem and its stakes, 2–3 sentences. (Paper: abstract · Talk: event context.)",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "approach",
      type: "array",
      description:
        "Decisions and trade-offs — judgment on display. Inline images allowed, sparingly. (Paper: method · Talk: topic.)",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "results",
      type: "array",
      description:
        "Concrete, dated outcomes; numbers where they exist. (Talk: takeaways.)",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "artifacts",
      type: "array",
      description:
        "Verifiability beats adjectives: repo, demo, DOI, PDF, slides, recording…",
      of: [
        {
          type: "object",
          name: "artifact",
          fields: [
            defineField({
              name: "label",
              type: "string",
              description: 'e.g. "Repository", "DOI", "Slides", "Recording"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "related",
      type: "array",
      description:
        "Keep the trail warm — the case that follows, the talk it produced. Falls back to same-type recent when empty.",
      of: [{ type: "reference", to: [{ type: "work" }] }],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "headlineResult", media: "visual" },
  },
});
