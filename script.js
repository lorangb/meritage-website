/* Meritage Website - Interactive Features */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== HEADER SCROLL ====================
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const y = window.scrollY;
    if (y > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  });

  // ==================== MOBILE MENU ====================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');

  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileOverlay.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==================== WHO WE HELP TABS ====================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');

      // Deactivate all
      tabBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });

      // Activate current
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      document.getElementById('tab-' + tab).classList.add('active');
    });
  });

  // ==================== TESTIMONIALS CAROUSEL ====================
  const carousel = document.getElementById('testimonialCarousel');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let currentSlide = 0;
  let autoInterval;

  // Create dots
  slides.forEach(function(_, i) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
    dot.addEventListener('click', function() { goToSlide(i); });
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides.forEach(function(s, i) {
      s.classList.toggle('active', i === index);
    });
    dotsContainer.querySelectorAll('.carousel-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
    resetAutoPlay();
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function resetAutoPlay() {
    clearInterval(autoInterval);
    autoInterval = setInterval(nextSlide, 5000);
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Start autoplay
  autoInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  carousel.addEventListener('mouseenter', function() { clearInterval(autoInterval); });
  carousel.addEventListener('mouseleave', function() { resetAutoPlay(); });

  // ==================== SMOOTH SCROLL WITH HEADER OFFSET ====================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ==================== FORM VALIDATION ====================
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const requiredFields = form.querySelectorAll('[required]');

  function checkFormValidity() {
    let valid = true;
    requiredFields.forEach(function(field) {
      if (!field.value.trim()) { valid = false; }
    });
    submitBtn.disabled = !valid;
  }

  requiredFields.forEach(function(field) {
    field.addEventListener('input', checkFormValidity);
    field.addEventListener('change', checkFormValidity);
  });

  // Form submit handler (UI only - no backend)
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form handler)
    setTimeout(function() {
      var btn = submitBtn;
      btn.textContent = 'Thank You!';
      btn.style.background = '#4CAF50';
      form.querySelectorAll('input, select, textarea').forEach(function(f) { f.value = ''; });
      setTimeout(function() {
        btn.textContent = 'Submit';
        btn.style.background = '';
        btn.disabled = true;
      }, 3000);
    }, 800);
  });

  // ==================== FAQ ACCORDION ====================
  // Native <details>/<summary> handles this natively.
  // Click handlers for analytics if needed.
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      // Native details/summary handles the toggling
    });
  });

  console.log('Meritage site initialized');
});