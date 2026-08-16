/* ============================================
   PAGES.JS — Inner Page Specific Logic
   ============================================ */

'use strict';

const PagesJS = {
  init() {
    this.initTimelineTabs();
    this.initSkillTabs();
    this.initFAQ();
    this.initContactForm();
    this.initFileUpload();
    this.initCharCounter();
    this.initCircularSkills();
    this.initSkillBars();
    this.initCounters();
  },

  /* ---- TIMELINE TABS (About Page) ---- */
  initTimelineTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.timeline-content');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach((t) => t.classList.remove('active'));
        contents.forEach((c) => c.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) {
          targetContent.classList.add('active');

          // Animate items in
          const items = targetContent.querySelectorAll('.timeline-item');
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = '';
            }, i * 100);
          });
        }
      });
    });
  },

  /* ---- SKILL CATEGORY TABS (Skills Page) ---- */
  initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab-btn');
    const items = document.querySelectorAll('.skill-bar-item');
    const groups = document.querySelectorAll('.skill-group');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        if (category === 'all') {
          groups.forEach((g) => {
            g.style.display = '';
            g.style.opacity = '0';
            g.style.transform = 'translateY(20px)';
            setTimeout(() => {
              g.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              g.style.opacity = '1';
              g.style.transform = '';
            }, 50);
          });
        } else {
          groups.forEach((g) => {
            const hasCategory = Array.from(g.querySelectorAll(`[data-category="${category}"]`)).length > 0;
            if (hasCategory) {
              g.style.display = '';
              g.style.opacity = '0';
              g.style.transform = 'translateY(20px)';
              setTimeout(() => {
                g.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                g.style.opacity = '1';
                g.style.transform = '';
              }, 50);
            } else {
              g.style.display = 'none';
            }
          });
        }
      });
    });
  },

  /* ---- FAQ ACCORDION ---- */
  initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        items.forEach((i) => i.classList.remove('open'));

        // Open clicked (if was closed)
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  },

  /* ---- CONTACT FORM ---- */
  initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.validateForm(form)) return;

      const btn = document.getElementById('submitBtn');
      const original = btn.innerHTML;

      btn.innerHTML = `
        <span>Sending...</span>
        <i class="bx bx-loader bx-spin"></i>
      `;
      btn.disabled = true;

      try {
        await new Promise((r) => setTimeout(r, 2000));

        // Show success inline
        const success = document.getElementById('formSuccess');
        if (success) {
          success.style.display = 'flex';
          success.style.opacity = '0';
          success.style.transform = 'translateY(10px)';
          setTimeout(() => {
            success.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            success.style.opacity = '1';
            success.style.transform = '';
          }, 50);
        }

        form.reset();
        this.resetFloatingLabels(form);

        // Toast
        if (window.App) {
          App.showToast('success', 'Message sent! I\'ll reply within 24 hours.');
        }

        // Hide success after 8s
        setTimeout(() => {
          if (success) success.style.display = 'none';
        }, 8000);

      } catch {
        if (window.App) {
          App.showToast('error', 'Oops! Something went wrong. Please try again.');
        }
      } finally {
        btn.innerHTML = original;
        btn.disabled = false;
      }
    });

    // Live validation
    form.querySelectorAll('.form-control[required]').forEach((field) => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  },

  validateForm(form) {
    let valid = true;
    form.querySelectorAll('.form-control[required]').forEach((field) => {
      if (!this.validateField(field)) valid = false;
    });

    // Privacy checkbox
    const privacy = form.querySelector('#privacy');
    if (privacy && !privacy.checked) {
      const label = privacy.closest('.checkbox-label');
      if (label) label.style.outline = '2px solid var(--danger)';
      valid = false;
    }

    return valid;
  },

  validateField(field) {
    const value = field.value.trim();
    let error = '';

    if (field.required && !value) {
      error = 'This field is required';
    } else if (field.type === 'email' && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (field.minLength && value.length < field.minLength) {
      error = `Minimum ${field.minLength} characters required`;
    }

    if (error) {
      this.showFieldError(field, error);
      return false;
    }

    this.clearFieldError(field);
    return true;
  },

  showFieldError(field, message) {
    this.clearFieldError(field);
    field.style.borderColor = 'var(--danger)';
    field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';

    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = `
      display: block;
      color: var(--danger);
      font-size: 12px;
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    `;
    err.innerHTML = `<i class="bx bx-error-circle"></i> ${message}`;
    field.parentElement.appendChild(err);
  },

  clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const err = field.parentElement?.querySelector('.field-error');
    if (err) err.remove();
  },

  resetFloatingLabels(form) {
    form.querySelectorAll('.form-control').forEach((field) => {
      field.value = '';
    });
  },

  /* ---- FILE UPLOAD ---- */
  initFileUpload() {
    const fileInput = document.getElementById('attachment');
    const fileName = document.getElementById('fileName');
    if (!fileInput || !fileName) return;

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const size = (file.size / 1024 / 1024).toFixed(2);

        if (file.size > 10 * 1024 * 1024) {
          fileName.textContent = '⚠️ File too large. Max 10MB allowed.';
          fileName.style.color = 'var(--danger)';
          fileInput.value = '';
          return;
        }

        fileName.innerHTML = `<i class="bx bx-file"></i> ${file.name} (${size} MB)`;
        fileName.style.color = 'var(--success)';
      }
    });

    // Drag & Drop
    const uploadArea = document.querySelector('.file-upload-area');
    if (!uploadArea) return;

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--accent)';
      uploadArea.style.background = 'rgba(124,58,237,0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = '';
      uploadArea.style.background = '';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadArea.style.background = '';

      const dt = e.dataTransfer;
      if (dt.files.length > 0) {
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  },

  /* ---- CHARACTER COUNTER ---- */
  initCharCounter() {
    const textarea = document.getElementById('message');
    const counter = document.getElementById('charCount');
    if (!textarea || !counter) return;

    const maxLen = 500;
    textarea.setAttribute('maxlength', maxLen);

    textarea.addEventListener('input', () => {
      const count = textarea.value.length;
      counter.textContent = `${count} / ${maxLen}`;

      if (count > maxLen * 0.9) {
        counter.style.color = 'var(--warning)';
      } else if (count >= maxLen) {
        counter.style.color = 'var(--danger)';
      } else {
        counter.style.color = 'var(--text-muted)';
      }
    });
  },

  /* ---- CIRCULAR SKILL PROGRESS ---- */
  initCircularSkills() {
    const circles = document.querySelectorAll('.circle-progress');
    if (!circles.length) return;

    // Add SVG gradient definition
    const svgDefs = `
      <svg width="0" height="0" style="position:absolute">
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#7c3aed" />
            <stop offset="100%" style="stop-color:#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    `;
    document.body.insertAdjacentHTML('afterbegin', svgDefs);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const percent = parseInt(circle.getAttribute('data-percent'));
          const progressEl = circle.querySelector('.progress');

          if (progressEl) {
            const circumference = 2 * Math.PI * 50; // r=50
            const offset = circumference - (percent / 100) * circumference;

            setTimeout(() => {
              progressEl.style.strokeDashoffset = offset;
            }, 200);
          }

          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.3 });

    circles.forEach((c) => observer.observe(c));
  },

  /* ---- SKILL BARS ---- */
  initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach((bar) => observer.observe(bar));
  },

  /* ---- COUNTERS ---- */
  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const duration = 2000;
          const start = performance.now();

          const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
          };

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((c) => observer.observe(c));
  },
};

/* ---- Init on DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  PagesJS.init();
});