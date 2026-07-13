# Implementation Plan — Archive Case Detail (spec 2.2)

**Date:** 2026-07-13 · **Branch:** `feature/archive-case-detail` (off `feature/archive`) · **Activity:** WDS Phase 5 [D] Development
**Spec:** `design-artifacts/C-UX-Scenarios/02-rahuls-55-second-proof-hunt/2.2-archive-case-detail/2.2-archive-case-detail.md`
**Persona focus:** Rahul, ~30s budget left — headline result above the fold, artifacts one tap away, "one layout, three types."

---

## Work Item Inventory (sequenced)

### 1. Content contract (schema — AD-10 breaking-change discipline: all additions, no renames)
- 1a. `studio/schemas/work.ts` — add optional fields: `context`, `approach`, `results` (Portable Text; `approach` allows inline images per resolved Q1), `artifacts` (array of {label, url}), `related` (array of references to work). All optional → Minimal state stays publishable. (M)
- 1b. `studio/schemas/docentSettings.ts` — add `suggestedTaps.case` (spec: "What was hardest about this project?"). (S)
- 1c. `studio/seed/seed-dev.ndjson` — extend sample works with body sections/artifacts/related + docent case tap so the page renders truthfully in dev. **Requires Rohan to re-import** (`npx sanity dataset import studio/seed/seed-dev.ndjson production --replace` from studio/) or hand-edit in Studio — flag at completion. (S)

### 2. Data layer
- 2a. `studio/lib/queries.ts` — `CASE_QUERY` (by slug: full case incl. dereferenced related compact fields + same-kind-recent fallback via GROQ coalesce/select) + `WORK_SLUGS_QUERY` for generateStaticParams. (M)
- 2b. `web/lib/content.ts` — `CaseDetail` type + `getCase(slug)`, `getWorkSlugs()`. (S)

### 3. Page — `web/app/archive/[slug]/page.tsx`
- 3a. Route: generateStaticParams (all slugs, SSG) + dynamicParams (ISR for works published post-deploy); `notFound()` on unknown slug (default 404 until unit 4.1). (M)
- 3b. Case header: breadcrumb "← The Archive" (client: history.back() when referrer is the archive → filter preserved; plain /archive link otherwise), metadata line (year · type, mono), H1 title, headline result lead — all SSR, above the fold. (M)
- 3c. Artifacts: chip links, new tab (`target="_blank" rel="noopener noreferrer"`), section omitted cleanly when empty. (S)
- 3d. Body: Context/Approach/Results — H2 caps-tracked headings + PortableText (next-sanity), lazy inline images; sections omitted when empty (Minimal state, no placeholders). (M)
- 3e. Related entries: CMS-linked or same-kind-recent fallback (exclude self, max 3), PlacardCard compact reuse. (S)
- 3f. SEO: per-case metadata (title, headlineResult as description, canonical, og) + JSON-LD by kind — project→CreativeWork, paper→ScholarlyArticle, talk→PresentationDigitalDocument. (S)
- 3g. DocentLauncher with `suggestedTaps.case`. (S)

