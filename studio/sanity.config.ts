import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/* Project id is public (visible in every API request) — not a secret. */
export const projectId = "weju4mib";
export const dataset = "production";

const singletons = ["siteSettings", "docentSettings"];

export default defineConfig({
  name: "default",
  title: "ai-portfolio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("work").title("Works"),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Docent Settings")
              .child(S.document().schemaType("docentSettings").documentId("docentSettings")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    /* Singletons are edited in place, never created from the "new document" menu */
    templates: (templates) =>
      templates.filter((t) => !singletons.includes(t.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletons.includes(context.schemaType)
        ? actions.filter(
            (a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? "")
          )
        : actions,
  },
});
