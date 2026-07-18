// Central Sanity environment config.
// Intentionally does NOT throw when unset: the site falls back to local seed
// content (see sanity/lib/fallback.ts) so it renders before a Sanity project
// exists. Once these env vars are set, live Sanity data takes over automatically.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

/** True only when a real Sanity project is wired up. */
export const isSanityConfigured = Boolean(projectId);

export const studioUrl = "/studio";
