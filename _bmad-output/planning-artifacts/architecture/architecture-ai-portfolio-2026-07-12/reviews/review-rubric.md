# Rubric Review — ARCHITECTURE-SPINE.md (ai-portfolio)

**Reviewer:** rubric reviewer (automated)
**Date:** 2026-07-12
**Subject:** `_bmad-output/planning-artifacts/architecture/architecture-ai-portfolio-2026-07-12/ARCHITECTURE-SPINE.md`
**Verdict:** PASS WITH FINDINGS — the spine fixes the right divergence points and the ADs are mostly enforceable, but one real divergence seam (the web↔agent chat contract) is neither decided nor deferred, and two operational sub-dimensions are silent.

---

## Checklist item 1 — Fixes the real divergence points; misses none

**Mostly yes.** The seven ADs map cleanly onto the genuine seams for this system:

- Content forking (AD-1) — the project's founding failure mode; correctly the first invariant.
- Site/agent coupling (AD-2) — matches spec Frame 6 ("fully excellent with the agent off").
- Rendering model (AD-3) — locks the <1s paint / 15-second-proof promise structurally.
- Message duplication (AD-4) — form vs. docent message-taking is exactly the two-inboxes trap; single `/api/message` route kills it.
- Agent knowledge duplication (AD-5) — pre-empts the "spin up a vector store" reflex that would re-create the staleness AD-1 exists to prevent.
- Legacy URLs (AD-6) and secrets (AD-7) — both real, both correctly scoped.

The Capability → Architecture Map covers all 9 pages/views from `design-artifacts/C-UX-Scenarios/00-ux-scenarios.md` (coverage matrix confirms 9/9), the docent's 6 frames, stats, messaging, and 404 recovery. No feature-level capability from the UX scenarios is orphaned.

**One miss (Finding F1, MAJOR):** the **web↔agent chat API contract** is a live divergence seam left undecided. `web/DocentPanel` and `agent/app.py /chat (SSE)` are two independently buildable units on opposite sides of an HTTP boundary, in different languages, on different platforms. The spine names SSE only in a structural-seed comment; nothing decides:
- the request/response/event shape of `/chat` (SSE event types, error events, done signal);
- **who owns conversation state/history** — does the browser resend the transcript, does the agent hold sessions (contradicting min-instances=0 statelessness?), is there a session id?
- how the honest-miss (Frame 3) and message-capture handoff (AD-4 forwarding) are signalled in the stream.

Two solo-built-at-different-times units can absolutely diverge here (e.g., agent built stateful-session-first, panel built stateless-replay-first). This belongs as an AD, a convention row, or at minimum an explicit Open Question. Right now it is silent, which the spine's own format treats as unowned.

## Checklist item 2 — Every AD's Rule is enforceable and prevents its divergence

- **AD-1** — enforceable ("no content in code except UI microcopy"; "stats derived by counting Sanity documents"). A reviewer or grep can catch violations. Prevents its divergence. ✔
- **AD-2** — enforceable: "only through one health-checked HTTP client," "no build-time or import-time dependency," "every docent UI element renders only after a successful health probe" are all checkable in code review. ✔
- **AD-3** — enforceable: SSG/ISR only, content in HTML payload, webhook→ISR as the only update path. ✔
- **AD-4** — enforceable and precise (single route, single sender, "the agent never sends email directly," "no message database"). ✔
- **AD-5** — enforceable ("the agent's only knowledge tool is scoped GROQ queries"; pinned model id). ✔
- **AD-6** — the 301-map and 404-page clauses are enforceable. **Finding F4 (MINOR):** the last clause — "Recurring unknown 404 paths feed back into the redirect map" — is a process aspiration, not an enforceable rule, and it depends on 404-path telemetry from the analytics tool that is *deferred*. Either drop the clause to Deferred or note the dependency.
- **AD-7** — enforceable ("the browser holds zero secrets"; shared-secret header; server-only env). ✔

No AD has a rule that fails to prevent its stated divergence; F4 is the only clause that isn't currently actionable.

## Checklist item 3 — Nothing under Deferred could let two units diverge

Reviewed all five deferred items:

