/* ============================================
   EXPERIENCE-EDUCATION.JS
   Interactive logic for experience.html
   and education.html
   ============================================ */

'use strict';

/* ============ EXPERIENCE PAGE ============ */
const ExperiencePage = {

  currentJob: 'job1',

  init() {
    this.initDetailSwitcher();
    this.initKeyboardNav();
    this.initDetailAnimations();
  },

  initDetailSwitcher() {
    const items = document.querySelectorAll('.exp-item');
    if (!items.length) return;

    items.forEach(item => {
      const content = item.querySelector('.exp-item-content');
      if (!content) return;

      content.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        this.switchDetail(id, items);
      });
    });
  },

  switchDetail(id, items) {
    if (this.currentJob === id) return;
    this.currentJob = id;

    // Update timeline active state
    if (!items) items = document.querySelectorAll('.exp-item');
    items.forEach(item => {
      item.classList.remove('active');
      const dot = item.querySelector('.exp-dot');
      if (dot) dot.classList.remove('active-dot');
    });

    const activeItem = document.querySelector(`[data-id="${id}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
      const dot = activeItem.querySelector('.exp-dot');
      if (dot) dot.classList.add('active-dot');
    }

    // Animate out current detail
    const allDetails = document.querySelectorAll('.exp-detail');
    const currentDetail = document.querySelector('.exp-detail[style*="block"]');

    if (currentDetail) {
      currentDetail.style.opacity = '0';
      currentDetail.style.transform = 'translateX(20px)';
      currentDetail.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

      setTimeout(() => {
        allDetails.forEach(d => d.style.display = 'none');

        const newDetail = document.getElementById(`detail-${id}`);
        if (newDetail) {
          newDetail.style.display = 'block';
          newDetail.style.opacity = '0';
          newDetail.style.transform = 'translateX(-20px)';

          requestAnimationFrame(() => {
            newDetail.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            newDetail.style.opacity = '1';
            newDetail.style.transform = '';
          });
        }
      }, 250);
    } else {
      allDetails.forEach(d => d.style.display = 'none');
      const newDetail = document.getElementById(`detail-${id}`);
      if (newDetail) {
        newDetail.style.display = 'block';
        newDetail.style.opacity = '1';
        newDetail.style.transform = '';
      }
    }

    // Scroll detail panel into view on mobile
    if (window.innerWidth <= 1024) {
      const panel = document.getElementById('expDetailPanel');
      if (panel) {
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  },

  initKeyboardNav() {
    const items = document.querySelectorAll('.exp-item');
    if (!items.length) return;

    const ids = Array.from(items).map(item => item.getAttribute('data-id'));

    document.addEventListener('keydown', e => {
      const currentIndex = ids.indexOf(this.currentJob);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, ids.length - 1);
        this.switchDetail(ids[nextIndex], items);
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        this.switchDetail(ids[prevIndex], items);
      }
    });
  },

  initDetailAnimations() {
    // Animate achievement numbers when visible
    const achievementNums = document.querySelectorAll('.achievement-num');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(10px)';

          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = '';
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    achievementNums.forEach(num => observer.observe(num));
  },
};

/* ============ EDUCATION PAGE ============ */
const EducationPage = {

  init() {
    this.initCourseHover();
    this.initCertVerifyBtns();
    this.initTimelineAnimation();
    this.initPlatformCards();
  },

  initCourseHover() {
    const courses = document.querySelectorAll('.edc-courses span');
    courses.forEach((course, i) => {
      course.style.animationDelay = `${i * 0.05}s`;
    });
  },

  initCertVerifyBtns() {
    const verifyBtns = document.querySelectorAll('.cdc-verify-btn');
    verifyBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        if (btn.getAttribute('href') === '#') {
          e.preventDefault();
          if (window.App) {
            App.showToast('info', 'Certificate verification link would open here.');
          }
        }
      });
    });
  },

  initTimelineAnimation() {
    const items = document.querySelectorAll('.est-item');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const content = entry.target.querySelector('.est-content');
          if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(20px)';
            setTimeout(() => {
              content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              content.style.opacity = '1';
              content.style.transform = '';
            }, 100);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
  },

  initPlatformCards() {
    const cards = document.querySelectorAll('.platform-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.borderLeftColor = 'var(--accent)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.borderLeftColor = '';
      });
    });
  },
};

/* ============ GLOBAL FUNCTION ============ */
window.showExpDetail = function(id) {
  ExperiencePage.switchDetail(id, document.querySelectorAll('.exp-item'));
};

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  // Experience page
  if (document.querySelector('.experience-section')) {
    ExperiencePage.init();
  }

  // Education page
  if (document.querySelector('.education-section')) {
    EducationPage.init();
  }
});