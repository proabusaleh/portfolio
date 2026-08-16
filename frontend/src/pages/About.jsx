import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { useCountersOnView } from '../lib/hooks.js';

const STATS = [
  { icon: 'bx-code-curly', target: 50, suffix: '+', label: 'Projects Completed' },
  { icon: 'bx-happy', target: 30, suffix: '+', label: 'Happy Clients' },
  { icon: 'bx-award', target: 12, suffix: '+', label: 'Awards Won' },
  { icon: 'bx-coffee', target: 9999, suffix: '+', label: 'Cups of Coffee' },
];

const APPROACH = [
  { icon: 'bx-rocket', title: 'Performance First', desc: 'Every project I build is optimized for speed, accessibility, and SEO from day one — not as an afterthought.' },
  { icon: 'bx-brush', title: 'Design Mindset', desc: 'I bridge the gap between design and development, ensuring pixel-perfect implementation of beautiful UIs.' },
  { icon: 'bx-shield-check', title: 'Clean Code', desc: 'Maintainable, well-documented code following best practices and design patterns that scale with your business.' },
  { icon: 'bx-message-square-dots', title: 'Clear Communication', desc: 'Regular updates, transparent timelines, and responsive communication throughout the entire project lifecycle.' },
];

const WORK_EXP = [
  {
    date: '2022 — Present',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    desc: 'Led development of enterprise-scale web applications serving 500K+ users. Architected microservices infrastructure reducing deployment time by 60%.',
    achievements: [
      'Led team of 6 developers',
      '40% performance improvement',
      'Implemented CI/CD pipelines',
    ],
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    date: '2020 — 2022',
    title: 'Full-Stack Developer',
    company: 'StartupHub',
    desc: 'Built and maintained multiple SaaS products from ground up. Collaborated with design team to deliver exceptional user experiences.',
    achievements: [
      'Delivered 15 projects on time',
      'Built REST & GraphQL APIs',
      '99.9% uptime maintained',
    ],
    tags: ['Vue.js', 'Express', 'MongoDB', 'Docker'],
  },
  {
    date: '2019 — 2020',
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    desc: 'Developed responsive web interfaces for 20+ client projects across various industries. Specialized in CSS animations and interactive UI components.',
    achievements: [],
    tags: ['HTML/CSS', 'JavaScript', 'jQuery', 'WordPress'],
  },
];

const EDUCATION = [
  {
    date: '2015 — 2019',
    title: 'B.S. Computer Science',
    company: 'Stanford University',
    desc: 'Graduated with honors (GPA: 3.9/4.0). Specialized in Software Engineering and Human-Computer Interaction. Thesis on Progressive Web Applications.',
    achievements: ["Dean's List — All Semesters", 'CS Department Award', 'Led University Coding Club'],
    tags: ['Algorithms', 'Data Structures', 'HCI', 'ML'],
  },
  {
    date: '2021',
    title: 'AWS Solutions Architect',
    company: 'Amazon Web Services',
    desc: 'Professional certification in AWS cloud architecture, focusing on scalable, highly available, and fault-tolerant systems.',
    achievements: [],
    tags: ['Cloud', 'Architecture', 'DevOps'],
  },
  {
    date: '2020',
    title: 'Google UX Design Certificate',
    company: 'Google / Coursera',
    desc: 'Completed 7-course professional certificate covering UX research, wireframing, prototyping, and design thinking.',
    achievements: [],
    tags: ['UX Research', 'Figma', 'Prototyping'],
  },
];

const INTERESTS = [
  { emoji: '🏔️', title: 'Hiking', desc: "Weekend trail adventures across California's national parks" },
  { emoji: '📸', title: 'Photography', desc: 'Street and landscape photography with my Sony A7IV' },
  { emoji: '📚', title: 'Reading', desc: 'Tech books, sci-fi novels, and UX design literature' },
  { emoji: '🎸', title: 'Music', desc: 'Playing guitar and producing lo-fi beats on weekends' },
  { emoji: '🤖', title: 'AI & ML', desc: 'Experimenting with LLMs, computer vision, and automation' },
  { emoji: '🌍', title: 'Travel', desc: 'Exploring new cultures and drawing design inspiration globally' },
];

const PERSONAL_INFO = [
  { icon: 'bx-user', label: 'Name', value: 'Alex Morgan' },
  { icon: 'bx-map', label: 'Location', value: 'San Francisco, CA' },
  { icon: 'bx-envelope', label: 'Email', value: 'alex@portfolio.com', mailto: true },
  { icon: 'bx-phone', label: 'Phone', value: '+1 (123) 456-7890' },
  { icon: 'bx-briefcase', label: 'Freelance', value: 'Available Now', available: true },
  { icon: 'bx-calendar', label: 'Experience', value: '5+ Years' },
];

