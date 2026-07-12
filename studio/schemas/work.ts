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
  ],
  preview: {
    select: { title: "title", subtitle: "headlineResult", media: "visual" },
  },
});
