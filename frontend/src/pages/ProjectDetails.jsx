import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PageHero from '../components/PageHero.jsx';
import { getProjects, getProject } from '../lib/api.js';
import { useToast } from '../lib/Toast.jsx';

const PROCESS = [
  { num: '01', title: 'Discovery & Planning', time: 'Week 1–2', desc: 'Requirements gathering, user research, competitive analysis, and technical architecture design.' },
  { num: '02', title: 'UI/UX Design', time: 'Week 3–4', desc: 'Wireframing, prototyping, design system creation, and client approval of all mockups.' },
  { num: '03', title: 'Development', time: 'Week 5–10', desc: 'Agile sprints with bi-weekly demos. Frontend, backend, and database development in parallel.' },
  { num: '04', title: 'Testing & Launch', time: 'Week 11–12', desc: 'QA testing, performance optimization, security audit, and phased production deployment.' },
];

const TECH_ICON_FALLBACK = 'bx-code-curly';

const metaRows = (p) => [
  { icon: 'bx-user', label: 'Client', value: p.client },
  { icon: 'bx-calendar', label: 'Duration', value: p.duration },
  { icon: 'bx-calendar-check', label: 'Completed', value: p.completed },
  { icon: 'bx-category', label: 'Category', value: p.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(' / ') },
  { icon: 'bx-dollar', label: 'Budget', value: p.budget },
  { icon: 'bx-group', label: 'Team Size', value: 'Solo + 1 Designer' },
];

