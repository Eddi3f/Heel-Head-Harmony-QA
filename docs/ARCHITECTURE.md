# Architecture — Heel Head Harmony

A plain static site: **HTML + one CSS file + vanilla JS**. No frameworks, no build
step, no npm. Deploy by dragging the folder into a static host, or by connecting
this repo to Cloudflare Pages / Netlify / GitHub Pages.

## File map
```
/
├── index.html            Home (incl. "What is reflexology?" + "Why choose" strip)
├── about.html            About Pamela (real bio from live site)
├── treatments.html       Treatments, prices, FAQ
├── research.html         Research links by condition
├── news.html             News/offers (rendered from js/news.js)
├── contact.html          Contact details + concept form
├── 404.html              Friendly not-found page
├── styles.css            The whole design system (CSS variables in :root)
├── js/
│   ├── site.js           Shared: sticky header, mobile menu, reveal, form state
│   └── news.js           Owner-editable news data + renderer (+ Google Sheet option)
├── Images/               Local assets only — never hot-link a CDN
│   ├── logo.svg          🔶 placeholder logo
│   ├── favicon.svg       🔶 placeholder favicon
│   └── aor-badge.svg     🔶 placeholder AoR "Registered Member" badge
├── docs/
│   ├── ARCHITECTURE.md   This file
│   └── COMPONENTS.md     Reusable UI patterns
├── robots.txt
├── sitemap.xml
├── _redirects            Old Wix URLs → new pages (Cloudflare Pages / Netlify)
└── README.md
```

## Design system
- All colours, radius, shadow, spacing, easing and fonts are CSS custom properties
  in `:root` (top of `styles.css`). Change the theme from that one block.
- Header and footer markup is **identical on every page**. The current page is marked
  with `aria-current="page"` on its nav link (also styled as the active pill).

## JavaScript
- `js/site.js` runs on every page: sticky-header shadow, mobile menu (scroll-lock,
  Escape to close, close on link click), scroll-reveal via `IntersectionObserver`,
  and the concept-form success state. All motion respects `prefers-reduced-motion`.
- `js/news.js` runs only on `news.html`. It renders cards from a plain data array so
  the owner can add posts without touching HTML.

## Trust & credibility (inspired by the AoR site)
- Homepage carries a **"What is reflexology?"** explainer and a **"Why choose Heel
  Head Harmony"** trust strip (Level 5, AoR registered, insured, calm setting).
- The footer shows an **AoR member badge** (placeholder — swap for the official one)
  linking to aor.org.uk, plus a **medical disclaimer** that reflexology is a
  complementary therapy and not a substitute for medical advice.

## Owner-editable content (what changes often)
| Content | Where | How |
|---|---|---|
| Prices | `treatments.html` | Edit the number inside `<span class="amt">`. Copy a `price-row` to add a service. |
| FAQ | `treatments.html` | Copy a `<details>` block. |
| News / offers | `js/news.js` | Copy one `{ … }` block at the top. Or switch to a Google Sheet (below). |
| Research links | `research.html` | Copy a `research-item` block. |
| Contact details | Footer of every page + `contact.html` | Search & replace email/phone. |

## Form seam (important — forms are NOT wired up yet)
The contact form is a **concept form**: it validates and shows a friendly success
message, but does not send anywhere. To make it send for real, pick one:

- **Formspree (easiest):** create a form, then set
  `action="https://formspree.io/f/XXXX" method="POST"` on the `<form>` and remove
  `data-concept`.
- **Cloudflare Worker (keeps things in-house):** POST the form to a Worker endpoint
  that emails Pamela. Keep any API keys/secrets in the Worker, never in the browser.

> Never put payment details, API keys or private notes in the HTML/JS or in any
> published Google Sheet — those are public.

## News via Google Sheet (optional, no-code updates)
`js/news.js` includes a commented block: publish a Sheet (date | tag | title | body)
to CSV, paste the URL, and the news page reads it at runtime. See that file.

## Launch plan
1. Replace placeholder assets (logo, favicon, AoR badge) and add real photos.
2. Confirm/replace all 🔶 placeholder text (testimonials, some FAQ answers, the
   "What is reflexology?" step wording).
3. Wire the contact form to a real endpoint.
4. Point the `heelheadharmony.co.uk` domain at the host; verify `_redirects`.
5. Submit `sitemap.xml` in Google Search Console.
