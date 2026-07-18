import type { StructureResolver } from "sanity/structure";

// Pin the two singletons to the top; group the rest into clear sections.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Author")
        .child(S.document().schemaType("author").documentId("author")),
      S.divider(),
      S.documentTypeListItem("stat").title("Stats"),
      S.documentTypeListItem("highlight").title("Highlights"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.divider(),
      S.listItem()
        .title("Resume")
        .child(
          S.list()
            .title("Resume")
            .items([
              S.documentTypeListItem("education").title("Education"),
              S.documentTypeListItem("experience").title("Work experience"),
              S.documentTypeListItem("milestone").title("Milestones"),
              S.documentTypeListItem("skillGroup").title("Skills"),
              S.documentTypeListItem("credential").title(
                "Certifications & Fellowships",
              ),
              S.documentTypeListItem("publication").title(
                "Publications & Presentations",
              ),
            ]),
        ),
    ]);

// Document types that are singletons — hidden from the "create new" menu.
export const SINGLETONS = ["siteSettings", "author"];
