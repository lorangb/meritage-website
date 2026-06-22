/* Meritage Website v2 - Interactive Features */
/* Clone of meritage.vc - smooth, polished UX */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.getElementById('header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==================== MOBILE MENU ====================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');

  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
  });

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
      const tabId = this.getAttribute('data-tab');

      // Deactivate all
      tabBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function(p) {
        p.classList.remove('active');
      });

      // Activate clicked
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      document.querySelector('.tab-panel[data-panel="' + tabId + '"]').classList.add('active');
    });
  });

  // ==================== TESTIMONIALS CAROUSEL ====================
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoplayInterval;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  // Dot click
  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      stopAutoplay();
      goToSlide(parseInt(this.getAttribute('data-slide')));
      startAutoplay();
    });
  });

  prevBtn.addEventListener('click', function() {
    stopAutoplay();
    prevSlide();
    startAutoplay();
  });

  nextBtn.addEventListener('click', function() {
    stopAutoplay();
    nextSlide();
    startAutoplay();
  });

  // Pause on hover
  const carousel = document.querySelector('.carousel-container');
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();

  // ==================== FAQ ACCORDION ====================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(function(i) {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==================== SCROLL ANIMATIONS ====================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function(el) {
    observer.observe(el);
  });

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      company: document.getElementById('company').value,
      title: document.getElementById('title').value,
      role: document.getElementById('role').value,
      interests: Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(function(cb) {
        return cb.value;
      }),
      message: document.getElementById('message').value
    };

    // Show success state
    const submitBtn = contactForm.querySelector('.form-submit .btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = '#28a745';
    submitBtn.disabled = true;

    setTimeout(function() {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);

    console.log('Form submitted:', formData);
    // In production, this would POST to a backend endpoint
  });
});