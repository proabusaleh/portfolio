import { useEffect } from 'react';
import { Bell, CheckCheck, Settings as SettingsIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Dropdown from '../ui/Dropdown';
import Badge from '../ui/Badge';
import NotificationItem from './NotificationItem';
import EmptyNotifications from './EmptyNotifications';
import { useNotificationsStore } from '../../store/notificationsStore';

export default function NotificationDropdown() {
  const list         = useNotificationsStore((s) => s.list);
  const unreadCount  = useNotificationsStore((s) => s.unreadCount);
  const fetch        = useNotificationsStore((s) => s.fetch);
  const markAllRead  = useNotificationsStore((s) => s.markAllRead);

  useEffect(() => {
    fetch({ limit: 8 });
  }, [fetch]);

  const preview = list.slice(0, 6);

  return (
    <Dropdown
      align="right"
      width="w-96"
      trigger={
        <button
          className="relative p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Notifications"
        >
          <motion.div
            animate={unreadCount > 0 ? { rotate: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.6, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 4 }}
          >
            <Bell className="w-5 h-5" />
          </motion.div>

          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && <Badge variant="danger" size="sm">{unreadCount} new</Badge>}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <Link
            to="/notifications"
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Preferences"
          >
            <SettingsIcon className="w-4 h-4 text-gray-500" />
          </Link>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto">
        {preview.length === 0 ? (
          <EmptyNotifications celebrating />
        ) : (
          <div className="p-2 space-y-1">
            <AnimatePresence>
              {preview.map((n) => (
                <NotificationItem key={n.id} notification={n} compact />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer */}
      <Link
        to="/notifications"
        className="flex items-center justify-center gap-1.5 p-3 border-t border-gray-200 dark:border-gray-800 text-sm font-medium text-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
      >
        View all notifications
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </Dropdown>
  );
}