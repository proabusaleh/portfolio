import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

const GROUPS = [
  {
    cat: 'general',
    icon: 'bx-info-circle',
    title: 'General',
    items: [
      {
        q: 'What services do you specialize in?',
        a: 'I specialize in full-stack web development, UI/UX design, mobile app development (React Native), and technical SEO. My core strengths are React/Next.js, Node.js, PostgreSQL, and Figma. I work with clients from idea to launch — including discovery, design, development, deployment, and ongoing support.',
      },
      {
        q: 'Are you available for full-time employment?',
        a: "Currently I'm open to both freelance projects and select full-time opportunities. If you have an exciting role at a product-focused company, feel free to reach out! I'm particularly interested in senior developer, lead, or architect positions in fast-growing startups or established tech companies.",
      },
      {
        q: 'Do you work with clients internationally?',
        a: "Absolutely! I work with clients across the globe. I've successfully collaborated with clients in the US, UK, Canada, Australia, Germany, and Singapore. I use video calls (Zoom/Google Meet), Slack for communication, and project management tools to ensure smooth collaboration regardless of time zones. I'm flexible with scheduling to accommodate different time zones.",
      },
      {
        q: 'How many years of experience do you have?',
        a: "I have 5+ years of professional development experience. I started as a Frontend Developer in 2019, moved to Full-Stack development in 2020, and have been working as a Senior Full-Stack Developer since 2022. During this time I've delivered 50+ projects across various industries including e-commerce, SaaS, healthcare, fintech, and education.",
      },
    ],
  },
  {
    cat: 'process',
    icon: 'bx-cog',
    title: 'Process & Timeline',
    items: [
      {
        q: 'What does your typical project process look like?',
        a: (
          <>
            <p>My process has 4 clear phases:</p>
            <ol style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 2 }}>
              <li><strong>Discovery (Week 1–2):</strong> Deep-dive consultation, requirements gathering, user research, technical feasibility analysis, and project scoping.</li>
              <li><strong>Design (Week 2–4):</strong> Wireframing, UI mockups in Figma, prototype creation, and design review with multiple revision rounds.</li>
              <li><strong>Development (Week 4–10):</strong> Agile sprints with bi-weekly demos. Frontend, backend, and testing in parallel sprints.</li>
              <li><strong>Launch & Support (Week 10–12):</strong> QA testing, performance audit, deployment, and post-launch monitoring.</li>
            </ol>
          </>
        ),
      },
      {
        q: 'How long does a typical project take?',
        a: (
          <>
            <p>Project duration depends on scope and complexity:</p>
            <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 2 }}>
              <li><strong>Landing page / Portfolio:</strong> 1–2 weeks</li>
              <li><strong>Business website (5–10 pages):</strong> 2–4 weeks</li>
              <li><strong>Web application / SaaS MVP:</strong> 6–12 weeks</li>
              <li><strong>Mobile app (iOS + Android):</strong> 8–16 weeks</li>
              <li><strong>Enterprise platform:</strong> 3–6 months</li>
            </ul>
            <p style={{ marginTop: 10 }}>I provide detailed timelines in the project proposal after our discovery call.</p>
          </>
        ),
      },
      {
        q: 'How do you handle project communication and updates?',
        a: "Communication is key to project success. I provide weekly progress reports every Friday, bi-weekly video calls for demos and feedback, a shared Notion project board with real-time task tracking, a dedicated Slack channel for daily communication, and a staging environment for your review at every milestone. You'll always know exactly where your project stands.",
      },
      {
        q: 'What information do you need to start a project?',
        a: "To get started, it helps to have: a clear description of what you want to build, your target audience and business goals, any existing designs or brand guidelines, preferred tech stack (if you have one), timeline and budget range, and examples of websites/apps you like. Don't worry if you don't have everything — we can figure it out together in our discovery call!",
      },
    ],
  },
  {
    cat: 'pricing',
    icon: 'bx-dollar',
    title: 'Pricing & Payment',
    items: [
      {
        q: 'How does your payment structure work?',
        a: "I use a milestone-based payment structure to protect both parties. Typically: 50% deposit before work begins, 25% at project midpoint (after design approval / backend completion), and 25% upon final delivery and your sign-off. For larger projects, we can arrange more granular milestones. The deposit is non-refundable after work begins, but all deliverables are yours upon final payment.",
      },
      {
        q: 'What payment methods do you accept?',
        a: "I accept bank transfers (SWIFT/SEPA), PayPal, Stripe (credit/debit cards), Wise (formerly TransferWise) for international clients, and cryptocurrency (BTC, ETH, USDC). All payments are invoiced professionally with proper documentation for accounting purposes. For US clients, I provide W-9 forms for payments over $600.",
      },
      {
        q: 'Do you offer payment plans or financing?',
        a: "For projects over $5,000, I can arrange flexible payment plans — typically splitting the total into 3–4 equal monthly payments. For startups and small businesses with limited initial budget, I sometimes offer equity-for-service arrangements on a case-by-case basis. Let's discuss your situation and find something that works for both of us.",
      },
      {
        q: 'How do you price projects — fixed or hourly?',
        a: "I offer both pricing models depending on project type. Fixed-price contracts are ideal for well-defined projects with clear scope — this gives you budget certainty and removes risk. Hourly pricing ($75–$150/hr depending on complexity) works better for ongoing work, maintenance, or projects where requirements may evolve. I always recommend fixed-price for new projects to avoid surprises.",
      },
    ],
  },
  {
    cat: 'technical',
    icon: 'bx-code-curly',
    title: 'Technical',
    items: [
      {
        q: 'What technologies and frameworks do you use?',
        a: "My primary tech stack includes: React / Next.js / Vue.js for frontend, Node.js / Express / Python / Django for backend, PostgreSQL / MongoDB / MySQL / Redis for databases, AWS / Vercel / Railway for deployment, Docker / Kubernetes for containerization, and Figma for UI/UX design. I stay current with the ecosystem and choose the best tool for each project's needs.",
      },
      {
        q: 'Will my website be mobile-friendly and accessible?',
        a: "Absolutely — 100% guaranteed. Every project I build is fully responsive across all devices (mobile, tablet, desktop, large screens), meets WCAG 2.1 AA accessibility standards, achieves 90+ Google Lighthouse performance scores, is cross-browser compatible (Chrome, Firefox, Safari, Edge), and is optimized for Core Web Vitals. These aren't optional extras — they're built into my standard process.",
      },
      {
        q: 'Who owns the code and intellectual property?',
        a: "Upon final payment, you receive full ownership of all custom code and assets created for your project. This includes complete source code, design files (Figma), documentation, and all related intellectual property. I provide a formal IP transfer agreement. I may request to include the project in my portfolio, but this is always with your permission and can be declined.",
      },
      {
        q: 'Do you write tests and documentation?',
        a: "Yes! I believe in production-quality code. I write unit tests with Jest, integration tests with Testing Library, and end-to-end tests with Playwright/Cypress for critical user flows. Documentation includes inline code comments, API documentation (Swagger/OpenAPI), README files with setup instructions, and a handover document with architecture overview. Clean, documented, tested code is always the goal.",
      },
    ],
  },
  {
    cat: 'support',
    icon: 'bx-support',
    title: 'Support & Maintenance',
    items: [
      {
        q: 'What support do you provide after launch?',
        a: "All projects include a complimentary support period: Starter plan gets 30 days, Professional gets 90 days, and Enterprise gets 1 year. During this period I fix any bugs at no additional cost, monitor uptime and performance, handle hotfixes within 24 hours, and provide guidance on using the CMS or admin panel. After the support period ends, I offer flexible maintenance retainer packages.",
      },
      {
        q: 'Do you offer ongoing maintenance services?',
        a: "Yes! I offer three maintenance tiers: Basic ($199/mo) — security updates, uptime monitoring, monthly backups. Standard ($499/mo) — everything in Basic plus 4 hours of changes/additions per month, performance monitoring, priority email support. Premium ($999/mo) — everything in Standard plus 10 hours of development, same-day response, monthly analytics review. All plans include 99.9% uptime guarantee.",
      },
      {
        q: "What if I'm not satisfied with the work?",
        a: "Your satisfaction is my top priority. I work iteratively with regular check-ins and milestone reviews to ensure we stay aligned throughout. If you're unhappy with any deliverable, I provide additional revision rounds to get it right. In the rare case of fundamental dissatisfaction, I offer a partial refund based on deliverables completed. I've maintained a 100% client satisfaction rate across 50+ projects.",
      },
      {
        q: 'Can you work with my existing team or codebase?',
        a: "Absolutely! I regularly collaborate with existing development teams, integrate into established workflows (GitHub, GitLab, Bitbucket, Jira, Linear), and work with existing codebases regardless of their state. I always start with a thorough code audit to understand architecture before making changes. I adapt to your team's conventions and communication style seamlessly.",
      },
    ],
  },
];

