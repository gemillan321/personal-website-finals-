# `[ 0xPORTFOLIO ]`
### Cybersecurity Portfolio — Miles Angelo Gemillan

> A single-page cybersecurity portfolio built with Vue 3, Supabase, and EmailJS. Features a "Ghost Protocol" terminal-inspired design with live guestbook, working contact form, blog post modal, Matrix rain background, and immersive animations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Animations & Effects](#animations--effects)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## Overview

`0xPortfolio` is a single-page portfolio website for Miles Angelo Gemillan, a 2nd-year Computer Science student. It showcases CTF writeups, personal projects, certifications, and skills through an immersive terminal-inspired UI.

The site includes:
- A **live guestbook** powered by Supabase PostgreSQL
- A **working contact form** via EmailJS
- An **interactive blog post modal** system
- Custom cursor, Matrix rain canvas, CRT scanlines, and glitch effects

---

## Tech Stack

| Technology | Category | Purpose |
|---|---|---|
| `Vue 3` | Frontend Framework | Reactive UI & Composition API |
| `Vite` | Build Tool | Fast dev server & bundler |
| `Supabase` | Backend-as-a-Service | PostgreSQL DB for guestbook |
| `@supabase/supabase-js` | SDK | Supabase JavaScript client |
| `@emailjs/browser` | Library | Client-side email delivery |
| `Orbitron` | Typography | Display & heading font |
| `Share Tech Mono` | Typography | Monospace / terminal font |
| `Rajdhani` | Typography | Body text font |
| `Canvas API` | Browser API | Matrix rain background animation |
| `Vercel` | Hosting | Deployment & CDN |

---

## Project Structure

```
src/
├── App.vue                                   # Root component — template, modal, layout
├── assets/
│   └── Styles.css                            # Global stylesheet — variables, animations
├── lib/
│   └── supabase.js                           # Supabase client initialization
└── components/
    └── composables/
        ├── useAppLogic.js                    # Main composable — UI logic, animations, data
        └── useGuestbook.js                   # Guestbook composable — Supabase insert/select
.env                                          # Environment variables (never commit)
vite.config.js                                # Vite build configuration
```

---

## Features

- **Hero** — Animated typing effect cycling through 5 role titles
- **Terminal Widget** — Color-coded simulated command output with staggered line reveals
- **Scroll Animations** — Sections fade up as they enter the viewport
- **3D Card Tilt** — Perspective transform on project cards tracking mouse position
- **Blog Modal** — Smooth open/close with content parsed into styled paragraphs and bullets
- **Skills Panel** — Progress bars animate in when scrolled into view
- **Contact Form** — EmailJS integration (200 emails/month on free tier)
- **Guestbook** — Supabase insert + select with instant refresh after submit
- **Custom Cursor** — Dot + lagging ring, expands on hover, hidden on mobile
- **Matrix Rain** — Canvas-based falling character animation at 7% opacity
- **CRT Scanlines** — Fixed overlay for atmosphere
- **Glitch Effect** — RGB-split animation on hero name, triggers every 4 seconds
- **Responsive** — Fully adapted for desktop, tablet, and mobile

---

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_EMAILJS_SERVICE=service_xxxxxxx
VITE_EMAILJS_TEMPLATE=template_xxxxxxx
VITE_EMAILJS_KEY=your_public_key
```

| Variable | Service | Where to Find |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase | Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase | Project Settings → API → anon public key |
| `VITE_EMAILJS_SERVICE` | EmailJS | Dashboard → Email Services → Service ID |
| `VITE_EMAILJS_TEMPLATE` | EmailJS | Dashboard → Email Templates → Template ID |
| `VITE_EMAILJS_KEY` | EmailJS | Account → General → Public Key |

> ⚠️ Add `.env` to your `.gitignore`. Never commit credentials to version control.

---

## Database Setup

Go to your Supabase project → **SQL Editor** and run:

```sql
create table guestbook (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table guestbook enable row level security;

create policy "Anyone can read" on guestbook
  for select using (true);

create policy "Anyone can insert" on guestbook
  for insert with check (true);
```

### Schema

| Column | Type | Notes |
|---|---|---|
| `id` | `bigint` | Auto-generated primary key |
| `name` | `text` | Commenter's name |
| `message` | `text` | Guestbook message |
| `created_at` | `timestamptz` | Defaults to `now()` |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
npm install

# 3. Create your .env file and fill in credentials
cp .env.example .env

# 4. Start the dev server
npm run dev
# → http://localhost:5173
```

### Build for production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## Deployment

The project is deployed on **Vercel**.

1. Push your repository to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Set Framework Preset to **Vue.js**
4. Add all five `VITE_` environment variables under **Project → Settings → Environment Variables**
5. Deploy — every push to `main` triggers a rebuild automatically

---

## Architecture

The project uses Vue 3's **Composition API** with a composable-per-concern pattern.

```
App.vue
  │
  ├── useAppLogic(matrixCanvas, cursorDot, cursorRing, cardRefs)
  │     ├── Navigation scroll state & active section tracking
  │     ├── Typed text animation (type → pause → delete → repeat)
  │     ├── Matrix rain canvas rendering loop
  │     ├── Custom cursor with RAF-based lag interpolation
  │     ├── Scroll-triggered section reveals & skills bar
  │     ├── 3D card tilt via perspective transform
  │     ├── Blog post modal (activePost, modalVisible, parsedContent)
  │     ├── Contact form → EmailJS
  │     └── All static data (navLinks, projects, blogPosts, etc.)
  │
  └── useGuestbook()
        ├── fetchEntries() → SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 20
        └── submitEntry()  → INSERT INTO guestbook (name, message)
```

**Data flow:** `App.vue` instantiates composables and destructures reactive refs. The template binds directly to those refs. Supabase calls are fully contained in `useGuestbook.js` — `App.vue` has zero knowledge of the database layer.

---

## Animations & Effects

| Effect | Implementation |
|---|---|
| **Matrix Rain** | Canvas 2D API, `setInterval` at 50ms, Latin + Katakana char pool, semi-transparent fill for trail fade |
| **Custom Cursor** | Dot snaps via `mousemove`; ring uses `requestAnimationFrame` with lerp factor `0.12` for lag |
| **Glitch Effect** | CSS `::before`/`::after` with `attr(data-text)`, clipped bands, RGB offset, triggers at 96–99% of 4s cycle |
| **Typed Text** | JS state machine — types at 90ms/char, pauses 2000ms, deletes at 50ms/char, cycles roles |
| **3D Card Tilt** | Mouse offset → `rotateX`/`rotateY` (max ±8deg) + `perspective(1000px)` + `translateZ(10px)` |
| **Blog Modal** | `Teleport to="body"`, starts `opacity:0 translateY(24px)`, `.open` class transitions in over 350ms |
| **Section Reveal** | `IntersectionObserver`-style scroll check adds `.revealed` class → `opacity:1 translateY(0)` |
| **Skill Bars** | Width transitions from `0%` to target `%` over `1.5s cubic-bezier(0.4,0,0.2,1)` on scroll trigger |

---

## Known Limitations

- **EmailJS** free tier is capped at **200 emails/month**
- **Guestbook has no moderation** — any visitor can post. Consider adding a honeypot field or Supabase Auth for admin deletion
- **Guestbook does not use Realtime** — entries from other sessions require a page refresh to appear
- **Matrix rain runs when tab is hidden** — minor CPU usage in background tabs
- **Blog content is hardcoded** in the composable — not suitable for frequent publishing without a CMS

---

## Roadmap

- [ ] Migrate blog posts to a Supabase table with Markdown rendering (`marked.js`)
- [ ] Enable Supabase Realtime on guestbook for live updates across sessions
- [ ] Add admin view with Supabase Auth to delete inappropriate entries
- [ ] Add Open Graph meta tags for social sharing previews
- [ ] Lazy-load Matrix rain canvas to improve Lighthouse score
- [ ] Integrate a headless CMS (Sanity or Contentlayer) for no-code blog management

---

<div align="center">

`root@cyberlab:~#` Built with Vue 3 · Secured by Design · © 2026 Miles Angelo Gemillan

</div>
