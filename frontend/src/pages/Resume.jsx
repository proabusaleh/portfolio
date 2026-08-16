import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import ClassicResume from '../components/resume/ClassicResume.jsx';

const EXPERIENCE = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    date: 'Jan 2022 — Present',
    location: 'San Francisco, CA',
    points: [
      'Led architecture and development of enterprise SaaS platform serving 500K+ users, achieving 99.9% uptime',
      'Managed a team of 6 developers using Agile methodology, reducing sprint velocity by 40%',
      'Implemented CI/CD pipelines with GitHub Actions & AWS CodeDeploy, cutting deployment time from 2 hours to 8 minutes',
      'Architected microservices infrastructure using Docker & Kubernetes, improving system scalability by 300%',
      'Mentored 3 junior developers and conducted 200+ code reviews',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'StartupHub',
    date: 'Mar 2020 — Dec 2021',
    location: 'Remote',
    points: [
      'Built and shipped 15 full-stack web applications from inception to production',
      'Designed and implemented RESTful and GraphQL APIs consumed by 50K+ daily active users',
      'Reduced application load time by 65% through performance optimization and caching strategies',
      'Integrated third-party services including Stripe, Twilio, SendGrid, and Auth0',
    ],
    tech: ['Vue.js', 'Express', 'MongoDB', 'Redis', 'GraphQL'],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency Co.',
    date: 'Jun 2019 — Feb 2020',
    location: 'San Francisco, CA',
    points: [
      'Developed responsive websites for 20+ clients across retail, healthcare, and finance sectors',
      'Created interactive CSS animations and UI components improving user engagement by 35%',
      'Collaborated with design team to implement pixel-perfect Figma designs',
    ],
    tech: ['HTML/CSS', 'JavaScript', 'jQuery', 'WordPress'],
  },
];

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack e-commerce solution handling 10K+ products, Stripe payments, real-time inventory, and admin dashboard. Achieved 73% faster load times and 124% conversion rate improvement.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'SaaS Analytics Dashboard',
    desc: 'Real-time analytics platform with D3.js visualizations, team collaboration, and automated reports. Won 2023 Developer Award for best SaaS product.',
    tech: ['React', 'D3.js', 'Node.js', 'Redis'],
  },
  {
    title: 'AI Writing Assistant',
    desc: 'GPT-4 powered collaborative writing tool with real-time sync, version history, and multi-language support. 5K+ active monthly users.',
    tech: ['React', 'OpenAI API', 'Socket.io'],
  },
];

