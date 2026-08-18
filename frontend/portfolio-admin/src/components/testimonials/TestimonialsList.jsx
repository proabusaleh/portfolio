import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, ArrowUpDown, LayoutGrid, MessageSquare, Rows3 } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Tabs from '../../components/ui/Tabs';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import { ConfirmModal } from '../../components/ui/Modal';
import { cn } from '../../lib/utils';

import TestimonialCard from '../../components/testimonials/TestimonialCard';
import TestimonialQuoteCard from '../../components/testimonials/TestimonialQuoteCard';
import TestimonialMinimalCard from '../../components/testimonials/TestimonialMinimalCard';
import TestimonialFormModal from '../../components/testimonials/TestimonialFormModal';
import TestimonialStats from '../../components/testimonials/TestimonialStats';

import {
  getTestimonials, getCounts, deleteTestimonial,
  updateStatus, toggleFeatured,
} from '../../api/testimonialsApi';
import { useDebounce } from '../../hooks/useDebounce';
import { Sparkles, CheckCircle, Clock, XCircle } from 'lucide-react';

/* ── Layout modes ── */
const LAYOUTS = [
  { value: 'card',    label: 'Card',    icon: LayoutGrid },
  { value: 'quote',   label: 'Quote',   icon: MessageSquare },
  { value: 'minimal', label: 'Minimal', icon: Rows3 },
];

export default function TestimonialsList() {
  const [items, setItems]   = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const [status, setStatus]   = useState('');
  const [search, setSearch]   = useState('');
  const [sortBy, setSortBy]   = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [layout, setLayout]   = useState('card');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [list, cnt] = await Promise.all([
        getTestimonials({ status, search: debouncedSearch, sortBy, sortOrder }),
        getCounts(),
      ]);
      setItems(list);
      setCounts(cnt);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch, sortBy, sortOrder]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const handleEdit = (t) => {
    setEditing(t);
    setFormOpen(true);
  };
  const handleDelete = (t) => setDeleting(t);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteTestimonial(deleting.id);
      toast.success('Testimonial deleted');
      setDeleting(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleStatusUpdate = async (t, newStatus) => {
    try {
      await updateStatus(t.id, newStatus);
      toast.success(
        newStatus === 'approved'
          ? '✅ Approved'
          : newStatus === 'rejected'
            ? '❌ Rejected'
            : 'Status updated'
      );
      fetch();
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleToggleFeatured = async (t) => {
    if (t.status !== 'approved') {
      toast.error('Only approved testimonials can be featured');
      return;
    }
    try {
      await toggleFeatured(t.id);
      toast.success(t.featured ? 'Removed from featured' : 'Marked as featured ⭐');
      fetch();
    } catch {
      toast.error('Failed to update');
    }
  };

  const TABS = [
    { value: '',         label: 'All',       icon: Sparkles,     count: counts.all      },
    { value: 'approved', label: 'Approved',  icon: CheckCircle,  count: counts.approved },
    { value: 'pending',  label: 'Pending',   icon: Clock,        count: counts.pending  },
    { value: 'rejected', label: 'Rejected',  icon: XCircle,      count: counts.rejected },
  ];

  /* ── Render items based on layout ── */
  const renderItems = () => {
    if (loading) {
      return (
        <div className={cn(
          layout === 'minimal'
            ? 'space-y-3'
            : 'grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
        )}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className={layout === 'minimal' ? 'h-24 rounded-lg' : 'h-64 rounded-xl'}
            />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <EmptyState
          title="No testimonials found"
          description="Try adjusting filters or add a new testimonial."
          action={<Button icon={Plus} onClick={handleAdd}>Add Testimonial</Button>}
        />
      );
    }

    if (layout === 'card') {
      return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {items.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onApprove={(x) => handleStatusUpdate(x, 'approved')}
                onReject={(x) => handleStatusUpdate(x, 'rejected')}
                onToggleFeatured={handleToggleFeatured}
              />
            ))}
          </AnimatePresence>
        </div>
      );
    }

    if (layout === 'quote') {
      return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <AnimatePresence>
            {items.map((t) => (
              <TestimonialQuoteCard key={t.id} testimonial={t} />
            ))}
          </AnimatePresence>
        </div>
      );
    }

    // Minimal
    return (
      <div className="space-y-2">
        <AnimatePresence>
          {items.map((t) => (
            <TestimonialMinimalCard key={t.id} testimonial={t} />
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Manage client testimonials and reviews"
        actions={<Button icon={Plus} onClick={handleAdd}>Add Testimonial</Button>}
      />

      {/* Stats */}
      <TestimonialStats counts={counts} />

      <Card>
        <Tabs tabs={TABS} active={status} onChange={setStatus} />

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          <div className="flex-1 max-w-md">
            <Input
              icon={Search}
              placeholder="Search by name, company, or quote..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'date',   label: 'Date' },
                { value: 'rating', label: 'Rating' },
                { value: 'name',   label: 'Name' },
                { value: 'company',label: 'Company' },
              ]}
              placeholder=""
              className="w-32"
            />
            <button
              onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <ArrowUpDown className={cn('w-4 h-4 transition', sortOrder === 'asc' && 'rotate-180')} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />

            {/* Layout toggle */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 p-0.5 bg-gray-50 dark:bg-gray-900">
              {LAYOUTS.map((l) => {
                const Icon = l.icon;
                return (
                  <button
                    key={l.value}
                    onClick={() => setLayout(l.value)}
                    title={`${l.label} view`}
                    className={cn(
                      'p-1.5 rounded-md transition',
                      layout === l.value
                        ? 'bg-white dark:bg-gray-800 shadow-sm text-indigo-500'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {renderItems()}
        </div>
      </Card>

      <TestimonialFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        testimonial={editing}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete testimonial from ${deleting?.name}?`}
        description="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}