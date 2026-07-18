import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. Papers published",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "Optional, e.g. + or yrs",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "label", value: "value", suffix: "suffix" },
    prepare: ({ title, value, suffix }) => ({
      title,
      subtitle: `${value ?? ""}${suffix ?? ""}`,
    }),
  },
});
