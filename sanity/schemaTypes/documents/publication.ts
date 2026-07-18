import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const PUBLICATION_TYPES = [
  { title: "Paper", value: "paper" },
  { title: "Book chapter", value: "chapter" },
  { title: "Presentation", value: "presentation" },
];

export const publication = defineType({
  name: "publication",
  title: "Publication / Presentation",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "venue", title: "Venue / publisher", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: PUBLICATION_TYPES },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "venue", type: "type" },
    prepare: ({ title, subtitle, type }) => ({
      title,
      subtitle: [type, subtitle].filter(Boolean).join(" · "),
    }),
  },
});