export default function ProjectDetails() {
  const { slug } = useParams();
  const showToast = useToast();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProject(slug).then((p) => { if (mounted) setProject(p); });
    getProjects().then((list) => { if (mounted) setProjects(list); });
    return () => { mounted = false; };
  }, [slug]);

  if (!project) {
    return (
      <div className="container section" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <h2 style={{ marginBottom: 16 }}>Project not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>The project you're looking for doesn't exist or has been moved.</p>
        <Link to="/portfolio" className="btn btn-primary"><i className="bx bx-arrow-back" /> Back to Portfolio</Link>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;
  const related = projects.filter((p) => p.slug !== slug && p.categories.some((c) => project.categories.includes(c)));
  const relatedList = (related.length ? related : projects.filter((p) => p.slug !== slug)).slice(0, 3);

  return (
    <>
      <PageHero
        title={project ? (() => {
          const parts = project.title.split(' ');
          const last = parts.pop();
          return <>{parts.join(' ')} <span className="text-gradient">{last}</span></>;
        })() : 'Project Details'}
        crumb="Portfolio"
      />

      <section className="project-detail-section section">
        <div className="container">
          <div className="project-detail-grid">
            {/* Main Content */}
            <div className="project-main" data-aos="fade-right">
              {/* Hero Image Swiper */}
              <div className="project-swiper swiper" data-aos="fade-up">
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  navigation
                  loop
                  spaceBetween={0}
                >
                  {(project.gallery?.length ? project.gallery : [project.image]).map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt={`${project.title} screenshot ${i + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Overview */}
              <div className="detail-section" data-aos="fade-up">
                <h2 className="detail-heading">Project Overview</h2>
                <p>{project.overview}</p>
                <p>{project.description}</p>
              </div>

              {/* Challenge & Solution */}
              <div className="detail-section" data-aos="fade-up">
                <div className="challenge-solution">
                  <div className="cs-card challenge">
                    <div className="cs-icon"><i className="bx bx-question-mark" /></div>
                    <h3>The Challenge</h3>
                    <p>{project.challenge}</p>
                  </div>
                  <div className="cs-card solution">
                    <div className="cs-icon"><i className="bx bx-check" /></div>
                    <h3>The Solution</h3>
                    <p>{project.solution}</p>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="detail-section" data-aos="fade-up">
                <h2 className="detail-heading">Key Results</h2>
                <div className="results-grid">
                  {project.results.map((r) => (
                    <div className="result-item" key={r.label}>
                      <span className="result-num text-gradient">{r.value}</span>
                      <span className="result-label">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="detail-section" data-aos="fade-up">
                <h2 className="detail-heading">Development Process</h2>
                <div className="process-timeline">
                  {PROCESS.map((step) => (
                    <div className="process-tl-item" key={step.num}>
                      <div className="ptl-marker">{step.num}</div>
                      <div className="ptl-content">
                        <h4>{step.title} <span>{step.time}</span></h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="detail-section" data-aos="fade-up">
                <div className="project-testimonial">
                  <div className="pt-quote"><i className="bx bxs-quote-left" /></div>
                  <p className="pt-text">
                    "Alex delivered an outstanding platform that exceeded all our expectations. The
                    attention to detail, communication, and technical expertise was remarkable. Our
                    sales increased by 40% in the first month after launch!"
                  </p>
                  <div className="pt-author">
                    <div className="author-avatar">{project.client.charAt(0)}</div>
                    <div>
                      <strong>{project.client}</strong>
                      <span>Client</span>
                    </div>
                    <div className="pt-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i key={s} className={`bx ${s <= Math.round(project.rating) ? 'bxs-star' : 'bx-star'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="project-sidebar" data-aos="fade-left">
              <div className="sidebar-widget">
                <h3 className="widget-title">Project Info</h3>
                <ul className="project-meta-list">
                  {metaRows(project).map((m) => (
                    <li key={m.label}>
                      <span className="meta-label"><i className={`bx ${m.icon}`} /> {m.label}</span>
                      <span className="meta-value">{m.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Tech Stack</h3>
                <div className="tech-stack-list">
                  {project.tech_stack.map((t) => (
                    <div className="tech-stack-item" key={t}>
                      <i className={`bx ${TECH_ICON_FALLBACK}`} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Project Links</h3>
                <div className="project-link-btns">
                  <a href={project.demo_url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full">
                    <i className="bx bx-play" /> Live Demo
                  </a>
                  <a href={project.repo_url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-full">
                    <i className="bx bxl-github" /> GitHub Repo
                  </a>
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Share Project</h3>
                <div className="share-links">
                  <a href="#" className="share-btn twitter" onClick={(e) => { e.preventDefault(); window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank'); }}>
                    <i className="bx bxl-twitter" /> Twitter
                  </a>
                  <a href="#" className="share-btn linkedin" onClick={(e) => { e.preventDefault(); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank'); }}>
                    <i className="bx bxl-linkedin" /> LinkedIn
                  </a>
                  <button className="share-btn copy" onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => showToast('success', 'Link copied!'))}>
                    <i className="bx bx-link" /> Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="related-projects" data-aos="fade-up">
            <div className="section-header">
              <span className="section-tag">More Work</span>
              <h2 className="section-title">Related <span className="text-gradient">Projects</span></h2>
            </div>
            <div className="related-grid">
              {relatedList.map((p) => (
                <article className="port-card" key={p.id}>
                  <div className="port-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="port-overlay">
                      <div className="port-overlay-content">
                        <div className="port-links">
                          <Link to={`/project/${p.slug}`} className="port-btn"><i className="bx bx-link-external" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="port-info">
                    <div className="port-tags">{p.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}</div>
                    <h3 className="port-title"><Link to={`/project/${p.slug}`}>{p.title}</Link></h3>
                    <p className="port-desc">{p.description.slice(0, 80)}…</p>
                    <div className="port-footer">
                      <div className="port-stats"><span><i className="bx bx-star" /> {p.rating}</span></div>
                      <Link to={`/project/${p.slug}`} className="port-more">View <i className="bx bx-arrow-back bx-rotate-180" /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Project Navigation */}
            <div className="project-nav">
              {prev ? (
                <Link to={`/project/${prev.slug}`} className="proj-nav-btn prev">
                  <i className="bx bx-arrow-back" />
                  <div>
                    <span>Previous Project</span>
                    <strong>{prev.title}</strong>
                  </div>
                </Link>
              ) : <div className="proj-nav-btn prev" style={{ visibility: 'hidden' }} />}
              <Link to="/portfolio" className="proj-nav-center">
                <i className="bx bx-grid-alt" />
                <span>All Projects</span>
              </Link>
              {next ? (
                <Link to={`/project/${next.slug}`} className="proj-nav-btn next">
                  <div>
                    <span>Next Project</span>
                    <strong>{next.title}</strong>
                  </div>
                  <i className="bx bx-arrow-back bx-rotate-180" />
                </Link>
              ) : <div className="proj-nav-btn next" style={{ visibility: 'hidden' }} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
