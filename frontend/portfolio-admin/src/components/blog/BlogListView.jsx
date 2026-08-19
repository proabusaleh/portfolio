import { Eye, Heart, MessageCircle, Clock, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Checkbox from '../ui/Checkbox';
import { formatNumber, formatDate } from '../../lib/utils';

const STATUS_VARIANT = {
  published: 'success',
  draft:     'warning',
  scheduled: 'primary',
};

export default function BlogListView({ post, selected, onSelect, onEdit, onView, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition group"
    >
      <Checkbox checked={selected} onChange={onSelect} />

      {/* Cover */}
      <button
        onClick={() => onView ? onView(post.id) : onEdit(post.id)}
        className="shrink-0"
      >
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-800 hover:opacity-80 transition"
          loading="lazy"
        />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <button
          onClick={() => onView ? onView(post.id) : onEdit(post.id)}
          className="font-semibold text-sm text-left hover:text-indigo-500 transition line-clamp-1"
        >
          {post.title}
        </button>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant={STATUS_VARIANT[post.status]} dot size="sm">
            {post.status}
          </Badge>
          <Badge variant="default" size="sm">{post.category}</Badge>
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.read_time} min read
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-3 text-xs text-gray-500 shrink-0">
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(post.views)}</span>
        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(post.likes)}</span>
        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments}</span>
      </div>

      {/* Date */}
      <div className="hidden sm:block text-xs text-gray-500 shrink-0 w-24 text-right">
        {post.published_at
          ? formatDate(post.published_at)
          : post.scheduled_at
            ? formatDate(post.scheduled_at)
            : '—'}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
        <button
          onClick={() => onEdit(post.id)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          title="Edit"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