- **Analytics choice** — genuinely swappable, no cross-unit contract. Safe (modulo the AD-6 telemetry dependency, F4).
- **Vector retrieval** — safely fenced: AD-5 stands until explicitly revisited. Safe.
- **PDF one-pager / archive search** — no footprint. Safe.
- **Notes/blog wing** — explicitly *not* pre-provisioned in the `work` model; a future add is additive. Safe.
- **Staging/CI gates** — solo project, Vercel previews; reasonable. Safe.

The deferral set is clean. The dangerous undecided item (F1) is a problem precisely because it is **not** in Deferred — it is simply absent.

## Checklist item 4 — Named tech plausibly current

Next.js 16.2 LTS, Agno 2.6.x, and `gemini-3.1-flash-lite` (GA id) were already web-verified per review instructions; taken as given. Remaining entries (React bundled with Next 16, Python 3.12+, FastAPI/Resend/next-sanity "current") are plausible and appropriately loose for a solo project. AD-5's "GA id only" constraint on the model id is a good anti-drift touch. ✔

## Checklist item 5 — Initiative-altitude dimensions: decided, deferred, or open?

Dimension sweep:

| Dimension | Status |
| --- | --- |
| Paradigm / layering | Decided (Design Paradigm) |
| Content & data model | Decided (AD-1, conventions) |
| Rendering & delivery | Decided (AD-3) |
| Integration contracts | **Partially silent** — Sanity and Resend contracts decided; web↔agent chat contract silent (F1) |
| Security / secrets | Decided (AD-7) |
| Deployment & CI | Decided (Structural Seed: push→Vercel, Cloud Run GitHub integration, `sanity deploy`) |
| Environments | Decided (production + previews; staging explicitly deferred with rationale) |
| Infra & cost posture | Decided at hosting level (free tiers, min-instances=0, health-probe warm-up) — **but see F2** |
| Operations: logging | Decided (conventions row: degrade silently, log loudly) |
| Operations: monitoring/alerting | **Silent** (F3) |
| Abuse / cost control on LLM path | **Silent** (F2) |
| Domain cutover / DNS | Implied by AD-6 ("at cutover") but never stated — borderline; a one-liner would close it (folded into F3) |

**Finding F2 (MAJOR):** the `/api/docent` path has **no rate-limit or abuse rule**. AD-4 gives honeypot + rate limit to `/api/message`, but the far more expensive path — anonymous public browser → proxy → Cloud Run → Gemini — has none. On a free-tier solo project this is the one place an unattended cost/abuse incident actually happens, and because the guard could plausibly be built in `web/` (proxy) *or* `agent/` (FastAPI), leaving it undecided is itself a divergence risk. One sentence in AD-7 or a new AD fixes it.

**Finding F3 (MINOR):** operations is decided for *logging* but silent on *knowing*: nothing says how the solo maintainer learns the agent (or Resend) is down other than reading Cloud Run logs. AD-2 makes agent-down invisible to visitors by design — which means it is invisible to the owner too unless something alerts. A deferred-with-name entry (e.g., "uptime ping — pick at build") would satisfy the altitude. DNS/domain cutover deserves the same one-line treatment.

**Finding F5 (MINOR):** the Sanity **dataset/editorial envelope** is thin: "public dataset" is named in AD-5/AD-7, but draft-vs-published handling and content preview (does the owner see drafts before ISR publish?) are neither decided nor deferred. Low risk solo, but it is a whole-content-workflow question left silent.

---

## Findings summary

| ID | Severity | Finding |
| --- | --- | --- |
| F1 | MAJOR | Web↔agent chat contract (SSE event shape, session/history ownership, Frame-3/message-capture signalling) is neither decided nor deferred — the one real seam where two independently built units can diverge |
| F2 | MAJOR | No rate-limit/abuse rule on `/api/docent` → Gemini path; AD-4 guards only `/api/message`; guard placement (web proxy vs agent) is itself undecided |
| F3 | MINOR | Operations dimension silent on monitoring/alerting (agent-down is invisible to owner by design) and on domain/DNS cutover |
| F4 | MINOR | AD-6's "recurring 404 paths feed back into redirect map" clause is unenforceable as written and depends on the deferred analytics choice |
| F5 | MINOR | Sanity draft/preview & dataset workflow neither decided nor deferred |

## Recommendation

Approve after addressing F1 and F2 (each is a one-paragraph addition — a chat-contract AD or open question, and a rate-limit clause). F3–F5 can be closed with one-line Deferred entries.
