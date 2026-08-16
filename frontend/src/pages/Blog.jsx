import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { posts } from '../data/fallback.js';
import { useToast } from '../lib/Toast.jsx';

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React' },
  { id: 'css', label: 'CSS' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'design', label: 'Design' },
  { id: 'career', label: 'Career' },
];

const CAT_FILTER_MAP = {
  react: (cat) => ['React', 'Performance'].includes(cat),
  css: (cat) => cat === 'CSS',
  nodejs: (cat) => cat === 'Node.js',
  design: (cat) => cat === 'Design',
  career: (cat) => cat === 'Career',
};

const POPULAR_POSTS = [
  { slug: 'react-performance-optimization-techniques', icon: 'bxl-react', title: '10 React Performance Optimization Tips', date: 'Dec 15, 2024' },
  { slug: 'production-ready-rest-api-node-express-postgresql', icon: 'bx-server', title: 'Building Production REST APIs', date: 'Dec 5, 2024' },
  { slug: 'nextjs-14-app-router', icon: 'bx-layer', title: 'Next.js 14 App Router Guide', date: 'Nov 20, 2024' },
];

const SIDEBAR_CATS = [
  { label: 'React & Next.js', count: 12 },
  { label: 'CSS & Design', count: 8 },
  { label: 'Node.js & Backend', count: 10 },
  { label: 'UI/UX Design', count: 7 },
  { label: 'Career & Freelance', count: 5 },
  { label: 'DevOps & Tools', count: 4 },
];

const TAGS = ['React', 'Next.js', 'CSS', 'JavaScript', 'Node.js', 'TypeScript', 'Figma', 'AWS', 'Docker', 'GraphQL', 'Freelance', 'Performance'];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function BlogCard({ post, featured }) {
  return (
    <article className={`blog-card ${featured ? 'featured-post' : ''}`}>
      <div className={`blog-image ${featured ? 'featured-img' : ''}`}>
        <div className="blog-image-placeholder" style={{ background: post.cover_gradient }}>
          <i className={`bx ${post.cover_icon}`} style={featured ? { fontSize: '4rem', color: 'rgba(108,99,255,.4)' } : undefined} />
        </div>
        {!featured && <div className="blog-category-badge">{post.category}</div>}
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          {featured && (
            <span className="blog-author">
              <div className="author-avatar-placeholder">{post.author_avatar}</div>
              {post.author}
            </span>
          )}
          <span className="blog-date"><i className="bx bx-calendar" /> {fmtDate(post.published_at)}</span>
          <span className="blog-read"><i className="bx bx-time" /> {post.read_minutes} min read</span>
          {featured && <span className="blog-views"><i className="bx bx-show" /> {post.views} views</span>}
        </div>
        {featured && (
          <div className="blog-category-badge" style={{ position: 'relative', top: 0, right: 0, display: 'inline-flex', marginBottom: 12, width: 'fit-content' }}>
            {post.category}
          </div>
        )}
        <h2 className="blog-title" style={featured ? { fontSize: '1.55rem' } : undefined}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-footer">
          <div className="blog-tags">
            {post.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
          </div>
          <Link to={`/blog/${post.slug}`} className="blog-read-more">
            {featured ? 'Read Article' : 'Read'} <i className="bx bx-right-arrow-alt" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const showToast = useToast();
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');

  const featured = posts.find((p) => p.featured);
  const matches = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    const okCat = cat === 'all' || CAT_FILTER_MAP[cat](p.category);
    const okQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return okCat && okQuery;
  });
  const gridPosts = matches.filter((p) => !p.featured);

  return (
    <>
      <PageHero title={<>Blog & <span className="text-gradient">Articles</span></>} crumb="Blog" />

      <section className="blog-section section">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-main">
              {/* Featured Post */}
              {featured && matches.includes(featured) && (
                <BlogCard post={featured} featured />
              )}

              {/* Filter */}
              <div className="blog-filter">
                <div className="blog-search">
                  <i className="bx bx-search" />
                  <input type="text" placeholder="Search articles…" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="blog-cats">
                  {CATS.map((c) => (
                    <button className={`blog-cat-btn ${cat === c.id ? 'active' : ''}`} key={c.id} onClick={() => setCat(c.id)}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="blog-grid">
                {gridPosts.map((p, i) => (
                  <BlogCard post={p} key={p.id} />
                ))}
              </div>

              {gridPosts.length === 0 && (
                <div className="no-results">
                  <i className="bx bx-search-alt" />
                  <p>No articles found. Try a different search term.</p>
                </div>
              )}

              {/* Pagination */}
              <div className="blog-pagination">
                {[1, 2, 3].map((n) => (
                  <button className={`page-btn ${n === 1 ? 'active' : ''}`} key={n}>{n}</button>
                ))}
                <span className="page-ellipsis">…</span>
                <button className="page-btn">8</button>
                <button className="page-btn next">Next <i className="bx bx-chevron-right" /></button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget author-widget">
                <h3 className="widget-title">About Author</h3>
                <div className="author-card">
                  <div className="author-avatar-lg">AS</div>
                  <h4>Abu Saleh</h4>
                  <p>Full-Stack Developer & UI/UX Designer sharing insights on web development, design, and freelancing.</p>
                  <div className="author-social">
                    <a href="#" aria-label="Twitter"><i className="bx bxl-twitter" /></a>
                    <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin" /></a>
                    <a href="#" aria-label="GitHub"><i className="bx bxl-github" /></a>
                  </div>
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Search</h3>
                <div className="sidebar-search">
                  <input
                    type="text"
                    placeholder="Search articles…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setQuery(e.target.value); }}
                  />
                  <button aria-label="Search" onClick={() => setQuery(query)}><i className="bx bx-search" /></button>
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Popular Posts</h3>
                <div className="popular-posts">
                  {POPULAR_POSTS.map((p) => {
                    const post = posts.find((x) => x.slug === p.slug);
                    if (!post) return null;
                    return (
                      <Link to={`/blog/${post.slug}`} className="popular-post" key={post.slug}>
                        <div className="pp-img-placeholder"><i className={`bx ${post.cover_icon}`} /></div>
                        <div className="popular-post-info">
                          <h4>{p.title}</h4>
                          <span><i className="bx bx-calendar" /> {fmtDate(post.published_at)}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Categories</h3>
                <ul className="cat-list">
                  {SIDEBAR_CATS.map((c) => (
                    <li key={c.label}>
                      <a href="#">{c.label} <span>{c.count}</span></a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Popular Tags</h3>
                <div className="tag-cloud">
                  {TAGS.map((t) => <a href="#" key={t}>{t}</a>)}
                </div>
              </div>

              <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Newsletter</h3>
                <p>Get weekly articles on web dev, design, and career growth — no spam.</p>
                <form
                  className="sidebar-newsletter"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = e.currentTarget.querySelector('input').value;
                    if (!email) return;
                    showToast('success', 'Subscribed successfully!');
                    e.currentTarget.reset();
                  }}
                >
                  <input type="email" placeholder="your@email.com" required />
                  <button type="submit" className="btn btn-primary">Subscribe <i className="bx bx-envelope" /></button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
