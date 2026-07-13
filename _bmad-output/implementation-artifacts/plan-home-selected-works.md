# Implementation Plan — Home + Selected Works (specs 1.1 + 1.2)

**Date:** 2026-07-12 · **Branch:** `feature/home-selected-works` · **Activity:** WDS Phase 5 [D] Development
**Specs:** `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.1-home/1.1-home.md`, `1.2-selected-works.md`
**Architecture:** `_bmad-output/planning-artifacts/architecture/architecture-ai-portfolio-2026-07-12/ARCHITECTURE-SPINE.md`
**Visual reference:** `design-artifacts/C-UX-Scenarios/01-elenas-three-minute-vetting/1.1-home/Sketches/home-prototype.html` (signed off: Source Serif 4 + Inter + JetBrains Mono, warm paper/near-black themes)

---

## Work Item Inventory (sequenced)

### 0. Foundation (prerequisite — repo is greenfield) — LARGE, split:
- 0a. Scaffold `web/` — Next.js 16.2 LTS app (App Router, SSG), monorepo layout per Structural Seed (S)
- 0b. `web/styles/tokens.css` — spacing scale, type scale, color roles, `data-theme` attribute, from `D-Design-System/00-design-system.md` + signed-off prototype (M)
- 0c. Scaffold `studio/` — Sanity Studio with schemas: `work` (kind: project·paper·talk, `headlineResult` required, `selected` flag, optional visual, immutable slug), `siteSettings`, `docentSettings` singleton (M)
- 0d. `studio/` exported GROQ stat queries (years/papers/talks — single definition, AD-11) (S)
- 0e. `web/lib/sanity.ts` — published-perspective client (next-sanity ^13, no SanityLive) (S)
- (agent/ sidecar NOT in this unit — deferred to docent build, AD-2 means the page works without it)

### 1. Shared components (used by every page)
- 1a. SiteHeader — name → `/`, room nav (Selected Works · About · Archive · Speaking · Contact), anchors to `#selected-works`, collapses to menu <768px, theme toggle (M)
- 1b. SiteFooter — contact path, socials, no dead links (S)
- 1c. RoomTitle (incl. hero variant) (S)
- 1d. StatBlock — mono numerals, count-up on first view (IntersectionObserver, one-shot), static under reduced-motion, final values in HTML for no-JS (M)
- 1e. PlacardCard — title/date·type/result, optional lazy visual with aspect-ratio placeholder, featured (larger) variant, type-in caption ≤400ms one-shot, reduced-motion static (M)
- 1f. DocentLauncher — fixed bottom-right, chip after 3s, dismissible, never re-interrupts; renders only after `/health` probe success; hidden entirely when agent off (M) — *stubbed behind the health check this unit; panel comes with spec 3.2*

### 2. Page assembly — `web/app/page.tsx` (one scrolling page)
- 2a. Entrance hero: name / niche / anchor / stat strip / room cue (smooth-scroll to `#selected-works`) (M)
- 2b. Selected Works section: room title + subtitle, gallery wall (3–5 `selected` works, newest-first with pin override, asymmetric wall — never uniform grid), archive cue link (M)
- 2c. Stats data: derived counts via shared GROQ queries; strip hidden on fetch failure (never zeros); stat clicks → Archive?type=paper / Speaking (S)
- 2d. SEO: title "Dr. Rohan Yashraj Gupta — the AI Actuary", meta description, JSON-LD Person schema, "AI Actuary" in H1 area (S)
- 2e. Seed Sanity with real starter content (works + settings) so the page renders truthfully (S)

### 3. Tests / verification
- 3a. Reduced-motion, dark/light, mobile (375px) + desktop pass in browser (S)
- 3b. No-JS first paint check: hero + placard text present in HTML payload (S)

## Dependency order
0a → 0b → (0c → 0d → 0e) → 1a–1f → 2a–2e → 3

## Acceptance Criteria (verified Step 4, 2026-07-13)

