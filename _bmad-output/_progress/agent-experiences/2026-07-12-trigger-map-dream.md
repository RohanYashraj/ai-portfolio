# Design Log — Trigger Map (Dream Mode)

**Date:** 2026-07-12 · **Mode:** Dream (autonomous) · **Facilitator:** Saga (WDS Analyst)

## Layer 1: WDS Form Learned

Method docs (`docs/method/*`) not present in this repo; learned form from skill assets instead:
- `data/business-goals-template.md` — 3-tier goals (⭐ ENGINE / 🚀 secondary / 🌟 tertiary), flywheel framing
- `templates/trigger-map.template.md` + `data/mermaid-formatting-guide.md` — hub doc, BG→PLATFORM→TG→DF flowchart, exact styling classes
- `templates/persona-document.template.md` — 13-section persona, 3 wants + 3 fears each with Product Promise/Answer
- `templates/feature-impact.template.md` — 5/3/1 primary vs 3/1/0 weighting
- `data/quality-checklist.md` — consistency, empowering language, cross-links

## Layer 2: Project Context

From `design-artifacts/A-Product-Brief/project-brief.md` (simplified) + brainstorm-intent:
- Gallery-retrospective portfolio for Dr. Rohan Yashraj Gupta, "the AI Actuary" (FIA, FIAI × data scientist)
- Six rooms; Agno docent agent as first exhibit; CMS single source; mobile-first
- Opportunity: own "AI Actuary" niche → speaking, consulting, career opportunities
- Success signals: rank for "AI Actuary"; "Invite Rohan to speak" converts; docent stands alone as case study
- Audiences named in brief: recruiters, conference organizers, peers

## Layer 3: Domain Research

- Recruiters spend ~55s on a portfolio; 80% ≤3 min; they judge feel/polish first, then intro, then process + results; want 5–7 best relevant works, not everything (opendoorscareers, fueler.io, profy.dev survey)
- Conference organizers vet: topical expertise + credibility (recent original work), evidence the speaker can hold a room (past talks/footage), audience fit, and a low-friction path to invite (swoogo, speakers.com, selfleadership)
- Both audiences are time-poor evaluators → validates the brief's "prove competence in 15 seconds" goal

## Layer 4: Generation Decisions

- **Primary persona = Conference Organizer** — the "Invite Rohan to speak" path is the named success signal and speaking is the fastest amplifier of the "AI Actuary" brand (talks → visibility → search ownership → more opportunities). The engine.
- Secondary = Recruiting/consulting lead (direct opportunity conversion); Tertiary = peer/aspiring actuary (spreads the term, cites, follows).
- Goals framed as 3 tiers: own the niche (ENGINE) → convert visits to opportunities → stay effortlessly alive via CMS.
- Feature impact scored per template weighting.

## Layer 5: Self-Review

Checked against `data/quality-checklist.md`:
- ✅ Hub + 3 personas + feature impact; mermaid follows formatting guide (padding, emojis, 3+3 drivers, styling classes)
- ✅ 3 wants + 3 fears per persona, each with Promise/Answer tied to a specific room/feature
- ✅ Tier language consistent (⭐ ENGINE / 🚀 / 🌟); cross-links present; empowering language
- ⚠️ Targets/timelines are proposed defaults (no baseline analytics exist) — flagged for Rohan to adjust
- Score: 9/10 (gap: metrics need real baselines). One iteration; threshold met.

## Output

`design-artifacts/B-Trigger-Map/` — trigger-map.md, personas/02–04, feature-impact-analysis.md
