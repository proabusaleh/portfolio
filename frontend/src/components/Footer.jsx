import { Link } from 'react-router-dom';
import { useScrollState } from '../lib/hooks.js';

const FOOTER_SOCIALS = [
  { icon: 'bxl-github', label: 'GitHub' },
  { icon: 'bxl-linkedin', label: 'LinkedIn' },
  { icon: 'bxl-twitter', label: 'Twitter' },
  { icon: 'bxl-dribbble', label: 'Dribbble' },
  { icon: 'bxl-youtube', label: 'YouTube' },
];

export default function Footer() {
  const { showTop } = useScrollState();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo footer-logo">
              <span className="logo-icon">{'{'}</span>
              Abu Saleh<span className="logo-dot">.</span>
              <span className="logo-icon">{'}'}</span>
            </Link>
            <p className="footer-desc">
              Creating exceptional digital experiences that make a difference.
              Let's build something amazing together.
            </p>
            <div className="footer-social">
              {FOOTER_SOCIALS.map((s) => (
                <a key={s.icon} href="#" aria-label={s.label}>
                  <i className={`bx ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Me</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="/services#web">Web Development</a></li>
              <li><a href="/services#design">UI/UX Design</a></li>
              <li><a href="/services#mobile">Mobile Apps</a></li>
              <li><a href="/services#seo">SEO Marketing</a></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <i className="bx bx-map" />
                <span>San Francisco, CA, USA</span>
              </li>
              <li>
                <i className="bx bx-envelope" />
                <a href="mailto:alex@portfolio.com">alex@portfolio.com</a>
              </li>
              <li>
                <i className="bx bx-phone" />
                <a href="tel:+11234567890">+1 (123) 456-7890</a>
              </li>
            </ul>
            <div className="footer-newsletter">
              <h5>Stay Updated</h5>
              <form
                className="newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.target.reset();
                }}
              >
                <input type="email" placeholder="Your email address" required />
                <button type="submit">
                  <i className="bx bx-send" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} Abu Saleh. Crafted with
            <i className="bx bx-heart" style={{ color: 'var(--accent)' }} /> & lots of ☕
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </div>

      <button
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="bx bx-chevron-up" />
      </button>
    </footer>
  );
}
