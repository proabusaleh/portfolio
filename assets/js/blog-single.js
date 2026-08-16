/* ============================================
   BLOG-SINGLE.JS
   ============================================ */

'use strict';

const BlogSingle = {

  init() {
    this.initReadProgress();
    this.initTOC();
    this.initCodeCopy();
    this.initReactions();
    this.initCommentForm();
    this.initShareButtons();
    this.initNewsletter();
    this.initStickyTOC();
  },

  /* ---- READ PROGRESS BAR ---- */
  initReadProgress() {
    const bar = document.getElementById('readProgressBar');
    const content = document.querySelector('.blog-single-content');
    if (!bar || !content) return;

    window.addEventListener('scroll', () => {
      const contentTop = content.offsetTop;
      const contentHeight = content.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const progress = ((scrollY - contentTop + windowHeight) / (contentHeight)) * 100;
      bar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }, { passive: true });
  },

  /* ---- TABLE OF CONTENTS ACTIVE HIGHLIGHT ---- */
  initTOC() {
    const tocLinks = document.querySelectorAll('.bs-toc a');
    const headings = document.querySelectorAll('.bs-content h2');
    if (!tocLinks.length || !headings.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.style.color = '';
            link.style.fontWeight = '';
          });
          const activeLink = document.querySelector(`.bs-toc a[href="#${id}"]`);
          if (activeLink) {
            activeLink.style.color = 'var(--accent)';
            activeLink.style.fontWeight = '600';
          }
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(h => observer.observe(h));

    // Smooth scroll on TOC click
    tocLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const top = target.offsetTop - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  },

  /* ---- CODE COPY ---- */
  initCodeCopy() {
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('.bs-code-block').querySelector('pre code');
        if (!pre) return;

        navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="bx bx-check"></i> Copied!';
          btn.style.color = 'var(--success)';
          btn.style.borderColor = 'var(--success)';

          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      });
    });
  },

  /* ---- REACTIONS ---- */
  initReactions() {
    const btns = document.querySelectorAll('.reaction-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        const countEl = btn.querySelector('.reaction-count');
        const count = parseInt(countEl.textContent);

        if (isActive) {
          btn.classList.remove('active');
          countEl.textContent = count - 1;
        } else {
          btn.classList.add('active');
          countEl.textContent = count + 1;

          // Animate
          btn.style.transform = 'translateY(-8px) scale(1.15)';
          setTimeout(() => {
            btn.style.transform = '';
          }, 400);
        }
      });
    });
  },

  /* ---- COMMENT FORM ---- */
  initCommentForm() {
    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Posting...';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 1200));

      // Add comment to list
      const nameInput = form.querySelector('input[type="text"]');
      const messageInput = form.querySelector('textarea');
      const name = nameInput?.value || 'Anonymous';
      const message = messageInput?.value || '';

      const commentList = document.querySelector('.comment-list');
      if (commentList && message) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.style.opacity = '0';
        comment.style.transform = 'translateY(20px)';
        comment.innerHTML = `
          <img src="assets/images/hero/profile.jpg" alt="${name}" />
          <div class="comment-body">
            <div class="comment-header">
              <strong>${name}</strong>
              <span>Just now</span>
            </div>
            <p>${message}</p>
            <div class="comment-actions">
              <button><i class="bx bx-like"></i> 0</button>
              <button><i class="bx bx-reply"></i> Reply</button>
            </div>
          </div>
        `;
        commentList.appendChild(comment);
        setTimeout(() => {
          comment.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          comment.style.opacity = '1';
          comment.style.transform = '';
        }, 50);

        comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      btn.innerHTML = original;
      btn.disabled = false;
      form.reset();

      if (window.App) {
        App.showToast('success', 'Comment posted successfully!');
      }
    });
  },

  /* ---- SHARE BUTTONS ---- */
  initShareButtons() {
    // Copy link button
    const copyBtn = document.getElementById('copyArticleLink');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const orig = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="bx bx-check"></i> Copied!';
          copyBtn.style.borderColor = 'var(--success)';
          copyBtn.style.color = 'var(--success)';
          setTimeout(() => {
            copyBtn.innerHTML = orig;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
          }, 2500);
        });
      });
    }

    // Twitter / LinkedIn share
    const title = document.querySelector('.bs-title')?.textContent || '';
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    const twitterBtn = document.querySelector('.bs-share-btn.twitter');
    const linkedinBtn = document.querySelector('.bs-share-btn.linkedin');

    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      twitterBtn.setAttribute('target', '_blank');
    }
    if (linkedinBtn) {
      linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      linkedinBtn.setAttribute('target', '_blank');
    }
  },

  /* ---- NEWSLETTER ---- */
  initNewsletter() {
    const form = document.getElementById('bsNewsletter');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input').value;
      if (window.App) App.showToast('success', `Thanks! ${email} subscribed.`);
      form.reset();
    });
  },

  /* ---- STICKY TOC (desktop) ---- */
  initStickyTOC() {
    const toc = document.getElementById('bsToc');
    if (!toc) return;

    // Make TOC collapsible on mobile
    if (window.innerWidth <= 768) {
      const title = toc.querySelector('h4');
      const list = toc.querySelector('ol');

      list.style.display = 'none';

      title.style.cursor = 'pointer';
      title.addEventListener('click', () => {
        const isOpen = list.style.display !== 'none';
        list.style.display = isOpen ? 'none' : '';
      });
    }
  },
};

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  BlogSingle.init();
});