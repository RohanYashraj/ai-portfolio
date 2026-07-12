# Design System: ai-portfolio — "Rohan Gupta: Selected Works"

> Minimal token foundation for the gallery-retrospective portfolio. Seeded during Phase 4 page specification; components are extracted as they recur across pages.

**Created:** 2026-07-12
**Status:** Foundation (tokens only; components extracted as pages are specified)
**Aesthetic:** Gallery — generous whitespace, few pieces given big space, placard captions, a dash of magazine editorial typography. Dark mode = "gallery lighting" theme.

---

## Spacing Scale

WDS default scale, mobile-first. Generous by design — whitespace is the gallery's material.

| Token | Value | Use |
|-------|-------|-----|
| space-zero | 0 | Flush/overlapping elements |
| space-xs | 4px | Icon-to-label gaps |
| space-sm | 8px | Within compact groups (stat number to label) |
| space-md | 16px | Default element gap |
| space-lg | 24px | Section padding mobile |
| space-xl | 40px | Section gap mobile / element breathing desktop |
| space-2xl | 64px | Section gap desktop |
| space-3xl | 96px | Room boundaries (major section transitions) |
| space-flex | auto | Flexible push (e.g., footer to bottom) |

---

## Type Scale

Editorial pairing: a display serif for exhibit headings (magazine gravitas), a clean sans for placards, UI, and body.

| Token | Mobile | Desktop | Use |
|-------|--------|---------|-----|
| text-xs | 12px | 12px | Captions, placard metadata |
| text-sm | 14px | 14px | Placard body, helper text |
| text-md | 16px | 17px | Body text |
| text-lg | 20px | 22px | Placard titles, lead paragraphs |
| text-xl | 24px | 30px | Section/room headings |
| text-2xl | 32px | 44px | Page titles |
| text-3xl | 40px | 64px | The name at the Entrance |

**Typefaces:**
- `display` — Source Serif 4 (chosen 2026-07-12: professional, readable, quiet contrast) — headings, the name, room titles
- `default` — Inter (confirmed) — body, placards, UI, docent
- `mono` — JetBrains Mono (confirmed) — stats, dates, metadata

**Weights:** normal (400), medium (500), semibold (600), bold (700)

---

## Color Roles (palette TBD in Visual Design)

| Role | Light ("daylight gallery") | Dark ("gallery lighting") |
|------|---------------------------|---------------------------|
| canvas | near-white, warm | near-black, warm |
| ink | near-black | off-white |
| ink-muted | 60% ink | 60% ink |
| accent | single restrained accent (TBD) | same hue, luminance-adjusted |
| line | hairline, 12% ink | hairline, 16% ink |

Rule: work (images, artifacts) carries the color; the chrome stays neutral.

---

## Components

Extracted as they recur during page specification:

| Component | Status | First seen | Notes |
|-----------|--------|------------|-------|
| SiteHeader | identified | 1.1 Home | Name/logo (→ Home), room nav, theme toggle |
| RoomTitle | identified | 1.1 Home | Room name in display serif + one-line placard subtitle |
| PlacardCard | identified | 1.2 Selected Works | Exhibit card: title, date, one-line result, placard caption |
| StatBlock | identified | 1.1 Home | Count-up number + label; CMS-fed; static fallback |
| DocentLauncher | identified | 1.1 Home | Persistent quiet docent entry + one suggested tap |
| DocentPanel | identified | 3.2 Docent Conversation | Overlay conversation panel, 6 states |
| ContactForm | identified | 1.4 The Study | Fields + honeypot + states |
| FilterBar | identified | 2.1 The Archive | Type filter chips (Projects/Papers/Talks) |
| SiteFooter | identified | 1.1 Home | Quiet contact + social + copyright line |

---

## Patterns

- **Placard captioning:** every exhibit gets title (text-lg, display), metadata line (text-xs, ink-muted, date always present), one-line result (text-sm)
- **Room transitions:** space-3xl boundaries; room title announces each section
- **Delight rules:** animations degrade gracefully (prefers-reduced-motion → static); nothing blocks content paint (<1s rule)
- **Docent presence:** launcher visible in every room, never modal-on-load, one contextual suggested tap per room

---

_Seeded by Freya during Phase 4. Exact typefaces, palette, and imagery decided in [W] Visual Design._
