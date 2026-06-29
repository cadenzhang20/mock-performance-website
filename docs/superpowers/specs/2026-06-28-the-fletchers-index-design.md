# The Fletchers — Index Page Design Spec

**Date:** 2026-06-28
**Project:** mock-performance-website
**Subject:** Landing page for The Fletchers, a piano + clarinet & vocals duo performing 1930s–60s jazz and classical music at retirement homes.

---

## 1. Design Direction

The page exists for one job: help retirement home activity coordinators and family members understand who The Fletchers are, what they play, and how to book them. The audience deciding whether to book is not elderly residents themselves but the people who arrange activities for them — which means the page needs to feel warm and welcoming (for the residents' sake) while being clear and practical (for the coordinators' sake).

**Core metaphor:** Warm afternoon light through a window, an open sheet music book on a piano, the quiet moment before the first note. Warmth, dignity, and legibility are non-negotiable — the audience for the actual performances is elderly, and every type choice should serve readability.

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-paper` | `#FAF6F0` | Page background — aged sheet music warmth |
| `--color-ink` | `#2C2416` | Primary text — warm near-black |
| `--color-ink-muted` | `#6B5C4D` | Secondary/metadata text — warm brown-grey |
| `--color-gold` | `#C49A6C` | Accent — aged brass on clarinet, gilded frames |
| `--color-crimson` | `#8B3A3A` | Accent — velvet curtains, deep warmth |
| `--color-hairline` | `#D8CFC0` | Dividers and subtle structure lines |
| `--color-sunlight` | `#F5E6D0` | Hero ambient glow / light wash |

All names are nouns from the duo's world, not abstract color labels.

## 3. Typography

Two serif faces, paired deliberately — no sans-serif body text, because a clean sans would read as corporate and this page is personal.

| Role | Font | Weight | Size | Why |
|---|---|---|---|---|
| **Signature** | Playfair Display | 700 italic | clamp(2.5rem, 6vw, 4rem) | High-contrast serif with the elegance of a 1930s marquee. The italic catches the ear like a song title on a record sleeve. |
| **Subhead / eyebrow** | Playfair Display | 400 italic | clamp(1rem, 2vw, 1.25rem) | Same face, lighter weight — belongs to the same voice but steps back. |
| **Body** | Source Serif 4 | 400 | clamp(1.0625rem, 1.5vw, 1.25rem) | Exceptionally readable serif with generous proportions. Chosen for its warmth and legibility at the larger sizes this audience needs. |
| **Body strong** | Source Serif 4 | 600 | same | Weight contrast without changing face — keeps the texture consistent. |
| **Caption / data** | Source Serif 4 | 400 italic | 0.9375rem | Sits quietly below content, never competing. |

Line-height: 1.7 for body (spacious for older readers), 1.15 for the display (tight, elegant).

## 4. Layout

Single-column, vertically-scrolling page. Each section is separated by a **five-line staff divider** — a graphic motif drawn from sheet music that quietly reinforces the music theme without being cute about it.

```
┌──────────────────────────────────────────┐
│                                          │
│  ╲                                        │  ← ambient light gradient
│   ☐  THE FLETCHERS                       │     (CSS animation, slow shift)
│      Piano · Clarinet & Vocals           │
│      Bringing classic music to           │
│      your community                      │  HERO
│                                          │
│  ──── ──── ──── ──── ────               │  ← 5-line staff divider
│                                          │
│  About Eleanor & Arthur                  │
│  ┌─────────────┐  ┌───────────────────┐  │
│  │ [portrait   │  │ Two warm          │  │
│  │  silhouette] │  │ paragraphs about  │  │  ABOUT
│  │             │  │ the duo — their   │  │  (2-col on md+)
│  │             │  │ background, their │  │
│  │             │  │ approach, the     │  │
│  │             │  │ joy they bring.   │  │
│  └─────────────┘  └───────────────────┘  │
│                                          │
│  ──── ──── ──── ──── ────               │
│                                          │
│  Our Repertoire                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Jazz Era │ │ Classical│ │ Seasonal │  │  REPERTOIRE
│  │ Standards│ │ Favorites│ │ Specials │  │  (3-col grid)
│  │ 5 songs  │ │ 5 songs  │ │ 5 songs  │  │
│  └──────────┘ └──────────┘ └──────────┘  │
│                                          │
│  ──── ──── ──── ──── ────               │
│                                          │
│  Book The Fletchers                      │
│  [name / email / message]                │  CONTACT
│  ┌────────────────────────────────┐      │  (centered card)
│  │ Call or email to arrange a     │      │
│  │ complimentary meet-and-greet.  │      │
│  └────────────────────────────────┘      │
│                                          │
│  ──── ──── ──── ──── ────               │
│                                          │
│  © 2026 The Fletchers  ·  footer links   │  FOOTER
└──────────────────────────────────────────┘
```

