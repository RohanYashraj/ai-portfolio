# Adversarial Review — ARCHITECTURE-SPINE.md (ai-portfolio)

Reviewer stance: for each finding, two units one level below the spine each obey every AD to the letter, yet the pair builds incompatibly. Every finding proposes a closing AD (new or tightened).

Verdict: **The spine's boundaries are right but its contracts are missing — six of eight findings are "two ADs both satisfied, one entity with two owners." Not buildable by independent units until the contract ADs below land.**

---

## F1 — `/api/message` has two producers and no schema (HIGH)

**Pair:** web contact-form team vs agent team (`agent/app.py` message-taking).

**Attack:** AD-4 says both POST to `/api/message`. The form team, reading spec 4.x contact fields, implements `{ name, email, message, honeypot }` with the honeypot field required-empty and per-IP rate limiting. The agent team forwards `{ sender, contact, body, transcriptContext, source: "docent" }` — no honeypot field (an LLM pipeline has no hidden form field), and every request arrives from one Cloud Run egress IP. Both teams satisfy AD-4 verbatim. Result: agent messages are either 400-rejected (missing honeypot), silently rate-limited into a black hole after the second visitor of the hour, or the form team loosens validation and destroys the spam defense. Auto-ack copy is also forked: does the docent-captured sender get the same acknowledgement email as the form sender? AD-4 says "auto-acknowledgement to sender" — the agent team may not even *have* a validated sender email (docent captures free text).

**Also an AD-7 gap:** `/api/message` is a public Vercel route. The shared-secret header protects web→agent, but nothing protects agent→web. Anyone can POST forged "docent messages" straight to it.

**Fix — new AD-8 (Message envelope contract):**
`/api/message` accepts exactly one envelope: `{ source: "form" | "docent", name, email, message, meta? }`, versioned in one schema file owned by `web/` (`web/lib/message-schema.ts` + a mirrored JSON Schema the agent validates against in CI). `source: "form"` requires honeypot + per-IP rate limit; `source: "docent"` requires the same shared-secret header as `/api/docent` (reverse direction), is rate-limited per-conversation, and requires a validated email before the agent may forward (no email captured → docent must instruct the visitor to use the form; no auto-ack without a verified sender field). Auto-ack template is single-sourced in `web/` for both sources.

## F2 — Docent-visible copy has three plausible owners (HIGH)

**Pair:** web DocentPanel team vs agent team vs studio schema author.

**Attack:** Who owns the suggested-tap chips ("Ask about my pricing work"), the honest-miss response text (AD-5, "spec Frame 3"), the greeting, and the offline/hide-launcher fallback line?
- Web team: "chips and greeting are UI microcopy — AD-1 explicitly exempts microcopy, they're labels; I hardcode them in DocentPanel."
- Agent team: "honest-miss and greeting are agent behavior — they live in my system prompt in `agent/app.py`."
- Studio author: "AD-1 says *every fact a visitor can read* resolves from Sanity — suggested taps reference works ('ask about X'), that's content; I add a `docentSettings` document."

All three readings are letter-compliant. Result: greeting duplicated in web (pre-connection placeholder) and agent (first SSE message), diverging on the first Sanity edit; suggested taps hardcoded in web go stale when the work they reference is unpublished — exactly the staleness AD-1 exists to prevent.

**Fix — tighten AD-1 + new AD-9 (Docent surface ownership):**
Define "UI microcopy" as: text that references no Sanity-managed fact and survives any content change (button labels, form labels, aria text). Everything else is content. Add a `docentSettings` singleton in Sanity owning: greeting, suggested-tap chips (as references to `work` docs + template strings, so unpublishing a work removes its chip), honest-miss template, and offline fallback line. Web renders chips/fallback from it; agent injects greeting/honest-miss from it at request time. Neither repo may hardcode any of these strings.

## F3 — The GROQ-visible content shape has no single owner (HIGH)

