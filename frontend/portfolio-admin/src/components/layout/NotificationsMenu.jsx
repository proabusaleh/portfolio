import { Bell, MessageSquare, FolderKanban, Settings as SIcon, FileText } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import Badge from '../ui/Badge';
import { SAMPLE_NOTIFICATIONS } from '../../data/notifications';
import { timeAgo, cn } from '../../lib/utils';

const iconMap = {
  message: MessageSquare,
  project: FolderKanban,
  system:  SIcon,
  blog:    FileText,
};

export default function NotificationsMenu() {
  const notifications = SAMPLE_NOTIFICATIONS;
  const unreadCount   = notifications.filter((n) => !n.read).length;

  return (
    <Dropdown
      align="right"
      width="w-80"
      trigger={
        <button
          className="relative p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold">Notifications</h3>
        <Badge variant="primary">{unreadCount} new</Badge>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <button
              key={n.id}
              className={cn(
                'w-full flex gap-3 p-3 text-left transition',
                'hover:bg-gray-50 dark:hover:bg-gray-800/60',
                !n.read && 'bg-indigo-50/40 dark:bg-indigo-950/20'
              )}
            >
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                'bg-gradient-primary text-white'
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {n.description}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {timeAgo(n.time)}
                </p>
              </div>
              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          View all notifications
        </button>
      </div>
    </Dropdown>
  );
}