### Section details

**Hero:**
- Full-width, centered text.
- Background: a subtle CSS gradient animating slowly (12s loop) from paper-warm to a soft gold-tinged light and back — like sunlight moving across a room.
- Tagline beneath the name. Two performers, three instruments.
- A very subtle "Read on" bounce indicator at the bottom.

**About:**
- Two-column on `md+` screens, single column on mobile.
- Left: a warm-toned decorative silhouette/placeholder for a photo of the duo. No actual image — a CSS-generated warm block with a subtle instrument silhouette.
- Right: two short paragraphs about Eleanor and Arthur.

**Repertoire:**
- Three cards in a row, each with a category name, a brief description, and 5 example songs.
- The cards use the paper background with the crimson as an accent for category labels.
- Gold divider lines between song titles inside each card.

**Contact:**
- A simple centered call-to-action.
- "Call or email to arrange a complimentary meet-and-greet."
- Mailto link and phone number.

**Footer:**
- Minimal. Copyright, a couple of links.

## 5. Signature Element

Two signature touches:

1. **Ambient light animation** — The hero background is a slow `background-position` shift across a warm multi-stop gradient. It takes 12 seconds to complete one cycle, imperceptibly slow, like real sunlight through a window. This grounds the page in the time of day these performances happen.

2. **Five-line staff divider** — Between each section, the page shows five thin horizontal lines at standard staff spacing. It's a direct visual quote from sheet music. It never calls attention to itself; it just quietly tells you this is a music page.

## 6. Technical Decisions

- **Next.js 16 App Router** — using Server Components throughout (no interactive JS needed on page load; this is a static brochure page).
- **Tailwind v4** — `globals.css` defines custom theme tokens for the palette and fonts. The page component uses utility classes.
- **Two Google Fonts via `next/font/google`** — Playfair Display and Source Serif 4. Both self-hosted by Next.js, zero external requests.
- **Zero client JS** — this page has no `"use client"` directives. The gradient animation uses pure CSS `@keyframes`. If any interactivity is added later (contact form), it gets its own client component boundary.

## 7. Responsive Behavior

- **Mobile (< 640px):** Single column everywhere. Stacked repertoire cards. Hero text at 2.5rem.
- **Tablet (640–1024px):** Two-column about section. Repertoire cards may go to 2 columns.
- **Desktop (> 1024px):** Full three-column repertoire, max-width container ~1024px for readability (very long lines are hard for older eyes).

## 8. Accessibility

- Color contrast ratios all exceed WCAG AA at the size they're used.
- Font sizes start at ~17px body text — larger than typical, for an audience that may have vision challenges.
- All decorative elements (`aria-hidden` where appropriate).
- Reduced-motion query disables the ambient gradient animation.
- Focus-visible styles on any interactive elements.

## 9. Content Decisions

Since there's no real content provided yet, I'm writing placeholder copy that sounds like The Fletchers:

- **Hero:** "The Fletchers" / "Eleanor Fletcher · Piano | Arthur Fletcher · Clarinet & Vocals" / "Bringing the warmth of classic music to your community"
- **About:** Two paragraphs establishing they're a duo, their experience performing at retirement communities, and what residents can expect.
- **Repertoire:** 3 categories × 5 song titles each, mixing jazz standards, classical pieces, and seasonal songs.
- **CTA:** A phone number and email, plus invitation for a free meet-and-greet.

All placeholder copy is marked clearly so the client knows it's filler.