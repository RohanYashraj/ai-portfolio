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

/** The Archive: every work, newest first — currency is the message (spec 2.1). */
export const ARCHIVE_QUERY = `*[_type == "work"]
  | order(date desc){
    _id, title, "slug": slug.current, kind, date, headlineResult
  }`;

/** Compact fields shared by related-entry placards. */
const CASE_RELATED_FIELDS = `_id, title, "slug": slug.current, kind, date, headlineResult`;

/**
 * One case by slug (spec 2.2). `related` prefers the editor-curated list and
 * falls back to same-kind recent (excluding self), so the trail stays warm
 * without maintenance.
 */
export const CASE_QUERY = `*[_type == "work" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, kind, date, headlineResult,
  context,
  approach[]{
    ...,
    _type == "image" => {
      "url": asset->url, alt,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  },
  results,
  artifacts[]{ label, url },
  "related": select(
    count(related) > 0 => related[]->{ ${CASE_RELATED_FIELDS} },
    *[_type == "work" && kind == ^.kind && slug.current != $slug]
      | order(date desc)[0...3]{ ${CASE_RELATED_FIELDS} }
  )
}`;

/** Every published slug — SSG params + sitemap. */
export const WORK_SLUGS_QUERY = `*[_type == "work" && defined(slug.current)]{
  "slug": slug.current, date
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, heroName, heroNiche, heroAnchor, seoDescription, contactEmail,
  socialLinks[]{ label, url }
}`;

export const DOCENT_SETTINGS_QUERY = `*[_type == "docentSettings"][0]{
  greeting, panelSubtitle, suggestedTaps, honestMiss, responsePromise
}`;