const SKILL_CATEGORIES = [
  { title: 'Frontend', skills: ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
  { title: 'Backend', skills: ['Node.js', 'Express.js', 'Python', 'REST APIs', 'GraphQL'] },
  { title: 'Database', skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'] },
  { title: 'DevOps & Cloud', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx'] },
  { title: 'Design', skills: ['Figma', 'Adobe XD', 'UX Research'] },
  { title: 'Tools', skills: ['Git', 'Jest', 'Webpack', 'Jira', 'Postman'] },
];

const CERTS = [
  { title: 'AWS Solutions Architect', meta: 'Amazon Web Services • 2021' },
  { title: 'Google UX Design Certificate', meta: 'Google / Coursera • 2020' },
  { title: 'React Advanced Patterns', meta: 'Frontend Masters • 2022' },
  { title: 'Node.js Microservices', meta: 'Udemy • 2021' },
];

const LANGUAGES = [
  { name: 'English', level: 'native' },
  { name: 'Spanish', level: 'fluent' },
  { name: 'French', level: 'basic' },
];

const AWARDS = [
  { emoji: '🏆', title: 'Best Developer Award', meta: 'TechCorp Inc. • 2023' },
  { emoji: '🥇', title: 'Hackathon Winner — SF TechWeek', meta: '2022' },
  { emoji: '⭐', title: 'Top Rated Freelancer', meta: 'Upwork • Since 2020' },
];

const RESUME_CONTACT = [
  { icon: 'bx-envelope', text: 'alex@portfolio.com', href: 'mailto:alex@portfolio.com' },
  { icon: 'bx-phone', text: '+1 (123) 456-7890', href: 'tel:+11234567890' },
  { icon: 'bx-map', text: 'San Francisco, CA' },
  { icon: 'bxl-linkedin', text: 'linkedin.com/in/alexmorgan', href: '#' },
  { icon: 'bxl-github', text: 'github.com/alexmorgan', href: '#' },
  { icon: 'bx-globe', text: 'alexmorgan.dev', href: '#' },
];

function ModernResume() {
  return (
    <>
      {/* Download Bar */}
      <div className="resume-download-bar" data-aos="fade-up">
            <div className="resume-download-info">
              <div className="resume-file-icon">
                <i className="bx bxs-file-pdf" />
              </div>
              <div>
                <h3>Alex_Morgan_Resume_2024.pdf</h3>
                <span>Updated December 2024 • 2 pages • 1.2 MB</span>
              </div>
            </div>
            <div className="resume-actions">
              <button className="btn btn-outline" onClick={() => window.print()}>
                <i className="bx bx-printer" /> Print
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <i className="bx bx-download" /> Download PDF
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="resume-wrapper" data-aos="fade-up" data-aos-delay="100">
            <div className="resume-document">
              {/* Header */}
              <div className="resume-header-section">
                <div className="resume-profile">
                  <div className="resume-avatar">
                    <img src="/images/saleh.png" alt="Alex Morgan" />
                  </div>
                  <div className="resume-identity">
                    <h1 className="resume-name">Alex Morgan</h1>
                    <h2 className="resume-role">Full-Stack Developer &amp; UI/UX Designer</h2>
                    <p className="resume-tagline">
                      Crafting high-performance digital experiences with 5+ years of expertise
                      in modern web technologies and human-centered design.
                    </p>
                  </div>
                </div>
                <div className="resume-contact-bar">
                  {RESUME_CONTACT.map((c) => (
                    <div className="rc-item" key={c.text}>
                      <i className={`bx ${c.icon}`} />
                      {c.href ? <a href={c.href}>{c.text}</a> : <span>{c.text}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="resume-body">
                {/* Left Column */}
                <div className="resume-col-left">
                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-briefcase" />
                      <h3>Work Experience</h3>
                    </div>
                    {EXPERIENCE.map((job) => (
                      <div className="resume-entry" key={job.title}>
                        <div className="resume-entry-header">
                          <div>
                            <h4 className="entry-title">{job.title}</h4>
                            <span className="entry-company">{job.company}</span>
                          </div>
                          <div className="entry-meta">
                            <span className="entry-date">{job.date}</span>
                            <span className="entry-location">{job.location}</span>
                          </div>
                        </div>
                        <ul className="entry-points">
                          {job.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                        <div className="entry-tech">
                          {job.tech.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-code-curly" />
                      <h3>Notable Projects</h3>
                    </div>
                    {PROJECTS.map((p) => (
                      <div className="resume-project" key={p.title}>
                        <div className="rp-header">
                          <h4>{p.title}</h4>
                          <div className="rp-links">
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="bx bx-link-external" /> Live</a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="bx bxl-github" /> Code</a>
                          </div>
                        </div>
                        <p>{p.desc}</p>
                        <div className="entry-tech">
                          {p.tech.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="resume-col-right">
                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-user" />
                      <h3>Profile Summary</h3>
                    </div>
                    <p className="resume-summary">
                      Results-driven Full-Stack Developer with 5+ years of professional experience building
                      scalable web applications and intuitive user interfaces. Proven track record of delivering
                      high-impact projects on time and within budget. Passionate about clean code, performance
                      optimization, and mentoring teams.
                    </p>
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-code-block" />
                      <h3>Technical Skills</h3>
                    </div>
                    <div className="resume-skills">
                      {SKILL_CATEGORIES.map((cat) => (
                        <div className="skill-category" key={cat.title}>
                          <h5>{cat.title}</h5>
                          <div className="skill-pills">
                            {cat.skills.map((s) => <span key={s}>{s}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-graduation" />
                      <h3>Education</h3>
                    </div>
                    <div className="resume-edu">
                      <div className="edu-entry">
                        <h4>B.S. Computer Science</h4>
                        <span className="edu-school">Stanford University</span>
                        <span className="edu-date">2015 — 2019</span>
                        <span className="edu-gpa">GPA: 3.9/4.0 — Dean's List</span>
                      </div>
                    </div>
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-badge-check" />
                      <h3>Certifications</h3>
                    </div>
                    <ul className="resume-certs">
                      {CERTS.map((c) => (
                        <li key={c.title}>
                          <i className="bx bx-check-circle" />
                          <div>
                            <strong>{c.title}</strong>
                            <span>{c.meta}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-globe" />
                      <h3>Languages</h3>
                    </div>
                    <div className="resume-languages">
                      {LANGUAGES.map((l) => (
                        <div className="lang-item" key={l.name}>
                          <span className="lang-name">{l.name}</span>
                          <span className={`lang-level ${l.level}`}>{l.level.charAt(0).toUpperCase() + l.level.slice(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="resume-block">
                    <div className="resume-block-title">
                      <i className="bx bx-trophy" />
                      <h3>Awards</h3>
                    </div>
                    <ul className="resume-awards">
                      {AWARDS.map((a) => (
                        <li key={a.title}>
                          <span className="award-icon">{a.emoji}</span>
                          <div>
                            <strong>{a.title}</strong>
                            <span>{a.meta}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </>
  );
}

export default function Resume() {
  const [template, setTemplate] = useState('classic');

  return (
    <>
      <PageHero title={<>My <span className="text-gradient">Resume</span></>} crumb="Resume" />

      <section className="resume-section section">
        <div className="container">
          {/* Template Switcher */}
          <div className="resume-template-switcher" data-aos="fade-up">
            <button
              type="button"
              className={`rts-btn ${template === 'classic' ? 'active' : ''}`}
              onClick={() => setTemplate('classic')}
            >
              <i className="bx bx-file-blank" /> Classic CV
            </button>
            <button
              type="button"
              className={`rts-btn ${template === 'modern' ? 'active' : ''}`}
              onClick={() => setTemplate('modern')}
            >
              <i className="bx bx-layout" /> Modern
            </button>
          </div>

          {template === 'classic' ? (
            <div data-aos="fade-up" data-aos-delay="100">
              <ClassicResume />
            </div>
          ) : (
            <ModernResume />
          )}
        </div>
      </section>
    </>
  );
}
