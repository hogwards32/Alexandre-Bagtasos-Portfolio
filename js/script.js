// ============================================================
// Alexandre Bagtasos Portfolio — interactions
// ============================================================
// Each feature below is wrapped in its own try/catch. That's deliberate:
// if one block throws (a missing element, a browser quirk, etc.), it
// should not stop the rest of the script from running — especially the
// scroll-reveal block, since content visibility depends on it.

document.addEventListener('DOMContentLoaded', () => {

  /* --- Nav scroll state --- */
  try {
    const nav = document.querySelector('.nav');
    if (nav) {
      const onScroll = () => {
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  } catch (err) {
    console.error('Nav scroll state failed:', err);
  }

  /* --- Mobile nav toggle --- */
  try {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        toggle.classList.toggle('active');
      });
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('open'));
      });
    }
  } catch (err) {
    console.error('Mobile nav toggle failed:', err);
  }

  /* --- Scroll reveal ---
     Content is visible by default in CSS (see .reveal in style.css). This
     script is what opts elements INTO the hidden state (.pre-reveal) right
     before animating them in on scroll. So if this file fails to load, or
     any block above throws, content simply stays visible — nothing here
     ever needs to run for the page to be seen. */
  try {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      revealEls.forEach(el => el.classList.add('pre-reveal'));
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('pre-reveal');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(el => io.observe(el));
    }
    // No IntersectionObserver support: leave elements visible (no-op)
    // rather than adding is-visible for a class that was never hidden.
  } catch (err) {
    console.error('Scroll reveal failed:', err);
  }

  /* --- Contact form (static demo — no backend) --- */
  try {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:francoisbagtasos@gmail.com?subject=${subject}&body=${body}`;
      });
    }
  } catch (err) {
    console.error('Contact form failed:', err);
  }

  /* --- Current year in footer --- */
  try {
    const yearEl = document.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) {
    console.error('Footer year failed:', err);
  }

});
