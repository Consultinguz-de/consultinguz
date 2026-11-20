# CLAUDE.md

Guidance for Claude Code (and other AI assistants) when working in this repository.

---

## 1. Project Overview

**ConsultingUZ** is the marketing & lead-generation website for an international personnel-placement
agency that connects German employers with qualified specialists from Uzbekistan. The product covers
the full pipeline: candidate selection → interview → documentation → visa → onboarding in Germany.

- **Type:** Bilingual (DE / UZ) marketing site with a contact / consultation funnel.
- **Primary audience:** German employers (Arbeitgeber) and Uzbek jobseekers (Arbeitssuchende).
- **Default language:** `de` (Deutsch). Switchable to `uz` via a navbar toggle (persisted to `localStorage`).
- **Hosted on:** Vercel (`https://consultinguz.vercel.app` is the fallback `metadataBase`).
- **Lead capture:** Contact form & consultation modal POST to `/api/contact`, which forwards to a
  Telegram chat via the Telegram Bot API.

---

## 2. Tech Stack

| Layer            | Choice                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, `--turbopack` for dev & build)             |
| Runtime          | **React 19** + **TypeScript 5** (strict)                               |
| Styling          | **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme inline` tokens)  |
| UI primitives    | Radix UI primitives, restyled (shadcn/ui config kept)                  |
| Icons            | **lucide-react**                                                       |
| Analytics        | **@vercel/analytics** (gated behind cookie consent via `AnalyticsGate`) |
| Cookie consent   | Custom provider + shadcn Dialog/Checkbox (`cookie-consent-provider`)   |
| Lint / Format    | ESLint (`next/core-web-vitals` + `next/typescript` + `prettier`), Prettier |
| Path alias       | `@/*` → `./src/*`                                                      |

The project uses **Tailwind v4's CSS-first config** — there is no `tailwind.config.js`. Theme tokens
live in [src/app/globals.css](src/app/globals.css) under `@theme inline { … }`.

---

## 3. Repository Layout

```
src/
├── app/
│   ├── layout.tsx                # Archivo font, Providers, SkipLink, Navbar, Footer, JSON-LD
│   ├── page.tsx + HomeContent.tsx
│   ├── providers.tsx             # Translation → CookieConsent → Consultation
│   ├── globals.css               # Tailwind v4 entry, tokens, @utility helpers
│   ├── robots.ts, sitemap.ts, not-found.tsx + NotFoundContent.tsx
│   ├── api/contact/route.ts      # POST handler → Telegram bot (lead capture)
│   ├── about/mission/            # /about/mission  ("Über uns", has #compliance)
│   ├── services/employers/       # /services/employers (has #prozess)
│   ├── services/jobseekers/      # /services/jobseekers
│   ├── contact/                  # /contact
│   └── datenschutz/, impressum/  # legal pages, share components/LegalPage.tsx
├── components/
│   ├── ui/                       # button, input (+fieldClass), label, dialog, checkbox
│   ├── providers/                # translation, consultation, cookie-consent
│   ├── blocks.tsx                # presentational: PageHero, Section, Cells, Rows, List, ArrowLink, Marked, pairs()
│   ├── shared.tsx                # translated sections reused across pages: Stats, Founder, CtaBand, ConsultButton, SkipLink
│   ├── ContactForm.tsx           # the one lead form (full + compact for the modal)
│   ├── LegalPage.tsx, Navbar.tsx, Footer.tsx, AnalyticsGate.tsx
├── lib/utils.ts                  # cn()
└── data/index.ts                 # COMPANY, SOCIALS, STATS — single source of company facts
public/
├── images/                       # CC0 photos from Wikimedia Commons (rendered grayscale)
├── consulting-logo.png, herr-orif.jpg, favicon.png
```

### Page inventory (matches sitemap)

| Route                  | Component                                         |
| ---------------------- | ------------------------------------------------- |
| `/`                    | `app/HomeContent.tsx`                             |
| `/services/employers`  | `EmployersContent` — services, 5-step process     |
| `/services/jobseekers` | `JobseekersContent` — offer, 6-step process       |
| `/about/mission`       | `MissionContent` — mission, values, compliance    |
| `/contact`             | `ContactClient` — office info + `ContactForm`     |
| `/datenschutz`         | `DatenschutzClient` → `LegalPage`                 |
| `/impressum`           | `ImpressumClient` → `LegalPage`                   |

Removed routes (`/services/process`, `/compliance`, `/about/team`, `/services/partners`) are
permanent redirects in [next.config.ts](next.config.ts). When adding a route, also add it to
[src/app/sitemap.ts](src/app/sitemap.ts).

---

## 4. Development

```bash
npm run dev            # next dev --turbopack  → http://localhost:3000
npm run build          # next build --turbopack
npm run start          # production server
npm run lint           # eslint
npm run format         # prettier --write .
npm run format:check   # prettier --check .
```

### Environment variables

| Var                     | Used in                            | Purpose                                     |
| ----------------------- | ---------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | `layout.tsx`, `sitemap.ts`, `robots.ts` | Canonical base URL (falls back to Vercel domain). |
| `TELEGRAM_BOT_TOKEN`    | `api/contact/route.ts`             | Bot used to deliver contact-form leads.     |
| `TELEGRAM_CHAT_ID`      | `api/contact/route.ts`             | Destination chat for leads.                 |

If the Telegram vars are missing, the API falls back to logging the submission — leads are silently
dropped in production if the bot is misconfigured. **Do not ship without verifying both vars.**

---

## 5. Conventions & Patterns

### Design system ("strict grid")

- **Palette:** white `--background`, black `--foreground`, off-white `--paper`, and one accent,
  gold `--accent` (#F2B705). The blue appears only in the logo. Tokens live in
  [src/app/globals.css](src/app/globals.css); do not add colors without adding a token.
- **Shape:** zero border radius, 1px black rules (`border` defaults to `--foreground`), no shadows.
- **Type:** Archivo only. `h1`–`h3` and the `display` utility are condensed (`font-stretch: 75%`),
  weight 800, uppercase. `label` is the small uppercase caption. `mark` is the gold highlighter.
- **Headlines** highlight a phrase by wrapping it in `*asterisks*` in the dictionary; render with
  `<Marked>`. `h1` never auto-hyphenates — put `\u00AD` in long words (see `emp_title`).
- **Layout:** mobile first. `container-x` is the page gutter. Compose pages from
  [blocks.tsx](src/components/blocks.tsx): `PageHero`, then numbered `Section`s holding `Cells`
  (item count must fill the last row), `Rows` (sequential steps) or `List` (any length).
- **Motion:** CSS only. `reveal` is a scroll-driven fade (progressive enhancement, off for
  reduced motion). There is no animation library.

### File / component conventions

- **Server components by default.** `"use client"` only for hooks, events or context.
- **Page → Client split.** `app/<route>/page.tsx` exports `metadata` (German, with
  `alternates.canonical`) and renders a sibling `*Content.tsx` / `*Client.tsx`.
- **Path imports** use `@/`. **Class merging** goes through `cn()`.
- shadcn/ui is configured in [components.json](components.json), but the primitives in
  `src/components/ui/` are restyled for this design system — restyle anything you add.

### Internationalisation

- All copy is a static dictionary in
  [translation-provider.tsx](src/components/providers/translation-provider.tsx). `de` defines the
  key set; `uz` is typed `Record<MessageKey, string>`, so a missing key is a compile error.
  `t()` only accepts `MessageKey`.
- Numbered groups (`service_1_title` / `service_1_desc` …) are read with `pairs(t, "service", 7)`.
  That call casts the key, so a wrong prefix or count renders empty text — check the page.
- Default language is `de`; the choice is stored in `localStorage["lang"]` by `setLang`.
- Long-form legal copy stays in page-local `DE` / `UZ` objects (`DatenschutzClient`,
  `ImpressumClient`).

### Company data and SEO

- Phone, email, address, owner and social links come from [src/data/index.ts](src/data/index.ts).
  The JSON-LD block, footer, contact page and legal pages all read from it.
- `sitemap.ts` is the source of truth for indexable routes.

### Lead capture / API

- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) validates `name` plus one of
  `email` / `phone`, escapes HTML and forwards to Telegram.
- [ContactForm.tsx](src/components/ContactForm.tsx) is the only client. Full mode (contact page)
  requires email and message; `compact` mode (consultation modal) requires phone. Keep new API
  fields optional on the server.

### Accessibility

- Skip link, `<main id="main">`, visible `:focus-visible` ring (`currentColor`).
- Form fields use `<Label>`, `aria-invalid`, `aria-describedby` and an `aria-live` status region.
- Dialogs (consultation, cookies, mobile menu) are Radix dialogs — keep titles and close labels.

---

## 6. Skills installed

These skills (in `.agents/skills/`, managed by `npx skills`) are available to AI agents working in
this repo. Consult them when the task touches their domain:

| Skill                                  | When to use                                                |
| -------------------------------------- | ---------------------------------------------------------- |
| `shadcn`                               | Adding/configuring shadcn/ui components.                   |
| `nextjs-app-router-patterns`           | Routing, server vs client, metadata, layouts, route handlers. |
| `vercel-react-best-practices`          | React 19 idioms, RSC boundaries, performance.              |
| `tailwind-v4-shadcn`                   | Tailwind v4 (`@theme`, CSS-first) + shadcn token wiring.   |
| `typescript-advanced-types`            | Complex generics, narrowing, utility types.                |
| `seo`                                  | Metadata, JSON-LD, Core Web Vitals, sitemap/robots tuning. |

Manage them with:

```bash
npx skills find <query>          # search the catalog at https://skills.sh
npx skills add <owner/repo[@skill]>   # install
npx skills list                  # show installed
npx skills update                # upgrade
```

---

## 7. Working notes for AI agents

- **Compose, don't invent.** New sections should be `Section` + `Cells` / `Rows` / `List`.
- **Never break the i18n contract.** Every user-visible string is a `t("…")` call (or a
  page-local DE/UZ entry on legal pages). Add `de` and `uz` together.
- **Respect server/client boundaries.** Keep `page.tsx` server-only.
- **One accent.** Gold marks one thing per view; do not add a second accent color.
- **Gate every new tracker behind cookie consent.** Follow
  [`AnalyticsGate`](src/components/AnalyticsGate.tsx). Non-essential categories are opt-in
  (unticked by default). Bump `CURRENT_VERSION` in
  [cookie-consent-provider.tsx](src/components/providers/cookie-consent-provider.tsx) if the
  category set changes.
- **`.next/` and `node_modules/`** are ignored — never commit build output.

---

## 8. Known gaps / placeholders

- Impressum still lacks Handelsregister, USt-ID and Aufsichtsbehörde (see TODO in
  `ImpressumClient.tsx`) — data pending from the client.
- The contact API logs and returns 200 when the Telegram env vars are missing — verify
  configuration before shipping to a new environment.
- Page metadata is German only; the language toggle is client-side and does not change `<title>`.
