# Design Log: ai-portfolio

> Running record of design phases, artifacts, and key decisions for the rohanyashraj.com redesign — "Rohan Gupta: Selected Works"

---

## Current

**Phase:** 5 — Agentic Development: Archive Case Detail built ✅ · real content migrated from old site ✅ (2026-07-13, branch `feature/archive-case-detail`) · [T] round 1 for 1.1/1.2/2.1 PASS, sign-off pending Rohan
**Next:** Rohan: human pass/approval for 1.1/1.2/2.1 + content review (project dates inferred; careerStartYear 2019 vs old site's 2017) / [T] for 2.2 / next build: 1.3 Speaking & Writing or 1.4 The Study

**Backlog:**
- [ ] Speaker one-pager PDF (bio + topics + photo) — post-launch (decision Q7)
- [ ] Free-text Archive search — revisit at >30 entries (decision Q10)

## Design Loop Status

| Scenario | Page | Name | Status | Date |
|----------|------|------|--------|------|
| 01-elenas-three-minute-vetting | 1.1 | Home | built | 2026-07-13 |
| 01-elenas-three-minute-vetting | 1.2 | Selected Works | built | 2026-07-13 |
| 01-elenas-three-minute-vetting | 1.3 | Speaking & Writing | specified | 2026-07-12 |
| 01-elenas-three-minute-vetting | 1.4 | The Study | specified | 2026-07-12 |
| 02-rahuls-55-second-proof-hunt | 2.1 | The Archive | built | 2026-07-13 |
| 02-rahuls-55-second-proof-hunt | 2.2 | Archive Case Detail | built | 2026-07-13 |
| 03-ananyas-guided-tour | 3.1 | About the Artist | specified | 2026-07-12 |
| 03-ananyas-guided-tour | 3.2 | Docent Conversation | specified (storyboard, 6 frames) | 2026-07-12 |
| 04-rahuls-wrong-turn | 4.1 | 404 / Fallback | specified | 2026-07-12 |

---

## Progress

### 2026-07-12 — Phase 1: Product Brief Complete (backfilled)

**Artifacts:** `design-artifacts/A-Product-Brief/project-brief.md`
**Summary:** Simplified brief for the six-room gallery-retrospective portfolio with an Agno-built AI docent, CMS single-sourced, mobile-first.

### 2026-07-12 — Phase 2: Trigger Map Complete (backfilled)

**Artifacts:** `design-artifacts/B-Trigger-Map/trigger-map.md`, `feature-impact-analysis.md`, personas 02–04
**Summary:** Engine goal (own "AI Actuary"), three personas (Elena ⭐ / Rahul 🚀 / Ananya 🌟), flywheel model, design focus on Elena.

### 2026-07-12 — Phase 3: UX Scenarios Complete

**Agent:** Claude (UX Scenario Facilitator, Dream mode)
**Scenarios:** 4 scenarios covering 9 pages (9/9 coverage, no page repetition)
**Quality:** Excellent (01–03 max scores; 04 Good — spirit-of-Objective-4 connection noted)

**Artifacts Created:**
- `design-artifacts/C-UX-Scenarios/00-ux-scenarios.md` — Scenario index with coverage matrix
- `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/01-elenas-three-minute-vetting.md` — Elena's Three-Minute Vetting (P1)
- `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.1-entrance/1.1-entrance.md`
- `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.2-selected-works/1.2-selected-works.md`
- `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.3-speaking-and-writing/1.3-speaking-and-writing.md`
- `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.4-the-study/1.4-the-study.md`
- `design-artifacts/C-UX-Scenarios/02-rahuls-55-second-proof-hunt/02-rahuls-55-second-proof-hunt.md` — Rahul's 55-Second Proof Hunt (P2)
- `design-artifacts/C-UX-Scenarios/02-rahuls-55-second-proof-hunt/2.1-the-archive/2.1-the-archive.md`
- `design-artifacts/C-UX-Scenarios/02-rahuls-55-second-proof-hunt/2.2-archive-case-detail/2.2-archive-case-detail.md`
- `design-artifacts/C-UX-Scenarios/03-ananyas-guided-tour/03-ananyas-guided-tour.md` — Ananya's Guided Tour (P2)
- `design-artifacts/C-UX-Scenarios/03-ananyas-guided-tour/3.1-about-the-artist/3.1-about-the-artist.md`
- `design-artifacts/C-UX-Scenarios/03-ananyas-guided-tour/3.2-docent-conversation/3.2-docent-conversation.md`
- `design-artifacts/C-UX-Scenarios/04-rahuls-wrong-turn/04-rahuls-wrong-turn.md` — Rahul's Wrong Turn (P3)
- `design-artifacts/C-UX-Scenarios/04-rahuls-wrong-turn/4.1-404-fallback/4.1-404-fallback.md`

**Summary:** Four linear sunshine-path scenarios expose all 9 pages/views for design scrutiny. Rohan added a key-stats strip (years, papers, talks — CMS-driven count-ups) to the Entrance during scope analysis; a 404/fallback page was added to honor the zero-dead-sections goal. Elena (Primary) carries desktop vetting; Rahul's scenario carries the mobile-first mandate; the docent's six conversation states (greeting → answer → boundary → message → confirmation → fallback) are storyboarded in scenario 03.

**Next:** Phase 4 — UX Design

### 2026-07-12 — Phase 4: UX Design — All Pages Specified

**Agent:** Freya (Suggest mode for Scenario 01 steps 8–11; autonomous per user's blanket approval thereafter)
**Pages:** 9/9 specified; design system foundation seeded

**Artifacts Created/Updated:**
- `design-artifacts/D-Design-System/00-design-system.md` — spacing scale, type scale (display serif + grotesque sans + mono), color roles, 9 identified components, patterns
- Full page specifications (layout ASCII, spacing/type tokens, object IDs, content EN, states, technical notes, open questions) for: 1.1 Home, 1.2 Selected Works, 1.3 Speaking & Writing, 1.4 The Study, 2.1 The Archive, 2.2 Archive Case Detail, 3.1 About the Artist, 3.2 Docent Conversation (storyboard: greeting/answer/boundary/message/confirmation/fallback), 4.1 404 Fallback

**Summary:** Page 1.1 renamed "Home" by Rohan (folder now `1.1-home`). Entrance hero designed as static-HTML <1s proof with count-up StatBlocks; `?intent=speaking` param pre-frames the Study form; `headlineResult` made a required CMS publish field; 404 relies on a legacy 301 redirect map with threshold-gated fuzzy suggestions. 15 open questions logged across specs await Rohan's decisions (route structure, stat set, portrait/story voice, docent tone, contact email/response promise, legacy URL inventory, etc.).

**Next:** Resolve open questions → [W] Visual Design → Phase 5 build

---

### 2026-07-12 — Visual Design: HTML prototype of the scrolling gallery page (Home hero + Selected Works)

**Artifact:** `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.1-home/Sketches/home-prototype.html` (served via `.claude/launch.json` → "prototype", port 8321)
**Direction:** Source Serif 4 (display — swapped from Fraunces per Rohan: "more professional, easy on eyes") + Inter + JetBrains Mono; warm paper canvas `#faf8f4` / warm near-black dark `#16130f`; ochre-rust accent (placeholder); asymmetric 12-col placard wall with featured-first; count-up stats (reduced-motion aware); docent chip appears after 3s. Verified in browser, both themes. Awaiting Rohan's reaction; typeface/palette still provisional until sign-off.

### 2026-07-12 — Architecture Spine Finalized

**Artifact:** `_bmad-output/planning-artifacts/architecture/architecture-ai-portfolio-2026-07-12/ARCHITECTURE-SPINE.md` (+ .memlog.md, reviews/)
**Stack:** Next.js 16.2 LTS on Vercel (SSG/ISR) · Sanity CMS (next-sanity ^13, no SanityLive) · FastAPI+Agno 2.6 sidecar on Cloud Run free tier · gemini-3.1-flash-lite · Resend. Monorepo web/ + agent/ + studio/. 12 ADs; reviewer gate (rubric, currency, adversary) passed with fixes applied — key additions: message envelope contract, Sanity-owned docent strings, schema-as-contract, single stat query, SSE end-to-end. Visual look signed off same day (Source Serif 4 + Inter + JetBrains Mono).

### 2026-07-13 — Phase 5: Home + Selected Works Built (specs 1.1 + 1.2)

**Agent:** Claude (WDS [D] Development, steps 01–05)
**Branch:** `feature/home-selected-works` · **Plan/dialog:** `_bmad-output/implementation-artifacts/plan-home-selected-works.md`

**Built:** Monorepo foundation (web/ Next.js 16.2 SSG + studio/ Sanity schemas + shared GROQ queries per AD-11), design tokens from the signed-off palette, six components (SiteHeader, SiteFooter, RoomTitle, StatBlock, PlacardCard, DocentLauncher), and the single scrolling page: hero with CMS-derived count-up stats + asymmetric placard wall. Sanity project `weju4mib` live, dev-seeded (sample works to replace). 20/20 acceptance criteria verified; production build passes, `/` static with 1h revalidate. Deviations documented (docent chip inert until 3.2 unit; zero-count stat guard; room links 404 until their units).

**Next:** [T] Acceptance testing 1.1/1.2 → build 2.1 The Archive

### 2026-07-13 — Phase 5: The Archive Built (spec 2.1)

**Agent:** Claude (WDS [D] Development, steps 01–05, autonomous per Rohan)
**Branch:** `feature/archive` (off `feature/home-selected-works`) · **Plan/dialog:** `_bmad-output/implementation-artifacts/plan-archive.md`

**Built:** `/archive` route (SSG, 1h revalidate) — all works newest-first with year subdividers, PlacardCard `compact` variant (metadata-first index rows), new FilterBar (type chips, zero-entry kinds disabled, filtered count, 44px targets, sticky below header on mobile), URL-as-store filtering via useSyncExternalStore (`?type=paper` shareable, plurals tolerated, back/forward works), RoomTitle `as="h1"` prop. 17/17 acceptance criteria verified (mobile 375 primary, tablet, desktop, both themes, no-JS payload, lint+build clean). Deviations documented: filter applies at hydration (SSG constraint), singular param canonical, docent chip inert until 3.2, `/archive/[slug]` 404 until 2.2.

**Next:** [T] Acceptance testing (incl. real-keyboard chip pass) → build 2.2 Archive Case Detail

### 2026-07-13 — Phase 5: [T] Acceptance Testing Round 1 (units 1.1 / 1.2 / 2.1)

**Agent:** Claude (WDS [T], autonomous per Rohan) · **Report:** `_bmad-output/implementation-artifacts/testing/TR-001-2026-07-13.md`
**Result:** PASS after fixes — 4 issues found (2 medium, 2 low), all fixed and retested same-day: og/twitter social metadata + canonical (ISS-001/003), robots.txt + sitemap.xml (ISS-002), archive year subdividers h2 for heading hierarchy (ISS-004). Happy paths, error states, edge cases, design-system tokens, and a11y checks pass. OBS-01: count-up/smooth-scroll suspend under throttled automation renderers — self-healing, SSR-safe, no launch risk. **Sign-off pending Rohan:** human pass items (real-keyboard chip activation, animation feel on device, VoiceOver spot-check) + designer approval → then statuses flip to `approved`.

### 2026-07-13 — Phase 5: Archive Case Detail Built (spec 2.2)

**Agent:** Claude (WDS [D], steps 01–05, autonomous per Rohan)
**Branch:** `feature/archive-case-detail` (off `feature/archive`) · **Plan/dialog:** `_bmad-output/implementation-artifacts/plan-archive-case-detail.md`

**Built:** `/archive/[slug]` — one template, three types. Content contract extended additively (context/approach/results portable text, artifacts, related, docent case tap); CASE_QUERY with GROQ same-kind related fallback; case header with filter-preserving breadcrumb (sessionStorage — soft navs carry no referrer), headline result above the fold (366px at 375w); artifact chips new-tab; typed JSON-LD (CreativeWork/ScholarlyArticle/PresentationDigitalDocument); per-case og+canonical; case URLs in sitemap (6 total). 16/16 acceptance criteria; lint+build clean, all 4 slugs prerendered + ISR. **Awaiting Rohan:** seed re-import (or Studio content) to light up body sections/artifacts — Minimal state verified live meanwhile.

**Next:** Rohan content + human passes → [T] for 2.2 → next unit 1.3 or 1.4

### 2026-07-13 — Real Content Migrated from rohanyashraj.github.io

**Source:** old site's `data/workData.ts` + `resumeData.ts` (github.com/RohanYashraj/rohanyashraj.github.io) → `studio/seed/seed-content.ndjson` → imported by Rohan; 4 sample works deleted.
**Live dataset:** 28 works — 5 projects, 10 papers (artifact links), 13 talks; wall = SOA interpretable-ML report (pinned) · 24th GCA talk · PhD motor-fraud classifier · Health Claims Analytics (~800M scheme). Results narratives carry real resume numbers (20% claims-efficiency, ~90% processing-time cut, etc.). siteSettings untouched (careerStartYear stays Rohan's 2019; old site derived 2017 — his call). Home stats now 7+/10/13; archive 28 rows 2025→2019; sitemap 30 URLs; full case-body render path verified live (closes 2.2's pending item).
**Editorial notes for Rohan:** project dates inferred from resume periods — verify; "SOA Research" project folded into its RP01 paper; "CAS Research" kept as a project (no publication link found).

## Key Decisions

| Date | Decision | Phase | Who |
|------|----------|-------|-----|
| 2026-07-12 | Entrance gains a CMS-fed key-stats strip (years of experience, papers published, talks given) — count-up delight promoted to committed scope | Phase 3: Scenarios | Claude + Rohan |
| 2026-07-12 | 404/Fallback page added to inventory (legacy-URL redirect map + gallery-voiced recovery) | Phase 3: Scenarios | Claude + Rohan |
| 2026-07-12 | Entrance and Selected Works kept as separate views; may merge into one scrolling page in Phase 4 | Phase 3: Scenarios | Claude + Rohan |
| 2026-07-12 | Docent scrutinized fully in Scenario 03; appears ambiently (suggested taps) in 01–02 | Phase 3: Scenarios | Claude + Rohan |
| 2026-07-12 | Scenario artifacts written to `design-artifacts/` (matching Phases 1–2) rather than config's `output_folder` | Phase 3: Scenarios | Claude + Rohan |
| 2026-07-12 | Home + Selected Works = one scrolling page (nav anchors to sections); other rooms are separate routes | Phase 4: UX Design | Freya + Rohan |
| 2026-07-12 | All 15 spec open questions resolved per Freya's recommendations: 3 stats only; optional placard visuals with featured-first wall; talk links only (no embeds); speaker one-pager post-launch; contact rohanyashraj@gmail.com with 2-working-day promise + auto-ack; no search at launch, year subdividers yes; case images allowed sparingly, clients anonymized by default; About in first person with timeline; docent playful-but-precise, visit-scoped persistence, streaming with fallback; legacy redirect map derived from public old-site repo | Phase 4: UX Design | Freya + Rohan |
