# Dr Rohan Yashraj Gupta — Portfolio

A CMS-driven personal portfolio: Next.js 16 (App Router, RSC, TypeScript strict,
Turbopack), Tailwind v4, GSAP (hero orchestration, scroll reveals, count-ups),
Sanity v6 (embedded Studio + live editing), and Resend for the contact form.
Design system: **Paper & Ultramarine** — flat cream paper, ultramarine-blue accent,
and bold condensed poster type (Anton), with a ✦ sparkle and marquee motif.

Everything visible on the site is edited in Sanity — no code changes needed for content.

---

## Running locally

```bash
pnpm install
cp .env.example .env.local   # fill in values (see below)
pnpm dev                     # http://localhost:3000
```

**Before any Sanity project exists, the site still runs** — it renders from local
fallback content (`sanity/lib/fallback.ts`) so you can preview the design. Once
`NEXT_PUBLIC_SANITY_PROJECT_ID` is set, it switches to live Sanity data automatically.

Scripts:

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm placeholders` | Regenerate placeholder SVGs |
| `pnpm seed:export` | Build `sanity/seed.ndjson` from fallback content |
| `pnpm seed:import` | Import that NDJSON into your Sanity dataset |

---

## Post-build checklist (things to do once)

1. **Create a Sanity project** at [sanity.io/manage](https://www.sanity.io/manage)
   with a `production` dataset. Copy the **Project ID** →
   `NEXT_PUBLIC_SANITY_PROJECT_ID`.
2. **Create a read token** (API → Tokens, *Viewer* role) →
   `SANITY_API_READ_TOKEN`. Enables draft preview / Presentation live editing.
3. **Add CORS origins** (API → CORS): `http://localhost:3000` and your production
   URL, both with credentials allowed.
4. **Seed content:** `pnpm seed:export && npx sanity dataset import sanity/seed.ndjson production`.
   (Images are not seeded — upload the real profile photo and covers in the Studio.)
5. **Resend:** create an account, verify your sending **domain**, create an API key →
   `RESEND_API_KEY`. Set `CONTACT_TO_EMAIL` (where messages arrive) and
   `CONTACT_FROM_EMAIL` (a verified address on your domain).
6. **Revalidation webhook:** set `SANITY_REVALIDATE_SECRET`, then in Sanity add a
   webhook (API → Webhooks) → `POST https://yourdomain.com/api/revalidate`, with the
   same secret. Published edits then refresh the live site on-demand.
7. **Vercel:** set every variable from `.env.example` (including
   `NEXT_PUBLIC_SITE_URL`) in the project settings, and deploy.
8. **Optional:** swap the in-memory contact rate limiter (`lib/rate-limit.ts`) for
   `@upstash/ratelimit` if you deploy to multiple instances.

---

## Editing content in the Studio

Go to **`/studio`** (also linked in the site footer) and sign in with your Sanity
account.

- **Site settings** — hero greeting, statement, profile image, CTAs, marquee items,
  nav links, social links, resume PDF, default SEO. *(Singleton — edit, don't duplicate.)*
- **Author** — name, credentials, role, bio, photo, profile URLs (for SEO).
- **Stats** — the "At a glance" numbers on the home page (animated count-up).
- **Highlights** — cards on `/highlights`; set **Featured** to surface on the home
  page. Each has a cover, category, rich-text body, gallery, and links.
- **Blog posts** — rich text with **code blocks** (syntax highlighted), tags, and
  related posts. Reading time is computed automatically.
- **Resume** — Education, Work experience, Milestones, Skills, Certifications &
  Fellowships, Publications & Presentations. Use each item's **Order** field to sort.

**Live editing:** open the **Presentation** tool in the Studio to edit content
side-by-side with a live preview of the site.

### Image sizes

Images are served through the Sanity CDN, which crops and compresses them per
device automatically — so **upload large and let the CDN scale down**. Every image
field has a **hotspot** (drag the focus point in the Studio) so off-ratio uploads
still crop sensibly, but matching the target aspect ratio avoids surprises.

| Where | Aspect ratio | Recommended upload | Notes |
|---|---|---|---|
| **Highlight / Blog cover** | **3 : 2 (landscape)** | **1600 × 1067 px** (min 1200 × 800) | Rendered at up to 768 px wide, so ~1600 px covers retina. Displayed as `object-cover` — keep the subject near the hotspot. |
| **Highlight gallery** | 3 : 2 | 1600 × 1067 px | Same crop as covers. |
| **Profile photo** | 1 : 1 (square) | 1000 × 1000 px | Shown in the dashed hero ring; a centered head-and-shoulders crop works best. |
| **Author photo / OG** | 1 : 1 / auto | 1200 px on the long edge | Used for JSON-LD and social share cards. |

Keep source files under ~2–3 MB (JPG or PNG); the CDN handles final optimization
and format conversion. **The highlight cover is the one to get right — 3:2, ~1600 px
wide** — since it appears both on the cards grid and at the top of each detail page.

The seed content uses real facts plus clearly marked `[placeholders]`
(e.g. `[University]`, `[Paper title 1]`) — replace those as details are confirmed.
The **Workshops led** and **Conference talks** stat values are placeholder counts —
update them to the real numbers.

---

## Project structure

```
app/(site)/            Public pages (home, highlights, resume, blog, contact)
app/studio/            Embedded Sanity Studio
app/api/               og image, revalidate webhook, draft-mode
components/            UI (hero reveal, marquee, cards, portable text, forms, chrome)
sanity/schemaTypes/    Document + object schemas
sanity/lib/            client, live fetch, queries, image, fallback content, types
lib/                   utils, reading-time, rate-limit, site config
scripts/               placeholder + seed generators
```

Design tokens live in `app/globals.css` (`--paper`, `--ink`, `--indigo`, `--outline`, …),
themed for light/dark via `data-theme`. The favicon is `app/icon.svg`.