function StatItem({ icon, target, suffix, label }) {
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
    <div className="stats-item" data-aos="zoom-in" ref={ref}>
      <span className="stat-icon"><i className={`bx ${icon}`} /></span>
      <span className="stat-number">{value}</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function Timeline({ items, edu }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="timeline-item" data-aos="fade-right" data-aos-delay={i * 100} key={`${item.title}-${i}`}>
          <div className="timeline-dot edu" />
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-card">
            <div className="timeline-header">
              <h3>{item.title}</h3>
              <span className="timeline-company">
                <i className={`bx ${edu ? 'bx-building-house' : 'bx-buildings'}`} /> {item.company}
              </span>
            </div>
            <p>{item.desc}</p>
            {item.achievements.length > 0 && (
              <ul className="timeline-achievements">
                {item.achievements.map((a) => (
                  <li key={a}><i className="bx bx-check-circle" /> {a}</li>
                ))}
              </ul>
            )}
            <div className="timeline-tags">
              {item.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState('experience');

  return (
    <>
      <PageHero title={<>About <span className="text-gradient">Me</span></>} crumb="About Me" />

      {/* About Intro */}
      <section className="about-intro section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-side" data-aos="fade-right">
              <div className="about-img-wrapper">
                <div className="about-img-frame">
                  <img src="/images/saleh.png" alt="Abu Saleh" className="about-img" />
                  <div className="img-glow" />
                </div>
                <div className="about-badge badge-exp">
                  <span className="badge-num">5+</span>
                  <span className="badge-txt">Years of<br />Experience</span>
                </div>
                <div className="about-badge badge-proj">
                  <i className="bx bx-trophy" />
                  <span>50+ Projects</span>
                </div>
                <div className="dots-grid" />
              </div>
            </div>

            <div className="about-content-side" data-aos="fade-left">
              <span className="section-tag">Who Am I?</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Passionate Developer &amp;<br />
                <span className="text-gradient">Creative Designer</span>
              </h2>
              <p className="about-bio">
                Hi! I'm <strong>Alex Morgan</strong>, a Full-Stack Developer &amp; UI/UX Designer
                based in San Francisco with over <strong>5 years of professional experience</strong>
                crafting digital products that people love.
              </p>
              <p className="about-bio">
                I specialize in building <strong>modern, performant web applications</strong>
                using React, Next.js, Node.js, and cloud platforms. My passion lies at the
                intersection of great design and clean, efficient code.
              </p>
              <p className="about-bio">
                When I'm not coding, you'll find me hiking mountain trails, sketching UI concepts,
                or contributing to open-source projects. I believe in <em>continuous learning</em>
                and love sharing knowledge with the developer community.
              </p>

              <div className="personal-info">
                {PERSONAL_INFO.map((item) => (
                  <div className="info-item" key={item.label}>
                    <span className="info-label"><i className={`bx ${item.icon}`} /> {item.label}</span>
                    {item.mailto ? (
                      <span className="info-value">
                        <a href={`mailto:${item.value}`}>{item.value}</a>
                      </span>
                    ) : (
                      <span className={`info-value ${item.available ? 'available' : ''}`}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <a href="/downloads/Resume.pdf" download className="btn btn-primary btn-lg">
                  <i className="bx bx-download" /> Download CV
                </a>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  <i className="bx bx-message-dots" /> Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          {STATS.map((s) => (
            <StatItem key={s.label} icon={s.icon} target={s.target} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* What I Bring */}
      <section className="what-i-do section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">My Approach</span>
            <h2 className="section-title">What I <span className="text-gradient">Bring</span></h2>
          </div>
          <div className="approach-grid">
            {APPROACH.map((a, i) => (
              <div className="approach-card" data-aos="fade-up" data-aos-delay={(i + 1) * 100} key={a.title}>
                <div className="approach-icon"><i className={`bx ${a.icon}`} /></div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">My Journey</span>
            <h2 className="section-title">Experience &amp; <span className="text-gradient">Education</span></h2>
          </div>

          <div className="timeline-tabs" data-aos="fade-up">
            <button className={`tab-btn ${tab === 'experience' ? 'active' : ''}`} onClick={() => setTab('experience')}>
              <i className="bx bx-briefcase" /> Work Experience
            </button>
            <button className={`tab-btn ${tab === 'education' ? 'active' : ''}`} onClick={() => setTab('education')}>
              <i className="bx bx-graduation" /> Education
            </button>
          </div>

          <div className="timeline-content" style={{ display: tab === 'experience' ? 'block' : 'none' }}>
            <Timeline items={WORK_EXP} />
          </div>
          <div className="timeline-content" style={{ display: tab === 'education' ? 'block' : 'none' }}>
            <Timeline items={EDUCATION} edu />
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="interests-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Beyond Code</span>
            <h2 className="section-title">My <span className="text-gradient">Interests</span></h2>
          </div>
          <div className="interests-grid">
            {INTERESTS.map((i, idx) => (
              <div className="interest-card" data-aos="zoom-in" data-aos-delay={(idx + 1) * 50} key={i.title}>
                <div className="interest-icon">{i.emoji}</div>
                <h4>{i.title}</h4>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