- [x] Hero (name, niche, anchor) is static HTML in the payload — content visible <1s, zero blocking scripts (curl: hero text + placards in raw HTML)
- [x] Positioning statable after one viewport: who / what ("the AI Actuary") / how much
- [x] Stat strip: 3 stats (years / papers / talks), CMS-derived counts, count-up on first view
- [x] Stats static under prefers-reduced-motion (matchMedia gate skips animation); final values render if JS pending (SSR'd values, `12<!-- -->+` artifact displays fine)
- [x] Stat strip hidden entirely on CMS fetch failure — getStats() → null path; observed pre-seed
- [x] Stat clicks: papers → `/archive?type=paper`; talks → `/speaking` (hrefs verified; targets are future build units)
- [x] Room cue smooth-scrolls to `#selected-works` (observed mid-animation)
- [x] Header: name → `/`, five room links, collapses to ☰ <768px (menu open/close verified)
- [x] Selected Works: 4 CMS-flagged works, pinned-first then newest-first (GROQ `coalesce(pinOrder, 9999) asc, date desc`), featured-first larger placard
- [x] Asymmetric wall on desktop (72% width, alternating alignment); single column mobile
- [x] Placard: title, year-first `date · type` mono metadata, one-line result; → `/archive/[slug]`
- [x] Placard text at SSR; optional visual lazy-loads with aspect-ratio box (code path; no images in seed — schema requires alt)
- [x] Type-in caption: one-shot IntersectionObserver, 400ms clip reveal, CSS-gated off under reduced-motion
- [x] Sparse state: wall maps only fetched works, no placeholder branch exists
- [x] Archive cue → `/archive`
- [x] Docent launcher renders only after successful `/api/docent/health` probe (AD-2); currently hidden (no agent) and page fully functional
- [x] Chip after 3s, dismissible, sessionStorage prevents re-interrupt (code-verified; unreachable until agent deploys)
- [x] SEO: title, meta description, JSON-LD Person all contain "the AI Actuary"; single H1
- [x] Both themes match signed-off palette; all values from tokens.css
- [x] All content resolves from Sanity (AD-1); UI labels only in code

**Step 4 additional checks:** tablet 768 (full nav, no overflow), keyboard tab order + visible focus rings, 44×44 touch targets on mobile (fixed — header buttons were 32px), WCAG AA contrast measured: light 16.86/4.90/5.87, dark 6.28 muted / 6.96 accent. Interactive states not applicable this page: disabled/loading/error/success (no forms until 1.4 The Study).

---

## Environment Baseline (Step 2 — 2026-07-12)

- **Tooling:** Node v25.9.0, npm 11.12.1, Python 3.14.3 (agent/ later)
- **Scaffold:** `web/` = create-next-app → Next.js 16.2.10 (App Router, TS, ESLint, no Tailwind — custom tokens.css per design system), React 19.2.4, `next-sanity@^13` installed
- **Dev server:** `npm run dev --prefix web` via `.claude/launch.json` → "web" (autoPort; port 3000 had a stray next-dev that was killed). Default page renders, no console errors, HMR on (Turbopack)
- **Directories created:** `web/components/`, `web/lib/`, `web/styles/` per Structural Seed
- **Design tokens:** source of truth accessible at `design-artifacts/D-Design-System/00-design-system.md` + signed-off prototype HTML; `web/styles/tokens.css` to be authored in Step 3
- **Test baseline:** no test suite exists (fresh scaffold — no runner installed). Verification per spec will be browser-based acceptance checks; unit tests only where logic warrants (stat query fns)
- **Pre-existing issues:** 2 moderate npm audit advisories in scaffold deps (non-blocking, noted); `studio/` not yet scaffolded — needs a Sanity project ID (Rohan input) or placeholder env
- **Env vars needed before real content:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (public read, CDN)

---

## Step 3 Notes (2026-07-13)

**All plan items implemented** (commits `0faf1d8` → `10d8b3b` on `feature/home-selected-works`).

**Deviations / decisions:**
- `turbopack.root` set to repo root so `web/` can import the shared GROQ definitions from `studio/lib/queries.ts` (AD-11); files outside the project root are otherwise unresolvable under Turbopack
- Font tokens (`--font-display/default/mono`) declared on `body`, not `:root` — next/font injects its variables on body, and CSS custom properties resolve where declared
- DocentLauncher chip click is a no-op this unit: DocentPanel is spec 3.2's build unit. Launcher never shows anyway until an agent deployment passes the health probe (AD-2 Docent-off state is the current reality)
- Placard/stat link targets (`/archive`, `/archive/[slug]`, `/speaking`, `/about`, `/contact`) 404 until those page units are built — hrefs are per spec
- Sanity Studio pinned to v4 (CLI suggests 7.x exists); works fine, upgrade deliberately deferred — separate task, not mid-story
- Dev seed (`studio/seed/seed-dev.ndjson`) imported by Rohan: siteSettings + docentSettings + 4 sample works. **Sample works must be replaced with real content before launch**; LinkedIn URL to be verified by Rohan
- SSR stat values contain React text-node separators (`12<!-- -->+`) — displays correctly as "12+" with JS pending

**Verified in browser:** hero + placards + JSON-LD Person in raw HTML payload (no-JS proof); fonts (Source Serif 4 / Inter / JetBrains Mono computed); light + dark themes incl. persistence; desktop nav ≥768px; mobile menu open/close; 3-across mobile stat strip; smooth-scroll cue; asymmetric wall with featured-first; placard hover accent. Reduced-motion paths are CSS-media-gated + matchMedia-checked (code-verified).

---

## Spec Deviations (Step 5, 2026-07-13)

### DocentLauncher chip
- **Spec said:** chip onClick → DocentPanel opens pre-seeded (1.1 `home-docent-launcher-suggestion`)
- **Implementation does:** chip renders and is dismissible, but tapping it does nothing yet
- **Reason:** DocentPanel is spec 3.2's build unit. The launcher is unreachable today anyway — it renders only after a successful agent health probe (AD-2), and no agent is deployed. Wire the panel in the 3.2 unit.

### Stat-strip zero guard
- **Spec said:** strip hidden when "CMS fetch fails" (1.1 Stats-unavailable state)
- **Implementation does:** also hides the strip when careerStartYear is missing or papers/talks count is 0
- **Reason:** "never zeros/placeholders" — a "0 research papers" stat would undermine the credibility hypothesis worse than no strip.

### Link targets to unbuilt rooms
- **Spec said:** stat/placard/nav clicks route to Archive, Speaking, About, Contact
- **Implementation does:** correct hrefs; targets 404 until those page units are built
- **Reason:** inter-unit dependency, not a defect. `/archive` (2.1) is the highest-leverage next unit — placards and two stats link to it.

## PR Description (prepared)

**Title:** Home + Selected Works: the scrolling gallery entrance (specs 1.1 + 1.2)

**Summary:** First build unit of the rohanyashraj.com rebuild. Monorepo foundation per the Architecture Spine (web/ Next.js 16.2 SSG + studio/ Sanity schemas as content contract), plus the single scrolling page: entrance hero with CMS-derived count-up stats and the Selected Works placard wall. Static-first: the whole credibility proof is in the HTML payload.

**Changes:**
- `web/styles/tokens.css` — design tokens from D-Design-System, both themes
- `studio/schemas/` — `work`, `siteSettings`, `docentSettings` (AD-1/9/10); `studio/lib/queries.ts` — the one GROQ definition set (AD-11); `studio/seed/seed-dev.ndjson` — dev seed (sample works, replace before launch)
- `web/lib/` — Sanity CDN client (published perspective), content fetchers with hide-on-failure semantics, health-checked agent client (AD-2)
- `web/components/` — SiteHeader, SiteFooter, RoomTitle, StatBlock, PlacardCard, DocentLauncher (+ ThemeToggle)
- `web/app/page.tsx` — page assembly, JSON-LD Person, generateMetadata from CMS
- `web/app/api/docent/health/route.ts` — agent liveness proxy (AD-7)

**Testing:** `npm run dev` in web/ (needs `.env.local`, see web/README) → verify hero <1s, count-up on view, wall order (pinned → newest), theme toggle persistence, mobile menu at <768px, `curl localhost:3000 | grep "Dr. Rohan"` for the no-JS proof. `npm run build` passes; `/` prerenders static, revalidate 1h.

**Acceptance criteria:** 20/20 verified (see checklist above). No test suite existed at baseline; none added — browser-based acceptance per spec, unit tests deferred until logic warrants.

## Recommended Next Steps

1. **[T] Acceptance Testing** against specs 1.1/1.2 for an independent pass
2. **Replace sample works** in Studio with real pieces (and verify LinkedIn URL)
3. **Next build unit: 2.1 The Archive** — most inbound links from this page point there
4. Later: Sanity Studio v4→v7 upgrade; Sanity webhook → `/api/revalidate` when deploying to Vercel
