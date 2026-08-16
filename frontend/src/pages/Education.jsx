import PageHero from '../components/PageHero.jsx';

const CERTS = [
  {
    icon: 'aws',
    boxicon: 'bxl-aws',
    title: 'AWS Solutions Architect — Professional',
    issuer: 'Amazon Web Services (AWS)',
    meta: [
      { icon: 'bx-calendar', text: 'Issued: March 2021' },
      { icon: 'bx-refresh', text: 'Renewed: March 2024' },
    ],
    desc: 'Professional-level certification covering cloud architecture, highly available systems design, cost optimization, security, and migration strategies on AWS. Includes EC2, S3, RDS, Lambda, CloudFront, VPC, and IAM deep dives.',
    skills: ['Cloud Architecture', 'EC2 / S3', 'Lambda', 'RDS', 'CloudFront', 'Security'],
  },
  {
    icon: 'google',
    boxicon: 'bxl-google',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google / Coursera',
    meta: [
      { icon: 'bx-calendar', text: 'Completed: August 2020' },
      { icon: 'bx-time', text: 'Duration: 6 months' },
    ],
    desc: '7-course certificate program covering the full UX design process — from empathizing with users and defining problems, to ideating, prototyping, and testing designs in Figma and Adobe XD.',
    skills: ['UX Research', 'Wireframing', 'Figma', 'Prototyping', 'Usability Testing', 'Design Thinking'],
  },
  {
    icon: 'react',
    boxicon: 'bxl-react',
    title: 'React Advanced Patterns & Architecture',
    issuer: 'Frontend Masters',
    meta: [
      { icon: 'bx-calendar', text: 'Completed: January 2022' },
      { icon: 'bx-time', text: 'Duration: 40 hours' },
    ],
    desc: 'Advanced React course covering compound components, render props, context optimization, custom hooks, performance profiling, concurrent features, and production-ready architecture patterns for large-scale applications.',
    skills: ['React Patterns', 'Custom Hooks', 'Performance', 'Context API', 'Concurrent Mode', 'Testing'],
  },
  {
    icon: 'node',
    boxicon: 'bxl-nodejs',
    title: 'Node.js Microservices Architecture',
    issuer: 'Udemy — Stephen Grider',
    meta: [
      { icon: 'bx-calendar', text: 'Completed: June 2021' },
      { icon: 'bx-time', text: 'Duration: 54 hours' },
    ],
    desc: 'Deep dive into microservices with Node.js — event-driven architecture, NATS Streaming, Docker & Kubernetes orchestration, API gateways, data management patterns, and testing strategies for distributed systems.',
    skills: ['Microservices', 'NATS Streaming', 'Docker', 'Kubernetes', 'Event-Driven', 'API Gateway'],
  },
  {
    icon: 'meta',
    boxicon: 'bxl-meta',
    title: 'Meta Front-End Developer Professional',
    issuer: 'Meta / Coursera',
    meta: [
      { icon: 'bx-calendar', text: 'Completed: September 2022' },
      { icon: 'bx-time', text: 'Duration: 9 months' },
    ],
    desc: '9-course program by Meta engineers covering HTML/CSS, JavaScript, React development, version control, UI/UX principles, and developing cross-platform applications using React Native.',
    skills: ['React', 'React Native', 'JavaScript', 'UI/UX', 'Version Control', 'Testing'],
  },
  {
    icon: 'mongodb',
    boxicon: 'bxl-mongodb',
    title: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    meta: [
      { icon: 'bx-calendar', text: 'Completed: November 2020' },
      { icon: 'bx-time', text: 'Duration: 3 months' },
    ],
    desc: 'Comprehensive MongoDB certification covering data modeling, aggregation pipeline, indexing strategies, performance optimization, replication, sharding, and security best practices for production deployments.',
    skills: ['Data Modeling', 'Aggregation', 'Indexing', 'Replication', 'Sharding', 'Security'],
  },
];

