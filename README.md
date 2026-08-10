# Heel Head Harmony — website

A fast, mobile-first static website for **Heel Head Harmony**, a reflexology practice
in Hatfield, Doncaster. Plain HTML, CSS and vanilla JavaScript — no frameworks, no
build step. Open the files locally, or drag the folder into Cloudflare Pages / Netlify
/ GitHub Pages.

- **Tagline:** Rebalance yourself
- **Fonts:** Playfair Display (headings) + Libre Baskerville (body)
- **Colours:** `#ffffff` · `#e2f0e7` · `#12201e` · `#b5d6d1`

## Pages
Home · About Pamela · Treatments & Prices · Research · News · Contact (+ a friendly 404).

---

## How to update your site (plain English)

You don't need to be technical. Each editable spot is marked in the code with a
comment like `<!-- EDIT: ... -->`.

**Change a price**
1. Open `treatments.html`.
2. Find the price you want (e.g. `<span class="amt">&pound;40</span>`).
3. Change the number, save, and re-upload the file (or commit it).

**Add or change a news post / offer**
1. Open `js/news.js`.
2. Copy the top `{ … }` block, paste it above the others, and edit the date, tag,
   title and body text.
3. Save. Newest posts show first automatically.
   *(Prefer a spreadsheet? See the Google Sheet option at the bottom of that file.)*

**Add an FAQ**
- In `treatments.html`, copy one `<details>…</details>` block and edit the question
  and answer.

**Update contact details**
- Email and phone appear in the footer of every page and on `contact.html`. Update
  them in each place (a find-and-replace for the email/phone is quickest).

**Swap the logo / add photos**
- Put files in the `Images/` folder and update the matching `src="…"`. See
  `Images/README-images.md`. Always keep images local — don't link to another website.

---

## 🔶 Placeholder / invented content to replace
Everything below is **not** from your live site — please supply the real version:

- **Logo & favicon** (`Images/logo.svg`, `Images/favicon.svg`) — placeholders.
- **Photography** — the site currently uses soft colour panels; real photos recommended.
- **Testimonials** (homepage) — sample quotes; send real client words + permission.
- **Some FAQ answers** (`treatments.html`) — marked 🔶; confirm or reword.
- **Two sample news posts** (`js/news.js`) — the "tip" post wording is a placeholder.
- **Contact form** — shows a success message but is **not connected** yet (see below).

Everything else (bio, mission, treatment descriptions, all prices, booking/cancellation
policy, research links, email, phone, locations) is pulled from your current live site.

---

## Make the contact form actually send
The form is intentionally "not wired up yet" rather than silently broken. To go live,
connect it to **Formspree** or a **Cloudflare Worker** — full steps in
`docs/ARCHITECTURE.md` ("Form seam"). Keep any keys/secrets server-side, never in the page.

---

## Deploy
- **Cloudflare Pages / Netlify:** connect the repo (or drag the folder). No build
  command; output directory is the root. `_redirects` maps old Wix URLs to new pages.
- **GitHub Pages:** enable Pages on the repo root/branch.
- **Local preview:** just open `index.html`, or run `python -m http.server` in the folder.

---

## Changelog — vs the original (Wix) site
- Rebuilt as a standalone static site (no Wix, no platform lock-in, faster to load).
- Introduced a single CSS-variable design system for five-minute re-theming.
- Added shared, accessible header/footer with an active-page state on every page.
- Added a **skip link**, visible focus states, semantic landmarks and reduced-motion support.
- New **About** page carrying Pamela's full bio (was a section on the old home page).
- Treatments page restructured into clear price cards + booking/cancellation notes.
- Added an **FAQ** section (answers to confirm).
- **News** page is now data-driven and owner-editable (array or Google Sheet).
- Research links regrouped into a tidy, scannable card grid with a safety disclaimer.
- Added SEO basics per page (unique title/description, theme-color, favicon),
  `sitemap.xml`, `robots.txt`, a 404 page and `_redirects`.
- Contact form upgraded to an accessible concept form with a documented backend seam.

---

## Pre-launch checklist
- [ ] Replace logo + favicon with real brand assets.
- [ ] Add real photography; compress images; keep intrinsic width/height.
- [ ] Replace all 🔶 placeholder text (testimonials, FAQ answers, sample post).
- [ ] Wire the contact form to a live endpoint and test a real submission.
- [ ] Confirm email/phone/locations are correct on every page.
- [ ] Point `heelheadharmony.co.uk` at the host; check `_redirects` for old URLs.
- [ ] Verify canonical URLs match the final live paths.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Test on real iOS + Android, with keyboard only, and a screen reader.
- [ ] Check no horizontal scroll from 320px up; run Lighthouse.
- [ ] (Optional) Add a privacy/cookie note if you enable analytics or a form backend.
