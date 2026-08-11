# Editing the site with Google Sheets

Three parts of the website can be updated from **one Google Sheet**, with a tab for
each: **Testimonials**, **Treatments** (prices) and **Research**. Pamela edits the
spreadsheet; the website reads it automatically. No code, no re-uploading.

If the sheet is ever empty or offline, the site quietly shows its built-in content,
so it can never look broken.

---

## One-time setup (about 5 minutes — done by Edward)

1. **Create the sheet.** Upload `Heel-Head-Harmony-content.xlsx` (provided) to Google
   Drive and open it with Google Sheets — the three tabs and headings are already
   filled in with the current content.
2. **Share it for reading.** In the Sheet: **Share → General access →
   "Anyone with the link" → Viewer**. (Viewer only — nobody can edit via the link.)
3. **Copy the Sheet ID** from the address bar — the long code between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`THIS_LONG_ID`**`/edit`
4. **Paste it into `js/config.js`**, replacing `PASTE_YOUR_SHEET_ID_HERE`. Commit the file.
5. Done. Edits in the Sheet then appear on the site (allow a minute, then refresh).

> Keep the **tab names** exactly as: `Testimonials`, `Treatments`, `Research`.
> Keep the **first row (headings)** unchanged. Edit the rows beneath them.

---

## Tab 1 — Testimonials  (shows on the Home page)

| Column | What to put | Example |
|--------|-------------|---------|
| `quote` | The client's words (no quotation marks needed) | I left feeling completely relaxed. |
| `name` | First name or initials | Sarah T. |
| `location` | Optional town | Doncaster |
| `show` | `yes` to display, `no` to hide | yes |

- Add a testimonial by typing a new row. Delete a row to remove it.
- Set `show` to `no` to hide one without deleting it.

---

## Tab 2 — Treatments  (the price cards on Treatments & Prices)

Each **treatment** groups several price rows. Repeat the treatment name on each of
its rows. The `icon` and `note` only need filling on the **first** row of each group.

| Column | What to put | Example |
|--------|-------------|---------|
| `treatment` | Card heading (repeat for each price line) | Foot or hand reflexology |
| `icon` | Icon name (see list) — first row only | foot |
| `note` | Small line under the heading — first row only | Approx. 50-minute session. |
| `location` | Left-hand label | At my home |
| `price` | Right-hand value (include the £) | £40 |

**Available icon names:** `foot`, `hand`, `leaf`, `ear`, `sparkle`, `gift`
*(leaf = with seeds, sparkle = combined session). Leave blank for no icon.*

---

## Tab 3 — Research  (the condition cards on the Research page)

Just two columns: the condition and the web address of the study. Every link on the
site automatically reads **"View research"**, so there's nothing else to write.

| Column | What to put | Example |
|--------|-------------|---------|
| `condition` | The condition name (the card heading) | Anxiety |
| `link_url` | The full web address of the study | https://pubmed.ncbi.nlm.nih.gov/16487421 |

- One row per condition. Add a row to add a condition; delete a row to remove one.

---

## Tips
- Don't rename the tabs or the heading row.
- Blank rows are ignored, so spacing rows are fine.
- Changes are live but cached briefly — allow a minute and refresh.
- To pause the sheet and use only built-in content, set `enabled: false` in `js/config.js`.
