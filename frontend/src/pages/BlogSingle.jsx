import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { posts } from '../data/fallback.js';
import { useToast } from '../lib/Toast.jsx';

const fmtDateLong = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

function CodeBlock({ title, code }) {
  const showToast = useToast();
  return (
    <div className="bs-code-block">
      <div className="code-header">
        <span>{title}</span>
        <button
          className="copy-code-btn"
          onClick={() => {
            navigator.clipboard?.writeText(code).then(() => showToast('success', 'Code copied!'));
          }}
        >
          <i className="bx bx-copy" /> Copy
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function Callout({ type, strong, children }) {
  return (
    <div className={`bs-callout ${type}`}>
      <i className={`bx ${type === 'warning' ? 'bx-error-circle' : 'bx-info-circle'}`} />
      <div>
        <strong>{strong}</strong> {children}
      </div>
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div className="bs-stats-grid">
      {stats.map((s) => (
        <div className="bs-stat" key={s.label}>
          <span className="bs-stat-num">{s.num}</span>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Featured article (React performance) — full template content ─── */

const REACT_TIPS = [
  {
    id: 'tip1',
    label: 'React.memo & useMemo',
    body: (
      <>
        <p>
          Re-renders are the #1 performance killer in React apps. <code>React.memo</code> wraps a
          component and prevents it from re-rendering when its props haven't changed.{' '}
          <code>useMemo</code> memoizes expensive computations so they only recalculate when
          dependencies change.
        </p>
        <CodeBlock
          title="React.memo Example"
          code={`// Before — recalculates every render
const ExpensiveList = ({ items, filter }) => {
  const filtered = items.filter(item =>
    item.name.includes(filter)
  );
  return <ul>{filtered.map(...)}</ul>;
};

// After — memoized for performance
const ExpensiveList = React.memo(({ items, filter }) => {
  const filtered = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );
  return <ul>{filtered.map(...)}</ul>;
});`}
        />
        <Callout type="tip" strong="Pro Tip:">
          Don't blindly wrap everything in React.memo. Measure first — memoization has a cost too.
          Use it for components that render often with the same props.
        </Callout>
      </>
    ),
  },
  {
    id: 'tip2',
    label: 'Code Splitting',
    body: (
      <>
        <p>
          Code splitting divides your JavaScript bundle into smaller chunks loaded on demand. React
          provides <code>React.lazy</code> and <code>Suspense</code> for this purpose. Combined with
          dynamic imports, this can dramatically reduce your initial bundle size.
        </p>
        <CodeBlock
          title="React.lazy & Suspense"
          code={`import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() =>
  import('./pages/Dashboard')
);
const Analytics = lazy(() =>
  import('./pages/Analytics')
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard"
               element={<Dashboard />} />
        <Route path="/analytics"
               element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}`}
        />
      </>
    ),
  },
  {
    id: 'tip3',
    label: 'Virtual Scrolling',
    body: (
      <>
        <p>
          Rendering thousands of DOM elements simultaneously destroys performance. Virtual scrolling
          renders only items visible in the viewport. Libraries like <code>react-window</code> and{' '}
          <code>@tanstack/virtual</code> make this straightforward.
        </p>
        <StatsGrid
          stats={[
            { num: '90%', label: 'DOM reduction with 10K items' },
            { num: '60fps', label: 'Smooth scrolling maintained' },
            { num: '5ms', label: 'Average render time' },
          ]}
        />
      </>
    ),
  },
  {
    id: 'tip4',
    label: 'useCallback Hook',
    body: (
      <p>
        When you pass callback functions as props, they create new references on every render,
        causing child components to unnecessarily re-render even when wrapped in{' '}
        <code>React.memo</code>. <code>useCallback</code> returns a memoized version of the callback
        that only changes when dependencies change.
      </p>
    ),
  },
  {
    id: 'tip5',
    label: 'Avoid Anonymous Functions',
    body: (
      <>
        <p>
          Anonymous functions in JSX create new function instances on every render, breaking
          memoization. Extract them to stable references using <code>useCallback</code> or define
          them outside the component.
        </p>
        <Callout type="warning" strong="Common Mistake:">
          <code>onClick={() => handleClick(id)}</code> creates a new function every render. Use{' '}
          <code>useCallback</code> or pass pre-bound handlers instead.
        </Callout>
      </>
    ),
  },
  {
    id: 'tip6',
    label: 'Lazy Loading Images',
    body: (
      <p>
        Images are often the largest assets on a page. Use native lazy loading with{' '}
        <code>loading="lazy"</code>, <code>IntersectionObserver</code>, or libraries like{' '}
        <code>react-lazyload</code> to defer loading off-screen images. This alone can dramatically
        improve your LCP score.
      </p>
    ),
  },
  {
    id: 'tip7',
    label: 'State Management',
    body: (
      <p>
        Keep state as local as possible — global state causes entire component trees to re-render.
        Split large contexts into smaller, focused ones. Consider using <code>useReducer</code> for
        complex state logic and libraries like Zustand or Jotai for minimal global state overhead.
      </p>
    ),
  },
  {
    id: 'tip8',
    label: 'Web Workers',
    body: (
      <p>
        Move CPU-intensive work off the main thread using Web Workers. Data parsing, image
        processing, and complex calculations should never block the UI thread. The{' '}
        <code>comlink</code> library makes working with Web Workers in React extremely ergonomic.
      </p>
    ),
  },
  {
    id: 'tip9',
    label: 'Bundle Optimization',
    body: (
      <p>
        Analyze your bundle with tools like <code>webpack-bundle-analyzer</code> or Vite's{' '}
        <code>rollup-plugin-visualizer</code>. Common wins include replacing heavy libraries with
        lighter alternatives, using tree-shaking friendly imports, and setting up proper chunk
        splitting.
      </p>
    ),
  },
  {
    id: 'tip10',
    label: 'Concurrent Features',
    body: (
      <>
        <p>
          React 18 introduced game-changing concurrent features. <code>useTransition</code> lets you
          mark state updates as non-urgent, keeping the UI responsive.{' '}
          <code>useDeferredValue</code> defers updating non-critical parts of the UI. These features
          can make your app feel instantaneous.
        </p>
        <CodeBlock
          title="useTransition Example"
          code={`const [isPending, startTransition] = useTransition();
const [query, setQuery] = useState('');

const handleChange = (e) => {
  // Urgent: update input immediately
  setInputValue(e.target.value);

  // Non-urgent: defer the heavy filter
  startTransition(() => {
    setQuery(e.target.value);
  });
};`}
        />
      </>
    ),
  },
];

function FeaturedContent() {
  return (
    <>
      <p className="bs-lead" id="intro">
        Performance optimization is one of the most critical aspects of building production React
        applications. A slow app frustrates users and directly impacts your business metrics — every
        100ms delay in load time can reduce conversions by 1%. In this comprehensive guide, we'll
        cover <strong>10 battle-tested techniques</strong> that I've used across 50+ React projects
        to achieve consistently high performance scores.
      </p>
      <div className="bs-highlight-box">
        <i className="bx bx-bulb" />
        <p>
          <strong>Quick win:</strong> Before optimizing, always profile first using React DevTools
          Profiler and Chrome Performance tab. Premature optimization wastes time and can introduce
          bugs.
        </p>
      </div>
      {REACT_TIPS.map((t) => (
        <div key={t.id}>
          <h2 id={t.id}>{t.id.replace('tip', '')}. {t.label}</h2>
          {t.body}
        </div>
      ))}
      <h2 id="conclusion">Conclusion</h2>
      <p>
        Performance optimization is a continuous process, not a one-time task. Start by measuring —
        you can't optimize what you can't measure. Profile your app with React DevTools, Chrome
        Performance panel, and Lighthouse, then systematically apply these techniques where they'll
        have the most impact.
      </p>
      <p>
        The most important lesson: <strong>ship first, optimize second</strong>. A slow app that
        solves a real problem is infinitely better than a perfectly optimized app that never
        launches.
      </p>
    </>
  );
}

/* ─── Generic article body for the other posts ─── */

function GenericContent({ post }) {
  const sections = [
    {
      id: 'overview',
      label: 'Why It Matters',
      body: (
        <>
          <p>{post.excerpt}</p>
          <Callout type="tip" strong="Quick win:">
            Start small. Pick the single highest-impact change you can ship today, measure the
            before/after, and iterate from there.
          </Callout>
        </>
      ),
    },
    {
      id: 'practice',
      label: 'Best Practices',
      body: (
        <>
          <p>
            Whether you're working with {post.tags.slice(0, 3).join(', ')} or a completely
            different stack, the fundamentals stay the same: write readable code, keep components
            focused, and never optimize before measuring. Over time these habits compound into
            dramatically better results.
          </p>
          <CodeBlock
            title="A Clean Starting Pattern"
            code={`// Keep it simple, then optimize
function Widget({ data }) {
  const ready = useMemo(
    () => transform(data),
    [data]
  );
  return <section>{ready.map(renderItem)}</section>;
}`}
          />
          <p>
            Document your decisions as you go — future you (and your team) will thank you. Clear
            commit messages, inline comments for tricky logic, and a lightweight README go a long
            way toward maintainable code.
          </p>
        </>
      ),
    },
    {
      id: 'tools',
      label: 'Tools & Resources',
      body: (
        <>
          <StatsGrid
            stats={[
              { num: '90+', label: 'Lighthouse score target' },
              { num: '3', label: 'Core Web Vitals to track' },
              { num: '24h', label: 'Iterate & ship cadence' },
            ]}
          />
          <p>
            Invest in good tooling: a solid editor setup, automated linting and formatting, and a CI
            pipeline that runs your checks on every push. The friction you remove today is the
            velocity you gain tomorrow.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <p className="bs-lead" id="intro">
        {post.excerpt} This article distills the key ideas into practical, actionable guidance you
        can apply to your own projects — no fluff, just what works.
      </p>
      <div className="bs-highlight-box">
        <i className="bx bx-bulb" />
        <p>
          <strong>TL;DR:</strong> {post.excerpt.split('.').slice(0, 2).join('.')}.
        </p>
      </div>
      {sections.map((s) => (
        <div key={s.id}>
          <h2 id={s.id}>{s.label}</h2>
          {s.body}
        </div>
      ))}
      <h2 id="conclusion">Conclusion</h2>
      <p>
        The best developers are the ones who keep shipping and keep learning. Apply even a fraction
        of what's covered here and you'll notice real, measurable improvements in your work.
      </p>
      <p>
        If you found this useful, share it with a teammate — and if you have questions, drop them in
        the comments below. I read and reply to every single one.
      </p>
    </>
  );
}

export default function BlogSingle() {
  const { slug } = useParams();
  const showToast = useToast();
  const post = posts.find((p) => p.slug === slug);

  const [reactions, setReactions] = useState({ like: 312, love: 89, fire: 156, idea: 74 });
  const [clicked, setClicked] = useState({});
  const [comments, setComments] = useState([
    {
      initials: 'SK',
      name: 'Sarah K.',
      when: '2 days ago',
      text: 'Excellent article! The useMemo section saved me hours of debugging. My app went from 4 seconds to under 1 second just by properly memoizing the filtered list. Thank you!',
      likes: 14,
    },
    {
      initials: 'MC',
      name: 'Mark C.',
      when: '3 days ago',
      text: 'Great point about Web Workers! I implemented this for a data processing feature and the UI went from completely frozen to silky smooth. Virtual scrolling for the large lists is also a game-changer.',
      likes: 8,
    },
  ]);
  const [commentLikes, setCommentLikes] = useState({});

  if (!post) {
    return (
      <div className="container section" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <h2 style={{ marginBottom: 16 }}>Post not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/blog" className="btn btn-primary"><i className="bx bx-arrow-back" /> Back to Blog</Link>
      </div>
    );
  }

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[idx - 1] || null;
  const next = posts[idx + 1] || null;
  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).concat(
    posts.filter((p) => p.slug !== slug && p.category !== post.category)
  ).slice(0, 3);
  const isFeatured = post.slug === 'react-performance-optimization-techniques';

  const react = (r) => {
    setClicked((c) => ({ ...c, [r]: !c[r] }));
    setReactions((re) => ({ ...re, [r]: re[r] + (clicked[r] ? -1 : 1) }));
  };

  const share = (network) => {
    const url = window.location.href;
    if (network === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    if (network === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    if (network === 'copy') navigator.clipboard?.writeText(url).then(() => showToast('success', 'Link copied!'));
  };

  return (
    <>
      {/* HERO */}
      <div className="bs-hero">
        <div className="bs-hero-image">
          <div
            className="hero-bg"
            style={{ width: '100%', height: '100%', background: post.cover_gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className={`bx ${post.cover_icon}`} style={{ fontSize: '12rem', color: 'rgba(108,99,255,.12)' }} />
          </div>
          <div className="bs-hero-overlay" />
        </div>
        <div className="container bs-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <i className="bx bx-chevron-right" />
            <Link to="/blog">Blog</Link>
            <i className="bx bx-chevron-right" />
            <span className="active">{post.title}</span>
          </div>
          <div className="bs-category-badge">{post.category}</div>
          <h1 className="bs-title">{post.title}</h1>
          <div className="bs-meta">
            <div className="bs-author">
              <div className="author-avatar">{post.author_avatar}</div>
              <div>
                <strong>{post.author}</strong>
                <span>{post.author_role}</span>
              </div>
            </div>
            <div className="bs-meta-items">
              <span><i className="bx bx-calendar" /> {fmtDateLong(post.published_at)}</span>
              <span><i className="bx bx-time" /> {post.read_minutes} min read</span>
              <span><i className="bx bx-show" /> {post.views} views</span>
              <span><i className="bx bx-heart" /> {reactions.like} likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div className="container bs-container">
        <div className="bs-layout">
          <article className="bs-article">
            <div className="bs-toc">
              <h4><i className="bx bx-list-ul" /> Table of Contents</h4>
              <ol>
                <li><a href="#intro">Introduction</a></li>
                {isFeatured && (
                  <>
                    {REACT_TIPS.map((t, i) => (
                      <li key={t.id}><a href={`#${t.id}`}>{i + 1}. {t.label}</a></li>
                    ))}
                  </>
                )}
                {!isFeatured && (
                  <>
                    <li><a href="#overview">Why It Matters</a></li>
                    <li><a href="#practice">Best Practices</a></li>
                    <li><a href="#tools">Tools & Resources</a></li>
                  </>
                )}
                <li><a href="#conclusion">Conclusion</a></li>
              </ol>
            </div>

            <div className="bs-content">
              {isFeatured ? <FeaturedContent /> : <GenericContent post={post} />}

              {/* Tags */}
              <div className="bs-tags">
                {post.tags.map((t) => <span key={t}>{t}</span>)}
              </div>

              {/* Share */}
              <div className="bs-share">
                <h4>Share this article</h4>
                <div className="bs-share-btns">
                  <button className="bs-share-btn twitter" onClick={() => share('twitter')}><i className="bx bxl-twitter" /> Twitter</button>
                  <button className="bs-share-btn linkedin" onClick={() => share('linkedin')}><i className="bx bxl-linkedin" /> LinkedIn</button>
                  <button className="bs-share-btn copy" onClick={() => share('copy')}><i className="bx bx-link" /> Copy Link</button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bs-author-bio">
                <div className="author-avatar">{post.author_avatar}</div>
                <div className="bs-author-info">
                  <h4>{post.author}</h4>
                  <span>{post.author_role}</span>
                  <p>
                    I write about React, Node.js, UI/UX design, and career growth for developers.
                    5+ years building production apps for 30+ clients worldwide.
                  </p>
                  <div className="bs-author-links">
                    <a href="#" aria-label="Twitter"><i className="bx bxl-twitter" /></a>
                    <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin" /></a>
                    <a href="#" aria-label="GitHub"><i className="bx bxl-github" /></a>
                  </div>
                </div>
              </div>

              {/* Reactions */}
              <div className="bs-reactions">
                <h4>Was this article helpful?</h4>
                <div className="reaction-btns">
                  {[
                    { id: 'like', emoji: '👍', label: 'Like' },
                    { id: 'love', emoji: '❤️', label: 'Love' },
                    { id: 'fire', emoji: '🔥', label: 'Fire' },
                    { id: 'idea', emoji: '💡', label: 'Idea' },
                  ].map((r) => (
                    <button
                      className={`reaction-btn ${clicked[r.id] ? 'active' : ''}`}
                      key={r.id}
                      onClick={() => react(r.id)}
                    >
                      <span>{r.emoji}</span> <span className="reaction-count">{reactions[r.id]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="bs-comments">
                <h3 className="bs-comments-title">Comments ({comments.length})</h3>
                <div className="comment-list">
                  {comments.map((c, i) => (
                    <div className="comment" key={c.name + c.when}>
                      <div className="comment-avatar">{c.initials}</div>
                      <div className="comment-body">
                        <div className="comment-header">
                          <strong>{c.name}</strong>
                          <span>{c.when}</span>
                        </div>
                        <p>{c.text}</p>
                        <div className="comment-actions">
                          <button
                            className="comment-like-btn"
                            onClick={() => {
                              const cur = !!commentLikes[i];
                              setCommentLikes((cl) => ({ ...cl, [i]: !cur }));
                              setComments((all) => all.map((x, xi) => xi === i ? { ...x, likes: x.likes + (cur ? -1 : 1) } : x));
                            }}
                          >
                            <i className="bx bx-like" /> {c.likes}
                          </button>
                          <button><i className="bx bx-reply" /> Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="comment-form-wrap">
                  <h4>Leave a Comment</h4>
                  <form
                    className="comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const name = String(fd.get('name') || '').trim();
                      const text = String(fd.get('comment') || '').trim();
                      if (!name || !text) return;
                      setComments((all) => [...all, {
                        initials: name.split(' ').map((p) => p.charAt(0)).slice(0, 2).join('').toUpperCase(),
                        name,
                        when: 'Just now',
                        text,
                        likes: 0,
                      }]);
                      e.currentTarget.reset();
                      showToast('success', 'Comment posted!');
                    }}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder=" " required />
                        <label className="form-label">Your Name *</label>
                        <div className="form-focus-line" />
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder=" " required />
                        <label className="form-label">Email Address *</label>
                        <div className="form-focus-line" />
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea name="comment" className="form-control form-textarea" placeholder=" " required rows="4" />
                      <label className="form-label">Your Comment *</label>
                      <div className="form-focus-line" />
                    </div>
                    <button type="submit" className="btn btn-primary"><i className="bx bx-send" /> Post Comment</button>
                  </form>
                </div>
              </div>

              {/* Post Nav */}
              <div className="bs-post-nav">
                {prev ? (
                  <Link to={`/blog/${prev.slug}`} className="bs-nav-btn prev">
                    <i className="bx bx-arrow-back" />
                    <div>
                      <span>Previous Post</span>
                      <strong>{prev.title.split(':')[0].slice(0, 34)}{prev.title.length > 34 ? '…' : ''}</strong>
                    </div>
                  </Link>
                ) : <div className="bs-nav-btn prev" style={{ visibility: 'hidden' }} />}
                {next ? (
                  <Link to={`/blog/${next.slug}`} className="bs-nav-btn next">
                    <div>
                      <span>Next Post</span>
                      <strong>{next.title.split(':')[0].slice(0, 34)}{next.title.length > 34 ? '…' : ''}</strong>
                    </div>
                    <i className="bx bx-right-arrow-alt" />
                  </Link>
                ) : null}
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="bs-sidebar">
            <div className="sidebar-widget author-widget">
              <h3 className="widget-title">Author</h3>
              <div className="author-card">
                <div className="author-avatar">{post.author_avatar}</div>
                <h4>{post.author}</h4>
                <p>Full-Stack Developer sharing real-world insights on web development and design.</p>
                <div className="author-social">
                  <a href="#" aria-label="Twitter"><i className="bx bxl-twitter" /></a>
                  <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin" /></a>
                  <a href="#" aria-label="GitHub"><i className="bx bxl-github" /></a>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">Related Posts</h3>
              <div className="popular-posts">
                {related.map((p) => (
                  <Link to={`/blog/${p.slug}`} className="popular-post" key={p.slug}>
                    <div className="pp-placeholder"><i className={`bx ${p.cover_icon}`} /></div>
                    <div className="popular-post-info">
                      <h4>{p.title.split(':')[0].slice(0, 34)}{p.title.length > 34 ? '…' : ''}</h4>
                      <span><i className="bx bx-time" /> {p.read_minutes} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">Tags</h3>
              <div className="tag-cloud">
                {post.tags.concat(['Next.js', 'TypeScript', 'Web Dev']).map((t) => <a href="#" key={t}>{t}</a>)}
              </div>
            </div>

            <div className="sidebar-widget newsletter-widget">
              <h3 className="widget-title">Newsletter</h3>
              <p>Weekly articles on web dev and design. No spam, unsubscribe anytime.</p>
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
    </>
  );
}
