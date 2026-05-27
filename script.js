/* =====================================================
   TELL A TALE — script.js
   Minimal vanilla JS — no frameworks, no dependencies.
   ✏️ EDIT: Each section is clearly commented.
====================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------
     1. NAV SCROLL EFFECT
     Adds a subtle border to the nav when user scrolls
  -------------------------------------------------- */
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });


  /* --------------------------------------------------
     2. MOBILE HAMBURGER MENU
     Toggles the full-screen drawer on/off
  -------------------------------------------------- */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const drawerLinks = document.querySelectorAll('.drawer__link');

  burger.addEventListener('click', function () {
    const isOpen = drawer.classList.toggle('open');
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Animate hamburger bars into an X
    const spans = burger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close drawer when a link is clicked
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });


  /* --------------------------------------------------
     3. SCROLL REVEAL
     Elements with class="reveal" or "reveal-stagger"
     fade in when they enter the viewport.
     ✏️ EDIT: Add class="reveal" to any element in HTML
     to make it animate in on scroll.
  -------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, {
      threshold: 0.12, // trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers: just show everything
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }


  /* --------------------------------------------------
     4. SMOOTH ACTIVE STATE ON NAV LINKS
     Highlights the nav link matching the current section
     ✏️ EDIT: Not required — remove if you don't need it.
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a:not(.nav__cta)');

  function setActiveLink() {
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.style.color = '';
      if (anchor.getAttribute('href') === '#' + currentId) {
        anchor.style.color = 'var(--color-ink)';
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* --------------------------------------------------
     REVEAL: manually mark key sections for scroll animation
     ✏️ EDIT: Add or remove items here as needed.
  -------------------------------------------------- */
  const toReveal = [
    '.about__grid',
    '.section-header',
    '.cards',
    '.cities__grid',
    '.contact__inner',
  ];

  toReveal.forEach(function (selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.add('reveal');
  });

  // Re-observe after adding classes
  if ('IntersectionObserver' in window) {
    const freshEls = document.querySelectorAll('.reveal:not(.revealed), .reveal-stagger:not(.revealed)');
    const observer2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    freshEls.forEach(function (el) { observer2.observe(el); });
  }

});
