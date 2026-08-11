/* =========================================================================
   Heel Head Harmony — shared site behaviour
   Sticky-header shadow · mobile menu · scroll-reveal · concept-form success ·
   testimonial carousel · contact subject (URL prefill + "Other" toggle).
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Sticky header shadow ----------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 2. Mobile menu -------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  var body   = document.body;
  function openMenu() { body.classList.add('menu-open'); toggle.setAttribute('aria-expanded', 'true'); body.style.overflow = 'hidden'; }
  function closeMenu() { body.classList.remove('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); body.style.overflow = ''; }
  if (toggle && links) {
    toggle.addEventListener('click', function () { body.classList.contains('menu-open') ? closeMenu() : openMenu(); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { closeMenu(); toggle.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); });
  }

  /* ---- 3. Scroll-reveal ------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- 4. Concept forms: honest success state -------------------------- */
  var forms = document.querySelectorAll('form[data-concept]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) {
        status.classList.add('is-visible');
        status.setAttribute('role', 'status');
        status.textContent = 'Thanks for getting in touch — Pamela will reply as soon as possible. (Demo only: this form is not connected yet.)';
        status.focus && status.focus();
      }
      form.reset();
      // Reset the "Other" subject box back to hidden after a successful submit
      var other = form.querySelector('#subject-other');
      if (other) other.hidden = true;
    });
  });

  /* ---- 5. Footer year -------------------------------------------------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- 6. Testimonial carousel ----------------------------------------- */
  function initTestimonialCarousel() {
    var track = document.getElementById('testimonials');
    if (!track) return;
    track.querySelectorAll('[data-clone]').forEach(function (n) { n.remove(); });
    track.style.animation = '';
    track.classList.remove('is-scrolling');
    var items = Array.prototype.slice.call(track.children);
    if (!items.length) return;
    items.forEach(function (el) { el.classList.add('is-in'); });
    if (reduceMotion || items.length < 2) return;
    items.forEach(function (el) {
      var c = el.cloneNode(true);
      c.setAttribute('data-clone', ''); c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
    var duration = Math.max(18, items.length * 7);
    track.style.animation = 'hhh-marquee ' + duration + 's linear infinite';
    track.classList.add('is-scrolling');
  }
  window.HHH_initTestimonialCarousel = initTestimonialCarousel;
  initTestimonialCarousel();

  /* ---- 7. Contact subject: URL prefill + "Other" toggle ----------------
     • Reads ?subject=... from the link the visitor arrived on (e.g. a
       "Book this treatment" button) and preselects it.
     • If it doesn't match a dropdown option, picks "Other" and fills the box.
     • Shows/hides the free-text box when "Other" is chosen.
     • Exposed as window.HHH_applySubjectFromURL() so the sheet loader can
       re-apply the selection after it refreshes the options.                */
  var subjectSelect = document.getElementById('subject');
  var subjectOther  = document.getElementById('subject-other');

  function toggleOther() {
    if (!subjectSelect || !subjectOther) return;
    var isOther = subjectSelect.value === 'Other';
    subjectOther.hidden = !isOther;
    subjectOther.required = isOther;
    if (isOther) { try { subjectOther.focus(); } catch (e) {} }
  }

  function applySubjectFromURL() {
    if (!subjectSelect) return;
    var wanted = new URLSearchParams(window.location.search).get('subject');
    if (wanted) {
      wanted = wanted.trim();
      var match = null;
      Array.prototype.forEach.call(subjectSelect.options, function (o) {
        if (o.value.toLowerCase() === wanted.toLowerCase()) match = o.value;
      });
      if (match) {
        subjectSelect.value = match;
      } else if (subjectOther) {
        subjectSelect.value = 'Other';
        subjectOther.value = wanted;
      }
    }
    toggleOther();
  }
  window.HHH_applySubjectFromURL = applySubjectFromURL;

  if (subjectSelect) {
    subjectSelect.addEventListener('change', toggleOther);
    applySubjectFromURL();
  }
})();