**Pair:** studio schema author vs web page teams vs agent `knowledge.py`.

**Attack:** Three consumers in two languages read the same dataset with no shared contract. AD-1/AD-5 are both satisfied while: (a) studio renames `headlineResult` → `resultHeadline` in a schema refactor — web breaks at build (caught), agent breaks at runtime (silent honest-misses for everything, AD-5's degrade path *masks* the breakage per the errors convention); (b) web queries filter `kind == "project"` while agent queries `_type == "project"` because the agent author read the Structural Seed's "one `work` type" note differently; (c) "`headlineResult` required for publish" is a Studio-validation rule — the agent, reading the public dataset directly, has no idea drafts/legacy docs may lack it. Also: which dataset perspective? `next-sanity` defaults can include drafts in preview; the agent must never answer from a draft, but no AD says so.

**Fix — new AD-10 (Content contract is the studio schema, exported):**
`studio/` owns the content shape and exports it as a machine artifact (`studio/schema-contract.json`: type names, `kind` enum values, required-for-publish fields, slug fields). Both `web/` and `agent/` CI validate their GROQ queries/field access against this artifact; a schema change that breaks either consumer fails the studio deploy, not the consumer's runtime. Both consumers query only published documents (`perspective: "published"` / `!(_id in path("drafts.**"))`) — state it as a rule, since AD-5's silent-degrade convention otherwise hides contract breaks indefinitely.

## F4 — Health probe semantics are undefined, and the warm-up trick fights min-instances=0 (MEDIUM)

**Pair:** web `lib/` agent-client author vs agent `app.py` author.

**Attack:** AD-2: "every docent UI element renders only after a successful health probe." Web author implements a 1.5s-timeout `GET /api/docent/health` on page load (it must be fast — AD-3's paint budget). Agent author implements `/health` as a real readiness check that touches Sanity. Cloud Run cold start at min-instances=0 is 3–10s for a Python container. Both units are letter-compliant; the composed system *never shows the docent to the first visitor in any idle window* — the exact visitor (a recruiter clicking a fresh link) the product exists for. The Structural Seed even celebrates the probe "doubles as the warm-up call," i.e., the probe is *expected* to hit cold starts. Also unpinned: probe once per session or per page? Does a failed probe retry? Two page teams will answer differently and the launcher will flicker in/out across navigations.

**Fix — tighten AD-2:**
Specify the probe contract: `/health` returns `200 {"ok":true}` with no downstream calls (liveness, not readiness); web probes once per session (sessionStorage), fire-and-forget on load with one retry after 5s specifically to absorb cold start; docent UI renders on the retry success (late-appearing launcher is allowed; flicker-removal is not — once shown, stays shown for the session, with in-conversation errors handled inside the panel).

## F5 — Slugs are the "shared key" of three systems but nobody owns their stability (MEDIUM)

**Pair:** studio author (slug field, freely editable) vs web redirects/404 team vs agent (docent pointers deep-linking `/archive/[slug]`).

**Attack:** Conventions say "slugs are the shared key between pages, redirects, and docent pointers." AD-6 maps *legacy github.io* URLs only. Studio author edits a slug post-launch (typo fix) — Sanity happily allows it, ISR regenerates the new path, the old path 404s. The 404 team's fuzzy-suggestion threshold may or may not catch it; the docent, retrieving live (AD-5), immediately emits the *new* slug — so the docent is fine while every external link, and every redirect the AD-6 team wrote against the old slug, is dead. Three teams, all compliant, one broken entity: URL identity.

**Fix — new AD-11 (Slug immutability + self-redirects):**
Slugs are write-once after first publish (Studio schema `readOnly` once published, enforced in the schema — studio owns this). If a slug must change, the studio flow requires adding the old slug to a `redirects` array on the document; `web/` builds its 301 map from *both* `next.config` legacy entries and document-level `redirects` (Sanity → ISR path, so no redeploy — consistent with AD-3).

## F6 — "Derived counts" will be derived twice, differently (MEDIUM)

**Pair:** web stats/count-up team vs agent answering "how many papers has Rohan published?"

**Attack:** AD-1: stats "derived by counting Sanity documents." Web counts at ISR-build time with its filter (`kind=="paper" && defined(headlineResult)`); agent counts live with its own GROQ (`kind=="paper"`), possibly including a doc published since the last revalidation or excluded by the web filter. Homepage says 14, docent says 15 in the same viewport. Both letter-compliant; the visible contradiction is *worse* for the trust goal than a stale number.

**Fix — tighten AD-1:**
Stat definitions (the exact GROQ predicates per stat) live in one place: a `stats` GROQ fragment exported from the studio contract (see AD-10) or a Sanity-stored definition; web and agent both execute that shared predicate verbatim. Any stat the docent may speak must be one the site displays, using the same query.

## F7 — The docent transport contract is unstated: SSE through a serverless proxy (MEDIUM)

**Pair:** web `/api/docent` proxy author vs agent `/chat (SSE)` author.

**Attack:** Structural Seed pins agent-side SSE; AD-7 pins browser→web proxy→Cloud Run. Nothing pins what the *proxy* speaks. Web author, on Vercel serverless with default runtime, buffers the upstream and returns one JSON blob (letter-compliant with every AD); DocentPanel author builds a token-streaming UI against SSE. Or: proxy streams but exceeds the Vercel function duration cap mid-answer, truncating silently — and the errors convention says degrade silently. Also unpinned: request shape of `/api/docent` (conversation id? history sent per-turn, since AD-4 forbids a message DB — is there a *conversation* store? Nothing says the agent may not keep one, and Agno defaults to session storage — a second stateful owner nobody declared).

**Fix — new AD-12 (Docent transport contract):**
`/api/docent` is a streaming pass-through: Edge/streaming-capable runtime, SSE end-to-end, browser sends `{ sessionId, messages[] }` with the client owning conversation history (agent stateless per request — Agno session storage off; this is the AD-4-consistent "no store" answer stated explicitly). Define the terminal SSE event so truncation is detectable and surfaces an in-panel retry rather than silent degrade.

## F8 — "No content in code" vs `next.config` redirect map and 404 suggestions (LOW)

**Pair:** AD-6 owner vs AD-1 owner.

**Attack:** AD-6 puts the legacy redirect map in `next.config` (code, redeploy to change) and says recurring 404s "feed back into the redirect map" — a content-update path that violates AD-3's "webhook → ISR is the only content-update path" and AD-1's spirit (URL mappings are visitor-facing facts). The fuzzy-suggestion threshold's candidate list is also a content read — from where, at 404-render time, on a static 404 page?

**Fix — tighten AD-6:**
Legacy (finite, known at cutover) map may live in `next.config`; all *post-cutover* mappings use the document-level `redirects` mechanism of AD-11 (Sanity-sourced, no redeploy). 404 fuzzy suggestions match against the ISR-cached slug list (a small static JSON regenerated on publish webhook), keeping the 404 page static per AD-3.

---

## Summary of proposed spine changes

| # | Action |
| --- | --- |
| AD-1 | Tighten: define "UI microcopy"; single shared stat predicates (F2, F6) |
| AD-2 | Tighten: pin `/health` semantics, once-per-session probe, cold-start retry (F4) |
| AD-6 | Tighten: post-cutover redirects via Sanity; 404 suggestions from cached slug list (F8) |
| AD-8 | New: `/api/message` envelope schema, per-source validation, agent-direction auth (F1) |
| AD-9 | New: `docentSettings` singleton owns all docent-visible copy (F2) |
| AD-10 | New: studio-exported schema contract; published-perspective-only reads; CI validation both consumers (F3) |
| AD-11 | New: slug immutability + document-level redirects (F5) |
| AD-12 | New: docent transport contract — SSE end-to-end, client-owned history, stateless agent (F7) |
