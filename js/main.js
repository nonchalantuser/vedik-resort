/* ============================================================
   VEDIK RESORT — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     NAVIGATION — Sticky scroll behaviour
  ---------------------------------------------------------------- */
  const siteNav = document.getElementById('siteNav');

  function handleNavScroll() {
    if (!siteNav) return;
    if (window.scrollY > 60) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ----------------------------------------------------------------
     MOBILE NAV — Hamburger / overlay toggle
  ---------------------------------------------------------------- */
  const hamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    hamburger && hamburger.classList.add('active');
    mobileNav && mobileNav.classList.add('open');
    mobileNav && mobileNav.setAttribute('aria-hidden', 'false');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    hamburger && hamburger.classList.remove('active');
    mobileNav && mobileNav.classList.remove('open');
    mobileNav && mobileNav.setAttribute('aria-hidden', 'true');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', function () {
    if (mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileClose && mobileClose.addEventListener('click', closeMobileNav);

  // Close on nav link click (mobile)
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ----------------------------------------------------------------
     BOOKING WIDGET — Check availability
  ---------------------------------------------------------------- */
  window.handleBookingWidget = function () {
    var roomType = document.getElementById('roomType');
    var baseUrl = 'https://www.swiftbook.io/inst/#home?propertyId=961MBc8zjq5WkDVLb3w9icviuqKVIHLVCbcgvCYAZqHXhlj9KsOETA4OTQ=&JDRN=Y';

    if (roomType && roomType.value) {
      baseUrl += '&RoomID=' + roomType.value;
    }

    window.open(baseUrl, '_blank', 'noopener,noreferrer');
  };

  // Set min date for check-in to today
  var checkIn = document.getElementById('checkIn');
  var checkOut = document.getElementById('checkOut');

  if (checkIn) {
    var today = new Date().toISOString().split('T')[0];
    checkIn.min = today;
    checkIn.value = today;

    checkIn.addEventListener('change', function () {
      if (checkOut) {
        checkOut.min = checkIn.value;
        if (checkOut.value && checkOut.value <= checkIn.value) {
          // Set checkout to next day
          var d = new Date(checkIn.value);
          d.setDate(d.getDate() + 1);
          checkOut.value = d.toISOString().split('T')[0];
        }
      }
    });
  }

  if (checkOut) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOut.min = tomorrow.toISOString().split('T')[0];
    checkOut.value = tomorrow.toISOString().split('T')[0];
  }

  /* ----------------------------------------------------------------
     SCROLL-TO-TOP BUTTON
  ---------------------------------------------------------------- */
  var scrollTopBtn = document.getElementById('scrollTopBtn');

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  scrollTopBtn && scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------------
     SCROLL ANIMATIONS — Intersection Observer
  ---------------------------------------------------------------- */
  var animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger children if parent has multiple .fade-in-up siblings
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------------
     TESTIMONIALS SLIDER
  ---------------------------------------------------------------- */
  var track = document.getElementById('testimonialsTrack');
  var dotsContainer = document.getElementById('testimonialsDots');
  var prevBtn = document.getElementById('testimonialsPrev');
  var nextBtn = document.getElementById('testimonialsNext');

  if (track) {
    var cards = track.querySelectorAll('.testimonial-card');
    var totalCards = cards.length;
    var currentIndex = 0;
    var autoPlayInterval = null;
    var visibleCards = 3;

    function getVisibleCards() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    }

    function getTotalSlides() {
      return Math.max(0, totalCards - getVisibleCards());
    }

    function updateSlider() {
      visibleCards = getVisibleCards();
      var totalSlides = getTotalSlides();

      // Clamp index
      if (currentIndex > totalSlides) currentIndex = totalSlides;

      var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
      var gap = 28;
      var offset = currentIndex * (cardWidth + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';

      // Update dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (var i = 0; i <= totalSlides; i++) {
          (function (idx) {
            var dot = document.createElement('button');
            dot.className = 'testimonials-dot' + (idx === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to testimonial ' + (idx + 1));
            dot.setAttribute('role', 'tab');
            dot.addEventListener('click', function () {
              currentIndex = idx;
              updateSlider();
              resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
          })(i);
        }
      }
    }

    function goNext() {
      var totalSlides = getTotalSlides();
      currentIndex = (currentIndex < totalSlides) ? currentIndex + 1 : 0;
      updateSlider();
    }

    function goPrev() {
      var totalSlides = getTotalSlides();
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides;
      updateSlider();
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(goNext, 5000);
    }

    nextBtn && nextBtn.addEventListener('click', function () {
      goNext();
      resetAutoPlay();
    });

    prevBtn && prevBtn.addEventListener('click', function () {
      goPrev();
      resetAutoPlay();
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
        resetAutoPlay();
      }
    }, { passive: true });

    // Pause autoplay on hover
    track.addEventListener('mouseenter', function () {
      clearInterval(autoPlayInterval);
    });

    track.addEventListener('mouseleave', function () {
      resetAutoPlay();
    });

    // Resize handler
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        updateSlider();
      }, 200);
    });

    // Init
    updateSlider();
    resetAutoPlay();
  }

  /* ----------------------------------------------------------------
     SMOOTH SCROLL for anchor links
  ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = siteNav ? siteNav.offsetHeight : 88;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------------
     CONTACT FORM (if present)
  ---------------------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        var originalText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        // Simulate submission (replace with actual endpoint)
        setTimeout(function () {
          btn.textContent = '✓ Enquiry Sent!';
          btn.style.background = '#2D7A3A';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
          }, 3000);
        }, 1500);
      }
    });
  }

  /* ----------------------------------------------------------------
     GALLERY — Keyboard navigation
  ---------------------------------------------------------------- */
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Could open lightbox in future
        item.classList.toggle('gallery-item--focused');
      }
    });
  });

  /* ----------------------------------------------------------------
     NEWSLETTER BUTTON (footer)
  ---------------------------------------------------------------- */
  var newsletterBtn = document.getElementById('newsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var email = prompt('Join our newsletter — enter your email address:');
      if (email && email.includes('@')) {
        alert('Thank you for subscribing! We\'ll keep you updated with exclusive offers from Vedik Resort.');
      }
    });
  }

  /* ----------------------------------------------------------------
     NAV active state based on scroll position
  ---------------------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollY = window.scrollY;
    var navHeight = siteNav ? siteNav.offsetHeight : 88;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - navHeight - 60;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        var id = section.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id || link.getAttribute('href') === id + '.html') {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ----------------------------------------------------------------
     STAGGER animation for grid children
  ---------------------------------------------------------------- */
  function applyStagger(containerSelector, delay) {
    var containers = document.querySelectorAll(containerSelector);
    containers.forEach(function (container) {
      var children = container.querySelectorAll('.fade-in-up');
      children.forEach(function (child, i) {
        child.style.transitionDelay = (i * (delay || 80)) + 'ms';
      });
    });
  }

  applyStagger('.trust-bar-inner', 80);
  applyStagger('.rooms-grid-row1', 100);
  applyStagger('.rooms-grid-row2', 100);
  applyStagger('.facilities-grid', 60);

  /* ----------------------------------------------------------------
     On page load — reveal hero immediately
  ---------------------------------------------------------------- */
  window.addEventListener('load', function () {
    document.querySelectorAll('.hero .fade-in-up, .hero .fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  });

})();
