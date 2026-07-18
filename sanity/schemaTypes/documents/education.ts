import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "qualification",
      title: "Qualification",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "field", title: "Field of study", type: "string" }),
    defineField({ name: "start", title: "Start year", type: "string" }),
    defineField({ name: "end", title: "End year", type: "string" }),
    defineField({ name: "note", title: "Note", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "qualification", subtitle: "institution" },
  },
});
