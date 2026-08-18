import { AnimatePresence } from 'framer-motion';
import { format, isToday, isYesterday } from 'date-fns';
import ActivityItem from './ActivityItem';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import { Activity } from 'lucide-react';

/**
 * Groups logs by day for sticky headers
 */
function groupByDay(logs) {
  const groups = {};
  logs.forEach((log) => {
    const dateKey = new Date(log.time).toDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(log);
  });
  return Object.entries(groups).map(([date, entries]) => ({
    date,
    entries,
  }));
}

function formatDayLabel(dateStr) {
  const date = new Date(dateStr);
  if (isToday(date))     return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEEE, MMMM d, yyyy');
}

export default function ActivityTimeline({ logs, loading, newLogIds = [] }) {
  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No activity found"
        description="Try adjusting your filters or wait for new actions."
      />
    );
  }

  const groups = groupByDay(logs);

  return (
    <div>
      {groups.map((group, _gi) => (
        <div key={group.date}>
          {/* Sticky day header */}
          <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur border-y border-gray-200 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500" />
              {formatDayLabel(group.date)}
              <span className="text-gray-400 font-normal">
                · {group.entries.length} {group.entries.length === 1 ? 'action' : 'actions'}
              </span>
            </p>
          </div>

          {/* Entries */}
          <div className="py-2 space-y-1">
            <AnimatePresence initial={false}>
              {group.entries.map((log) => (
                <ActivityItem
                  key={log.id}
                  log={log}
                  isNew={newLogIds.includes(log.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}