# Implementation Plan — The Archive (spec 2.1)

**Date:** 2026-07-13 · **Branch:** `feature/archive` (off `feature/home-selected-works`, which is not yet merged to main) · **Activity:** WDS Phase 5 [D] Development
**Spec:** `design-artifacts/C-UX-Scenarios/02-rahuls-55-second-proof-hunt/2.1-the-archive/2.1-the-archive.md`
**Architecture:** `_bmad-output/planning-artifacts/architecture/architecture-ai-portfolio-2026-07-12/ARCHITECTURE-SPINE.md`
**Persona focus:** Rahul, mobile-first, 55-second budget — density, dates, zero filter learning curve.

---

## Work Item Inventory (sequenced)

### 1. Data layer
- 1a. `studio/lib/queries.ts` — `ARCHIVE_QUERY`: all works, `order(date desc)`, fields `_id, title, slug, kind, date, headlineResult` (no visuals in the compact list). Per-kind counts come free from the fetched list client-side — no extra query (AD-11: one definition set). (S)
- 1b. `web/lib/content.ts` — `ArchiveEntry` type + `getArchiveEntries()` (sparse-safe: `[]` on failure, same fetchOptions/tags). (S)

### 2. Components
- 2a. `PlacardCard` compact variant (`variant="compact"`) — date·type mono line FIRST (currency signal leads), title, one-liner, whole row tappable → `/archive/[slug]`, hairline separator handled by list gap. Reuses existing type-in restraint: NO caption animation in compact (index drawer, not gallery wall). (M)
- 2b. `FilterBar` (new, client component) — 4 chips All/Projects/Papers/Talks, active chip filled, instant client-side filter, syncs to URL (`/archive?type=paper`, replaceState — no scroll jump), sticky below header on mobile, chips with zero entries disabled up-front (never an empty result screen), filtered count shown ("8 papers"). 44px touch targets. (M)

