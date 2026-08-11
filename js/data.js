/* =========================================================================
   Heel Head Harmony — Google Sheet content loader
   -------------------------------------------------------------------------
   Reads the tabs named in js/config.js and fills in:
     • Testimonials  (homepage)   → #testimonials  (auto-scrolling carousel)
     • Treatments    (prices page)→ #price-grid  (+ "Book this treatment" buttons)
     • Research      (research)   → #research-grid
   Also keeps the Contact page's subject dropdown (#subject-treatments) in
   sync with the treatment names from the sheet.

   Resilient: if the sheet isn't set up, is offline, or a tab is empty, each
   page keeps its built-in content. Vanilla JS, no dependencies.
   ========================================================================= */
(function () {
  'use strict';

  var C = window.HHH_CONFIG || {};
  if (!C.enabled) return;
  if (!C.sheetId || /PASTE/i.test(C.sheetId)) return;   // not configured → keep fallback

  /* ---- Icon library ---------------------------------------------------- */
  var PATHS = {
    foot:    '<path d="M8.5 3.5c1.6 0 2.4 1.2 2.4 3 0 2.2-1.1 4-1.1 6.1 0 1.8 1.1 2.9 1.1 4.6 0 1.8-1.3 3-3.2 3-2 0-3.2-1.3-3.2-3.3 0-2.6.9-3.4.9-5.9C5.4 8.3 5 6.9 5 5.6 5 4.2 6.7 3.5 8.5 3.5Z"/><circle cx="14.5" cy="5" r="1.1"/><circle cx="17.4" cy="6.2" r="1"/><circle cx="19.3" cy="8.4" r=".9"/><circle cx="20.2" cy="11" r=".8"/>',
    hand:    '<path d="M7 11V6.2a1.3 1.3 0 0 1 2.6 0V10m0-.2V4.8a1.3 1.3 0 0 1 2.6 0V10m0-.4V5.4a1.3 1.3 0 0 1 2.6 0V11m0-.6V7a1.3 1.3 0 0 1 2.6 0v6.6c0 3.4-2.2 6.4-5.8 6.4-2.3 0-3.6-.9-4.9-2.6l-2.3-3.1a1.35 1.35 0 0 1 2-1.8L7 13.4Z"/>',
    leaf:    '<path d="M4.5 19.5C4 12 8.5 5.5 19.5 4.5c1 9.5-3.5 15.5-11 15.5-2 0-3.4-.6-4-.5Z"/><path d="M8 16c3-4 6-6 9.5-7.5"/>',
    ear:     '<path d="M8.5 20.5c-1.7-1.3-2-2.8-2-5V9.2a5.2 5.2 0 0 1 10.4 0c0 2.6-2 3.4-3.4 4.3-1 .7-1.4 1.3-1.4 2.2 0 1.2-.9 2.1-2 2.1a1.9 1.9 0 0 1-1.9-2c0-1.7 1.1-2.6 2.3-3.3"/><path d="M9.3 8.9a2.8 2.8 0 0 1 4.9 1.9"/>',
    sparkle: '<path d="M12 3.5c.4 3.6 1.9 5.1 5.5 5.5-3.6.4-5.1 1.9-5.5 5.5-.4-3.6-1.9-5.1-5.5-5.5C10.1 8.6 11.6 7.1 12 3.5Z"/><path d="M18.5 14.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z"/>',
    gift:    '<rect x="4.5" y="9" width="15" height="4" rx="1"/><path d="M6 13v6.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V13"/><path d="M12 9v12"/><path d="M12 9C10.5 6 8 5 6.7 6.3 5.6 7.4 7 9 9 9Zm0 0c1.5-3 4-4 5.3-2.7C18.4 7.4 17 9 15 9Z"/>'
  };
  function icon(name) {
    var p = PATHS[(name || '').toLowerCase().trim()];
    if (!p) return '';
    return '<svg class="ico ico--h3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

  /* ---- Helpers --------------------------------------------------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function urlAttr(s) { return String(s == null ? '' : s).replace(/"/g, '%22').replace(/\s/g, ''); }
  function shown(v) { return !/^(no|false|0|hide|hidden)$/i.test(String(v || '').trim()); }

  function parseCSV(text) {
    var rows = [], row = [], field = '', i = 0, inQ = false, c;
    while (i < text.length) {
      c = text[i];
      if (inQ) { if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; } else field += c; }
      else {
        if (c === '"') inQ = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
        else if (c === '\r') { /* ignore */ }
        else field += c;
      }
      i++;
    }
    row.push(field); rows.push(row);
    return rows;
  }
  function toObjects(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1).filter(function (r) { return r.some(function (c) { return c && c.trim(); }); })
      .map(function (r) { var o = {}; head.forEach(function (h, i) { o[h] = (r[i] || '').trim(); }); return o; });
  }
  function sheetUrl(tab) {
    return 'https://docs.google.com/spreadsheets/d/' + C.sheetId + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(tab);
  }
  function load(tab, done) {
    fetch(sheetUrl(tab), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function (t) { done(toObjects(parseCSV(t))); })
      .catch(function () {});
  }
  function reveal(el) { el.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-in'); }); }

  // "Book this treatment" button → contact page with the subject prefilled
  function bookBtn(name) {
    return '<a class="btn btn--primary price-book" href="contact.html?subject=' +
           encodeURIComponent(name) + '">Book this treatment</a>';
  }

  // Keep the contact page's subject dropdown in sync with sheet treatments
  function syncSubjectOptions(names) {
    var group = document.getElementById('subject-treatments');
    if (!group || !names.length) return;
    group.innerHTML = names.map(function (n) {
      return '<option value="' + esc(n) + '">' + esc(n) + '</option>';
    }).join('');
    if (window.HHH_applySubjectFromURL) window.HHH_applySubjectFromURL();
  }

  /* ---- 1. Testimonials (homepage carousel) ----------------------------- */
  var tEl = document.getElementById('testimonials');
  if (tEl && C.tabs && C.tabs.testimonials) {
    load(C.tabs.testimonials, function (rows) {
      rows = rows.filter(function (r) { return r.quote && shown(r.show); });
      if (!rows.length) return;
      tEl.innerHTML = rows.map(function (r) {
        var who = esc(r.name || '');
        if (r.location) who += (who ? ', ' : '') + esc(r.location);
        return '<figure class="quote"><p>&ldquo;' + esc(r.quote) + '&rdquo;</p>' +
               (who ? '<figcaption class="who">&mdash; ' + who + '</figcaption>' : '') + '</figure>';
      }).join('');
      if (window.HHH_initTestimonialCarousel) window.HHH_initTestimonialCarousel();
    });
  }

  /* ---- 2. Treatments & prices (+ book buttons + subject sync) ----------- */
  var pEl = document.getElementById('price-grid');
  var onContact = !!document.getElementById('subject-treatments');
  if ((pEl || onContact) && C.tabs && C.tabs.treatments) {
    load(C.tabs.treatments, function (rows) {
      rows = rows.filter(function (r) { return r.treatment; });
      if (!rows.length) return;
      var order = [], map = {};
      rows.forEach(function (r) {
        var key = r.treatment.trim();
        if (!map[key]) { map[key] = { icon: r.icon || '', note: r.note || '', lines: [] }; order.push(key); }
        if (r.location || r.price) map[key].lines.push({ loc: r.location || '', price: r.price || '' });
      });

      if (pEl) {
        pEl.innerHTML = order.map(function (name) {
          var d = map[name];
          var lines = d.lines.map(function (x) {
            return '<div class="price-row"><span>' + esc(x.loc) + '</span><span class="amt">' + esc(x.price) + '</span></div>';
          }).join('');
          return '<div class="price-block reveal"><h3>' + icon(d.icon) + ' ' + esc(name) + '</h3>' +
                 (d.note ? '<p class="lede">' + esc(d.note) + '</p>' : '') + lines +
                 bookBtn(name) + '</div>';
        }).join('');
        reveal(pEl);
      }

      // Sync the contact dropdown (runs whether or not the price grid is here)
      syncSubjectOptions(order);
    });
  }

  /* ---- 3. Research ----------------------------------------------------- */
  var rEl = document.getElementById('research-grid');
  if (rEl && C.tabs && C.tabs.research) {
    load(C.tabs.research, function (rows) {
      rows = rows.filter(function (r) { return r.condition && r.link_url; });
      if (!rows.length) return;
      rEl.innerHTML = rows.map(function (r) {
        return '<div class="research-item reveal"><h3>' + esc(r.condition) + '</h3>' +
               '<a href="' + urlAttr(r.link_url) + '" target="_blank" rel="noopener">View research &rarr;</a></div>';
      }).join('');
      reveal(rEl);
    });
  }
})();
