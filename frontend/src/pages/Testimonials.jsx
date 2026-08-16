import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

const RATING_ROWS = [
  { label: '5 ★', pct: 90, count: 27 },
  { label: '4 ★', pct: 8, count: 3 },
  { label: '3 ★', pct: 2, count: 0 },
  { label: '2 ★', pct: 0, count: 0 },
  { label: '1 ★', pct: 0, count: 0 },
];

const PLATFORM_BADGES = [
  { icon: 'bxl-google', color: '#4285f4', name: 'Google', value: '5.0' },
  { icon: 'bxl-upwork', color: '#6fda44', name: 'Upwork', value: 'Top Rated' },
  { icon: 'bxl-linkedin', color: '#0a66c2', name: 'LinkedIn', value: '30+ Recs' },
];

const FILTERS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'web', label: 'Web Dev' },
  { id: 'design', label: 'Design' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'seo', label: 'SEO' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, FashionHub Inc.',
    category: 'web',
    service: 'Web Development',
    date: 'March 2024',
    stars: 5,
    project: 'E-Commerce Platform',
    text: '"Alex delivered an outstanding e-commerce platform that exceeded all our expectations. The attention to detail, proactive communication, and technical expertise were remarkable. Our online sales increased by 40% in the first month after launch. The project was delivered on time and within budget. I couldn\'t be happier with the result!"',
  },
  {
    name: 'Mark Chen',
    role: 'Product Manager, AppVenture',
    category: 'mobile',
    service: 'Mobile App',
    date: 'February 2024',
    stars: 5,
    project: 'Fitness Tracker App',
    text: '"Working with Alex on our fitness tracking app was absolutely fantastic. The app has a 4.9-star rating on both the App Store and Google Play, which speaks for itself. Alex\'s ability to translate our vision into a seamless user experience was impressive. The code quality is exceptional and the app performs flawlessly. Highly recommended!"',
  },
  {
    name: 'Emma Davis',
    role: 'CTO, DataFlow Analytics',
    category: 'design',
    service: 'SaaS Dashboard',
    date: 'January 2024',
    stars: 5,
    project: 'SaaS Analytics Dashboard',
    text: '"The analytics dashboard Alex built has completely transformed how our team works. The data visualizations are beautiful and incredibly intuitive. Our team productivity increased by 40% after implementation. Alex was responsive, professional, and delivered beyond our expectations. The documentation provided was also thorough and helpful for our team."',
  },
  {
    name: 'James Wilson',
    role: 'Founder, GrowthLab',
    category: 'seo',
    service: 'SEO & Performance',
    date: 'November 2023',
    stars: 5,
    project: 'SEO Service',
    text: '"Alex\'s SEO work was a game changer for our business. Our organic traffic increased by 147% in just 3 months, and we\'re now ranking on the first page for 15 of our target keywords. The technical SEO audit revealed issues we never knew existed. The performance optimization brought our load time from 4.2s to under 1s. Worth every penny!"',
  },
  {
    name: 'Lisa Park',
    role: 'Marketing Director, BrandCo',
    category: 'design',
    service: 'Brand & Design',
    date: 'October 2023',
    stars: 5,
    project: 'Brand Identity Design',
    text: '"Alex created an incredible brand identity system for our startup. The design is modern, cohesive, and perfectly represents our company values. The Figma design system is incredibly well organized and makes it easy for our internal team to maintain brand consistency. Alex was a pleasure to work with — creative, professional, and always open to feedback."',
  },
  {
    name: 'Tom Anderson',
    role: 'CEO, TravelNow',
    category: 'web',
    service: 'Web Development',
    date: 'September 2023',
    stars: 4.5,
    project: 'Travel Booking Platform',
    text: '"Alex built our travel booking platform from scratch in just 10 weeks. The platform handles thousands of bookings daily without any issues. The real-time availability system works perfectly. Alex was very communicative throughout the project and always met deadlines. I would absolutely hire Alex again for our next project."',
  },
];

