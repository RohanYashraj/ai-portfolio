# web/ — rohanyashraj.com

Next.js 16 app for the gallery-retrospective portfolio. Static-first (SSG/ISR);
all content comes from Sanity (see `../studio/`, the content contract).
Architecture: `../_bmad-output/planning-artifacts/architecture/architecture-ai-portfolio-2026-07-12/ARCHITECTURE-SPINE.md`.

## Setup

```bash
npm install
cp .env.local.example .env.local   # or create it — see below
npm run dev
```

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project (public reads via CDN) |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Dataset name (`production`) |
| `AGENT_URL` | no | Docent sidecar base URL; unset = docent UI hidden (AD-2) |

Secrets never reach the browser (AD-7): only `NEXT_PUBLIC_*` values are public,
and they are public by nature (visible in every Sanity request).

## Layout

- `app/` — routes per spec slugs; `api/docent/health` proxies the agent probe
- `components/` — design-system components (PascalCase, one `.module.css` each)
- `lib/` — Sanity client, content fetchers, the one health-checked agent client
- `styles/tokens.css` — design tokens (source: `../design-artifacts/D-Design-System/`)

GROQ queries are imported from `../studio/lib/queries.ts` — the single
definition both site and agent must use (AD-11). `turbopack.root` points at
the repo root to allow that import.

## Content updates

Sanity publish → webhook → ISR revalidation (tag `content`); time-based
1h revalidate as safety net. No redeploy needed for content changes.
