# Brainstorm Intent — Portfolio Redesign (rohanyashraj.com)

Session: 2026-07-12 · Status: complete · Input for product brief / PRD.

## Positioning [DECIDED]
- Dr. Rohan Yashraj Gupta as **"the AI Actuary"** — balance the actuarial angle, don't scream it.
- Subtitle anchor: "actuary (FIA, FIAI) x data scientist".
- SEO ambition: own the term "AI Actuary" in search.

## Core Concept [DECIDED]
- Metaphor: **gallery retrospective ("Selected Works")** — generous whitespace, few pieces given big space, placard-style captions, a dash of magazine typography, embedded AI agent as the gallery **docent**.
- Guardrail: must unambiguously read as a portfolio site; purpose never in doubt.
- Synthesis: gallery retrospective IS highlights-first; docent resolves interactive-vs-effortless tension; the docent itself is the first exhibit (self-proving "AI Actuary" brand).

## Site Structure — 6-Room Sequence [DECIDED]
1. Entrance — name + niche line
2. Selected Works — recent highlights
3. About the Artist — short human story + one portrait
4. The Archive — all projects/papers/talks, filterable
5. Speaking & Writing
6. The Study — contact form + docent
Docent agent available in every room.

## Key Features [DECIDED]
- **Highlights-first**: 15-second first screen leads with proof of work; content visible <1s.
- **Agno docent agent**: embedded chat about Rohan; "concierge of highlights" — tap a card, ask about it; suggested taps keep cognitive load near zero; doubles as contact path; answers ONLY from CMS content with graceful fallback to email.
- **Contact form** with honeypot antispam.
- **Single CMS source of truth** (Sanity-style) feeding both pages and agent — update once, both learn. Effortless updatability is an irreducible requirement.
- First principles (all pass): prove competence fast, be contactable, be effortlessly updatable.

## Design Principles & Guardrails
- Interactive but low cognitive load; fully mobile-friendly [user direction].
- Harmony rule: "delight in the details, never in the way".
- NO: skill-logo walls (skills only shown inside work), buzzword bio (one human sentence), carousels/intro spinners, dead/unmaintained sections (don't ship them), multiple portraits (one great portrait, used once).
- Resilience: site must be fully excellent with agent off; animations degrade on low-power devices (test mid-range Android).
- Delight (optional polish, not committed scope): placard captions type in on scroll; docent greets by time-of-day/referral; one scripted agent easter egg; subtle count-up stats; gallery-lighting dark mode.

## Success Signals (HOPE)
- Rank for / own "AI Actuary".
- Highlights read as a thought-leader timeline; "Invite Rohan to speak" path converts.
- Docent agent stands alone as a case study.

## Still Open
- CMS choice ("Sanity-style" — exact platform TBD).
- Future "Notes" wing (blog-like) — deferred; no dead sections rule applies.
- Which delight/JOY details make scope.
- Visual specifics (typography, palette, dark mode) beyond gallery/magazine direction.