### 3. Page — `web/app/archive/page.tsx`
- 3a. Route with RoomTitle ("The Archive" / "All of it — filter as you like."), SSG: full list server-rendered (readable pre-hydration on mid-range Android); filtering is a client enhancement over the static list (hide via data-attr/CSS or client wrapper that renders the same SSR'd rows). (M)
- 3b. Year subdividers (2026 / 2025 / …) computed from date desc order; recomputed per active filter. (S)
- 3c. Deep-link: `?type=` read client-side on load → pre-filtered (SSR always emits the full list; page stays static — searchParams must not opt the route into dynamic rendering). (S)
- 3d. DocentLauncher with archive chip "Looking for something specific? Ask me." (launcher already health-gated; chip inert until 3.2, same deviation as home). (S)
- 3e. SEO: metadata (title/description) for /archive. (S)
- 3f. Reduced-motion: no list transitions (only matters if filter animates — keep it instant; nothing to gate). (S)

### 4. Verification
- 4a. Mobile 375px primary + desktop; both themes; sticky filter on scroll; no-JS payload contains full list. (S)
- 4b. `npm run build` — /archive prerenders static. (S)

## Dependency order
1a → 1b → 2a/2b → 3a–3f → 4

## Decisions to confirm with Rohan
1. **URL param value:** spec layout says `?type=papers` (plural) but Home already links `/archive?type=paper` (singular, matches the schema `kind` values). **Recommend singular** (`project|paper|talk`) as canonical; tolerate plural on read.
2. `/archive/[slug]` rows will 404 until unit 2.2 — same inter-unit deviation pattern as before.

## Acceptance Criteria (verified Step 4, 2026-07-13)

- [x] Room title "The Archive" + subtitle "All of it — filter as you like." (RoomTitle)
- [x] Entry list: ALL works (projects, papers, talks), newest first (date desc)
- [x] Each row: date·type mono line first, then title, then one-liner; hairline separators; compact density
- [x] Entire row tappable → `/archive/[slug]`
- [x] Year subdividers in the list
- [x] FilterBar: All/Projects/Papers/Talks chips; instant client-side filter; zero learning curve
- [x] Active chip filled; filtered state shows count ("8 papers")
- [x] Chips for types with zero entries disabled up-front — empty result screen impossible
- [x] Filter syncs to URL (`/archive?type=paper`) — shareable filtered views
- [x] Deep-linked `?type=` pre-filters on load
- [x] Filter bar sticky below header on mobile
- [x] List fully readable pre-hydration (full list in HTML payload, SSG)
- [x] Reduced-motion: no list transitions
- [x] Mobile-first verified at 375px, touch targets ≥44px
- [x] Docent chip: "Looking for something specific? Ask me." (health-gated as on Home)
- [x] All content resolves from Sanity (AD-1); UI labels only in code
- [x] Both themes from tokens.css; `npm run build` passes, /archive static

## Effort
Everything S/M — no item needs further splitting.

---

## Environment Baseline (Step 2 — 2026-07-13)

- **Tooling:** Node v25.9.0, npm 11.12.1 — unchanged from last unit
- **Deps:** `npm install` in web/ clean; same 2 moderate audit advisories as baseline (pre-existing, non-blocking)
- **Env:** `web/.env.local` present (Sanity project `weju4mib`)
- **Dev server:** launch.json "web" on port 3000 — Home renders with seeded CMS content, zero console errors, HMR on
- **Design tokens:** `web/styles/tokens.css` in place; components RoomTitle/PlacardCard/DocentLauncher available for reuse
- **Structure:** `web/app/archive/` to be created in Step 3 (App Router convention)
- **Test baseline:** no test suite exists (unchanged) — browser-based acceptance verification, as last unit
- **Pre-existing issues:** none new; Studio still on v4 (upgrade deferred); sample works still in dataset

---

## Step 3 Notes (2026-07-13)

**All plan items implemented** (3 commits on `feature/archive`).

**Deviations / decisions:**
- **Deep-link is a hydration enhancement, not SSR:** `?type=` is deliberately not read in the server component — reading searchParams would opt the route out of static rendering, violating "fully readable pre-hydration on mid-range Android". Static HTML always carries the full list; ArchiveList applies the param on mount. A deep link to a zero-entry kind falls back to All (same no-empty-room rule as disabled chips).
- **URL param canonical form:** singular (`?type=paper`), matching schema kind values and Home's existing stat link; plurals tolerated on read (spec sketch showed `?type=papers`).
- **Compact placard = variant of PlacardCard** (per spec's component reference), no card chrome, metadata-first, no type-in animation (index drawer, not gallery wall). Hairline separators live on the list rows.
- **RoomTitle `as` prop added:** room name renders as the page H1 on standalone room pages (spec 2.1 typography: room title = H1); scrolling-gallery sections keep h2.
- **Sticky filter offset** is 77px = header composition (2×space-md + 44px actions + border) — documented in ArchiveList.module.css; mobile only per spec.
- **Docent chip copy** comes from CMS (`suggestedTaps.archive`, AD-9); seed says "Looking for something specific?" vs spec's "…? Ask me." — editable in Studio, not code.
- Chip click still inert (DocentPanel = unit 3.2) and launcher health-gated — same standing deviation as Home.

**Verified in browser (dev):** /archive renders full list newest-first with year subdividers (2026/2025/2024); filter click → 1-paper list + "1 paper" count + URL `?type=paper` via replaceState; deep link `?type=talks` (plural) pre-filters with Talks chip pressed; zero console errors on a fresh tab (an earlier dep-array warning was a stale HMR buffer, gone after server restart).

---

## Step 4 Verification Notes (2026-07-13)

All 17 acceptance criteria checked off above. Method and findings:

- **No-JS proof:** `curl /archive` contains all 4 entry titles, room title, subtitle — full list pre-hydration
- **Static build:** `npm run build` ✓ — `/archive` prerendered static (○), 1h revalidate, TypeScript clean
- **Mobile 375px:** chips exactly 44px; rows ≥129px; filter sticky at top:77px = measured header bottom 77px; no horizontal scroll
- **Tablet 768px:** full nav, filter static (sticky is mobile-only per spec), space-2xl padding
- **Desktop:** 720px max-width column, hover state = accent title on rows, accent border on chips
- **Themes:** both verified by screenshot; active chip = ink-filled with canvas text (≈17:1 contrast both themes); muted metadata reuses tokens measured last unit (4.9:1 light / 6.28:1 dark)
- **Interactive states:** default/hover/focus(:focus-visible auto outline)/active-pressed(aria-pressed + filled)/disabled(opacity .45, not-allowed) verified; loading/error/success n/a (no async UI); empty state unreachable by design (disabled chips + deep-link fallback)
- **Deep-link edge cases:** `?type=talks` (plural) → Talks pre-filtered; `?type=nonsense` → All, full list
- **Keyboard:** logical tab order (name → theme → menu → chips → rows), visible :focus-visible outline. Enter/Space activation could not be exercised through the browser-automation key injection (synthetic events arrive without native key codes, so UA default activation doesn't fire) — chips are native `<button>` elements with zero custom key handling, so real-keyboard activation is user-agent default behavior; flagged for the human pass in [T] acceptance testing
- **A11y semantics:** chips carry `aria-pressed` in a `role="group"` labeled "Filter by type"; count is `aria-live="polite"`; list is a semantic `<ul>`
- **Zero-entry disabled chips:** not observable live (seed has all three kinds) — logic is a one-line ternary, disabled styling verified by forcing the attribute

---

## Step 5 Finalize (2026-07-13)

**Cleanup:** no debug statements, no TODOs, no unused imports (lint enforces). Lint surfaced 2 errors in ArchiveList (setState-in-effect, render-time mutation) → reworked so the URL is the single filter store via `useSyncExternalStore` (chips write replaceState + popstate ping; deep link and back/forward read the same way; year breaks derived from the previous entry). Re-verified in browser after rework: plural deep link, filter click, count, URL sync all pass. Final `npm run lint` ✓, `npm run build` ✓ (/archive static, 1h revalidate).

**Docs:** web/README describes routes generically ("routes per spec slugs") — nothing to update.

## Spec Deviations

### Deep-link pre-filter timing
- **Spec said:** Deep-linked state: `?type=` in URL → "Pre-filtered on load"
- **Implementation does:** static HTML always carries the full list; the filter applies at hydration (a brief full-list paint on slow devices)
- **Reason:** the same spec's technical note mandates SSG with the list "fully readable pre-hydration" — one static HTML file cannot vary by query string. Hydration-applied filtering satisfies both requirements; the trade-off favors Rahul's no-JS/slow-JS reality.

### URL param spelling
- **Spec said:** `/archive?type=papers` (plural, in the FilterBar behavior row)
- **Implementation does:** canonical singular `?type=paper` (schema kind values, matches Home's existing stat link); plurals accepted on read
- **Reason:** one canonical form, consistent with the content contract (AD-10); spec example still works.

### Docent chip
- **Spec said:** chip → DocentPanel
- **Implementation does:** chip inert; launcher hidden until agent health probe passes (AD-2)
- **Reason:** standing inter-unit deviation from 1.1/1.2 — DocentPanel is unit 3.2. Chip copy is CMS-owned (`suggestedTaps.archive`); seed text lacks the "Ask me." tail — edit in Studio if wanted.

### Case detail links
- **Spec said:** row tap → 2.2 Archive Case Detail
- **Implementation does:** correct hrefs `/archive/[slug]`; target 404s until unit 2.2 is built
- **Reason:** inter-unit dependency, not a defect. 2.2 is the natural next build unit.

## PR Description (prepared)

**Title:** The Archive: filterable index of all works (spec 2.1)

**Summary:** Second build unit — Rahul's proof-hunt room. Every work as a dated, typed entry, newest first with year subdividers; one-gesture type filtering with shareable URLs. Mobile-first, static-first: the whole list is in the HTML payload; filtering is a hydration enhancement.

**Changes:**
- `studio/lib/queries.ts` — `ARCHIVE_QUERY` (AD-11 single definition set)
- `web/lib/content.ts` — `ArchiveEntry` + `getArchiveEntries()` (sparse-safe)
- `web/components/PlacardCard` — `compact` variant: metadata-first index row, no card chrome, no caption animation
- `web/components/FilterBar` — chips with aria-pressed, zero-entry kinds disabled up-front, filtered count, 44px targets
- `web/components/ArchiveList` — URL-as-store filtering (useSyncExternalStore), year subdividers, sticky-on-mobile wrapper
- `web/components/RoomTitle` — `as` prop (h1 on standalone room pages)
- `web/app/archive/` — the route: SSG, metadata, docent launcher

**Testing:** `npm run dev` in web/ → `/archive`: list newest-first with year subdividers; tap chips (URL updates, count shows); load `/archive?type=paper` (and `?type=papers`) → pre-filtered; 375px → filter sticks below header; `curl localhost:3000/archive` → all titles in raw HTML. `npm run lint` and `npm run build` pass; /archive prerenders static.

**Acceptance criteria:** 17/17 verified (checklist above). Keyboard Enter/Space on chips is UA-default (native buttons, no custom key handling) — flagged for a human keyboard pass in [T] since browser automation can't inject native key codes.

## Recommended Next Steps

1. **[T] Acceptance Testing** for 2.1 (include a real-keyboard pass on the filter chips)
2. **Next build unit: 2.2 Archive Case Detail** — every archive row links there
3. Standing items: replace sample works in Studio; optionally append "Ask me." to `suggestedTaps.archive` in Studio
