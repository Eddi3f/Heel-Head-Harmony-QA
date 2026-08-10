# Images folder

Keep all local assets here. **Never hot-link a third-party CDN** — download the file
and reference it locally so the site keeps working if the source disappears.

## Current files
| File | Status | Notes |
|------|--------|-------|
| `logo.svg` | 🔶 PLACEHOLDER | Replace with Pamela's real logo (transparent PNG or SVG). |
| `favicon.svg` | 🔶 PLACEHOLDER | Derived from the placeholder logo. Replace to match final brand. |

## Recommended real photos to add (currently rendered as soft colour panels)
- `hero.jpg` — calm treatment room / feet + hands (approx 1600×1000).
- `pamela.jpg` — portrait of Pamela (approx 800×1000).
- `treatment-foot.jpg`, `treatment-hand.jpg`, `treatment-ear.jpg` — optional per-treatment shots.

## Tips before launch
- Compress images (TinyPNG / Squoosh) — aim < 250 KB each.
- Always set `width` and `height` on `<img>` to prevent layout shift (already done in markup).
- Use descriptive `alt` text.
