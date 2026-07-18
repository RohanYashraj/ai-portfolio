import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "An internal path (e.g. /resume) or a full URL.",
      // allowRelative lets internal nav paths like "/highlights" pass. No
      // `scheme` restriction: a relative path has no scheme and would otherwise
      // be rejected by the scheme check.
      validation: (rule) => rule.required().uri({ allowRelative: true }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
