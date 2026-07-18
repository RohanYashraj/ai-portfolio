import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Post-nominal credentials",
      type: "string",
      description: "e.g. FIA, FIAI",
    }),
    defineField({
      name: "roleTitle",
      title: "Role / title",
      type: "string",
      description: "e.g. Actuarial Associate Principal, Accenture",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "sameAs",
      title: "Profile URLs (for structured data)",
      type: "array",
      of: [{ type: "url" }],
      description: "LinkedIn, Google Scholar, etc. Used in JSON-LD.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "roleTitle", media: "photo" },
  },
});
