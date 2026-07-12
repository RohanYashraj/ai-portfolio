# Feature Impact Analysis: ai-portfolio

> How each feature serves the personas' driving forces — strategic input for scope decisions

**Created:** 2026-07-12

## Scoring

**Primary — Elena ⭐:** High = 5 | Medium = 3 | Low = 1
**Others — Rahul 💼 / Ananya 🎓:** High = 3 | Medium = 1 | Low = 0

**Max Possible Score:** 11 (3 personas)
**Must Have Threshold:** 8+ or Primary High (5)

---

## Prioritized Features

| Rank | Feature | Elena ⭐ | Rahul 💼 | Ananya 🎓 | Score | Decision |
| ---- | ------- | ------- | ------- | -------- | ----- | -------- |
| 1 | Entrance — name + "AI Actuary" niche line (FIA, FIAI anchor) | 5 | 3 | 3 | 11 | Must Have |
| 2 | AI docent agent (Agno, CMS-grounded, message-taking) | 5 | 3 | 3 | 11 | Must Have |
| 3 | Selected Works — highlights-first, placard cards | 5 | 3 | 1 | 9 | Must Have |
| 4 | Speaking & Writing + "Invite Rohan to speak" path | 5 | 1 | 3 | 9 | Must Have |
| 5 | The Study — contact form (honeypot antispam) | 5 | 3 | 1 | 9 | Must Have |
| 6 | The Archive — filterable projects/papers/talks, one tap deep | 3 | 3 | 3 | 9 | Must Have |
| 7 | CMS single source of truth (pages + agent knowledge) | 3 | 3 | 1 | 7 | Must Have* |
| 8 | Mobile-first + graceful animation degradation | 3 | 3 | 1 | 7 | Must Have* |
| 9 | About the Artist — human story + one portrait | 1 | 1 | 3 | 5 | Consider |
| 10 | Gallery-lighting dark mode | 1 | 1 | 1 | 3 | Defer |
| 11 | Placard captions typing in on scroll | 1 | 1 | 1 | 3 | Defer |
| 12 | Count-up stats, docent time-of-day greeting, easter egg | 1 | 1 | 0 | 2 | Defer |
| 13 | "Notes" wing (blog) | 1 | 1 | 1 | 3 | Defer (until content exists) |

\* Below the 8-point threshold but non-negotiable brief constraints: CMS effortlessness and mobile-friendliness are irreducible requirements that protect every persona's "stale/abandoned site" fear. Treated as Must Have.

---

## Decisions

**Must Have MVP (Primary High OR 8+):**
- Entrance niche line (11) — the 15-second positioning proof
- AI docent agent (11) — the first exhibit; self-proving "AI Actuary"
- Selected Works (9) — work before words for time-poor evaluators
- Speaking & Writing + invite path (9) — Elena's conversion moment
- The Study contact form (9) — kills the dead-channel fear
- The Archive (9) — Rahul's depth, Ananya's learning material
- CMS single source (7*) and mobile-first (7*) — irreducible constraints

**Consider for MVP:**
- About the Artist (5) — small build cost, Ananya's key room, humanizes the gallery; recommend including (it's Room 3 of the committed six-room sequence)

**Defer (Polish, per "delight in the details, never in the way"):**
- Dark mode (3), typed placard captions (3), count-up stats / greetings / easter egg (2) — post-launch delight candidates
- Notes wing — only when content exists (no dead sections rule)

---

## Strategic Rationale

The top six features map one-to-one onto Elena's driving forces (credibility → Entrance + Selected Works; stage evidence → Speaking & Writing; frictionless invite → Study + docent), while simultaneously covering Rahul's proof-and-depth needs (Selected Works → Archive) and Ananya's learning path (Archive + docent). The docent scores maximum despite being the riskiest build because it is the positioning: turning it off must leave a fully excellent site (brief constraint), but shipping it is what makes "AI Actuary" demonstrated rather than claimed.

Development order suggestion (aligned with the flywheel): Rooms 1–2 + Study first (prove & convert), Archive + Speaking next (depth & Elena), docent as the crowning exhibit, delight details last.

---

## Related Documents

- **[trigger-map.md](trigger-map.md)** — Visual overview
- **[personas/02-Elena-the-Event-Curator.md](personas/02-Elena-the-Event-Curator.md)** — Primary persona
- **[personas/03-Rahul-the-Recruiting-Lead.md](personas/03-Rahul-the-Recruiting-Lead.md)** — Secondary persona
- **[personas/04-Ananya-the-Aspiring-AI-Actuary.md](personas/04-Ananya-the-Aspiring-AI-Actuary.md)** — Tertiary persona

_Generated with Whiteport Design Studio framework — strategic input for Phase 3: UX Scenarios_