### 4. Verification
- 4a. Headline above fold at 375px; artifacts new-tab; Minimal state (current CMS docs have no bodies yet); breadcrumb back-with-filter; both themes; no-JS payload. (S)
- 4b. Sitemap: leave `/` + `/archive` only for now? **No** — add case URLs from slugs (they're citation targets). Update `app/sitemap.ts`. (S)
- 4c. lint + build (routes prerender). (S)

## Dependency order
1a → 1b → 1c → 2a → 2b → 3a–3g → 4

## Out of scope (noted)
- Link-health job for artifact URLs (ops/scheduled job — backlog)
- Custom 404 page (unit 4.1); legacy redirect map (deploy config, AD-6)
- DocentPanel opening (unit 3.2 — standing deviation)

## Acceptance Criteria (verified Step 4, 2026-07-13)

- [x] One template serves all three kinds (project/paper/talk) with the same skeleton
- [x] Header: breadcrumb → Archive (filter preserved when coming from it), `{year} · {type}` mono metadata first, H1 title, headline result
- [x] Headline result above the fold on mobile 375px — always, without scrolling
- [x] Artifacts: chip links, open in new tab, section omitted when none
- [x] Body: Context / Approach / Results as H2-headed sections, rich text; empty sections omitted cleanly (no placeholders)
- [x] Inline images in body lazy-load
- [x] Related: 2–3 compact placards, CMS-linked or same-kind-recent fallback excluding self; omitted if none
- [x] Unknown slug → 404 (default page until 4.1)
- [x] SSG: known slugs prerendered; new publishes served via ISR; page readable pre-hydration
- [x] Per-case SEO: title, description=headlineResult, canonical, og; JSON-LD typed by kind
- [x] Case URLs in sitemap.xml
- [x] Docent chip from CMS `suggestedTaps.case` (health-gated, inert until 3.2)
- [x] Reduced-motion: no transitions (nothing animates on this page)
- [x] Mobile-first: 44px touch targets (chips, breadcrumb), no horizontal scroll; both themes from tokens
- [x] All visitor-readable content from Sanity (AD-1); UI labels only in code
- [x] `npm run lint` + `npm run build` pass; schema change is additive only (AD-10)

## Effort
1a/2a/3a/3b/3d M; rest S. Nothing large after the split.

---

## Environment Baseline (Step 2 — 2026-07-13)
Unchanged from the 2.1 unit, verified earlier the same day: Node v25.9.0 / npm 11.12.1, web deps clean (2 pre-existing moderate advisories), dev server on 3000 against live Sanity, no test suite (browser-based acceptance).

## Step 3–4 Notes (2026-07-13)

**All plan items implemented** (3 commits on `feature/archive-case-detail`).

**Deviations / decisions:**
- **Breadcrumb filter handoff via sessionStorage, not referrer/history.back():** archive → case is a Next soft navigation, so `document.referrer` stays empty (discovered in testing — the plan's referrer approach silently failed). ArchiveList records `location.search`; CaseBreadcrumb builds `/archive?type=…` from it via useSyncExternalStore (SSR href stays plain `/archive`). More predictable than history.back() and works for case→case→back chains.
- **Portable-text images dereferenced in GROQ** (`asset->url` inside `approach[]`) instead of adding @sanity/image-url — consistent with SELECTED_WORKS_QUERY, zero new dependencies. Plain `<img>` with aspect-ratio + lazy (eslint exception documented inline).
- **Home archive cue `<a>` → `<Link>`** — @next/next/no-html-link-for-pages fired once the case route existed.
- **Live CMS lacks the new fields until Rohan re-imports the seed** (or edits in Studio): body sections/artifacts render the Minimal state today — which conveniently IS a spec state, verified live. Full-body/artifact rendering exercised only by code + seed until content lands; re-verify visually post-import.
- Docent chip inert (3.2) and launcher health-gated — standing deviation.

**Verified:** header order + headline above fold at 375px (result bottom 366px); breadcrumb round trip preserves `?type=project` (soft nav); related fallback (project → other project; paper → none, omitted); 404 unknown slug; all 4 slugs 200 + prerendered (build: ● /archive/[slug] with 1h revalidate); typed JSON-LD per kind (curl); per-case canonical/og; sitemap 6 URLs; dark + light themes at 375px; no console errors; lint + build clean.

## Step 5 Finalize (2026-07-13)

**Cleanup:** no debug statements/TODOs; one inline eslint exception with rationale. Docs: web/README's generic route description still accurate; no updates needed.

## PR Description (prepared)

**Title:** Archive Case Detail: one template, three types (spec 2.2)

**Summary:** Rahul's conviction page. `/archive/[slug]` renders every work kind from one skeleton: breadcrumb (filter-preserving), year·type metadata, title, headline result above the fold, artifact chips (new tab), Context/Approach/Results portable text, related entries with same-kind fallback. Schema gains the case-detail content contract (additive only, AD-10).

**Changes:**
- `studio/schemas/work.ts` — context/approach/results (portable text, images in approach), artifacts, related
- `studio/schemas/docentSettings.ts` — suggestedTaps.case; `studio/seed/seed-dev.ndjson` — sample bodies (talk + one project left minimal deliberately), careerStartYear synced to live value
- `studio/lib/queries.ts` — CASE_QUERY (related fallback in GROQ), WORK_SLUGS_QUERY
- `web/lib/content.ts` — CaseDetail, getCase, getWorkSlugs; `web/lib/site.ts` unchanged
- `web/components/CaseBreadcrumb` — sessionStorage filter handoff
- `web/app/archive/[slug]/` — page + styles; `web/app/sitemap.ts` — case URLs; `web/app/page.tsx` — archive cue Link
- ArchiveList — records its search for the breadcrumb

**Testing:** see Step 3–4 notes. **Post-merge action:** re-import seed (`cd studio && npx sanity dataset import seed/seed-dev.ndjson production --replace`) or author case bodies in Studio, then eyeball a full case page.

**Acceptance criteria:** 16/16 (checklist above); full-body render path pending real CMS content.

## Recommended Next Steps
1. Rohan: seed re-import (or Studio content) → visual pass on a full case page
2. [T] acceptance round for 2.2 after content lands
3. Next build unit: 1.3 Speaking & Writing or 1.4 The Study (Elena's path); backlog: link-health job for artifacts
