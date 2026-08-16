import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { getProjects } from '../lib/api.js';

const FILTERS = [
  { key: 'all', label: 'All', icon: 'bx-grid-alt' },
  { key: 'web', label: 'Web Apps', icon: 'bx-globe' },
  { key: 'mobile', label: 'Mobile', icon: 'bx-mobile' },
  { key: 'design', label: 'Design', icon: 'bx-palette' },
  { key: 'fullstack', label: 'Full Stack', icon: 'bx-code-curly' },
  { key: 'saas', label: 'SaaS', icon: 'bx-cloud' },
];

export default function Portfolio() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProjects().then((list) => {
      if (mounted) setProjects(list);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (filter !== 'all') list = list.filter((p) => p.categories.includes(filter));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [projects, filter, search]);

  return (
    <>
      <PageHero
        title={<>My <span className="text-gradient">Work</span></>}
        crumb="Portfolio"
      />

      <section className="portfolio-page section">
        <div className="container">
          <div className="portfolio-controls" data-aos="fade-up">
            <div className="filter-tabs">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                  data-filter={f.key}
                  onClick={() => setFilter(f.key)}
                >
                  <i className={`bx ${f.icon}`} /> {f.label}
                </button>
              ))}
            </div>

            <div className="portfolio-tools">
              <div className="search-box">
                <i className="bx bx-search" />
                <input
                  type="text"
                  id="portfolioSearch"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                  data-view="grid"
                  title="Grid View"
                  onClick={() => setView('grid')}
                >
                  <i className="bx bx-grid-alt" />
                </button>
                <button
                  className={`view-btn ${view === 'list' ? 'active' : ''}`}
                  data-view="list"
                  title="List View"
                  onClick={() => setView('list')}
                >
                  <i className="bx bx-list-ul" />
                </button>
              </div>
            </div>
          </div>

          <div className="portfolio-meta" data-aos="fade-up">
            <span>
              Showing <strong>{filtered.length}</strong> projects
            </span>
          </div>

          <div className={`portfolio-grid ${view}-view`} id="portfolioGrid">
            {filtered.map((p, i) => (
              <article
                key={p.id}
                className="port-card"
                data-category={p.categories.join(' ')}
                data-aos="fade-up"
                data-aos-delay={(i % 6) * 50}
              >
                <div className="port-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="port-overlay">
                    <div className="port-overlay-content">
                      <div className="port-links">
                        <Link to={`/project/${p.slug}`} className="port-btn" data-tooltip="View Details">
                          <i className="bx bx-link-external" />
                        </Link>
                        <a href={p.demo_url || '#'} target="_blank" rel="noopener noreferrer" className="port-btn" data-tooltip="Live Demo">
                          <i className="bx bx-play" />
                        </a>
                        <a href={p.repo_url || '#'} target="_blank" rel="noopener noreferrer" className="port-btn" data-tooltip="GitHub">
                          <i className="bx bxl-github" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="port-badges">
                    {p.badge && <span className={`port-badge ${p.badge.toLowerCase()}`}>{p.badge}</span>}
                    <span className="port-badge year">{p.year}</span>
                  </div>
                </div>
                <div className="port-info">
                  <div className="port-tags">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <h3 className="port-title">
                    <Link to={`/project/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="port-desc">{p.description}</p>
                  <div className="port-footer">
                    <div className="port-stats">
                      <span><i className="bx bx-star" /> {p.rating}</span>
                      <span><i className="bx bx-show" /> {p.views}</span>
                    </div>
                    <Link to={`/project/${p.slug}`} className="port-more">
                      Case Study <i className="bx bx-arrow-back bx-rotate-180" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="no-results" style={{ gridColumn: '1 / -1' }}>
                <i className="bx bx-search-alt" />
                <p>No projects found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
