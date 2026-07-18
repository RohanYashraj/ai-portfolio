import { type SchemaTypeDefinition } from "sanity";

import { link } from "./objects/link";
import { seo } from "./objects/seo";
import { blockContent } from "./objects/blockContent";

import { siteSettings } from "./documents/siteSettings";
import { author } from "./documents/author";
import { stat } from "./documents/stat";
import { highlight } from "./documents/highlight";
import { post } from "./documents/post";
import { education } from "./documents/education";
import { experience } from "./documents/experience";
import { milestone } from "./documents/milestone";
import { skillGroup } from "./documents/skillGroup";
import { credential } from "./documents/credential";
import { publication } from "./documents/publication";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  link,
  seo,
  blockContent,
  // Singletons
  siteSettings,
  author,
  // Collections
  stat,
  highlight,
  post,
  // Resume
  education,
  experience,
  milestone,
  skillGroup,
  credential,
  publication,
];