const CATS = [
  { id: 'all', icon: 'bx-list-ul', label: 'All' },
  { id: 'general', icon: 'bx-info-circle', label: 'General' },
  { id: 'process', icon: 'bx-cog', label: 'Process' },
  { id: 'pricing', icon: 'bx-dollar', label: 'Pricing' },
  { id: 'technical', icon: 'bx-code-curly', label: 'Technical' },
  { id: 'support', icon: 'bx-support', label: 'Support' },
];

const QUICK_LINKS = [
  { to: '/services', label: 'View Services' },
  { to: '/pricing', label: 'Pricing Plans' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/testimonials', label: 'Client Reviews' },
  { label: 'Download Resume', download: true },
];

const CONTACT_ITEMS = [
  { icon: 'bx-envelope', label: 'Email', value: 'alex@portfolio.com', href: 'mailto:alex@portfolio.com' },
  { icon: 'bx-phone', label: 'Phone', value: '+1 (123) 456-7890', href: 'tel:+11234567890' },
  { icon: 'bx-time', label: 'Response Time', value: 'Within 24 hours', strong: true },
];

export default function Faq() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [openKey, setOpenKey] = useState(null);

  const visibleGroups = GROUPS
    .filter((g) => cat === 'all' || g.cat === cat)
    .map((g) => {
      const q = query.trim().toLowerCase();
      const items = q
        ? g.items.filter((i) => i.q.toLowerCase().includes(q) || String(i.a).toLowerCase().includes(q))
        : g.items;
      return { ...g, items };
    })
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero title={<>Frequently Asked <span className="text-gradient">Questions</span></>} crumb="FAQ" />

      <section className="faq-page section">
        <div className="container">
          {/* FAQ Search */}
          <div className="faq-search-wrap" data-aos="fade-up">
            <div className="faq-search-box">
              <i className="bx bx-search" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="faq-search-clear" onClick={() => setQuery('')}>
                  <i className="bx bx-x" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="faq-cats" data-aos="fade-up">
            {CATS.map((c) => (
              <button
                className={`faq-cat-btn ${cat === c.id ? 'active' : ''}`}
                key={c.id}
                onClick={() => setCat(c.id)}
              >
                <i className={`bx ${c.icon}`} /> {c.label}
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="faq-main-grid">
            <div className="faq-list-full" id="faqList">
              {visibleGroups.map((g) => (
                <div className="faq-group" data-cat={g.cat} key={g.cat}>
                  <h3 className="faq-group-title">
                    <i className={`bx ${g.icon}`} /> {g.title}
                  </h3>
                  {g.items.map((item) => {
                    const key = `${g.cat}::${item.q}`;
                    const open = openKey === key;
                    return (
                      <div className={`faq-item ${open ? 'active' : ''}`} key={key}>
                        <button className="faq-question" onClick={() => setOpenKey(open ? null : key)}>
                          <span>{item.q}</span>
                          <i className={`bx ${open ? 'bx-minus' : 'bx-plus'} faq-icon`} />
                        </button>
                        <div className="faq-answer">
                          {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {visibleGroups.length === 0 && (
                <div className="faq-no-results" style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <i className="bx bx-search-alt" style={{ fontSize: '3rem', color: 'var(--accent)' }} />
                  <h3 style={{ marginTop: 16 }}>No results found</h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Try different keywords or browse all questions below.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Sidebar */}
            <aside className="faq-sidebar">
              <div className="faq-sidebar-widget">
                <h3>Can't Find Your Answer?</h3>
                <p>Ask me directly! I typically respond within a few hours on business days.</p>
                <Link to="/contact" className="btn btn-primary btn-full">
                  <i className="bx bx-message-dots" /> Ask a Question
                </Link>
              </div>

              <div className="faq-sidebar-widget">
                <h3>Quick Links</h3>
                <ul className="faq-quick-links">
                  {QUICK_LINKS.map((l) => (
                    <li key={l.label}>
                      {l.download ? (
                        <a href="/downloads/Resume.pdf" download>
                          <i className="bx bx-chevron-right" /> {l.label}
                        </a>
                      ) : (
                        <Link to={l.to}><i className="bx bx-chevron-right" /> {l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="faq-sidebar-widget contact-widget">
                {CONTACT_ITEMS.map((c) => (
                  <div className="faq-contact-item" key={c.label}>
                    <i className={`bx ${c.icon}`} />
                    <div>
                      <span>{c.label}</span>
                      {c.href ? <a href={c.href}>{c.value}</a> : <strong>{c.value}</strong>}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
