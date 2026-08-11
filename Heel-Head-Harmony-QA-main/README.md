# Heel Head Harmony — website

A fast, mobile-first static website for **Heel Head Harmony**, a reflexology practice
in Hatfield, Doncaster. Plain HTML, CSS and vanilla JavaScript — no frameworks, no
build step. Open the files locally, or drag the folder into Cloudflare Pages / Netlify
/ GitHub Pages.

- **Tagline:** Rebalance yourself
- **Fonts:** Playfair Display (headings) + Libre Baskerville (body)
- **Colours:** `#ffffff` · `#e2f0e7` · `#12201e` · `#b5d6d1`
- **Socials:** Instagram `@heel_head_harmony` · Facebook `HeelHeadHarmony`

## Pages
Home · About Pamela · Treatments & Prices · Research · News · Contact (+ a friendly 404).

---

## How to update your site (plain English)

Each editable spot is marked in the code with a comment like `<!-- EDIT: ... -->`.

**Change a photo** — drop a new file into `Images/` using the **same filename**
(e.g. replace `Images/hero.jpg`). The site updates automatically, no code change.

**Change a price** — open `treatments.html`, find the price (e.g.
`<span class="amt">&pound;40</span>`), change the number, save, re-upload.

**Add a news post / offer** — open `js/news.js`, copy the top `{ … }` block, edit the
date, tag, title and body. Newest shows first. (Or switch to a Google Sheet — see the
bottom of that file.)

**Add an FAQ** — in `treatments.html`, copy a `<details>…</details>` block.

**Update contact details / socials** — they appear in the footer of every page and on
`contact.html`. A find-and-replace is quickest.

---

## 🔶 Placeholder / to-supply
- **Logo & favicon** (`Images/logo.svg`, `favicon.svg`) — still placeholders.
- **Hand photo** — `Images/treatment-hand.jpg` not supplied; the Hand card shows a
  green panel for now. Drop the file in and swap the panel for an `<img>` (marked in `index.html`).
- **Higher-res portrait / foot photo** — current `pamela.jpg` and `treatment-foot.jpg`
  are small (200×200) so look best at modest sizes; larger versions would be sharper.
- **Testimonials** (homepage) — sample quotes; send real ones with permission.
- **"What to expect" steps & some FAQ answers** — marked 🔶; confirm wording.
- **Contact form** — shows a success message but is **not connected** yet (see below).

Everything else (bio, treatments, all prices, policies, research links, email, phone,
locations, socials) is real.

---

## Make the contact form actually send
Connect it to **Formspree** or a **Cloudflare Worker** — steps in
`docs/ARCHITECTURE.md` ("Form seam"). Keep any keys/secrets server-side.

---

## Deploy
- **GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.
- **Cloudflare Pages / Netlify:** connect the repo; no build command; output = root.
  `_redirects` maps old Wix URLs to the new pages.
- **Local preview:** open `index.html`, or run `python -m http.server`.

---

## Changelog

### Update — real images & social links
- Added Pamela's photos throughout: **split hero** image (jade roller on a reflexology
  chart), **photo treatment cards** (foot + ear), and a **portrait** on the About page.
- Added the **official AoR badge** in the footer (replacing the placeholder).
- Added **Instagram + Facebook** icon links to every footer, and text links on Contact.
- Added a reflexology-chart **feature image** to the Research page.
- All images optimised to < 250 KB, with lazy-loading and fixed dimensions.

### Update — trust & credibility (inspired by the AoR site)
- Added a **"What is reflexology?"** explainer with a 3-step "what to expect" section.
- Added a **"Why choose Heel Head Harmony"** trust strip.
- Added a **medical disclaimer** to the footer of every page.

### Initial rebuild — vs the original (Wix) site
- Rebuilt as a standalone static site (faster, no platform lock-in).
- Single CSS-variable design system; shared accessible header/footer with active state.
- Skip link, visible focus, semantic landmarks, reduced-motion support.
- New About page; restructured Treatments with price cards + FAQ.
- Data-driven, owner-editable News; tidy Research grid with disclaimer.
- SEO basics per page, `sitemap.xml`, `robots.txt`, 404 page, `_redirects`.
- Accessible concept contact form with a documented backend seam.

---

## Pre-launch checklist
- [ ] Replace logo + favicon with real brand assets.
- [ ] Add `treatment-hand.jpg`; consider higher-res portrait/foot photos.
- [ ] Replace 🔶 placeholder text (testimonials, FAQ answers, "what to expect" steps).
- [ ] Wire the contact form to a live endpoint and test a real submission.
- [ ] Confirm email/phone/socials/locations on every page.
- [ ] Point `heelheadharmony.co.uk` at the host; check `_redirects`.
- [ ] Verify canonical URLs match the final live paths.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Test on real iOS + Android, keyboard only, and a screen reader.
- [ ] Check no horizontal scroll from 320px up; run Lighthouse.
