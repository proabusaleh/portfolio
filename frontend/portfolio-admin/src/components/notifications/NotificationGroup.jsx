import { format, isToday, isYesterday } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import NotificationItem from './NotificationItem';

function formatDayLabel(dateStr) {
  const date = new Date(dateStr);
  if (isToday(date))     return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEEE, MMMM d');
}

export function groupByDay(notifications) {
  const groups = {};
  notifications.forEach((n) => {
    const key = new Date(n.time).toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  return Object.entries(groups)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function NotificationGroup({ notifications, showActions = true }) {
  const groups = groupByDay(notifications);

  return (
    <div>
      {groups.map((g) => (
        <div key={g.date}>
          <div className="sticky top-0 z-10 px-3 py-1.5 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur border-y border-gray-200 dark:border-gray-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500" />
              {formatDayLabel(g.date)}
              <span className="text-gray-400 font-normal">· {g.items.length}</span>
            </p>
          </div>

          <div className="p-2 space-y-1">
            <AnimatePresence initial={false}>
              {g.items.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  showActions={showActions}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}