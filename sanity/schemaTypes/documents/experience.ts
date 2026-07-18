import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Work experience",
  type: "document",
  fields: [
    defineField({
      name: "org",
      title: "Organisation",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "start", title: "Start", type: "string" }),
    defineField({ name: "end", title: "End", type: "string" }),
    defineField({
      name: "current",
      title: "Current role",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bullets",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "role", subtitle: "org" },
  },
});
