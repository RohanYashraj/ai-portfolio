import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Overrides the page title in search results and tabs.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "Falls back to the generated OpenGraph image if empty.",
    }),
  ],
});
