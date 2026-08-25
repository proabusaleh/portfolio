import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import CanvasParticles from '../components/CanvasParticles.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useTypewriter, useCountersOnView } from '../lib/hooks.js';
import { getProjects } from '../lib/api.js';
import { posts } from '../data/fallback.js';

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPEWRITER_WORDS = [
  'WordPress Websites',
  'Flutter Mobile Apps',
  'WooCommerce Stores',
  'Custom Themes',
  'Cross-Platform Apps',
  'Your Vision',
];

const SERVICE_ICONS = [
  'bxl-wordpress',
  'bx-store',
  'bx-mobile-alt',
  'bx-trending-up',
];

const SERVICES = [
  {
    number: '01',
    title: 'WordPress Development',
    desc: 'Building fast, secure, and fully customized WordPress websites — from business sites to complex multi-page platforms with custom post types and ACF.',
    features: [
      'Custom Theme Development',
      'Plugin Development',
      'ACF & Custom Fields',
      'REST API Integration',
    ],
    anchor: '/services#wordpress',
  },
  {
    number: '02',
    title: 'WooCommerce Stores',
    desc: 'Creating powerful e-commerce experiences with WooCommerce — fully tailored storefronts, payment gateways, and seamless checkout flows.',
    features: [
      'WooCommerce Setup & Config',
      'Custom Product Pages',
      'Payment Gateway Integration',
      'Order & Inventory Management',
    ],
    anchor: '/services#woocommerce',
    featured: true,
  },
  {
    number: '03',
    title: 'Flutter App Development',
    desc: 'Developing beautiful, high-performance cross-platform mobile apps with Flutter that run natively on both iOS and Android from a single codebase.',
    features: [
      'Flutter & Dart',
      'iOS & Android',
      'Firebase Integration',
      'App Store & Play Store Publishing',
    ],
    anchor: '/services#flutter',
  },
  {
    number: '04',
    title: 'SEO & Performance',
    desc: 'Optimizing your WordPress site for speed and search rankings — from Core Web Vitals to technical SEO audits and structured data.',
    features: [
      'Technical SEO Audit',
      'Core Web Vitals Optimization',
      'Schema & Structured Data',
      'Analytics & Reporting',
    ],
    anchor: '/services#seo',
  },
];

const TECH_ICONS = [
  'bxl-wordpress',
  'bxl-php',
  'bxl-javascript',
  'bxl-html5',
  'bxl-css3',
  'bxl-sass',
  'bxl-flutter' ,   // Boxicons may not have bxl-flutter — see note below
  'bxl-firebase',
  'bxl-git',
  'bxl-figma',
];

const TECH_NAMES = [
  'WordPress',
  'PHP',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Sass',
  'Flutter / Dart',
  'Firebase',
  'Git',
  'Figma',
];

const TESTIMONIALS = [
  {
    text: '"Abu Saleh built our company website on WordPress and it looks absolutely stunning. He delivered on time, handled all our custom requirements, and even trained our team to manage content. Highly recommended!"',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
  },
  {
    text: '"The Flutter app Abu Saleh developed for us works flawlessly on both iPhone and Android. Our customers love it — smooth animations, fast load times, and a clean UI. Exceptional work!"',
    name: 'Mark Chen',
    role: 'Product Manager, AppVenture',
  },
  {
    text: '"Our WooCommerce store was a mess before Abu Saleh stepped in. He rebuilt it from scratch, integrated our payment gateway, and our conversion rate jumped by 35%. Absolutely brilliant!"',
    name: 'Emma Davis',
    role: 'Founder, ShopFlow',
  },
];

// ─── Marquee items ────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  'WordPress Development',
  'Flutter Apps',
  'WooCommerce',
  'Custom Themes',
  'Plugin Development',
  'iOS & Android',
  'Firebase',
  'SEO Optimization',
  'UI/UX Design',
  'Figma',
];

