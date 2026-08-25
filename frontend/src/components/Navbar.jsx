import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme, useScrollState } from '../lib/hooks.js';

const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5180';

const NAV_ITEMS = [
  { to: '/', number: '01', label: 'Home', end: true },
  { to: '/about', number: '02', label: 'About' },
  {
    to: '/services',
    number: '03',
    label: 'Services',
    dropdown: [
      { to: '/services#web', label: 'Web Development' },
      { to: '/services#design', label: 'UI/UX Design' },
      { to: '/services#mobile', label: 'Mobile Apps' },
      { to: '/services#seo', label: 'SEO & Marketing' },
    ],
  },
  { to: '/portfolio', number: '04', label: 'Work' },
  {
    to: '/skills',
    number: '05',
    label: 'More',
    dropdown: [
      { to: '/skills', label: 'Skills' },
      { to: '/resume', label: 'Resume' },
      { to: '/experience', label: 'Experience' },
      { to: '/education', label: 'Education' },
      { to: '/testimonials', label: 'Testimonials' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  { to: '/blog', number: '06', label: 'Blog' },
  { to: '/contact', number: '07', label: 'Contact' },
];

const SOCIALS = [
  { icon: 'bxl-github', href: '#' },
  { icon: 'bxl-linkedin', href: '#' },
  { icon: 'bxl-twitter', href: '#' },
  { icon: 'bxl-dribbble', href: '#' },
];

function DropdownLink({ to, label, onNavigate }) {
  if (to.includes('#')) {
    return (
      <a href={to} onClick={onNavigate}>
        {label}
      </a>
    );
  }
  return (
    <Link to={to} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrolled, progress } = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('#')[0]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <nav className="navbar container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">{'{'}</span>
          <span>Abu Saleh</span>
          <span className="logo-dot">.</span>
          <span className="logo-icon">{'}'}</span>
        </Link>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
          <div className="nav-menu-header">
            <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
              Abu Saleh.
            </Link>
            <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <i className="bx bx-x" />
            </button>
          </div>

          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                <NavLink
                  to={item.to}
                  className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                  end={item.end}
                >
                  <span className="nav-number">{item.number}.</span>
                  {item.label}
                  {item.dropdown && <i className="bx bx-chevron-down" />}
                </NavLink>
                {item.dropdown && (
                  <ul className="dropdown-menu">
                    {item.dropdown.map((d) => (
                      <li key={d.to}>
                        <DropdownLink to={d.to} label={d.label} onNavigate={() => setMenuOpen(false)} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-social">
            {SOCIALS.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer">
                <i className={`bx ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>

        <div className="nav-actions">
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle"
            title="Dashboard"
            aria-label="Open dashboard"
          >
            <i className="bx bxs-grid" />
          </a>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon'} id="themeIcon" />
          </button>

          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
            <span>Hire Me</span>
            <i className="bx bx-send" />
          </Link>

          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div className="scroll-progress" style={{ width: `${progress}%` }} id="scrollProgress" />
    </header>
  );
}
