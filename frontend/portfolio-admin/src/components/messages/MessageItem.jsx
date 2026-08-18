import { Star } from 'lucide-react';
import { cn, timeAgo } from '../../lib/utils';

export default function MessageItem({ message, isActive, onClick }) {
  const { name, subject, message: body, created_at, unread, starred, labels } = message;
  const read = !unread;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-3.5 border-b border-gray-100 dark:border-gray-800/50 transition-all',
        'hover:bg-gray-50 dark:hover:bg-gray-800/30',
        isActive && 'bg-indigo-50 dark:bg-indigo-950/20 border-l-2 border-l-indigo-500',
        !read && !isActive && 'bg-white dark:bg-gray-900'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold',
            read
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
          )}
        >
          {name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className={cn('text-sm truncate', !read ? 'font-semibold' : 'font-medium')}>
              {name}
            </span>
            <span className="text-[11px] text-gray-400 shrink-0">{timeAgo(created_at)}</span>
          </div>

          <p className={cn(
            'text-sm truncate',
            !read ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
          )}>
            {subject}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {body}
          </p>

          <div className="flex items-center gap-2 mt-1.5">
            {(labels || []).slice(0, 2).map((label) => (
              <span
                key={label}
                className={cn(
                  'text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                  label === 'urgent'
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : label === 'budget-high'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : label === 'budget-low'
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                )}
              >
                {label}
              </span>
            ))}
            <div className="flex-1" />
            {message.replied && (
              <span className="text-[10px] text-indigo-500 font-medium">Replied</span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            message._onToggleStar?.();
          }}
          className={cn(
            'p-1 rounded-md transition shrink-0 mt-0.5',
            starred
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
          )}
        >
          <Star className="w-4 h-4" fill={starred ? 'currentColor' : 'none'} />
        </button>
      </div>
    </button>
  );
}