// ─── Helpers ───────────────────────────────────────────────────────────────

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroStat({ target, suffix, label }) {
  const { ref, inView } = useCountersOnView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const step = (now) => {
      const progress = Math.min((now - t0) / 1800, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{value}</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function ServiceCard({ service, icon, index }) {
  const badge = service.featured
    ? <div className="service-badge">Most Popular</div>
    : null;

  return (
    <div
      className={`service-card ${service.featured ? 'featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={(index + 1) * 100}
    >
      {badge}
      <div className="service-icon-wrapper">
        <div className="service-icon">
          <i className={`bx ${icon}`} />
        </div>
        <div className="service-icon-bg" />
      </div>
      <span className="service-number">{service.number}</span>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      <ul className="service-features">
        {service.features.map((f) => (
          <li key={f}>
            <i className="bx bx-check" />
            {f}
          </li>
        ))}
      </ul>
      <a href={service.anchor} className="service-link">
        Learn More <i className="bx bx-arrow-back bx-rotate-180" />
      </a>
      <div className="service-card-glow" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const { text, blinking } = useTypewriter(TYPEWRITER_WORDS);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProjects({ featured: '1' }).then((list) => {
      if (mounted) setFeatured(list.slice(0, 3));
    });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <CanvasParticles />

        {/* Floating tech icons */}
        <div className="hero-floats">
          <div className="float-element float-1">
            <i className="bx bxl-wordpress" />
          </div>
          <div className="float-element float-2">
            <i className="bx bxl-php" />
          </div>
          <div className="float-element float-3">
            <i className="bx bxl-figma" />
          </div>
          <div className="float-element float-4">
            <i className="bx bxl-firebase" />
          </div>
          <div className="float-element float-5">
            <i className="bx bxl-javascript" />
          </div>
        </div>

        <div className="container hero-container">
          {/* ── Left: Text content ── */}
          <div className="hero-content">
            <div
              className="hero-badge"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <span className="badge-dot" />
              <span>Available for Freelance</span>
            </div>

            <h1
              className="hero-title"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="title-greeting">Hi, I'm</span>
              <span className="title-name">
                <span className="text-gradient">Abu Saleh</span>
              </span>
              <span className="title-role">
                I build&nbsp;
                <span className="typewriter-wrapper">
                  <span id="typewriter">{text}</span>
                  <span className={`type-cursor ${blinking ? 'blink' : ''}`}>
                    |
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="hero-description"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              A passionate <strong>WordPress Developer</strong> &amp;{' '}
              <strong>Flutter App Developer</strong> who turns ideas into
              fast, beautiful, and scalable digital products —{' '}
              from pixel-perfect websites to cross-platform mobile apps,
              with <strong>5+ years</strong> of hands-on expertise.
            </p>

            {/* Stats */}
            <div
              className="hero-stats"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <HeroStat target={60}  suffix="+" label="Projects Done"   />
              <div className="stat-divider" />
              <HeroStat target={40}  suffix="+" label="Happy Clients"   />
              <div className="stat-divider" />
              <HeroStat target={5}   suffix="+" label="Years Exp."      />
            </div>

            {/* CTA buttons */}
            <div
              className="hero-cta"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Link to="/portfolio" className="btn btn-primary btn-lg">
                <span>View My Work</span>
                <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
              <a
                href="/images/saleh-cv.pdf"
                download
                className="btn btn-outline btn-lg"
              >
                <i className="bx bx-download" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social links */}
            <div
              className="hero-social"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <span className="social-label">Follow me</span>
              <div className="social-links">
                <a href="#" className="social-link" data-tooltip="GitHub">
                  <i className="bx bxl-github" />
                </a>
                <a href="#" className="social-link" data-tooltip="LinkedIn">
                  <i className="bx bxl-linkedin" />
                </a>
                <a href="#" className="social-link" data-tooltip="Twitter / X">
                  <i className="bx bxl-twitter" />
                </a>
                <a href="#" className="social-link" data-tooltip="Upwork">
                  <i className="bx bx-briefcase" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Profile visual ── */}
          <div
            className="hero-visual"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="profile-container">
              <div className="profile-ring ring-1" />
              <div className="profile-ring ring-2" />
              <div className="profile-ring ring-3" />
              <div className="profile-glow" />

              <div className="profile-image-wrapper">
                <img
                  src="/images/saleh.png"
                  alt="Abu Saleh — WordPress & Flutter Developer"
                  className="profile-image"
                  loading="eager"
                />
                <div className="profile-overlay" />
              </div>

              {/* Floating info cards */}
              <div className="floating-card card-experience">
                <div className="card-icon">
                  <i className="bx bx-briefcase" />
                </div>
                <div className="card-info">
                  <span className="card-number">5+</span>
                  <span className="card-text">Years Experience</span>
                </div>
              </div>

              <div className="floating-card card-projects">
                <div className="card-icon">
                  <i className="bx bx-code-block" />
                </div>
                <div className="card-info">
                  <span className="card-number">60+</span>
                  <span className="card-text">Projects Done</span>
                </div>
              </div>

              <div className="floating-card card-rating">
                <div className="card-stars">
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                </div>
                <span className="card-text">5.0 Rating</span>
              </div>

              {/* Orbiting tech icons */}
              <div className="tech-orbit">
                <div className="orbit-item orbit-1">
                  <i className="bx bxl-wordpress" />
                </div>
                <div className="orbit-item orbit-2">
                  <i className="bx bxl-firebase" />
                </div>
                <div className="orbit-item orbit-3">
                  <i className="bx bxl-figma" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll Down</span>
        </div>

        {/* Bottom wave */}
        <div className="hero-shape">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            {Array.from({ length: 2 }).map((_, dup) =>
              MARQUEE_ITEMS.map((item) => (
                <span key={`${dup}-${item}`}>
                  {item}
                  <span className="marquee-dot">✦</span>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────────────────────── */}
      <section className="services-preview section" id="services">
        <div className="container">
          <SectionHeader
            tag="What I Do"
            title={
              <>
                Services I <span className="text-gradient">Offer</span>
              </>
            }
            subtitle="From WordPress websites to Flutter mobile apps — I've got you covered"
          />

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.number}
                service={s}
                icon={SERVICE_ICONS[i]}
                index={i}
              />
            ))}
          </div>

          <div className="section-cta" data-aos="fade-up">
            <Link to="/services" className="btn btn-outline btn-lg">
              View All Services{' '}
              <i className="bx bx-arrow-back bx-rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────────────────── */}
      <section className="portfolio-preview section" id="work">
        <div className="container">
          <SectionHeader
            tag="Portfolio"
            title={
              <>
                Featured <span className="text-gradient">Projects</span>
              </>
            }
            subtitle="A selection of WordPress sites and Flutter apps I'm proud of"
          />

          {/* Filter tabs */}
          <div
            className="filter-tabs"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {[
              { label: 'All',            path: '/portfolio'                        },
              { label: 'WordPress',      path: '/portfolio?filter=wordpress'       },
              { label: 'WooCommerce',    path: '/portfolio?filter=woocommerce'     },
              { label: 'Flutter Apps',   path: '/portfolio?filter=flutter'         },
              { label: 'UI/UX Design',   path: '/portfolio?filter=design'          },
            ].map(({ label, path }) => (
              <Link key={label} to={path} className="filter-btn">
                {label}
              </Link>
            ))}
          </div>

          {/* Project cards */}
          <div className="projects-grid" id="projectsGrid">
            {featured.map((p, i) => (
              <article
                key={p.id}
                className="project-card"
                data-category={p.categories.join(' ')}
                data-aos="fade-up"
                data-aos-delay={(i + 1) * 100}
              >
                <div className="project-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <Link
                        to={`/project/${p.slug}`}
                        className="project-link-btn"
                      >
                        <i className="bx bx-link-external" />
                      </Link>
                      <a
                        href={p.repo_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                      >
                        <i className="bx bxl-github" />
                      </a>
                    </div>
                  </div>
                  {p.badge && (
                    <div className="project-badge">{p.badge}</div>
                  )}
                </div>

                <div className="project-info">
                  <div className="project-tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <h3 className="project-title">
                    <Link to={`/project/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="project-meta">
                    <span>
                      <i className="bx bx-calendar" /> {p.year}
                    </span>
                    <Link
                      to={`/project/${p.slug}`}
                      className="project-more"
                    >
                      Case Study{' '}
                      <i className="bx bx-arrow-back bx-rotate-180" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta" data-aos="fade-up">
            <Link to="/portfolio" className="btn btn-primary btn-lg">
              View All Projects{' '}
              <i className="bx bx-arrow-back bx-rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ────────────────────────────────────────────────── */}
      <section className="blog-preview section" id="blog">
        <div className="container">
          <SectionHeader
            tag="Blog"
            title={
              <>
                Latest <span className="text-gradient">Articles</span>
              </>
            }
            subtitle="Insights on web development, design, and the freelance journey"
          />

          <div className="blog-grid" data-aos="fade-up" data-aos-delay="100">
            {posts.slice(0, 3).map((post, i) => (
              <article className="blog-card" key={post.id} data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                <div className="blog-image">
                  <div className="blog-image-placeholder" style={{ background: post.cover_gradient }}>
                    <i className={`bx ${post.cover_icon}`} style={{ fontSize: '2.5rem', color: 'rgba(108,99,255,.3)' }} />
                  </div>
                  <div className="blog-category-badge">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date"><i className="bx bx-calendar" /> {fmtDate(post.published_at)}</span>
                    <span className="blog-read"><i className="bx bx-time" /> {post.read_minutes} min read</span>
                  </div>
                  <h3 className="blog-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-footer">
                    <div className="blog-tags">
                      {post.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
                      Read <i className="bx bx-right-arrow-alt" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta" data-aos="fade-up">
            <Link to="/blog" className="btn btn-outline btn-lg">
              View All Articles{' '}
              <i className="bx bx-arrow-back bx-rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section className="skills-preview section">
        <div className="container">
          <SectionHeader
            tag="Expertise"
            title={
              <>
                My <span className="text-gradient">Tech Stack</span>
              </>
            }
            subtitle="Tools and technologies I work with every day"
          />

          <div
            className="tech-stack-grid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {TECH_ICONS.map((icon, i) => (
              <div
                key={icon}
                className="tech-item"
                data-tooltip={TECH_NAMES[i]}
              >
                <i className={`bx ${icon}`} />
              </div>
            ))}
          </div>

          <div className="section-cta" data-aos="fade-up">
            <Link to="/skills" className="btn btn-outline">
              View Full Skills{' '}
              <i className="bx bx-arrow-back bx-rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="testimonials-preview section">
        <div className="container">
          <SectionHeader
            tag="Reviews"
            title={
              <>
                Client <span className="text-gradient">Testimonials</span>
              </>
            }
            subtitle="What my clients say about working with me"
          />

          <div data-aos="fade-up" data-aos-delay="100">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              className="testimonials-swiper"
              loop
              speed={600}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              slidesPerView={1}
              spaceBetween={24}
              pagination={{ clickable: true }}
              navigation
              grabCursor
              breakpoints={{
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="testimonial-card">
                    <div className="testimonial-quote">
                      <i className="bx bxs-quote-left" />
                    </div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-author">
                      <div className="author-avatar-sm">
                        {t.name.charAt(0)}
                        {t.name.split(' ')[1]?.charAt(0)}
                      </div>
                      <div className="author-info">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                      <div className="testimonial-rating">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i key={s} className="bx bxs-star" />
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-wrapper" data-aos="zoom-in">
            <div className="cta-bg-effect" />
            <div className="cta-content">
              <span className="section-tag">Let's Work Together</span>
              <h2 className="cta-title">
                Have a project in{' '}
                <span className="text-gradient">mind?</span>
              </h2>
              <p className="cta-desc">
                Whether you need a stunning WordPress website, a powerful
                WooCommerce store, or a cross-platform Flutter app — I'm
                here to bring your idea to life. Available for freelance
                projects worldwide.
              </p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Start a Project <i className="bx bx-rocket" />
                </Link>
                <a
                  href="mailto:abusaleh@portfolio.com"
                  className="cta-email"
                >
                  <i className="bx bx-envelope" />
                  abusaleh@portfolio.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}