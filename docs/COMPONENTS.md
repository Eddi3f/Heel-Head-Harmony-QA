# Components — reusable UI patterns

Reuse these repeatable pieces rather than creating page-specific one-offs.

## Section
```html
<section class="section">            <!-- --soft = tinted bg, --ink = dark -->
  <div class="container"> … </div>
</section>
```

## Split hero (image + text)
```html
<section class="hero hero--split">
  <div class="container">
    <div> …eyebrow, h1, lede, .hero-actions… </div>
    <div class="hero-media"><img src="Images/hero.jpg" width="940" height="525" alt="…"></div>
  </div>
</section>
```

## Feature (image beside text)
```html
<div class="feature">           <!-- add feature--flip to put image on the right -->
  <div class="feature-media"><img src="Images/…" width="" height="" alt="…"></div>
  <div> …text… </div>
</div>
```

## Photo card (treatment)
```html
<article class="card card--media">
  <div class="card-media"><img src="Images/…" width="400" height="250" alt="…" loading="lazy"></div>
  <div class="card-body"><h3>Title</h3><p class="lede">Copy…</p><a href="…">Link →</a></div>
</article>
```
No photo yet? Use a panel: `<div class="card-media card-media--panel">✋</div>`.

## Portrait
```html
<div class="portrait"><img src="Images/pamela.jpg" width="400" height="400" alt="…"></div>
```

## Button
```html
<a class="btn btn--primary">Primary</a>  <a class="btn btn--ghost">Outline</a>  <a class="btn btn--light">On dark</a>
```

## Trust strip / Steps / Price block / FAQ / Note
See `styles.css` sections 18b–18c, 10, 15, 19 and existing pages for markup.

## Social icons (footer)
```html
<div class="social">
  <a href="…instagram…" aria-label="Instagram"><svg viewBox="0 0 24 24">…</svg></a>
  <a href="…facebook…"  aria-label="Facebook"><svg viewBox="0 0 24 24">…</svg></a>
</div>
```

## AoR badge (footer)
```html
<a class="aor-badge" href="https://www.aor.org.uk/" target="_blank" rel="noopener">
  <img src="Images/aor-badge.png" width="130" height="72" alt="Association of Reflexologists — registered member">
</a>
```

## Scroll-reveal
Add `class="reveal"` to fade/slide an element in on scroll (disabled for reduced motion).

## Accessibility notes
- Every page starts with a `.skip-link`; active nav link uses `aria-current="page"`.
- Decorative images use `alt=""`; meaningful images need descriptive alt text.
- Keep the visible `:focus-visible` outline. News list is `aria-live="polite"`.
