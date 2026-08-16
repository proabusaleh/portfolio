import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';

const OVERVIEW = [
  { icon: 'bx-briefcase', num: '5+', text: 'Years of professional development experience across startups and enterprises' },
  { icon: 'bx-layer', num: '40+', text: 'Projects shipped to production, from small landing pages to large SaaS platforms' },
  { icon: 'bx-line-chart', num: '15+', text: 'Industry verticals served, including fintech, healthcare, e-commerce, and education' },
];

const JOBS = [
  {
    logo: '🧑‍💻',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    date: 'Jan 2022 — Present',
    location: 'San Francisco, CA',
    type: 'Full-time',
    current: true,
    achievement: '60%',
    achievementLabel: 'Deployment Time Reduced',
    summary:
      'Leading the development of an enterprise SaaS platform serving 500K+ users. I own the technical roadmap, mentor a team of 6 engineers, and work closely with product and design to ship high-impact features on a two-week cadence.',
    bullets: [
      'Architected a microservices infrastructure that cut infrastructure costs by 35% while tripling request throughput',
      'Introduced a design-system-driven workflow that reduced UI development time by 50%',
      'Drove adoption of TypeScript and automated testing, raising code coverage from 12% to 86%',
      'Collaborated with DevOps to build CI/CD pipelines that shortened release cycles from 2 weeks to daily',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Kubernetes'],
    projects: [
      { title: 'Analytics Suite', desc: 'Real-time dashboard processing 1M+ events per day' },
      { title: 'Customer Portal', desc: 'Self-serve portal cutting support tickets by 40%' },
    ],
  },
  {
    logo: '🚀',
    title: 'Full-Stack Developer',
    company: 'StartupHub',
    date: 'Mar 2020 — Dec 2021',
    location: 'Remote',
    type: 'Full-time',
    current: false,
    achievement: '65%',
    achievementLabel: 'Faster Page Loads',
    summary:
      'Worked across the stack to ship 15+ client web applications from the ground up. Owned everything from API design and database schema to responsive UI, performance budgets, and CI setup.',
    bullets: [
      'Reduced average LCP across products from 4.2s to 1.4s through code-splitting, caching, and image optimization',
      'Built a reusable component library adopted by three product teams',
      'Integrated Stripe, Twilio, SendGrid, and Auth0 to power billing, communications, and authentication',
    ],
    tech: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Redis', 'GraphQL'],
    projects: [
      { title: 'Booking Platform', desc: 'End-to-end booking system with payments and email flows' },
      { title: 'Analytics Widget', desc: 'Embeddable chart widget used by 200+ customers' },
    ],
  },
  {
    logo: '🎨',
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    date: 'Jun 2019 — Feb 2020',
    location: 'San Francisco, CA',
    type: 'Contract',
    current: false,
    achievement: '35%',
    achievementLabel: 'Higher User Engagement',
    summary:
      'Delivered responsive, pixel-perfect interfaces for 20+ clients across retail, healthcare, and finance. Focused on CSS animation, accessibility, and cross-browser consistency.',
    bullets: [
      'Implemented interactive animations and micro-interactions that lifted engagement by 35%',
      'Ensured WCAG 2.1 AA accessibility across all client deliverables',
      'Cut client handoff friction by introducing reusable HTML/CSS pattern libraries',
    ],
    tech: ['HTML/CSS', 'JavaScript', 'jQuery', 'WordPress', 'Figma'],
    projects: [
      { title: 'Retail Redesign', desc: 'Full redesign of a fashion retailer with a CMS-driven catalog' },
    ],
  },
];

const CAREER_SKILLS = [
  { name: 'React', level: 95, emoji: '⚛️' },
  { name: 'Node.js', level: 90, emoji: '🟢' },
  { name: 'TypeScript', level: 88, emoji: '🔷' },
  { name: 'Next.js', level: 85, emoji: '▲' },
  { name: 'PostgreSQL', level: 80, emoji: '🐘' },
  { name: 'AWS', level: 78, emoji: '☁️' },
  { name: 'Docker / K8s', level: 75, emoji: '🐳' },
  { name: 'Figma', level: 82, emoji: '🎨' },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = JOBS[active];

  return (
    <>
      <PageHero title={<>Work <span className="text-gradient">Experience</span></>} crumb="Experience" />

      <section className="experience-section section">
        <div className="container">
          {/* Overview cards */}
          <div className="exp-overview">
            {OVERVIEW.map((o, i) => (
              <div className="eoc-card" data-aos="fade-up" data-aos-delay={i * 100} key={o.text}>
                <span className="eoc-icon"><i className={`bx ${o.icon}`} /></span>
                <span className="eoc-num">{o.num}</span>
                <span className="eoc-info">{o.text}</span>
              </div>
            ))}
          </div>

          {/* Layout */}
          <div className="exp-layout">
            {/* Left timeline */}
            <div className="exp-timeline-col">
              <div className="exp-timeline">
                {JOBS.map((j, i) => (
                  <div
                    className={`exp-item ${i === active ? 'active' : ''}`}
                    key={j.company}
                    onClick={() => setActive(i)}
                    data-aos="fade-right"
                    data-aos-delay={i * 100}
                  >
                    {i < JOBS.length - 1 && <div className="exp-line" />}
                    <div className="exp-dot"><i className="bx bx-chevron-down" /></div>
                    <div className="exp-company-logo">{j.logo}</div>
                    <div className="exp-job-title">{j.title}</div>
                    <div className="exp-company-name">{j.company}</div>
                    <div className="exp-date">{j.date}</div>
                    <div className="exp-meta-row">
                      <span className="exp-location"><i className="bx bx-map" /> {j.location}</span>
                      <span className="exp-type">{j.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right detail panel */}
            <div className="exp-detail-col">
              <div className="exp-detail-panel">
                <div className="exp-detail">
                  <div className="edp-header">
                    <div className="edp-logo">{job.logo}</div>
                    <div className="edp-titles">
                      <h2 className="edp-title">{job.title}</h2>
                      <div className="edp-company">{job.company}</div>
                    </div>
                    {job.current && <span className="edp-current-badge"><i className="bx bx-bolt" /> Current</span>}
                  </div>
                  <div className="edp-meta-bar">
                    <span className="edp-meta-item"><i className="bx bx-calendar" /> {job.date}</span>
                    <span className="edp-meta-item"><i className="bx bx-map" /> {job.location}</span>
                    <span className="edp-meta-item"><i className="bx bx-time" /> {job.type}</span>
                  </div>

                  <div className="edp-section">
                    <h3><i className="bx bx-info-circle" /> About the Role</h3>
                    <p className="edp-role-desc">{job.summary}</p>
                  </div>

                  <div className="edp-section">
                    <h3><i className="bx bx-check-circle" /> Key Achievements</h3>
                    <div className="edp-achievements">
                      {job.bullets.map((b, bi) => (
                        <div className="edp-achievement" key={b}>
                          <span className="achievement-num">{String(bi + 1).padStart(2, '0')}</span>
                          <p>{b}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="edp-section">
                    <h3><i className="bx bx-code-curly" /> Tech Stack</h3>
                    <div className="edp-tech-grid">
                      {job.tech.map((t) => (
                        <div className="edp-tech-item" key={t}><i className="bx bx-chip" /> {t}</div>
                      ))}
                    </div>
                  </div>

                  <div className="edp-section">
                    <h3><i className="bx bx-briefcase" /> Key Projects</h3>
                    <div className="edp-projects">
                      {job.projects.map((p) => (
                        <div className="edp-project-card" key={p.title}>
                          <h4>{p.title}</h4>
                          <p>{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="edp-highlight">
                    <span className="edp-highlight-num">{job.achievement}</span>
                    <span className="edp-highlight-label">{job.achievementLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career skills */}
      <section className="exp-skills-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Growth</span>
            <h2 className="section-title">Career <span className="text-gradient">Skills</span></h2>
          </div>
          <div className="career-skills-grid">
            {CAREER_SKILLS.map((s, i) => (
              <div className="career-skill-item" data-aos="zoom-in" data-aos-delay={(i + 1) * 50} key={s.name}>
                <div className="cs-icon">{s.emoji}</div>
                <div className="cs-name">{s.name}</div>
                <div className="cs-bar">
                  <div className="cs-fill" style={{ width: `${s.level}%` }} />
                </div>
                <div className="cs-percent">{s.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
