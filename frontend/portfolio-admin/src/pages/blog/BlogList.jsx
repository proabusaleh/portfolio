import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Search, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import { ConfirmModal } from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';

import BlogListView from '../../components/blog/BlogListView';
import BlogCardView from '../../components/blog/BlogCardView';
import ViewToggle from '../../components/ui/ViewToggle';
import PostAnalytics from '../../components/blog/PostAnalytics';

import { getPosts, deletePost, deletePosts, getPostStats } from '../../api/blogApi';
import { useDebounce } from '../../hooks/useDebounce';
import { PATHS } from '../../router/routes';
import { cn } from '../../lib/utils';

export default function BlogList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pageSize: 10, total: 0, totalPages: 1 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(new Set());
  const [sortBy] = useState('created_at');
  const [sortDir] = useState('desc');

  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts({
        page, pageSize, search: debouncedSearch,
        category, status, sortBy, sortDir,
      });
      setPosts(res.data);
      setMeta({ total: res.total, page: res.page, pageSize: res.pageSize, totalPages: res.totalPages });
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch, category, status, sortBy, sortDir]);

  const fetchStats = useCallback(async () => {
    const s = await getPostStats();
    setStats(s);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      toast.success('Post deleted');
      setDeleteTarget(null);
      fetchPosts();
      fetchStats();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    try {
      await deletePosts([...selected]);
      toast.success(`${selected.size} post(s) deleted`);
      setSelected(new Set());
      fetchPosts();
      fetchStats();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const allSelected = posts.length > 0 && selected.size === posts.length;
  const toggleSelectAll = () => {
    setSelected(allSelected ? new Set() : new Set(posts.map((p) => p.id)));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        subtitle={`${meta.total} posts · ${stats?.totalViews?.toLocaleString() || 0} total views`}
        actions={
          <>
            <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => { fetchPosts(); fetchStats(); }}>
              Refresh
            </Button>
            <Button size="sm" icon={Plus} onClick={() => navigate(PATHS.BLOG_NEW)}>
              New Post
            </Button>
          </>
        }
      />

      {/* Analytics */}
      <PostAnalytics stats={stats} />

      {/* Filters + View Toggle */}
      <Card>
        <div className="p-4 space-y-3">
          {/* Search + controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className={cn(
                  'w-full pl-9 pr-3 py-2 text-sm rounded-lg',
                  'bg-gray-50 dark:bg-gray-800/50',
                  'border border-gray-200 dark:border-gray-700',
                  'placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500'
                )}
              />
            </div>

            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <ViewToggle view={view} onChange={setView} />
          </div>

          {/* Bulk actions */}
          {selected.size > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">{selected.size} selected</span>
              <Button variant="ghost" size="sm" icon={Trash2} onClick={handleBulkDelete} className="text-red-500">
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
                Clear
              </Button>
            </div>
          )}

          {/* Select all checkbox */}
          {view === 'list' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-500"
              />
              <span className="text-xs text-gray-500">Select all</span>
            </div>
          )}
        </div>

        {/* Posts */}
        {view === 'list' ? (
          <div>
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-16 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <EmptyState
                title="No posts found"
                description="Create your first blog post to get started."
                action={
                  <Button icon={Plus} onClick={() => navigate(PATHS.BLOG_NEW)}>
                    New Post
                  </Button>
                }
              />
            ) : (
              posts.map((post) => (
                <BlogListView
                  key={post.id}
                  post={post}
                  selected={selected.has(post.id)}
                    onSelect={(checked) => {
                      const next = new Set(selected);
                      if (checked) next.add(post.id); else next.delete(post.id);
                      setSelected(next);
                    }}
                    onEdit={(id) => navigate(`/blog/${id}/edit`)}
                    onDelete={(id) => setDeleteTarget(id)}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="p-4">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <EmptyState
                  title="No posts found"
                  description="Create your first blog post to get started."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <BlogCardView
                      key={post.id}
                      posts={[post]}
                      loading={false}
                      onEdit={(p) => navigate(`/blog/${p.id || post.id}/edit`)}
                      onDelete={(p) => setDeleteTarget(p.id || post.id)}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {meta.total > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={setPage}
            onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
          />
        )}
      </Card>

      {/* Delete confirm */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget)}
        title="Delete Post?"
        description="This action cannot be undone. All comments for this post will also be deleted."
        confirmText="Delete"
      />
    </div>
  );
}