const VIDEOS = [
  { initials: 'SJ', name: 'Sarah Johnson — FashionHub', desc: 'E-Commerce Platform Review', duration: '2:34' },
  { initials: 'MC', name: 'Mark Chen — AppVenture', desc: 'Fitness App Development Review', duration: '1:58' },
  { initials: 'ED', name: 'Emma Davis — DataFlow', desc: 'SaaS Dashboard Review', duration: '3:10' },
];

function Stars({ count }) {
  const full = Math.floor(count);
  const half = count % 1 >= 0.5;
  return (
    <div className="tfc-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <i
          key={s}
          className={`bx ${s <= full ? 'bxs-star' : (s === full + 1 && half ? 'bxs-star-half' : 'bx-star')}`}
        />
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name.split(' ').map((p) => p.charAt(0)).slice(0, 2).join('');
  return (
    <div className="tfc-avatar">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [filter, setFilter] = useState('all');
  const visible = TESTIMONIALS.filter((t) => filter === 'all' || t.category === filter);

  return (
    <>
      <PageHero title={<>Client <span className="text-gradient">Testimonials</span></>} crumb="Testimonials" />

      <section className="testimonials-page section">
        <div className="container">
          {/* Rating Overview */}
          <div className="rating-overview" data-aos="fade-up">
            <div className="rating-score">
              <span className="big-score">5.0</span>
              <div className="big-stars">
                {[1, 2, 3, 4, 5].map((s) => <i key={s} className="bx bxs-star" />)}
              </div>
              <span className="rating-total">Based on 30+ reviews</span>
            </div>
            <div className="rating-bars">
              {RATING_ROWS.map((r) => (
                <div className="rating-bar-row" key={r.label}>
                  <span>{r.label}</span>
                  <div className="rating-track">
                    <div className="rating-fill" style={{ '--w': `${r.pct}%` }} />
                  </div>
                  <span>{r.count}</span>
                </div>
              ))}
            </div>
            <div className="rating-platforms">
              {PLATFORM_BADGES.map((p) => (
                <div className="platform-badge" key={p.name}>
                  <i className={`bx ${p.icon}`} style={{ color: p.color }} />
                  <span>{p.name}</span>
                  <strong>{p.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="testimonial-filter" data-aos="fade-up">
            {FILTERS.map((f) => (
              <button
                className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                key={f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {visible.map((t, i) => (
              <div className="testimonial-full-card" data-aos="fade-up" data-aos-delay={50 + i * 50} key={t.name}>
                <div className="tfc-header">
                  <Avatar name={t.name} />
                  <div className="tfc-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    <Stars count={t.stars} />
                  </div>
                  <div className="tfc-meta">
                    <span className="tfc-service">{t.service}</span>
                    <span className="tfc-date">{t.date}</span>
                  </div>
                </div>
                <div className="tfc-quote"><i className="bx bxs-quote-left" /></div>
                <p className="tfc-text">{t.text}</p>
                <div className="tfc-project">
                  <i className="bx bx-link" />
                  <Link to="/portfolio">{t.project}</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Video Testimonials */}
          <div className="video-testimonials" data-aos="fade-up">
            <div className="section-header">
              <span className="section-tag">Video Reviews</span>
              <h2 className="section-title">What Clients <span className="text-gradient">Say</span></h2>
            </div>
            <div className="video-grid">
              {VIDEOS.map((v) => (
                <div className="video-card" key={v.name}>
                  <div className="video-thumb">
                    <Avatar name={v.initials} />
                    <div className="play-btn"><i className="bx bx-play" /></div>
                    <div className="video-duration">{v.duration}</div>
                  </div>
                  <div className="video-info">
                    <h4>{v.name}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave a Review CTA */}
          <div className="leave-review" data-aos="fade-up">
            <div className="lr-content">
              <i className="bx bx-star lr-icon" />
              <h3>Worked with me before?</h3>
              <p>I'd love to hear your feedback! Your review helps other clients make informed decisions.</p>
              <Link to="/contact" className="btn btn-primary">
                Leave a Review <i className="bx bx-send" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