const PLATFORMS = [
  { icon: 'bx-play-circle', bg: 'rgba(6,182,212,0.1)', color: '#06b6d4', title: 'Frontend Masters', desc: 'Advanced JavaScript, React, CSS, and web performance courses by industry experts.', meta: '40+ Courses Completed' },
  { icon: 'bx-video', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', title: 'Udemy', desc: 'In-depth courses on full-stack development, DevOps, and cloud architecture.', meta: '25+ Courses Completed' },
  { icon: 'bx-graduation', bg: 'rgba(124,58,237,0.1)', color: '#7c3aed', title: 'Coursera', desc: 'University-backed professional certificates from Google, Meta, and Stanford.', meta: '8 Certificates Earned' },
  { icon: 'bx-book-reader', bg: 'rgba(16,185,129,0.1)', color: '#10b981', title: 'Official Docs & Books', desc: 'MDN, React docs, Node.js docs, and 30+ technical books read annually.', meta: 'Self-Directed Learning' },
];

const TIMELINE = [
  { date: '2015 — 2019', title: 'Stanford University', desc: 'B.S. Computer Science — Magna Cum Laude, GPA 3.9/4.0', type: 'degree', label: 'Degree' },
  { date: 'Nov 2020', title: 'MongoDB Developer Certification', desc: 'MongoDB University — Database design & optimization', type: 'cert', label: 'Certificate' },
  { date: 'Aug 2020', title: 'Google UX Design Certificate', desc: 'Google / Coursera — 7-course UX design program', type: 'cert', label: 'Certificate' },
  { date: 'Jun 2021', title: 'Node.js Microservices', desc: 'Udemy — Distributed systems with Docker & Kubernetes', type: 'course', label: 'Course' },
  { date: 'Mar 2021', title: 'AWS Solutions Architect', desc: 'Amazon Web Services — Professional cloud architecture', type: 'cert', label: 'Certificate' },
  { date: 'Jan 2022', title: 'React Advanced Patterns', desc: 'Frontend Masters — Advanced React architecture', type: 'course', label: 'Course' },
  { date: 'Sep 2022', title: 'Meta Front-End Developer Certificate', desc: 'Meta / Coursera — 9-course professional program', type: 'cert', label: 'Certificate' },
  { date: '2024 — Present', title: 'Continuous Learning', desc: 'AI/ML fundamentals, advanced TypeScript, system design, and more', type: 'ongoing', label: 'Ongoing', ongoing: true },
];

const COURSES = [
  'Data Structures & Algorithms', 'Computer Networks', 'Operating Systems', 'Database Systems',
  'Software Engineering', 'Human-Computer Interaction', 'Machine Learning', 'Distributed Systems',
  'Computer Graphics', 'Programming Languages', 'Security & Cryptography', 'Compilers',
];

const ACHIEVEMENTS = [
  "Dean's List — All 8 semesters (2015–2019)",
  'CS Department Outstanding Thesis Award — 2019',
  'President, Stanford Coding Club (2017–2019)',
  '1st Place — Stanford Internal Hackathon 2018',
  'Stanford Merit Scholarship — 4 years',
  'Published research paper on PWA performance optimization',
];

const ACTIVITIES = [
  { icon: 'bx-code-curly', label: 'Coding Club President' },
  { icon: 'bx-bot', label: 'AI Research Lab' },
  { icon: 'bx-rocket', label: 'Startup Incubator' },
  { icon: 'bx-heart', label: 'Tech for Good Initiative' },
];

export default function Education() {
  return (
    <>
      <PageHero title={<>My <span className="text-gradient">Education</span></>} crumb="Education" />

      <section className="education-section section">
        <div className="container">
          {/* Formal Education */}
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Academic Background</span>
            <h2 className="section-title">Formal <span className="text-gradient">Education</span></h2>
            <p className="section-subtitle">
              A strong academic foundation combined with continuous self-learning
            </p>
          </div>

          <div className="edu-cards" data-aos="fade-up" data-aos-delay="100">
            <div className="edu-degree-card featured-degree">
              <div className="edc-accent-bar" />
              <div className="edc-body">
                <div className="edc-left">
                  <div className="edc-logo">
                    <i className="bx bx-building-house" />
                  </div>
                  <div className="edc-timeline-line" />
                </div>
                <div className="edc-content">
                  <div className="edc-badge-row">
                    <span className="edc-degree-badge">Bachelor's Degree</span>
                    <span className="edc-honors-badge">🏅 Graduated with Honors</span>
                  </div>
                  <h3 className="edc-degree">Bachelor of Science — Computer Science</h3>
                  <div className="edc-school-row">
                    <span className="edc-school"><i className="bx bx-buildings" /> Stanford University</span>
                    <span className="edc-location"><i className="bx bx-map" /> Stanford, CA, USA</span>
                  </div>
                  <div className="edc-date-row">
                    <span className="edc-date"><i className="bx bx-calendar" /> September 2015 — May 2019</span>
                    <span className="edc-gpa">GPA: 3.9 / 4.0</span>
                  </div>

                  <p className="edc-description">
                    Earned a Bachelor of Science in Computer Science with a specialization in
                    <strong> Software Engineering</strong> and <strong>Human-Computer Interaction (HCI)</strong>.
                    Graduated <em>Magna Cum Laude</em> with a 3.9 GPA, placing me in the top 5%
                    of my graduating class. My senior thesis — <em>"Progressive Web Applications as
                    a Bridge Between Web and Native"</em> — received the Computer Science Department's
                    Outstanding Thesis Award.
                  </p>

                  <div className="edc-section">
                    <h4 className="edc-section-label"><i className="bx bx-book-open" /> Relevant Coursework</h4>
                    <div className="edc-courses">
                      {COURSES.map((c) => <span key={c}>{c}</span>)}
                    </div>
                  </div>

                  <div className="edc-section">
                    <h4 className="edc-section-label"><i className="bx bx-trophy" /> Academic Achievements</h4>
                    <ul className="edc-achievements-list">
                      {ACHIEVEMENTS.map((a) => (
                        <li key={a}><i className="bx bx-check-circle" /> {a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="edc-section">
                    <h4 className="edc-section-label"><i className="bx bx-group" /> Clubs & Activities</h4>
                    <div className="edc-activities">
                      {ACTIVITIES.map((a) => (
                        <div className="edc-activity" key={a.label}>
                          <i className={`bx ${a.icon}`} />
                          <span>{a.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="section-header" style={{ marginTop: 80 }} data-aos="fade-up">
            <span className="section-tag">Professional Development</span>
            <h2 className="section-title">Certifications & <span className="text-gradient">Courses</span></h2>
            <p className="section-subtitle">
              Continuous learning through industry-leading platforms and providers
            </p>
          </div>

          <div className="cert-cards-grid">
            {CERTS.map((c, i) => (
              <div className="cert-detail-card" data-aos="fade-up" data-aos-delay={50 + i * 50} key={c.title}>
                <div className="cdc-header">
                  <div className={`cdc-icon ${c.icon}`}>
                    <i className={`bx ${c.boxicon}`} />
                  </div>
                  <div className="cdc-badge-wrap">
                    <span className="cdc-verified">✓ Verified</span>
                  </div>
                </div>
                <div className="cdc-body">
                  <h3 className="cdc-title">{c.title}</h3>
                  <span className="cdc-issuer">{c.issuer}</span>
                  <div className="cdc-meta">
                    {c.meta.map((m) => (
                      <span key={m.text}><i className={`bx ${m.icon}`} /> {m.text}</span>
                    ))}
                  </div>
                  <p className="cdc-desc">{c.desc}</p>
                  <div className="cdc-skills">
                    {c.skills.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="cdc-verify-btn">
                    <i className="bx bx-badge-check" /> Verify Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Learning Platforms */}
          <div className="learning-platforms" data-aos="fade-up">
            <div className="section-header">
              <span className="section-tag">Where I Learn</span>
              <h2 className="section-title">Learning <span className="text-gradient">Platforms</span></h2>
            </div>
            <div className="platforms-grid">
              {PLATFORMS.map((p) => (
                <div className="platform-card" key={p.title}>
                  <div className="pc-icon" style={{ background: p.bg, color: p.color }}>
                    <i className={`bx ${p.icon}`} />
                  </div>
                  <div className="pc-info">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <span className="pc-courses">{p.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="edu-timeline-summary" data-aos="fade-up">
            <div className="section-header">
              <span className="section-tag">Learning Journey</span>
              <h2 className="section-title">Education <span className="text-gradient">Timeline</span></h2>
            </div>
            <div className="edu-summary-timeline">
              {TIMELINE.map((t, i) => (
                <div className={`est-item ${t.ongoing ? 'ongoing' : ''}`} data-aos="fade-right" data-aos-delay={50 + i * 50} key={t.title}>
                  <div className="est-marker">
                    <div className={`est-dot ${t.ongoing ? 'pulse-dot' : ''}`} />
                  </div>
                  <div className="est-content">
                    <span className="est-date">{t.date}</span>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                    <span className={`est-type ${t.type}`}>{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
