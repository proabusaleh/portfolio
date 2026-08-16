/* ============================================
   MAIN.JS — Core App Logic & Interactions
   ============================================ */

'use strict';

// ============ APP STATE ============
const App = {
  state: {
    isLoaded: false,
    theme: localStorage.getItem('theme') || 'dark',
    menuOpen: false,
    scrollY: 0,
    isMobile: window.innerWidth <= 1024,
  },

  // DOM Cache
  dom: {},

  init() {
    this.cacheDOM();
    this.initTheme();
    this.initLoader();
    this.initCursor();
    this.initNavbar();
    this.initHero();
    this.initCounters();
    this.initProjectFilter();
    this.initSwiper();
    this.initAOS();
    this.initScrollEvents();
    this.initYear();
    this.initForms();
    this.initButtonRipple();
    this.initOverlay();
    this.bindGlobalEvents();
  },

  cacheDOM() {
    this.dom = {
      loader: document.getElementById('loader'),
      loaderProgress: document.querySelector('.loader-progress'),
      loaderPercent: document.querySelector('.loader-percent'),
      cursorDot: document.getElementById('cursorDot'),
      cursorOutline: document.getElementById('cursorOutline'),
      header: document.getElementById('header'),
      navMenu: document.getElementById('navMenu'),
      navToggle: document.getElementById('navToggle'),
      navClose: document.getElementById('navClose'),
      navLinks: document.querySelectorAll('.nav-link'),
      themeToggle: document.getElementById('themeToggle'),
      themeIcon: document.getElementById('themeIcon'),
      scrollProgress: document.getElementById('scrollProgress'),
      backToTop: document.getElementById('backToTop'),
      heroCanvas: document.getElementById('heroCanvas'),
      typewriter: document.getElementById('typewriter'),
      counters: document.querySelectorAll('.stat-number'),
      filterBtns: document.querySelectorAll('.filter-btn'),
      projectCards: document.querySelectorAll('.project-card'),
      year: document.getElementById('year'),
    };
  },

  // ============ THEME ============
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.updateThemeIcon();
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('theme', this.state.theme);
    this.updateThemeIcon();
  },

  updateThemeIcon() {
    if (!this.dom.themeIcon) return;
    this.dom.themeIcon.className = this.state.theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  },

  // ============ LOADER ============
  initLoader() {
    let progress = 0;
    createLoaderParticles();

    const interval = setInterval(() => {
      // Simulate loading progress
      const increment = Math.random() * 15 + 5;
      progress = Math.min(progress + increment, 95);

      if (this.dom.loaderProgress) {
        this.dom.loaderProgress.style.width = progress + '%';
      }
      if (this.dom.loaderPercent) {
        this.dom.loaderPercent.textContent = Math.round(progress) + '%';
      }
    }, 200);

    window.addEventListener('load', () => {
      clearInterval(interval);

      // Complete to 100%
      if (this.dom.loaderProgress) this.dom.loaderProgress.style.width = '100%';
      if (this.dom.loaderPercent) this.dom.loaderPercent.textContent = '100%';

      setTimeout(() => {
        this.hideLoader();
      }, 500);
    });

    // Fallback: hide after 4s
    setTimeout(() => {
      if (!this.state.isLoaded) this.hideLoader();
    }, 4000);
  },

  hideLoader() {
    if (this.state.isLoaded) return;
    this.state.isLoaded = true;

    if (this.dom.loader) {
      this.dom.loader.classList.add('hidden');

      setTimeout(() => {
        this.dom.loader.style.display = 'none';
        document.body.classList.remove('loading');
      }, 700);
    }
  },

  // ============ CURSOR ============
  initCursor() {
    const { cursorDot, cursorOutline } = this.dom;
    if (!cursorDot || !cursorOutline || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        isVisible = true;
      }

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
      isVisible = false;
    });

    // Smooth outline follow
    const animateOutline = () => {
      const ease = 0.12;
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateOutline);
    };

    animateOutline();

    // Cursor states
    document.querySelectorAll('a, button, .service-card, .project-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'var(--accent)';
      });

      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(124, 58, 237, 0.5)';
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  },

  // ============ NAVBAR ============
  initNavbar() {
    const { navToggle, navClose, navMenu } = this.dom;

    if (navToggle) {
      navToggle.addEventListener('click', () => this.openMenu());
    }

    if (navClose) {
      navClose.addEventListener('click', () => this.closeMenu());
    }

    // Mobile dropdown
    document.querySelectorAll('.has-dropdown').forEach((item) => {
      const link = item.querySelector('.nav-link');

      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    });

    // Active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.dom.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Theme toggle
    if (this.dom.themeToggle) {
      this.dom.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  },

  openMenu() {
    this.state.menuOpen = true;
    this.dom.navMenu?.classList.add('active');
    this.getOverlay()?.classList.add('active');
    document.body.classList.add('no-scroll');
    this.animateHamburger(true);
  },

  closeMenu() {
    this.state.menuOpen = false;
    this.dom.navMenu?.classList.remove('active');
    this.getOverlay()?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    this.animateHamburger(false);
  },

  getOverlay() {
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => this.closeMenu());
    }
    return overlay;
  },

  animateHamburger(open) {
    const lines = document.querySelectorAll('.hamburger-line');
    if (!lines.length) return;

    if (open) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  },

  // ============ HERO ============
  initHero() {
    // Canvas Particles
    if (this.dom.heroCanvas) {
      const ps = new window.ParticleSystem(this.dom.heroCanvas);

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => ps.destroy());
    }

    // Typewriter
    if (this.dom.typewriter) {
      new window.Typewriter(this.dom.typewriter, [
        'Amazing Websites',
        'Creative UIs',
        'Mobile Apps',
        'Digital Products',
        'Modern Solutions',
        'Your Dreams',
      ], {
        typeSpeed: 75,
        deleteSpeed: 45,
        pauseTime: 2200,
      });
    }
  },

  // ============ COUNTERS ============
  initCounters() {
    if (!this.dom.counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = new window.CounterAnimation(entry.target);
          counter.start();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.dom.counters.forEach((counter) => observer.observe(counter));
  },

  // ============ PROJECT FILTER ============
  initProjectFilter() {
    if (!this.dom.filterBtns.length) return;

    this.dom.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active state
        this.dom.filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        this.filterProjects(filter);
      });
    });
  },

  filterProjects(filter) {
    this.dom.projectCards.forEach((card, i) => {
      const categories = card.getAttribute('data-category') || '';
      const show = filter === 'all' || categories.includes(filter);

      if (show) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        card.style.display = '';

        setTimeout(() => {
          card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
          card.style.opacity = '1';
          card.style.transform = '';
        }, 10);
      } else {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';

        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  },

  // ============ SWIPER ============
  initSwiper() {
    if (typeof Swiper === 'undefined') return;

    // Testimonials Swiper
    const testimonialEl = document.querySelector('.testimonials-swiper');
    if (testimonialEl) {
      new Swiper('.testimonials-swiper', {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        slidesPerView: 1,
        spaceBetween: 24,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
        },
        effect: 'slide',
        grabCursor: true,
      });
    }

    // Portfolio Swiper (if applicable)
    const portfolioEl = document.querySelector('.portfolio-swiper');
    if (portfolioEl) {
      new Swiper('.portfolio-swiper', {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: true,
        autoplay: { delay: 4000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          576: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        },
      });
    }
  },

  // ============ AOS ============
  initAOS() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      offset: 60,
      delay: 0,
    });
  },

  // ============ SCROLL EVENTS ============
  initScrollEvents() {
    const handleScroll = () => {
      this.state.scrollY = window.scrollY;

      // Header scroll effect
      if (this.dom.header) {
        if (this.state.scrollY > 50) {
          this.dom.header.classList.add('scrolled');
        } else {
          this.dom.header.classList.remove('scrolled');
        }
      }

      // Scroll progress bar
      if (this.dom.scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (this.state.scrollY / totalHeight) * 100;
        this.dom.scrollProgress.style.width = Math.min(progress, 100) + '%';
      }

      // Back to top button
      if (this.dom.backToTop) {
        if (this.state.scrollY > 500) {
          this.dom.backToTop.classList.add('visible');
        } else {
          this.dom.backToTop.classList.remove('visible');
        }
      }

      // Active section highlight in nav (only on index)
      this.updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    if (this.dom.backToTop) {
      this.dom.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  },

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height')
    ) || 80;

    sections.forEach((section) => {
      const top = section.offsetTop - headerHeight - 100;
      const bottom = top + section.offsetHeight;

      if (this.state.scrollY >= top && this.state.scrollY < bottom) {
        this.dom.navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },

  // ============ YEAR ============
  initYear() {
    if (this.dom.year) {
      this.dom.year.textContent = new Date().getFullYear();
    }
  },

  // ============ FORMS ============
  initForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        this.showToast('success', `Thanks! ${email} subscribed successfully.`);
        newsletterForm.reset();
      });
    }

    // Contact form (handled in contact.js)
  },

  // ============ BUTTON RIPPLE ============
  initButtonRipple() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  },

  // ============ OVERLAY (Global) ============
  initOverlay() {
    const overlay = this.getOverlay();
    document.body.appendChild(overlay);
  },

  // ============ TOAST NOTIFICATIONS ============
  showToast(type = 'success', message = '', duration = 3500) {
    const icons = {
      success: 'bx bx-check-circle',
      error: 'bx bx-error-circle',
      info: 'bx bx-info-circle',
      warning: 'bx bx-bell',
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="toast-icon ${icons[type] || icons.info}"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.classList.remove('show')" style="margin-left:auto;font-size:18px;color:var(--text-muted)">
        <i class="bx bx-x"></i>
      </button>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  // ============ GLOBAL EVENTS ============
  bindGlobalEvents() {
    // Close menu on resize
    window.addEventListener('resize', () => {
      this.state.isMobile = window.innerWidth <= 1024;
      if (!this.state.isMobile && this.state.menuOpen) {
        this.closeMenu();
      }
    });

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.menuOpen) {
        this.closeMenu();
      }
    });

    // Prevent form default on all forms with data-prevent
    document.querySelectorAll('form[data-prevent]').forEach((form) => {
      form.addEventListener('submit', (e) => e.preventDefault());
    });

    // Lazy load images
    this.initLazyLoad();

    // Copy code blocks
    this.initCodeCopy();

    // External links
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  },

  initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      images.forEach((img) => observer.observe(img));
    }
  },

  initCodeCopy() {
    document.querySelectorAll('pre code').forEach((block) => {
      const btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.className = 'code-copy-btn';
      btn.style.cssText = `
        position: absolute; top: 10px; right: 10px;
        background: var(--accent); color: white;
        border: none; border-radius: 4px;
        padding: 4px 10px; font-size: 12px; cursor: pointer;
      `;

      const pre = block.parentElement;
      pre.style.position = 'relative';
      pre.appendChild(btn);

      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => (btn.textContent = 'Copy'), 2000);
        });
      });
    });
  },
};

