# Components — reusable UI patterns

Everything is built from these repeatable pieces. Reuse them rather than creating
page-specific one-offs. Copy a block, change the text.

## Section
```html
<section class="section">            <!-- add --soft for tinted bg, --ink for dark -->
  <div class="container"> … </div>
</section>
```

## Eyebrow + heading
```html
<span class="eyebrow">Small label</span>
<h2>Section heading</h2>
```

## Button
```html
<a class="btn btn--primary" href="…">Primary</a>
<a class="btn btn--ghost"   href="…">Outline</a>
<a class="btn btn--light"   href="…">On dark backgrounds</a>
```

## Card
```html
<article class="card">
  <div class="icon" aria-hidden="true">🦶</div>
  <h3>Title</h3>
  <p class="lede">Copy…</p>
</article>
```

## Grid
```html
<div class="grid grid--3">…</div>     <!-- --2, --3, or --auto (auto-fit) -->
```

## Price block
```html
<div class="price-block">
  <h3>Service name</h3>
  <div class="price-row"><span>At my home</span><span class="amt">&pound;40</span></div>
</div>
```

## FAQ item
```html
<div class="faq">
  <details><summary>Question?</summary><p>Answer.</p></details>
</div>
```

## Ticked list
```html
<ul class="tick"><li>Point one</li></ul>
```

## Note / callout
```html
<div class="note">Important info…</div>
```

## Concept form
```html
<form class="form" data-concept novalidate>
  <div class="field"><label for="name">Name</label><input id="name" required></div>
  <button class="btn btn--primary" type="submit">Send</button>
  <p class="form-status" tabindex="-1"></p>
</form>
```

## Scroll-reveal
Add `class="reveal"` to any element to have it fade/slide in on scroll. Automatically
disabled for visitors who prefer reduced motion.

## Accessibility notes
- Every page starts with a `.skip-link`.
- Active nav link uses `aria-current="page"`.
- Decorative images use empty `alt=""`; meaningful images need descriptive alt text.
- Focus is always visible (`:focus-visible` outline). Keep it.
- Live regions: news list uses `aria-live="polite"`; form status is announced.
