import { defineField, defineType } from "sanity";

export const credential = defineType({
  name: "credential",
  title: "Certification / Fellowship",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "issuer", title: "Issuer", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "issuer" } },
});
