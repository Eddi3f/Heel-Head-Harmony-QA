# Architecture — Heel Head Harmony

A plain static site: **HTML + one CSS file + vanilla JS**. No frameworks, no build
step, no npm. Deploy by dragging the folder into a static host, or by connecting
this repo to Cloudflare Pages / Netlify / GitHub Pages.

## File map
```
/
├── index.html            Home (split hero image, photo treatment cards, trust strip)
├── about.html            About Pamela (portrait + real bio)
├── treatments.html       Treatments, prices, FAQ
├── research.html         Research links by condition (+ chart feature image)
├── news.html             News/offers (rendered from js/news.js)
├── contact.html          Contact details, socials + concept form
├── 404.html              Friendly not-found page
├── styles.css            The whole design system (CSS variables in :root)
├── js/
│   ├── site.js           Shared: sticky header, mobile menu, reveal, form state
│   └── news.js           Owner-editable news data + renderer (+ Google Sheet option)
├── Images/               Local assets only — never hot-link a CDN
│   ├── hero.jpg              jade roller on reflexology chart
│   ├── treatment-foot.jpg    foot reflexology
│   ├── treatment-ear.jpg     ear close-up (auricular)
│   ├── pamela.jpg            portrait
│   ├── aor-badge.png         official AoR logo
│   ├── logo.svg              🔶 placeholder logo
│   └── favicon.svg           🔶 placeholder favicon
├── docs/  (ARCHITECTURE.md · COMPONENTS.md)
├── robots.txt · sitemap.xml · _redirects · README.md
```

## Design system
- All colours, radius, shadow, spacing, easing and fonts are CSS custom properties
  in `:root` (top of `styles.css`). Change the theme from that one block.
- Header and footer markup is **identical on every page**. The current page is marked
  with `aria-current="page"` on its nav link.

## Images
- Photos are JPEG and compressed (< 250 KB each). Logos/badge are PNG/SVG.
- Every `<img>` has intrinsic `width`/`height` and `loading="lazy"` (except the LCP
  hero image, which uses `fetchpriority="high"`) to keep the layout stable and fast.
- The Hand treatment card uses a styled colour panel until `treatment-hand.jpg`
  is supplied — see the `🔶` comment in `index.html`.

## Social & trust
- Instagram and Facebook links appear as icon buttons in the footer of every page,
  and as text links on the Contact page.
- The footer shows the official **AoR badge** linking to aor.org.uk, plus a
  **medical disclaimer** (reflexology is complementary, not a substitute for medical advice).

## JavaScript
- `js/site.js` runs on every page: sticky-header shadow, mobile menu (scroll-lock,
  Escape to close, close on link click), scroll-reveal, concept-form success state.
  All motion respects `prefers-reduced-motion`.
- `js/news.js` runs only on `news.html`, rendering cards from a plain data array.

## Owner-editable content
| Content | Where | How |
|---|---|---|
| Prices | `treatments.html` | Edit the number inside `<span class="amt">`. |
| FAQ | `treatments.html` | Copy a `<details>` block. |
| News / offers | `js/news.js` | Copy one `{ … }` block, or switch to a Google Sheet. |
| Research links | `research.html` | Copy a `research-item` block. |
| Photos | `Images/` | Replace the file (keep the same name) — no code change needed. |
| Contact details / socials | Footer + `contact.html` | Search & replace. |

## Form seam (forms are NOT wired up yet)
The contact form validates and shows a friendly success message but does not send.
To make it send: **Formspree** (set `action`/`method`, remove `data-concept`) or a
**Cloudflare Worker** that emails Pamela. Keep secrets server-side, never in the browser.

## Launch plan
1. Replace placeholder logo + favicon; optionally add a higher-res portrait and a hand photo.
2. Confirm/replace 🔶 placeholder text (testimonials, some FAQ answers, "what to expect" steps).
3. Wire the contact form to a real endpoint.
4. Point `heelheadharmony.co.uk` at the host; verify `_redirects`.
5. Submit `sitemap.xml` in Google Search Console.
