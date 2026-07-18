"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure, SINGLETONS } from "./sanity/structure";

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "create" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // Prevent duplicate/delete actions on singletons.
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: typeof location === "undefined" ? "" : location.origin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
