import { useState } from 'react';
import { Link } from 'react-router-dom';
import CanvasParticles from '../components/CanvasParticles.jsx';

const SITEMAP = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/resume', label: 'Resume' },
];

const FLOATS = ['🚀', '💻', '🎨', '⚡', '🔍'];

export default function NotFound() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const links = q
    ? SITEMAP.filter((s) => s.label.toLowerCase().includes(q))
    : SITEMAP;

  return (
    <section className="error-page">
      <CanvasParticles />

      <div className="error-content">
        <div className="error-code">
          <span className="error-4 glitch" data-text="4">4</span>
          <span className="error-zero">
            <div className="zero-inner">
              <i className="bx bx-search-alt" />
            </div>
          </span>
          <span className="error-4 glitch" data-text="4">4</span>
        </div>

        <h1 className="error-title">Oops! Page Not Found</h1>
        <p className="error-desc">
          The page you're looking for seems to have wandered off into the digital void.
          Let's get you back on track!
        </p>

        <div className="error-search">
          <input
            type="text"
            placeholder="Search for something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to="/portfolio" aria-label="Search">
            <i className="bx bx-search" />
          </Link>
        </div>

        <div className="error-links">
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="bx bx-home" /> Back to Home
          </Link>
          <Link to="/portfolio" className="btn btn-outline btn-lg">
            <i className="bx bx-grid-alt" /> View Work
          </Link>
          <Link to="/contact" className="btn btn-outline btn-lg">
            <i className="bx bx-envelope" /> Contact Me
          </Link>
        </div>

        <div className="error-sitemap">
          <p>Or visit one of these pages:</p>
          <div className="sitemap-links">
            {links.map((s) => (
              <Link to={s.to} key={s.to}>{s.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="error-floats">
        {FLOATS.map((emoji, i) => (
          <div className={`ef ef-${i + 1}`} key={i}>{emoji}</div>
        ))}
      </div>
    </section>
  );
}
