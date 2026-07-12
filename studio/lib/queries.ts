/**
 * Shared GROQ definitions — the ONE place stat and wall queries are defined
 * (AD-11). web/ imports these; agent/ mirrors them from this file. Neither
 * consumer writes its own stat query.
 *
 * Both consumers read the published perspective only (AD-10).
 */

/** Counts behind the hero stat strip. Years is derived from careerStartYear. */
export const STATS_QUERY = `{
  "papers": count(*[_type == "work" && kind == "paper"]),
  "talks": count(*[_type == "work" && kind == "talk"]),
  "careerStartYear": *[_type == "siteSettings"][0].careerStartYear
}`;

/** Selected Works wall: pinned first (lower pinOrder wins), then newest-first. Max 5. */
export const SELECTED_WORKS_QUERY = `*[_type == "work" && selected == true]
  | order(coalesce(pinOrder, 9999) asc, date desc)[0...5]{
    _id, title, "slug": slug.current, kind, date, headlineResult,
    visual{ "url": asset->url, "alt": alt, "aspectRatio": asset->metadata.dimensions.aspectRatio }
  }`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, heroName, heroNiche, heroAnchor, seoDescription, contactEmail,
  socialLinks[]{ label, url }
}`;

export const DOCENT_SETTINGS_QUERY = `*[_type == "docentSettings"][0]{
  greeting, panelSubtitle, suggestedTaps, honestMiss, responsePromise
}`;