// ============ CONTACT.JS (inline) ============
const ContactForm = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');

      // Validate
      if (!this.validate(form)) return;

      // Loading state
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
      btn.disabled = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        App.showToast('success', 'Message sent! I\'ll get back to you within 24 hours.');
        form.reset();
        form.querySelectorAll('.form-label').forEach((label) => {
          label.style.top = '';
          label.style.fontSize = '';
          label.style.color = '';
        });
      } catch (err) {
        App.showToast('error', 'Failed to send. Please try again or email directly.');
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });

    // Real-time validation
    form.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  validate(form) {
    let valid = true;
    form.querySelectorAll('.form-control[required]').forEach((input) => {
      if (!this.validateField(input)) valid = false;
    });
    return valid;
  },

  validateField(input) {
    const value = input.value.trim();
    let error = '';

    if (!value) {
      error = `${input.getAttribute('placeholder') || 'This field'} is required`;
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (input.minLength && value.length < input.minLength) {
      error = `Minimum ${input.minLength} characters required`;
    }

    if (error) {
      this.showError(input, error);
      return false;
    }

    this.clearError(input);
    return true;
  },

  showError(input, message) {
    this.clearError(input);
    input.style.borderColor = 'var(--danger)';

    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = `
      display: block; color: var(--danger);
      font-size: 12px; margin-top: 6px;
    `;
    err.textContent = message;
    input.parentElement.appendChild(err);
  },

  clearError(input) {
    input.style.borderColor = '';
    const err = input.parentElement.querySelector('.field-error');
    if (err) err.remove();
  },
};

// ============ START APP ============
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  ContactForm.init();
});

// ============ PAGE VISIBILITY ============
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👋 Come back! | DevPortfolio';
  } else {
    document.title = 'DevPortfolio | Creative Developer';
  }
});
