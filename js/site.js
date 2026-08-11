/* =========================================================================
   Heel Head Harmony — shared site behaviour
   Sticky-header shadow · mobile menu (scroll-lock, Esc, link-close) ·
   scroll-reveal · concept-form success state.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Sticky header gains a shadow once you scroll ------------------ */
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
    toggle.addEventListener('click', function () {
      body.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { closeMenu(); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); });
  }

  /* ---- 3. Scroll-reveal ------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
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
    });
  });

  /* ---- 5. Footer year -------------------------------------------------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
