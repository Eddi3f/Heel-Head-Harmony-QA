# Heel Head Harmony — website

A fast, mobile-first static website for **Heel Head Harmony**, a reflexology practice in Hatfield, Doncaster. Plain HTML, CSS and vanilla JavaScript, no frameworks, no build step.

- **Tagline:** Rebalance yourself
- **Fonts:** Playfair Display (headings) + Libre Baskerville (body)
- **Colours:** `#ffffff` · `#e2f0e7` · `#12201e` · `#b5d6d1`
- **Socials:** Instagram `@heel_head_harmony` · Facebook `HeelHeadHarmony`
- **Live domain:** heelheadharmony.co.uk (via Cloudflare)

## Pages

Home · About Pamela · Treatments & Prices · Research · Contact (+ a friendly 404).

---

## How the site is edited (plain English)

Most of the content Pamela needs to update regularly lives in a **Google Sheet**, not in the code. The site pulls from it automatically, no code changes needed for day-to-day edits.

**Google Sheet tabs and what they control:**
- **Testimonials** — homepage quote carousel
- **Treatments** — prices page, plus keeps the contact form's subject dropdown in sync
- **Research** — research page links
- **About** — Pamela's bio (one row) and her list of credentials (one row each)
- **FAQ** — the FAQ section on the treatments page

Each tab has a `show` column (where relevant) so a row can be hidden without deleting it, just type `no`.

If the Sheet is ever unreachable, each page falls back to its built-in placeholder content, so the site never breaks.

**Changes that still need a code edit:**
- **Change a photo** — drop a new file into `Images/` using the same filename (e.g. replace `Images/hero.jpg`). No code change needed.
- **Update contact details / socials** — these appear in the footer of every page and on `contact.html`. A find-and-replace is quickest.

---

## Contact form

The contact form is fully wired up and live. Submissions are sent via a **Cloudflare Worker** (`hhh-contact`), which calls the **Resend** email API.

- Domain `heelheadharmony.co.uk` is verified with Resend (DKIM, SPF, MX records), so it sends from a proper domain address, not a sandbox one.
- Replies go straight back to the enquirer via `reply_to`.
- Worker environment variables (`FROM_EMAIL`, `TO_EMAIL`, `RESEND_API_KEY`, `ALLOW_ORIGIN`) are managed in the Cloudflare dashboard, not in the code.

---

## Hosting & domain

- **Hosted on Cloudflare Pages**, connected directly to this GitHub repo. Every push to `main` redeploys automatically.
- **DNS is managed in Cloudflare** (moved from the previous registrar), which also allows the Resend email verification records to work.
- **Build settings:** no build command, output directory `/`.
- **Local preview:** open `index.html` directly, or run `python -m http.server`.

---

## 🔶 Still to confirm before fully going live

- **Testimonials** — confirm the ones in the Sheet are real client quotes (with permission), not placeholders.
- **Hand treatment photo** — check whether `Images/treatment-hand.jpg` has been supplied, or if a placeholder panel is still showing.
- **Portrait / treatment photo quality** — swap in higher-resolution versions if/when Pamela sends them.
- **FAQ answers** — confirm the wording in the FAQ Sheet tab is Pamela's own confirmed answers, not placeholder text.

Everything else (bio, treatments, prices, policies, research links, email, phone, locations, socials, logo, favicon, contact form) is real and working.

---

## Pre-launch checklist

- [x] Replace logo + favicon with real brand assets.
- [x] Wire the contact form to a live endpoint and test a real submission.
- [x] Point `heelheadharmony.co.uk` at the host; DNS managed via Cloudflare.
- [x] Verify domain with Resend for email sending.
- [ ] Confirm hand treatment photo is supplied (or accept placeholder for launch).
- [ ] Replace 🔶 placeholder text (testimonials, FAQ answers) with Pamela's confirmed wording.
- [ ] Confirm email/phone/socials/locations on every page.
- [ ] Verify canonical URLs match the final live paths.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Test on real iOS + Android, keyboard only, and a screen reader.
- [ ] Check no horizontal scroll from 320px up; run Lighthouse.
- [ ] Cancel/downgrade the old Wix site plan once confident the new site is stable (keep the domain renewal separate).

---

## Changelog

### Update, go-live readiness
- Replaced placeholder logo and favicon with Pamela's real logo, including a proper favicon and Apple touch icon.
- Connected `heelheadharmony.co.uk` to Cloudflare DNS and Cloudflare Pages hosting.
- Verified the domain with Resend; contact form now sends from a real domain address.
- Added Google Sheet–driven **About** (bio + credentials) and **FAQ** sections, matching the existing Testimonials/Treatments/Research pattern.
- Centred the Credentials card on the About page for a cleaner layout.

### Update, real images & social links
- Added Pamela's photos throughout: split hero image, photo treatment cards (foot + ear), and a portrait on the About page.
- Added the official AoR badge in the footer.
- Added Instagram + Facebook icon links to every footer, and text links on Contact.
- Added a reflexology-chart feature image to the Research page.

### Update, trust & credibility
- Added a "What is reflexology?" explainer with a 3-step "what to expect" section.
- Added a "Why choose Heel Head Harmony" trust strip.
- Added a medical disclaimer to the footer of every page.

### Initial rebuild, vs the original (Wix) site
- Rebuilt as a standalone static site (faster, no platform lock-in).
- Single CSS-variable design system; shared accessible header/footer with active state.
- Skip link, visible focus, semantic landmarks, reduced-motion support.
- New About page; restructured Treatments with price cards + FAQ.
- SEO basics per page, `sitemap.xml`, `robots.txt`, 404 page, `_redirects`.
- Accessible contact form, later connected to a working backend.
