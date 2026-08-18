import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { NOTIFICATION_TYPES } from '../../data/notificationsData';

export default function NotificationFilters({ active, onChange, counts = {}, showUnreadOnly, onToggleUnread }) {
  const CHIPS = [
    { value: '', label: 'All', count: counts.all },
    ...NOTIFICATION_TYPES.map((t) => ({
      value: t.value,
      label: t.label,
      count: counts[t.value] || 0,
      color: t.color,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Unread toggle */}
      <motion.button
        onClick={onToggleUnread}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition',
          showUnreadOnly
            ? 'bg-indigo-500 text-white shadow-md'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        )}
      >
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          showUnreadOnly ? 'bg-white' : 'bg-indigo-500'
        )} />
        Unread {counts.unread > 0 && `(${counts.unread})`}
      </motion.button>

      <span className="text-gray-300 dark:text-gray-700">|</span>

      {CHIPS.map((c) => {
        const isActive = active === c.value;
        return (
          <button
            key={c.value || 'all'}
            onClick={() => onChange(c.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition',
              isActive
                ? c.color
                  ? `text-white shadow-md bg-gradient-to-r ${c.color}`
                  : 'bg-gradient-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {c.label}
            {c.count > 0 && (
              <span className={cn(
                'text-[10px] px-1 rounded-full',
                isActive ? 'bg-white/20 text-white' : 'text-gray-500'
              )}>
                {c.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}