import { Eye, Heart, MessageCircle, Clock, Edit, MoreVertical, Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Dropdown from '../ui/Dropdown';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import { formatNumber, formatDate } from '../../lib/utils';

const STATUS_VARIANT = {
  published: 'success',
  draft:     'warning',
  scheduled: 'primary',
};

export default function BlogCardView({ posts, loading, onEdit, onView, onDelete, onDuplicate }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyState title="No posts found" description="Try adjusting filters or create a new post." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
          className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-all"
        >
          {/* Cover image */}
          <div
            className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer"
            onClick={() => onView ? onView(post) : onEdit(post)}
          >
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-2 left-2">
              <Badge variant={STATUS_VARIANT[post.status]} dot>{post.status}</Badge>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
              <Dropdown
                align="right"
                width="w-40"
                trigger={
                  <button className="p-1.5 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-black/80">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                }
              >
                <div className="p-1">
                  {[
                    { label: 'Edit',      icon: Edit,   action: onEdit },
                    { label: 'Duplicate', icon: Copy,   action: onDuplicate },
                    { label: 'Delete',    icon: Trash2, action: onDelete, danger: true },
                  ].map((a) => {
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.label}
                        onClick={() => a.action(post)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left ${
                          a.danger ? 'text-red-500' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </Dropdown>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <Badge variant="default" size="sm">{post.category}</Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.read_time} min
              </span>
            </div>

            <button
              onClick={() => onView ? onView(post) : onEdit(post)}
              className="text-left font-semibold text-sm line-clamp-2 hover:text-indigo-500 transition"
            >
              {post.title}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(post.views)}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(post.likes)}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments}</span>
              </div>
              <span className="text-[11px] text-gray-400">
                {post.published_at
                  ? formatDate(post.published_at)
                  : post.scheduled_at
                    ? `📅 ${formatDate(post.scheduled_at)}`
                    : 'Draft'}
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}