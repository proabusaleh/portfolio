import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Edit, Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Checkbox from '../ui/Checkbox';
import RowActions from '../tables/RowActions';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import { formatDate, timeAgo, cn } from '../../lib/utils';
import { getAvailableTags } from '../../api/newsletterApi';

const STATUS_CONFIG = {
  active:       { variant: 'success', label: 'Active' },
  unsubscribed: { variant: 'default', label: 'Unsubscribed' },
  bounced:      { variant: 'danger',  label: 'Bounced' },
};

export default function SubscribersTable({
  subscribers,
  loading,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onEdit,
  onDelete,
}) {
  const tags = getAvailableTags();
  const getTagColor = (v) => tags.find((t) => t.value === v)?.color || 'bg-gray-500';

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <EmptyState
        icon={Mail}
        title="No subscribers found"
        description="Try adjusting filters or add your first subscriber."
      />
    );
  }

  const allSelected = subscribers.every((s) => selectedIds.includes(s.id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <tr className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
            <th className="px-4 py-3 w-10">
              <Checkbox
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="text-left px-4 py-3">Subscriber</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3 hidden md:table-cell">Tags</th>
            <th className="text-left px-4 py-3 hidden lg:table-cell">Subscribed</th>
            <th className="text-left px-4 py-3 hidden lg:table-cell">Last Open</th>
            <th className="w-10 px-2"></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {subscribers.map((sub, i) => (
              <motion.tr
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.02 }}
                className={cn(
                  'border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition group',
                  selectedIds.includes(sub.id) && 'bg-indigo-50/40 dark:bg-indigo-950/20'
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(sub.id)}
                    onChange={(e) => onSelectRow(sub.id, e.target.checked)}
                  />
                </td>

                {/* Subscriber */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={sub.name} size="sm" />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{sub.name}</p>
                      <a href={`mailto:${sub.email}`} className="text-xs text-gray-500 hover:text-indigo-500 truncate block">
                        {sub.email}
                      </a>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <Badge variant={STATUS_CONFIG[sub.status].variant} dot>
                    {STATUS_CONFIG[sub.status].label}
                  </Badge>
                </td>

                {/* Tags */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {sub.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800"
                      >
                        <span className={cn('w-1.5 h-1.5 rounded-full', getTagColor(t))} />
                        {t}
                      </span>
                    ))}
                    {sub.tags.length > 3 && (
                      <span className="text-[10px] text-gray-400">+{sub.tags.length - 3}</span>
                    )}
                  </div>
                </td>

                {/* Dates */}
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                  {formatDate(sub.subscribedAt)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                  {sub.lastOpen ? timeAgo(sub.lastOpen) : (
                    <span className="text-gray-400 italic">Never</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-2 py-3 text-right">
                  <RowActions
                    item={sub}
                    actions={[
                      { label: 'Edit',   icon: Edit,   onClick: onEdit },
                      { divider: true },
                      { label: 'Delete', icon: Trash2, onClick: onDelete, danger: true },
                    ]}
                  />
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}