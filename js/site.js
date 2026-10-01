/* =========================================================================
   Heel Head Harmony — shared site behaviour
   Sticky-header shadow · mobile menu · scroll-reveal · testimonial carousel ·
   contact subject (URL prefill + "Other" toggle) · real form submit (Worker).
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CFG = window.HHH_CONFIG || {};

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

  /* ---- 4. Contact form: real submit (Worker) or demo fallback ---------- */
  function endpointReady() {
    var u = CFG.formEndpoint;
    return u && !/PASTE/i.test(u) && /^https?:\/\//i.test(u);
  }

  document.querySelectorAll('form.form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type="submit"]');

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.classList.add('is-visible');
      status.classList.remove('is-error', 'is-ok');
      if (kind) status.classList.add(kind === 'ok' ? 'is-ok' : 'is-error');
      status.setAttribute('role', 'status');
      try { status.focus(); } catch (e) {}
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) { form.reportValidity && form.reportValidity(); return; }

      if (!endpointReady()) {
        setStatus('Thanks for getting in touch — Pamela will reply as soon as possible. (Demo only: this form is not connected yet.)', 'ok');
        form.reset();
        var oD = form.querySelector('#subject-other'); if (oD) oD.hidden = true;
        return;
      }

      var payload = {
        name:          val(form, 'name'),
        email:         val(form, 'email'),
        phone:         val(form, 'phone'),
        subject:       val(form, 'subject'),
        subject_other: val(form, 'subject_other'),
        message:       val(form, 'message'),
        company:       val(form, 'company')
      };

      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      setStatus('Sending your message…');

      fetch(CFG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
      .then(function (res) {
        if (res && res.ok) {
          setStatus('Thank you — your message has been sent. Pamela will reply as soon as possible.', 'ok');
          form.reset();
          var o = form.querySelector('#subject-other'); if (o) o.hidden = true;
        } else {
          setStatus((res && res.error) || 'Sorry, something went wrong. Please email heelheadharmony@gmail.com instead.', 'err');
        }
      })
      .catch(function () {
        setStatus('Sorry, your message could not be sent. Please email heelheadharmony@gmail.com or call 07870 895863.', 'err');
      })
      .then(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send message'; }
      });
    });
  });
  function val(form, name) { var el = form.querySelector('[name="' + name + '"]'); return el ? el.value : ''; }

  /* ---- 5. Footer year -------------------------------------------------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- 6. Testimonial carousel ----------------------------------------- */
  var cleanupTestimonials;
  function initTestimonialCarousel() {
    if (cleanupTestimonials) cleanupTestimonials();
    var track = document.getElementById('testimonials');
    if (!track) return;
    track.querySelectorAll('[data-clone]').forEach(function (n) { n.remove(); });
    var items = Array.prototype.slice.call(track.children);
    if (!items.length) return;
    var viewport = track.parentElement;
    var section = viewport.parentElement;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var listeners = [], frameId, lastTime = 0, remainder = 0;
    var hovering = false, touching = false, dragging = false, pauseUntil = 0;
    var startX = 0, startScroll = 0;
    function listen(el, type, fn, options) {
      el.addEventListener(type, fn, options);
      listeners.push(function () { el.removeEventListener(type, fn, options); });
    }
    function rest() { pauseUntil = performance.now() + 12000; }
    items.forEach(function (el) { el.classList.add('is-in'); });
    viewport.scrollLeft = 0;
    if (items.length < 2) return;
    // Copies allow a continuous loop; only the original quotes are announced.
    items.forEach(function (el) {
      var copy = el.cloneNode(true);
      copy.setAttribute('data-clone', '');
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    });
    function loopWidth() { return track.children[items.length].offsetLeft - items[0].offsetLeft; }
    function position() { return viewport.scrollLeft % loopWidth(); }
    function move(direction) {
      rest();
      var current = position(), target;
      var offsets = items.map(function (el) { return el.offsetLeft - items[0].offsetLeft; });
      if (direction > 0) target = offsets.find(function (x) { return x > current + 2; });
      else target = offsets.slice().reverse().find(function (x) { return x < current - 2; });
      if (target == null) target = direction > 0 ? 0 : offsets[offsets.length - 1];
      // Return from the duplicate set before a manual move.
      viewport.scrollLeft = current;
      viewport.scrollTo({ left: target, behavior: motion.matches ? 'auto' : 'smooth' });
    }
    var controls = document.createElement('div');
    controls.className = 'tcarousel-controls';
    controls.innerHTML = '<button type="button" class="btn btn--ghost" aria-label="Previous testimonial" aria-controls="testimonials">&#8592;</button>' +
      '<span>Swipe or drag to explore</span>' +
      '<button type="button" class="btn btn--ghost" aria-label="Next testimonial" aria-controls="testimonials">&#8594;</button>';
    viewport.insertAdjacentElement('afterend', controls);
    listen(controls.firstElementChild, 'click', function () { move(-1); });
    listen(controls.lastElementChild, 'click', function () { move(1); });
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Client testimonials. Use left and right arrow keys to browse.');
    listen(viewport, 'keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    listen(section, 'pointerenter', function (e) { if (e.pointerType === 'mouse') hovering = true; });
    listen(section, 'pointerleave', function (e) { if (e.pointerType === 'mouse') hovering = false; });
    listen(viewport, 'pointerdown', function (e) {
      if (e.button !== 0) return;
      touching = true; rest();
      if (e.pointerType === 'mouse') {
        dragging = true; startX = e.clientX; startScroll = viewport.scrollLeft;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add('is-dragging');
        e.preventDefault();
      }
    });
    listen(viewport, 'pointermove', function (e) {
      if (dragging) viewport.scrollLeft = startScroll - (e.clientX - startX);
    });
    function release() {
      if (touching || dragging) rest();
      touching = false; dragging = false;
      viewport.classList.remove('is-dragging');
    }
    listen(window, 'pointerup', release);
    listen(window, 'pointercancel', release);
    listen(viewport, 'lostpointercapture', release);
    listen(viewport, 'wheel', rest, { passive: true });
    listen(viewport, 'touchmove', rest, { passive: true });
    function tick(now) {
      var elapsed = lastTime ? Math.min(now - lastTime, 50) : 0;
      lastTime = now;
      var focused = section.contains(document.activeElement);
      var bounds = viewport.getBoundingClientRect();
      if (!motion.matches && !document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight &&
          !hovering && !touching && !focused && now >= pauseUntil) {
        remainder += elapsed * 0.025;
        var step = Math.floor(remainder);
        remainder -= step;
        if (step) viewport.scrollLeft = (viewport.scrollLeft + step) % loopWidth();
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);
    cleanupTestimonials = function () {
      cancelAnimationFrame(frameId);
      listeners.forEach(function (remove) { remove(); });
      controls.remove();
      cleanupTestimonials = null;
    };
  }
  window.HHH_initTestimonialCarousel = initTestimonialCarousel;
  initTestimonialCarousel();

  /* ---- 7. Contact subject: URL prefill + "Other" toggle ---------------- */
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
      if (match) { subjectSelect.value = match; }
      else if (subjectOther) { subjectSelect.value = 'Other'; subjectOther.value = wanted; }
    }
    toggleOther();
  }
  window.HHH_applySubjectFromURL = applySubjectFromURL;
  if (subjectSelect) {
    subjectSelect.addEventListener('change', toggleOther);
    applySubjectFromURL();
  }
})();
