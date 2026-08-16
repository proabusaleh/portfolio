/* ============================================
   PORTFOLIO.JS — Portfolio & Project Logic
   ============================================ */

'use strict';

const PortfolioJS = {

  init() {
    this.initFilter();
    this.initSearch();
    this.initViewToggle();
    this.initSwiper();
    this.initCopyLink();
    this.initLoadMore();
    this.initPricing();
    this.initBlogFilter();
    this.initBlogSearch();
    this.initProjectNav();
  },

  /* ---- PORTFOLIO FILTER ---- */
  initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.port-card');
    const countEl = document.getElementById('projectCount');

    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visible = 0;

        cards.forEach((card, i) => {
          const cats = card.getAttribute('data-category') || '';
          const show = filter === 'all' || cats.split(' ').includes(filter);

          if (show) {
            visible++;
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92) translateY(20px)';

            setTimeout(() => {
              card.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
              card.style.opacity = '1';
              card.style.transform = '';
            }, 20);
          } else {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => { card.style.display = 'none'; }, 250);
          }
        });

        // Update count
        if (countEl) {
          setTimeout(() => {
            countEl.innerHTML = `Showing <strong>${visible}</strong> projects`;
          }, 300);
        }

        this.toggleNoResults(visible === 0);
      });
    });
  },

  /* ---- SEARCH ---- */
  initSearch() {
    const searchInput = document.getElementById('portfolioSearch');
    const cards = document.querySelectorAll('.port-card');

    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();
        let visible = 0;

        cards.forEach((card) => {
          const title = card.getAttribute('data-title') || '';
          const tags = card.querySelectorAll('.port-tags span');
          const tagText = Array.from(tags).map(t => t.textContent.toLowerCase()).join(' ');
          const desc = card.querySelector('.port-desc')?.textContent.toLowerCase() || '';

          const match = !query ||
            title.includes(query) ||
            tagText.includes(query) ||
            desc.includes(query);

          if (match) {
            visible++;
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = '';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });

        this.toggleNoResults(visible === 0);

        const countEl = document.getElementById('projectCount');
        if (countEl) {
          countEl.innerHTML = query
            ? `Showing <strong>${visible}</strong> results for "<em>${query}</em>"`
            : `Showing <strong>${visible}</strong> projects`;
        }
      }, 250);
    });
  },

  toggleNoResults(show) {
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = show ? 'block' : 'none';
  },

  /* ---- VIEW TOGGLE ---- */
  initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('portfolioGrid');

    if (!viewBtns.length || !grid) return;

    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        viewBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const view = btn.getAttribute('data-view');
        grid.classList.remove('grid-view', 'list-view');
        grid.classList.add(`${view}-view`);

        // Save preference
        localStorage.setItem('portfolioView', view);
      });
    });

    // Restore saved preference
    const savedView = localStorage.getItem('portfolioView');
    if (savedView) {
      const savedBtn = document.querySelector(`[data-view="${savedView}"]`);
      if (savedBtn) savedBtn.click();
    }
  },

  /* ---- SWIPER (Project Details) ---- */
  initSwiper() {
    if (typeof Swiper === 'undefined') return;

    const swiperEl = document.querySelector('.project-swiper');
    if (!swiperEl) return;

    new Swiper('.project-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      grabCursor: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
    });
  },

  /* ---- COPY LINK ---- */
  initCopyLink() {
    const copyBtn = document.getElementById('copyLink');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="bx bx-check"></i> Copied!';
        copyBtn.style.borderColor = 'var(--success)';
        copyBtn.style.color = 'var(--success)';

        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  },

  /* ---- LOAD MORE ---- */
  initLoadMore() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;

    let loaded = false;

    btn.addEventListener('click', () => {
      if (loaded) {
        if (window.App) App.showToast('info', 'All projects are loaded!');
        return;
      }

      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Loading...';
      btn.disabled = true;

      setTimeout(() => {
        // Simulate loading more projects
        if (window.App) App.showToast('info', 'All 9 projects are displayed. More coming soon!');
        btn.innerHTML = '<i class="bx bx-check"></i> All Projects Loaded';
        btn.style.opacity = '0.6';
        loaded = true;
      }, 1200);
    });
  },

  /* ---- PRICING TOGGLE ---- */
  initPricing() {
    const toggle = document.getElementById('billingToggle');
    if (!toggle) return;

    toggle.addEventListener('change', () => {
      const monthlyPrices = document.querySelectorAll('.monthly-price');
      const projectPrices = document.querySelectorAll('.project-price');

      if (toggle.checked) {
        monthlyPrices.forEach(el => el.style.display = 'none');
        projectPrices.forEach(el => el.style.display = '');
      } else {
        monthlyPrices.forEach(el => el.style.display = '');
        projectPrices.forEach(el => el.style.display = 'none');
      }
    });
  },

  /* ---- BLOG FILTER ---- */
  initBlogFilter() {
    const catBtns = document.querySelectorAll('.blog-cat-btn');
    const cards = document.querySelectorAll('#blogGrid .blog-card');

    if (!catBtns.length) return;

    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-cat');

        cards.forEach((card, i) => {
          const cardCat = card.getAttribute('data-category') || '';
          const show = cat === 'all' || cardCat.includes(cat);

          if (show) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
              card.style.opacity = '1';
              card.style.transform = '';
            }, 10);
          } else {
            card.style.transition = 'opacity 0.2s ease';
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  },

  /* ---- BLOG SEARCH ---- */
  initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const cards = document.querySelectorAll('#blogGrid .blog-card');

    if (!searchInput) return;

    let timer;
    searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = searchInput.value.toLowerCase().trim();

        cards.forEach((card) => {
          const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
          const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
          const match = !q || title.includes(q) || excerpt.includes(q);

          card.style.display = match ? '' : 'none';
        });
      }, 200);
    });
  },

  /* ---- PROJECT NAV ---- */
  initProjectNav() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const prevBtn = document.querySelector('.proj-nav-btn.prev');
      const nextBtn = document.querySelector('.proj-nav-btn.next');

      if (e.key === 'ArrowLeft' && prevBtn) {
        prevBtn.click();
      }
      if (e.key === 'ArrowRight' && nextBtn) {
        nextBtn.click();
      }
    });
  },
};

/* ---- Reset Function (Global) ---- */
window.resetPortfolio = function () {
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.click();
  const search = document.getElementById('portfolioSearch');
  if (search) { search.value = ''; search.dispatchEvent(new Event('input')); }
};

/* ---- Blog JS ---- */
const BlogJS = {
  init() {
    this.initPagination();
    this.initNewsletter();
    this.initReadProgress();
  },

  initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn:not(.next)');
    pageBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('next')) return;
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.App) App.showToast('info', `Page ${btn.textContent} loaded`);
      });
    });
  },

  initNewsletter() {
    const form = document.getElementById('sidebarNewsletter');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input').value;
      if (window.App) App.showToast('success', `Thanks! ${email} subscribed successfully.`);
      form.reset();
    });
  },

  initReadProgress() {
    const article = document.querySelector('.blog-single-content');
    if (!article) return;

    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed; top: 0; left: 0; height: 3px;
      background: linear-gradient(90deg, #7c3aed, #06b6d4);
      z-index: 9999; width: 0%; transition: width 0.1s linear;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = article.offsetHeight;
      const winHeight = window.innerHeight;
      const progress = (scrollTop / (docHeight - winHeight)) * 100;
      bar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  },
};

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  PortfolioJS.init();
  BlogJS.init();
});