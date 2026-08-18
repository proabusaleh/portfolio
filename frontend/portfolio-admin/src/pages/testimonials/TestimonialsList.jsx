import { useState, useEffect, useCallback } from 'react';
import { Plus, RefreshCw, LayoutGrid, List, Quote } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { ConfirmModal } from '../../components/ui/Modal';

import TestimonialCard from '../../components/testimonials/TestimonialCard';
import TestimonialQuoteCard from '../../components/testimonials/TestimonialQuoteCard';
import TestimonialMinimalCard from '../../components/testimonials/TestimonialMinimalCard';
import TestimonialFormModal from '../../components/testimonials/TestimonialFormModal';
import TestimonialStats from '../../components/testimonials/TestimonialStats';

import { getTestimonials, deleteTestimonial, getTestimonialStats } from '../../api/testimonialsApi';
import { useDebounce } from '../../hooks/useDebounce';
import { cn } from '../../lib/utils';

const VIEW_MODES = [
  { value: 'card', icon: LayoutGrid, label: 'Card' },
  { value: 'quote', icon: Quote, label: 'Quote' },
  { value: 'minimal', icon: List, label: 'Minimal' },
];

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [view, setView] = useState('card');

  const debouncedSearch = useDebounce(search, 300);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTestimonials({ search: debouncedSearch, rating: ratingFilter, featured: featuredFilter });
      setTestimonials(data);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, ratingFilter, featuredFilter]);

  const fetchStats = useCallback(async () => {
    const s = await getTestimonialStats();
    setStats(s);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteTestimonial(deleting.id);
      toast.success('Testimonial deleted');
      setDeleting(null);
      fetch();
      fetchStats();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const CardComponent = view === 'quote' ? TestimonialQuoteCard : view === 'minimal' ? TestimonialMinimalCard : TestimonialCard;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        subtitle={`${testimonials.length} testimonials · ${stats?.avgRating || 0} avg rating`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => { fetch(); fetchStats(); }}>Refresh</Button>
            <Button size="sm" icon={Plus} onClick={() => { setEditing(null); setFormOpen(true); }}>New Testimonial</Button>
          </div>
        }
      />

      {/* Stats */}
      <TestimonialStats counts={{
        all: stats?.total || 0,
        approved: stats?.total || 0,
        pending: 0,
        featured: stats?.featured || 0,
        avgRating: stats?.avgRating || 0,
      }} />

      {/* Filters */}
      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search testimonials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
            >
              <option value="">All Ratings</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
              ))}
            </select>

            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
            >
              <option value="">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>

            {/* View toggle */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              {VIEW_MODES.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setView(v.value)}
                  title={v.label}
                  className={cn(
                    'p-1.5 rounded-md transition',
                    view === v.value
                      ? 'bg-white dark:bg-gray-900 shadow-sm text-indigo-500'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  )}
                >
                  <v.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-4">
            <div className={cn(
              view === 'minimal' ? 'space-y-3' : 'grid gap-4',
              view === 'card' && 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
              view === 'quote' && 'grid-cols-1 md:grid-cols-2',
            )}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800 h-48" />
              ))}
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <EmptyState
            title="No testimonials yet"
            description="Collect testimonials from happy clients."
            action={<Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true); }}>New Testimonial</Button>}
          />
        ) : (
          <div className="p-4">
            <div className={cn(
              view === 'minimal' ? 'space-y-3' : 'grid gap-4',
              view === 'card' && 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
              view === 'quote' && 'grid-cols-1 md:grid-cols-2',
            )}>
              <AnimatePresence mode="popLayout">
                {testimonials.map((t) => (
                  <CardComponent
                    key={t.id}
                    testimonial={t}
                    onEdit={(item) => { setEditing(item); setFormOpen(true); }}
                    onDelete={(item) => setDeleting(item)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </Card>

      <TestimonialFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        testimonial={editing}
        onSuccess={() => { fetch(); fetchStats(); }}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleting?.name}"'s testimonial?`}
        description="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
