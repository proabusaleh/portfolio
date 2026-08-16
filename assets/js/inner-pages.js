/* ============================================
   INNER-PAGES.JS
   Resume, Testimonials, FAQ, Experience,
   Education Logic
   ============================================ */

'use strict';

const InnerPages = {

  init() {
    this.initResume();
    this.initTestimonialsFilter();
    this.initFAQPage();
    this.initVideoCards();
    this.initRatingBars();
  },

  /* ---- RESUME ---- */
  initResume() {
    // Print Button
    const printBtn = document.getElementById('printResume');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Highlight on hover
    document.querySelectorAll('.resume-entry').forEach(entry => {
      entry.addEventListener('mouseenter', () => {
        entry.style.transform = 'translateX(4px)';
        entry.style.transition = 'transform 0.3s ease';
      });
      entry.addEventListener('mouseleave', () => {
        entry.style.transform = '';
      });
    });
  },

  /* ---- TESTIMONIALS FILTER ---- */
  initTestimonialsFilter() {
    const filterBtns = document.querySelectorAll('.testimonial-filter .filter-btn');
    const cards = document.querySelectorAll('.testimonial-full-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach((card, i) => {
          const cats = card.getAttribute('data-category') || '';
          const show = filter === 'all' || cats.includes(filter);

          if (show) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
              card.style.opacity = '1';
              card.style.transform = '';
            }, 20);
          } else {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 250);
          }
        });
      });
    });
  },

  /* ---- FAQ PAGE ---- */
  initFAQPage() {
    this.initFAQAccordion();
    this.initFAQSearch();
    this.initFAQCategories();
  },

  initFAQAccordion() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all in same group
        const group = item.closest('.faq-group') || document;
        group.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        if (!isOpen) item.classList.add('open');
      });
    });
  },

  initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    const clearBtn = document.getElementById('faqClear');
    const items = document.querySelectorAll('.faq-item');
    const groups = document.querySelectorAll('.faq-group');

    if (!searchInput) return;

    let timer;

    searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();

        if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

        if (!query) {
          items.forEach(item => item.classList.remove('hidden'));
          groups.forEach(group => group.style.display = '');
          return;
        }

        groups.forEach(group => {
          let groupHasVisible = false;

          group.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
            const match = question.includes(query) || answer.includes(query);

            if (match) {
              item.classList.remove('hidden');
              groupHasVisible = true;
              // Auto-open matching items
              item.classList.add('open');
            } else {
              item.classList.add('hidden');
              item.classList.remove('open');
            }
          });

          group.style.display = groupHasVisible ? '' : 'none';
        });
      }, 200);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        items.forEach(item => {
          item.classList.remove('hidden', 'open');
        });
        groups.forEach(group => group.style.display = '');
      });
    }
  },

  initFAQCategories() {
    const catBtns = document.querySelectorAll('.faq-cat-btn');
    const groups = document.querySelectorAll('.faq-group');

    if (!catBtns.length) return;

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-cat');

        groups.forEach(group => {
          const groupCat = group.getAttribute('data-cat');
          const show = cat === 'all' || groupCat === cat;

          if (show) {
            group.style.display = '';
            group.style.opacity = '0';
            group.style.transform = 'translateY(16px)';
            setTimeout(() => {
              group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              group.style.opacity = '1';
              group.style.transform = '';
            }, 20);
          } else {
            group.style.transition = 'opacity 0.2s ease';
            group.style.opacity = '0';
            setTimeout(() => { group.style.display = 'none'; }, 200);
          }
        });
      });
    });
  },

  /* ---- VIDEO CARDS ---- */
  initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.style.cssText = `
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
        `;

        const inner = document.createElement('div');
        inner.style.cssText = `
          position: relative;
          width: 100%;
          max-width: 800px;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border);
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="bx bx-x"></i>';
        closeBtn.style.cssText = `
          position: absolute;
          top: 16px; right: 16px;
          width: 44px; height: 44px;
          background: rgba(0,0,0,0.6);
          border-radius: 50%;
          display: flex; align-items: center;
          justify-content: center;
          font-size: 24px; color: white;
          z-index: 2; cursor: pointer;
          border: none;
        `;

        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
          color: var(--text-secondary);
          font-size: 15px;
        `;
        placeholder.innerHTML = `
          <i class="bx bxl-youtube" style="font-size:4rem;color:#ef4444"></i>
          <p>Video testimonial would play here</p>
          <p style="font-size:13px;color:var(--text-muted)">Connect your video source (YouTube, Vimeo, etc.)</p>
        `;

        inner.appendChild(closeBtn);
        inner.appendChild(placeholder);
        modal.appendChild(inner);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const close = () => {
          modal.style.opacity = '0';
          setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
          }, 300);
        };

        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
      });
    });
  },

  /* ---- RATING BARS ANIMATION ---- */
  initRatingBars() {
    const fills = document.querySelectorAll('.rating-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = getComputedStyle(fill).getPropertyValue('--w');
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = width;
          }, 200);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach(f => observer.observe(f));
  },
};

/* ---- PRINT STYLES ---- */
const PrintStyles = {
  init() {
    if (!document.querySelector('.resume-document')) return;

    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * { visibility: hidden; }
        .resume-wrapper, .resume-wrapper * { visibility: visible; }
        .resume-wrapper {
          position: absolute; left: 0; top: 0;
          width: 100%; border: none; box-shadow: none;
          border-radius: 0;
        }
        .resume-header-section {
          background: #7c3aed !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .entry-tech span, .skill-pills span {
          border: 1px solid #ccc !important;
          background: #f5f5f5 !important;
          color: #333 !important;
        }
        .resume-col-right { background: #f8f8ff !important; }
      }
    `;
    document.head.appendChild(style);
  },
};

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  InnerPages.init();
  PrintStyles.init();
});