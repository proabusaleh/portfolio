import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero.jsx';

const TABS = [
  { key: 'all', label: 'All Skills' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'design', label: 'Design' },
  { key: 'tools', label: 'Tools' },
];

const SKILL_GROUPS = [
  {
    title: 'Frontend Development',
    icon: 'bx-laptop',
    skills: [
      { cat: 'frontend', icon: 'bxl-html5', color: '#e34c26', name: 'HTML5 & CSS3', percent: 98 },
      { cat: 'frontend', icon: 'bxl-javascript', color: '#f7df1e', name: 'JavaScript (ES2023+)', percent: 95 },
      { cat: 'frontend', icon: 'bxl-react', color: '#61dafb', name: 'React.js & Next.js', percent: 93 },
      { cat: 'frontend', icon: 'bxl-vuejs', color: '#42b883', name: 'Vue.js & Nuxt.js', percent: 80 },
      { cat: 'frontend', icon: 'bxl-typescript', color: '#3178c6', name: 'TypeScript', percent: 88 },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'bx-server',
    skills: [
      { cat: 'backend', icon: 'bxl-nodejs', color: '#68a063', name: 'Node.js & Express', percent: 92 },
      { cat: 'backend', icon: 'bxl-python', color: '#3572A5', name: 'Python & Django', percent: 78 },
      { cat: 'backend', icon: 'bxl-mongodb', color: '#13aa52', name: 'MongoDB & Mongoose', percent: 90 },
      { cat: 'backend', icon: 'bx-data', color: '#336791', name: 'PostgreSQL & MySQL', percent: 85 },
      { cat: 'backend', icon: 'bx-cloud', color: '#ff9900', name: 'AWS & Cloud Services', percent: 82 },
    ],
  },
  {
    title: 'Design Tools',
    icon: 'bx-palette',
    skills: [
      { cat: 'design', icon: 'bxl-figma', color: '#f24e1e', name: 'Figma', percent: 94 },
      { cat: 'design', icon: 'bxl-adobe', color: '#ff0000', name: 'Adobe XD & Photoshop', percent: 85 },
      { cat: 'design', icon: 'bx-layout', color: '#7c3aed', name: 'Framer & Principle', percent: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'bx-wrench',
    skills: [
      { cat: 'tools', icon: 'bxl-git', color: '#f05032', name: 'Git & GitHub', percent: 96 },
      { cat: 'tools', icon: 'bxl-docker', color: '#2496ed', name: 'Docker & Kubernetes', percent: 80 },
      { cat: 'tools', icon: 'bx-infinite', color: '#9d5cf7', name: 'CI/CD Pipelines', percent: 85 },
    ],
  },
];

const SOFT_SKILLS = [
  { percent: 95, label: 'Problem Solving' },
  { percent: 90, label: 'Communication' },
  { percent: 88, label: 'Teamwork' },
  { percent: 92, label: 'Leadership' },
  { percent: 85, label: 'Creativity' },
];

const CERTS = [
  { icon: 'bxl-aws', title: 'AWS Solutions Architect', meta: 'Amazon Web Services • 2021', style: {} },
  { icon: 'bxl-google', title: 'Google UX Design', meta: 'Google / Coursera • 2020', style: { color: '#4285f4' } },
  { icon: 'bxl-react', title: 'React Advanced Patterns', meta: 'Frontend Masters • 2022', style: { color: '#61dafb' } },
  { icon: 'bx-trophy', title: 'Best Developer Award', meta: 'TechCorp Inc. • 2023', style: { color: '#f59e0b' } },
];

function SkillBar({ skill, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.width = `${skill.percent}%`;
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.percent]);

  return (
    <div className="skill-bar-item" data-category={skill.cat}>
      <div className="skill-info">
        <div className="skill-name-wrap">
          <i className={`bx ${skill.icon}`} style={{ color: skill.color }} />
          <span>{skill.name}</span>
        </div>
        <span className="skill-percent">{skill.percent}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-bar-fill" ref={ref} data-progress={skill.percent} />
      </div>
    </div>
  );
}

function CircularSkill({ percent, label, index }) {
  const circleRef = useRef(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    const progressEl = el.querySelector('.progress');
    if (!progressEl) return;
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (percent / 100) * circumference;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              progressEl.style.strokeDashoffset = offset;
            }, 200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div className="circular-skill">
      <div className="circle-progress" data-percent={percent} ref={circleRef}>
        <svg viewBox="0 0 120 120">
          <circle className="track" cx="60" cy="60" r="50" />
          <circle className="progress" cx="60" cy="60" r="50" data-percent={percent} />
        </svg>
        <div className="circle-center">
          <span className="circle-value">{percent}%</span>
        </div>
      </div>
      <h4>{label}</h4>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('all');

  return (
    <>
      <PageHero title={<>My <span className="text-gradient">Skills</span></>} crumb="Skills" />

      {/* SVG gradient for circular progress */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#7c3aed' }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4' }} />
          </linearGradient>
        </defs>
      </svg>

      <section className="skills-section section">
        <div className="container">
          <div className="skill-tabs" data-aos="fade-up">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`skill-tab-btn ${active === t.key ? 'active' : ''}`}
                data-category={t.key}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="skills-container">
            {SKILL_GROUPS.map((group, gi) => {
              const visible = active === 'all' || group.skills.some((s) => s.cat === active);
              return (
                <div
                  key={group.title}
                  className="skill-group"
                  data-aos="fade-up"
                  data-aos-delay={(gi + 1) * 100}
                  style={{ display: visible ? '' : 'none' }}
                >
                  <h3 className="skill-group-title">
                    <i className={`bx ${group.icon}`} /> {group.title}
                  </h3>
                  <div className="skill-bars">
                    {group.skills.map((skill, si) => (
                      <SkillBar key={skill.name} skill={skill} index={si} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="section-header" style={{ marginTop: '80px' }} data-aos="fade-up">
            <span className="section-tag">Soft Skills</span>
            <h2 className="section-title">Beyond <span className="text-gradient">Technical</span></h2>
          </div>

          <div className="circular-skills" data-aos="fade-up" data-aos-delay="100">
            {SOFT_SKILLS.map((s, i) => (
              <CircularSkill key={s.label} percent={s.percent} label={s.label} index={i} />
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '80px' }} data-aos="fade-up">
            <span className="section-tag">Credentials</span>
            <h2 className="section-title">Certifications &amp; <span className="text-gradient">Awards</span></h2>
          </div>

          <div className="certifications-grid" data-aos="fade-up" data-aos-delay="100">
            {CERTS.map((c) => (
              <div key={c.title} className="cert-card">
                <div className="cert-icon" style={c.style}><i className={`bx ${c.icon}`} /></div>
                <div className="cert-info">
                  <h4>{c.title}</h4>
                  <span>{c.meta}</span>
                </div>
                <div className="cert-badge"><i className="bx bx-badge-check" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
