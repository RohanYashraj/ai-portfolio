import { defineField, defineType } from "sanity";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  fields: [
    defineField({
      name: "groupName",
      title: "Group name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "groupName", skills: "skills" },
    prepare: ({ title, skills }) => ({
      title,
      subtitle: Array.isArray(skills) ? skills.join(", ") : "",
    }),
  },
});
