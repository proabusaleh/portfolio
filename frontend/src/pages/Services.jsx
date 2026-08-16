import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

function DetailFeature({ title, children }) {
  return (
    <div className="detail-feature">
      <i className="bx bx-check-circle" />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function ShowcaseStat({ icon, value, label, cls }) {
  return (
    <div className={`showcase-stat ${cls}`}>
      <i className={`bx ${icon}`} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

const PROCESS_STEPS = [
  {
    number: '01',
    icon: 'bx-conversation',
    title: 'Discovery',
    desc: 'Deep-dive consultation to understand your goals, target audience, and project requirements.',
  },
  {
    number: '02',
    icon: 'bx-pencil',
    title: 'Planning',
    desc: 'Detailed project roadmap, wireframes, and technical architecture review before any code is written.',
  },
  {
    number: '03',
    icon: 'bx-code-curly',
    title: 'Development',
    desc: 'Agile sprints with regular demos, code reviews, and continuous integration throughout.',
  },
  {
    number: '04',
    icon: 'bx-rocket',
    title: 'Launch & Support',
    desc: 'Thorough testing, smooth deployment, and ongoing support to ensure long-term success.',
  },
];

function ProcessSteps() {
  return (
    <div className="process-steps">
      {PROCESS_STEPS.map((step, i) => (
        <div key={step.number}>
          <div className="process-step" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
            <div className="step-number">{step.number}</div>
            <div className="step-icon"><i className={`bx ${step.icon}`} /></div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
          {i < PROCESS_STEPS.length - 1 && <div className="process-connector" />}
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <>
      <PageHero title={<>My <span className="text-gradient">Services</span></>} crumb="Services" />

      {/* WEB DEVELOPMENT */}
      <section className="service-detail section" id="web">
        <div className="container">
          <div className="service-detail-grid">
            <div className="service-detail-content" data-aos="fade-right">
              <span className="section-tag">01 — Web Development</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Full-Stack<br /><span className="text-gradient">Web Development</span>
              </h2>
              <p className="service-detail-desc">
                I build fast, scalable, secure, and accessible web applications from front to back.
                Whether it's a landing page, SaaS platform, or complex enterprise app — I deliver
                production-ready solutions that perform at scale.
              </p>
              <div className="service-detail-features">
                <DetailFeature title="Modern Frontend">React, Next.js, Vue.js with pixel-perfect, responsive implementations</DetailFeature>
                <DetailFeature title="Robust Backend">Node.js, Express, REST &amp; GraphQL APIs with proper authentication</DetailFeature>
                <DetailFeature title="Database Design">MongoDB, PostgreSQL, MySQL — optimized schemas and queries</DetailFeature>
                <DetailFeature title="Cloud & DevOps">AWS, Vercel, Docker, CI/CD pipelines for seamless deployments</DetailFeature>
              </div>
              <div className="service-tech-stack">
                <span>React</span><span>Next.js</span><span>Node.js</span>
                <span>PostgreSQL</span><span>AWS</span><span>Docker</span>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Quote <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
            </div>
            <div className="service-detail-visual" data-aos="fade-left">
              <div className="service-showcase">
                <div className="showcase-mockup">
                  <div className="mockup-bar"><span /><span /><span /></div>
                  <div className="mockup-content">
                    <div className="code-lines">
                      <div className="code-line"><span className="kw">const</span> <span className="fn">App</span> = () <span className="op">=&gt;</span> {'{'}</div>
                      <div className="code-line pl-2"><span className="kw">return</span> (</div>
                      <div className="code-line pl-4"><span className="tag">&lt;Hero</span> <span className="attr">animated</span> <span className="tag">/&gt;</span></div>
                      <div className="code-line pl-4"><span className="tag">&lt;Services</span> <span className="attr">data</span><span className="op">={'{'}</span><span className="fn">services</span><span className="op">{'}'}</span> <span className="tag">/&gt;</span></div>
                      <div className="code-line pl-4"><span className="tag">&lt;Contact</span> <span className="tag">/&gt;</span></div>
                      <div className="code-line pl-2">);</div>
                      <div className="code-line">{'};'}</div>
                    </div>
                  </div>
                </div>
                <ShowcaseStat icon="bx-trending-up" value="99" label="Performance Score" cls="s1" />
                <ShowcaseStat icon="bx-time" value="&lt;1s" label="Load Time" cls="s2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UI/UX DESIGN */}
      <section className="service-detail section alt-bg" id="design">
        <div className="container">
          <div className="service-detail-grid reverse">
            <div className="service-detail-visual" data-aos="fade-right">
              <div className="design-showcase">
                <div className="ds-card ds-card-1">
                  <div className="ds-avatar" />
                  <div className="ds-lines"><div /><div /></div>
                </div>
                <div className="ds-card ds-card-2">
                  <div className="ds-chart">
                    <div className="ds-bar" style={{ '--h': '60%' }} />
                    <div className="ds-bar" style={{ '--h': '80%' }} />
                    <div className="ds-bar" style={{ '--h': '45%' }} />
                    <div className="ds-bar" style={{ '--h': '90%' }} />
                    <div className="ds-bar" style={{ '--h': '70%' }} />
                  </div>
                </div>
                <div className="ds-card ds-card-3">
                  <div className="ds-palette">
                    <div style={{ background: '#7c3aed' }} />
                    <div style={{ background: '#06b6d4' }} />
                    <div style={{ background: '#10b981' }} />
                    <div style={{ background: '#f59e0b' }} />
                  </div>
                  <span>Color System</span>
                </div>
              </div>
            </div>
            <div className="service-detail-content" data-aos="fade-left">
              <span className="section-tag">02 — UI/UX Design</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Beautiful &amp;<br /><span className="text-gradient">User-Centered Design</span>
              </h2>
              <p className="service-detail-desc">
                Great design is more than aesthetics — it's about solving problems elegantly.
                I create intuitive user experiences backed by research, strategy, and a keen
                eye for visual detail.
              </p>
              <div className="service-detail-features">
                <DetailFeature title="UX Research">User interviews, personas, journey maps, and usability testing</DetailFeature>
                <DetailFeature title="Wireframing & Prototyping">Low to high-fidelity prototypes in Figma and Adobe XD</DetailFeature>
                <DetailFeature title="Design Systems">Scalable component libraries and style guides for consistency</DetailFeature>
              </div>
              <div className="service-tech-stack">
                <span>Figma</span><span>Adobe XD</span><span>Framer</span>
                <span>Principle</span><span>Zeplin</span>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Quote <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APPS */}
      <section className="service-detail section" id="mobile">
        <div className="container">
          <div className="service-detail-grid">
            <div className="service-detail-content" data-aos="fade-right">
              <span className="section-tag">03 — Mobile Apps</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Cross-Platform<br /><span className="text-gradient">Mobile Applications</span>
              </h2>
              <p className="service-detail-desc">
                Native-quality mobile experiences for iOS and Android using React Native.
                From MVP to App Store publishing — I handle the complete mobile development lifecycle.
              </p>
              <div className="service-detail-features">
                <DetailFeature title="React Native">Cross-platform apps with truly native performance and feel</DetailFeature>
                <DetailFeature title="App Store Publishing">End-to-end submission for iOS App Store and Google Play</DetailFeature>
                <DetailFeature title="Offline Support">Progressive data sync and offline-first architecture</DetailFeature>
              </div>
              <div className="service-tech-stack">
                <span>React Native</span><span>Expo</span><span>Firebase</span>
                <span>Redux</span><span>Swift</span>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Quote <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
            </div>
            <div className="service-detail-visual" data-aos="fade-left">
              <div className="mobile-showcase">
                <div className="phone-mockup">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div className="phone-ui">
                      <div className="phone-header" />
                      <div className="phone-content">
                        <div className="phone-card" />
                        <div className="phone-card sm" />
                        <div className="phone-card sm" />
                      </div>
                      <div className="phone-nav">
                        <i className="bx bx-home-alt" />
                        <i className="bx bx-search" />
                        <i className="bx bx-heart" />
                        <i className="bx bx-user" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="service-detail section alt-bg" id="seo">
        <div className="container">
          <div className="service-detail-grid reverse">
            <div className="service-detail-visual" data-aos="fade-right">
              <div className="seo-showcase">
                <div className="seo-card">
                  <div className="seo-rank">
                    <span className="rank-num">#1</span>
                    <span>Google Ranking</span>
                  </div>
                  <div className="seo-chart">
                    <svg viewBox="0 0 200 80" className="seo-line-chart">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: '#7c3aed' }} />
                          <stop offset="100%" style={{ stopColor: '#06b6d4' }} />
                        </linearGradient>
                      </defs>
                      <polyline points="0,70 40,55 80,40 120,25 160,15 200,5"
                        fill="none" stroke="url(#grad)" strokeWidth="3" />
                    </svg>
                  </div>
                  <div className="seo-metrics">
                    <div className="seo-metric">
                      <strong>+147%</strong><span>Organic Traffic</span>
                    </div>
                    <div className="seo-metric">
                      <strong>3.2s</strong><span>Avg. Load Time → 0.8s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-detail-content" data-aos="fade-left">
              <span className="section-tag">04 — SEO &amp; Marketing</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Data-Driven<br /><span className="text-gradient">Digital Growth</span>
              </h2>
              <p className="service-detail-desc">
                Boost your online visibility and drive qualified traffic with my holistic
                approach to SEO and digital marketing. I combine technical excellence
                with content strategy to deliver measurable results.
              </p>
              <div className="service-detail-features">
                <DetailFeature title="Technical SEO Audit">Core Web Vitals, site architecture, schema markup, crawlability</DetailFeature>
                <DetailFeature title="Content Strategy">Keyword research, content planning, and on-page optimization</DetailFeature>
                <DetailFeature title="Analytics & Reporting">Monthly reports with actionable insights from GA4 &amp; Search Console</DetailFeature>
              </div>
              <div className="service-tech-stack">
                <span>Google Analytics</span><span>Ahrefs</span><span>SEMrush</span>
                <span>Search Console</span><span>Lighthouse</span>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Quote <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">How I Work</span>
            <h2 className="section-title">My <span className="text-gradient">Process</span></h2>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-wrapper" data-aos="zoom-in">
            <div className="cta-bg-effect" />
            <div className="cta-content">
              <span className="section-tag">Ready to Start?</span>
              <h2 className="cta-title">Let's Build Something <span className="text-gradient">Amazing</span></h2>
              <p className="cta-desc">Have a project in mind? Let's discuss how I can help you achieve your goals.</p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">Start a Project <i className="bx bx-rocket" /></Link>
                <Link to="/pricing" className="btn btn-outline btn-lg">View Pricing <i className="bx bx-arrow-back bx-rotate-180" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
