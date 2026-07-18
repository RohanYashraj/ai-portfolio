import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  UserIcon,
  BarChartIcon,
  StarIcon,
  DocumentTextIcon,
  CaseIcon,
  RocketIcon,
  TagIcon,
  TokenIcon,
  BookIcon,
} from "@sanity/icons";

// Pin the two singletons to the top; group the rest into clear sections.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Author")
        .icon(UserIcon)
        .child(S.document().schemaType("author").documentId("author")),
      S.divider(),
      S.documentTypeListItem("stat").title("Stats").icon(BarChartIcon),
      S.documentTypeListItem("highlight").title("Highlights").icon(StarIcon),
      S.documentTypeListItem("post").title("Blog posts").icon(DocumentTextIcon),
      S.divider(),
      S.listItem()
        .title("Resume")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Resume")
            .items([
              S.documentTypeListItem("education").title("Education").icon(CaseIcon),
              S.documentTypeListItem("experience")
                .title("Work experience")
                .icon(CaseIcon),
              S.documentTypeListItem("milestone")
                .title("Milestones")
                .icon(RocketIcon),
              S.documentTypeListItem("skillGroup").title("Skills").icon(TagIcon),
              S.documentTypeListItem("credential")
                .title("Certifications & Fellowships")
                .icon(TokenIcon),
              S.documentTypeListItem("publication")
                .title("Publications & Presentations")
                .icon(BookIcon),
            ]),
        ),
    ]);

// Document types that are singletons — hidden from the "create new" menu.
export const SINGLETONS = ["siteSettings", "author"];
