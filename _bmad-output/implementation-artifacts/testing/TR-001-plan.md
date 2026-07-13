# Acceptance Test Plan — Units 1.1 Home · 1.2 Selected Works · 2.1 The Archive

**Date:** 2026-07-13 · **Tester:** Claude (WDS [T], autonomous per Rohan; human items flagged)
**Build:** `feature/archive` @ HEAD, dev server (SSR markup identical to prod build; `npm run build` passes)
**Specs under test:** `1.1-home.md`, `1.2-selected-works.md`, `2.1-the-archive.md` + `00-design-system.md`
**Adaptation note:** no TS-XXX/DD-XXX yaml exist in this project — test cases derived directly from page specs, scenario narratives (Elena 01, Rahul 02), and the design system. Test devices = browser-pane viewports (375 / 768 / desktop), both themes.

## Test Inventory

**Happy path**
- HP-01 Elena's vetting (desktop): / → hero proof (who/what/how much) → stats → cue scroll → Selected Works wall → dated placards → archive cue
- HP-02 Rahul's proof hunt (mobile 375): /archive → first relevant entry immediately → one-gesture filter → count → row tap target (2.2 is future unit)
- HP-03 Cross-page deep link: Home papers stat → /archive?type=paper pre-filtered

**Error states**
- ES-01 Stats-unavailable (CMS fail → strip hidden) — not executable against live CMS; code path review
- ES-02 Docent-off (no agent) → launcher absent, page functional — live reality, executable

**Edge cases**
- EC-01 /archive?type=nonsense → full list, All active
- EC-02 /archive?type=papers (plural) → filtered
- EC-03 prefers-reduced-motion — CSS/matchMedia-gated; code review (browser pane can't emulate)
- EC-04 No-JS payload: curl / and /archive → all content text present
- EC-05 Browser back/forward re-applies filter

**Design system**
- DS-01 Typefaces computed: display serif (name, room titles, placard titles), mono (stats, metadata), sans (body)
- DS-02 Type sizes at breakpoints: name text-3xl (40/64), room title text-xl (24/30)
- DS-03 Colors = token values (canvas/ink/accent per theme)
- DS-04 Spacing: placard wall gap space-2xl, hero section padding

**SEO (public pages)**
- SEO-01 Titles + meta descriptions (/ and /archive)
- SEO-02 One H1 per page; "AI Actuary" in home H1 area; no skipped heading levels
- SEO-03 JSON-LD Person parseable, contains "the AI Actuary"
- SEO-04 og: / twitter: tags present
- SEO-05 Canonical URL; robots.txt

**Accessibility**
- A11Y-01 Interactive elements labeled (theme, menu, docent, chips group)
- A11Y-02 Contrast WCAG AA (spot re-measure computed values)
- A11Y-03 Touch targets ≥44px mobile (header, chips, rows, placards)
- A11Y-04 Heading hierarchy
- A11Y-05 Keyboard: tab order + :focus-visible (Enter/Space chip activation = HUMAN ITEM — automation cannot inject native key codes)

**Estimate:** ~45 min automated + 10 min human keyboard/feel pass (with 20% buffer: ~1h10)
