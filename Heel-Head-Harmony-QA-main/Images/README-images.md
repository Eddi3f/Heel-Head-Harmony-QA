# Images folder

Keep all local assets here. **Never hot-link a third-party CDN** — download the file
and reference it locally so the site keeps working if the source disappears.

## Current files
| File | Used on | Notes |
|------|---------|-------|
| `hero.jpg` | Home hero, Research feature | Jade roller on a reflexology chart book. |
| `treatment-foot.jpg` | Home treatment card | Foot reflexology. Source is small (200×200) — a larger photo would look sharper. |
| `treatment-ear.jpg` | Home treatment card | Ear close-up for auricular reflexology. |
| `pamela.jpg` | About page portrait | Portrait of Pamela. Source is small (200×200) — a larger version recommended. |
| `aor-badge.png` | Footer (every page) | Official Association of Reflexologists logo. |
| `logo.svg` | Header + footer | 🔶 PLACEHOLDER — replace with the real Heel Head Harmony logo. |
| `favicon.svg` | Browser tab icon | 🔶 PLACEHOLDER — replace to match the final logo. |

## Still to add (optional)
- `treatment-hand.jpg` — a hand reflexology photo. The Hand card currently shows a
  soft green panel with a ✋ icon. When you have a photo, drop it in and swap the
  panel for an `<img>` (there's a `🔶` comment in `index.html` showing where).

## Tips before launch
- Compress images (TinyPNG / Squoosh) — aim < 250 KB each (all current files are).
- Prefer JPEG for photos, PNG/SVG for logos and the badge.
- Keep `width`/`height` on every `<img>` to prevent layout shift (already set).
- Use descriptive `alt` text.
