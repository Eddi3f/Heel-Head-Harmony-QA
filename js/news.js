/* =========================================================================
   Heel Head Harmony — News / offers feed
   OWNER-EDITABLE: Pamela can add a post by copying one { ... } block below.
   No coding knowledge needed beyond editing text between the quotes.

   Want to update from a spreadsheet instead of this file? See the
   GOOGLE SHEET option at the bottom and docs/ARCHITECTURE.md.
   ========================================================================= */
(function () {
  'use strict';

  /* ======================================================================
     EDIT HERE ↓  — one block per post. Newest at the top.
     date  : "YYYY-MM-DD"      tag : short label (Offer / Update / Tip)
     title : the headline      body: one or two short sentences
     ====================================================================== */
  var POSTS = [
    {
      date: "2025-09-01",
      tag: "Update",
      title: "New prices from 1st September 2025",
      body: "Updated session prices are now in effect for home and Action First Physiotherapy appointments. See the Treatments &amp; Prices page for the full list."
    },
    {
      date: "2025-06-15",
      tag: "Offer",
      title: "Take-home auricular seed kits now available",
      body: "A one-month supply of ear seeds with four treatments is available for &pound;10 — a gentle way to extend the benefits of a session at home."
    },
    {
      date: "2025-03-10",
      tag: "Tip",
      title: "Why a little 'me time' matters",
      body: "Reflexology offers a calm space to breathe, away from the demands of the day, and allow your body to reset itself." /* PLACEHOLDER wording — Pamela to confirm/replace */
    }
  ];
  /* EDIT ABOVE ↑ ---------------------------------------------------------- */

  var mount = document.getElementById('news-list');
  var empty = document.getElementById('news-empty');
  if (!mount) return;

  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function render(list) {
    if (!list.length) { if (empty) empty.hidden = false; return; }
    list.sort(function (a, b) { return (a.date < b.date ? 1 : -1); });

    mount.innerHTML = list.map(function (p) {
      return (
        '<article class="post-card reveal">' +
          '<div class="post-body">' +
            '<span class="tag">' + (p.tag || 'News') + '</span>' +
            '<span class="date">' + fmtDate(p.date) + '</span>' +
            '<h3>' + p.title + '</h3>' +
            '<p class="lede mb-0">' + p.body + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      mount.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      mount.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  render(POSTS.slice());

  /* ======================================================================
     GOOGLE SHEET OPTION (optional upgrade — no code edits to add posts)
     1. Create a Google Sheet with columns: date | tag | title | body
     2. File → Share → Publish to web → CSV.
     3. Paste the CSV URL below, uncomment, and delete render(POSTS) above.

     var SHEET_CSV = "PASTE_PUBLISHED_CSV_URL_HERE";
     fetch(SHEET_CSV).then(function (r) { return r.text(); }).then(function (csv) {
       var rows = csv.trim().split(/\r?\n/).slice(1);
       var data = rows.map(function (line) {
         var c = line.split(',');
         return { date: c[0], tag: c[1], title: c[2], body: c.slice(3).join(',') };
       });
       render(data);
     }).catch(function () { render(POSTS.slice()); });
     ====================================================================== */
})();
