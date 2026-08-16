/* ============================================
   ANIMATION.JS — GSAP, Canvas & Visual Effects
   ============================================ */

'use strict';

// ============ HERO CANVAS PARTICLE SYSTEM ============
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animFrameId = null;
    this.resizeObserver = null;

    this.config = {
      count: 80,
      maxSize: 3,
      minSize: 0.5,
      speed: 0.4,
      connectDistance: 120,
      colors: ['#7c3aed', '#06b6d4', '#a78bfa', '#67e8f9', '#5b21b6'],
    };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.particles = [];

    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      size,
      originalSize: size,
      color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(this.canvas);
  }

  update() {
    this.particles.forEach((p) => {
      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.vx -= (dx / dist) * force * 0.8;
          p.vy -= (dy / dist) * force * 0.8;
        }
      }

      // Pulse effect
      p.pulse += 0.02;
      p.size = p.originalSize + Math.sin(p.pulse) * 0.5;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Friction
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Restore speed if too slow
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed < this.config.speed * 0.5) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
      }

      // Bounds (wrap around)
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.connectDistance) {
          const opacity = (1 - dist / this.config.connectDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;

      // Glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, p.color + '40');
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    this.animFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}

// ============ TYPEWRITER EFFECT ============
class Typewriter {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;

    this.options = {
      typeSpeed: options.typeSpeed || 80,
      deleteSpeed: options.deleteSpeed || 50,
      pauseTime: options.pauseTime || 2000,
      loop: options.loop !== false,
    };

    this.type();
  }

  type() {
    const current = this.words[this.wordIndex % this.words.length];

    if (this.isDeleting) {
      this.charIndex--;
      this.element.textContent = current.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      this.element.textContent = current.substring(0, this.charIndex);
    }

    let speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

    if (!this.isDeleting && this.charIndex === current.length) {
      if (!this.options.loop && this.wordIndex === this.words.length - 1) return;
      speed = this.options.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex++;
      speed = 300;
    }

    setTimeout(() => this.type(), speed);
  }
}

// ============ GSAP ANIMATIONS ============
const GSAPAnimations = {
  init() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.initScrollAnimations();
    }

    this.initHeroAnimations();
  },

  initHeroAnimations() {
    // Hero timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from('.hero-badge', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
    })
    .from('.hero-title .title-greeting', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-title .title-name', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-title .title-role', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.2')
    .from('.hero-stats', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-social', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-visual', {
      opacity: 0,
      x: 50,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.3);

    // Floating elements
    gsap.from('.float-element', {
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      delay: 1.5,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
  },

  initScrollAnimations() {
    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.15,
        ease: 'power3.out',
      });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });
    });

    // Tech stack items
    gsap.utils.toArray('.tech-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: '.tech-stack-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        scale: 0.8,
        delay: i * 0.05,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    });

    // CTA section
    gsap.from('.cta-wrapper', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      },
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
    });
  },
};

// ============ COUNTER ANIMATION ============
class CounterAnimation {
  constructor(element) {
    this.element = element;
    this.target = parseInt(element.getAttribute('data-count'));
    this.duration = 2000;
    this.started = false;
  }

  start() {
    if (this.started) return;
    this.started = true;

    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * this.target);

      this.element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}

// ============ SKILL BARS ============
const SkillBars = {
  init() {
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
};

// ============ TILT EFFECT ============
class TiltEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxTilt: options.maxTilt || 15,
      perspective: options.perspective || 1000,
      scale: options.scale || 1.02,
      speed: options.speed || 400,
    };
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('mouseenter', () => this.onEnter());
    this.element.addEventListener('mousemove', (e) => this.onMove(e));
    this.element.addEventListener('mouseleave', () => this.onLeave());
  }

  onEnter() {
    this.element.style.transition = 'none';
  }

  onMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.options.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.options.maxTilt;

    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${this.options.scale})
    `;
  }

  onLeave() {
    this.element.style.transition = `transform ${this.options.speed}ms ease`;
    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }
}

// ============ MAGNETIC BUTTON ============
class MagneticButton {
  constructor(element) {
    this.element = element;
    this.strength = 40;
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('mousemove', (e) => this.onMove(e));
    this.element.addEventListener('mouseleave', () => this.onLeave());
  }

  onMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.element.style.transform = `
      translate(${x * 0.3}px, ${y * 0.3}px)
    `;
  }

  onLeave() {
    this.element.style.transform = 'translate(0, 0)';
    this.element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

    setTimeout(() => {
      this.element.style.transition = '';
    }, 500);
  }
}

// ============ LOADER PARTICLES ============
function createLoaderParticles() {
  const container = document.getElementById('loaderParticles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * 2;

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? '#7c3aed' : '#06b6d4'};
      border-radius: 50%;
      opacity: 0;
      animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
    `;

    container.appendChild(particle);
  }
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 80;

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============ EXPORT / INIT ============
document.addEventListener('DOMContentLoaded', () => {
  createLoaderParticles();
  initSmoothScroll();
  GSAPAnimations.init();
  SkillBars.init();

  // Init tilt on service & project cards
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.service-card, .project-card').forEach((card) => {
      new TiltEffect(card, { maxTilt: 8 });
    });

    // Magnetic on primary buttons
    document.querySelectorAll('.btn-primary').forEach((btn) => {
      new MagneticButton(btn);
    });
  }
});

// Export classes for main.js
window.ParticleSystem = ParticleSystem;
window.Typewriter = Typewriter;
window.CounterAnimation = CounterAnimation;