import { defineField, defineType } from "sanity";

/**
 * Singleton. Sanity owns every docent-visible string (AD-9): web/ renders
 * them, agent/ receives them as prompt context, neither hardcodes them.
 */
export const docentSettings = defineType({
  name: "docentSettings",
  title: "Docent Settings",
  type: "document",
  fields: [
    defineField({
      name: "greeting",
      type: "text",
      rows: 2,
      description: "Panel opening line.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "panelSubtitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suggestedTaps",
      type: "object",
      description: "One contextual suggested tap per room.",
      fields: [
        defineField({ name: "home", type: "string" }),
        defineField({ name: "works", type: "string" }),
        defineField({ name: "speaking", type: "string" }),
        defineField({ name: "study", type: "string" }),
        defineField({ name: "archive", type: "string" }),
        defineField({ name: "case", type: "string" }),
        defineField({ name: "about", type: "string" }),
      ],
    }),
    defineField({
      name: "honestMiss",
      type: "text",
      rows: 2,
      description: "Out-of-scope response (spec 3.2 Frame 3).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "responsePromise",
      type: "string",
      description: 'E.g. "Rohan replies within 2 working days."',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Docent Settings" }),
  },
});
