# Currency Review — ARCHITECTURE-SPINE.md

Reviewed: 2026-07-12
Reviewer lens: were committed technology decisions web-verified/reality-checked rather than asserted from training data?
Inputs: ARCHITECTURE-SPINE.md, .memlog.md (same folder), live web checks 2026-07-12.

## Verdict

PASS with one notable gap. The memlog shows genuine verification discipline (dated version checks, a rejected option with evidence — Railway "free" exposed as a 30-day trial, preview-alias shutdown date for Gemini). One committed line item — `next-sanity` — was asserted as "current" without evidence of a compatibility check, and it happens to be the one with a real, documented Next.js 16 interaction issue.

## Claim-by-claim

| # | Claim in spine | Memlog evidence | Web check (2026-07-12) | Status |
|---|---|---|---|---|
| 1 | Next.js 16.2.x LTS | Verified 16.2.10 LTS, dated 2026-07-12 | Confirmed: 16.2.10 released 01 Jul 2026; Next 16 is Active LTS (support to Oct 2027) | VERIFIED, CURRENT |
| 2 | Agno 2.6.x | Verified v2.6.4 (Apr 2026) | Line has advanced to v2.6.12 (Jun 2026); still 2.6.x, active. Gemini support confirmed and expanding (GeminiInteractions in 2.6.7+, Gemini File Search multimodal in 2.6.5) | VERIFIED; pin slightly stale (patch-level only) |
| 3 | Agno supports Gemini | Implicit (model decision recorded) but not explicitly verified | Confirmed: first-class Google/Gemini model classes; recent releases actively invest in Gemini | OK — confirm explicit `Gemini` model class usage at build |
| 4 | gemini-3.1-flash-lite (GA id) | Verified GA 2026-05-08; $0.25/$1.50 per 1M; preview alias shutdown 2026-05-25 noted | Confirmed GA; pricing matches ($0.25 in / $1.50 out per 1M); 1M context | VERIFIED, CURRENT |
| 5 | next-sanity client "current" | Only "Sanity … current/active" — no compatibility check recorded | next-sanity@13.0.11 (Jun 2026) is the Next.js 16-compatible line. Sanity's own docs warned NOT to upgrade to Next 16 before next-sanity v13, and document a production issue: Next 16 `<Link>` prefetch + `<SanityLive>`/revalidateTag caused ~4x request-load increase (API request overages) | GAP — see Finding F1 |
| 6 | Cloud Run free tier, min-instances=0 | Railway rejection verified; Cloud Run free tier asserted | Confirmed: 2M free requests/month still real in 2026; min-instances=0 means no idle billing | VERIFIED, CURRENT |
| 7 | Resend "current SDK", free tier assumed sufficient | "current/active" only | Confirmed active; free tier = 3,000 emails/mo, 100/day — comfortably sufficient for portfolio contact volume | OK |

## Findings

### F1 [MAJOR] next-sanity was the only committed dependency not reality-checked — and it has a real Next 16 issue
The spine pins Next.js 16.2 and says `next-sanity` client, "current", but the memlog records no verification of the next-sanity ↔ Next 16 pairing. As of June 2026, next-sanity v13 is the required line for Next.js 16 (v12 targets Next 15), and Sanity documents a known Next 16 hazard: default `<Link>` prefetching combined with `<SanityLive>`/`revalidateTag` produced an average 4x increase in API request load in production — a direct threat to the free-tier Sanity budget assumed in the memlog. Mitigation is cheap: pin `next-sanity@^13`, and since AD-3 uses webhook → ISR revalidation (not SanityLive), explicitly note "no `<SanityLive>`/`defineLive`" in the spine so the hazard is designed out rather than stumbled into.

### F2 [MINOR] Agno verification is ~3 months stale at patch level
Memlog verified 2.6.4 (Apr 2026); current is 2.6.12 (Jun 2026). The spine's "2.6.x" range still holds, so no change needed, but note that recent patches changed Gemini defaults (e.g., default model moved to gemini-3.5-flash in later releases) — the spine's explicit `gemini-3.1-flash-lite` pin protects against this, which is good; just don't rely on Agno's default model.

### F3 [MINOR] Cold-start reality of the health-probe warm-up is asserted, not measured
Cloud Run free tier and min-instances=0 billing are verified. But "health probe on page load doubles as warm-up" assumes the Python/FastAPI/Agno container cold-starts fast enough that the docent is ready by the time a visitor opens the panel. Cold starts for Python containers commonly run multiple seconds; AD-2's health-gated UI handles this gracefully, but expect the docent launcher to appear late on first visit after idle. Worth a build-time measurement, not a spine change.

### F4 [INFO] Exemplary verifications worth keeping
Two decisions show the right pattern and should be preserved as-is: (a) Railway rejected after verifying its "free" tier is a 30-day trial that pauses services; (b) Gemini preview alias shutdown date (2026-05-25) recorded alongside the GA id, preventing a dead model-id at build time.

## Sources
- https://endoflife.date/nextjs · https://nextjs.org/blog/next-16 (Next.js 16.2.10 LTS)
- https://github.com/agno-agi/agno/releases (Agno 2.6.12, Gemini support)
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/ (GA, pricing)
- https://www.sanity.io/docs/help/nextjs-16-sanitylive-status · https://github.com/sanity-io/next-sanity/releases (next-sanity v13 / Next 16)
- https://cloud.google.com/run/pricing · https://docs.cloud.google.com/free/docs/free-cloud-features (2M req/mo free tier)
- https://resend.com/pricing (free tier 3,000/mo, 100/day)
