import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, MessageCircle, Star, UserPlus, Settings, Shield,
  Circle, X, ExternalLink,
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import { timeAgo, cn } from '../../lib/utils';
import { NOTIFICATION_TYPES } from '../../data/notificationsData';
import { useNotificationsStore } from '../../store/notificationsStore';

const ICONS = { MessageSquare, MessageCircle, Star, UserPlus, Settings, Shield };

export default function NotificationItem({ notification: n, compact = false, showActions = true }) {
  const navigate = useNavigate();
  const markRead = useNotificationsStore((s) => s.markRead);
  const remove   = useNotificationsStore((s) => s.remove);

  const type = NOTIFICATION_TYPES.find((t) => t.value === n.type) || NOTIFICATION_TYPES[0];
  const Icon = ICONS[type.icon] || MessageSquare;

  const handleClick = () => {
    if (!n.read) markRead(n.id);
    if (n.link) navigate(n.link);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onClick={handleClick}
      className={cn(
        'group relative flex gap-3 p-3 rounded-lg cursor-pointer transition-all',
        n.read
          ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          : 'bg-indigo-50/60 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/30',
        n.priority === 'high' && !n.read && 'ring-1 ring-red-200 dark:ring-red-900/50'
      )}
    >
      {/* Unread dot */}
      {!n.read && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-500 shrink-0"
        />
      )}

      {/* Avatar or icon */}
      <div className="shrink-0 relative">
        {n.actor?.avatar ? (
          <>
            <Avatar src={n.actor.avatar} name={n.actor.name} size={compact ? 'sm' : 'md'} />
            {/* Small type badge overlay */}
            <div className={cn(
              'absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm',
              type.bg
            )}>
              <Icon className={cn('w-2.5 h-2.5', type.text)} />
            </div>
          </>
        ) : (
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            type.bg
          )}>
            <Icon className={cn('w-4 h-4', type.text)} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <p className={cn(
          'text-sm leading-snug',
          n.read ? 'font-medium' : 'font-semibold'
        )}>
          {n.title}
        </p>

        {n.description && (
          <p className={cn(
            'text-xs text-gray-500 dark:text-gray-400 mt-0.5',
            compact ? 'line-clamp-1' : 'line-clamp-2'
          )}>
            {n.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <span className={cn(
            'text-[10px] uppercase font-bold px-1.5 py-0.5 rounded',
            type.bg, type.text
          )}>
            {type.label}
          </span>

          {n.priority === 'high' && (
            <span className="text-[10px] uppercase font-bold text-red-500">
              High priority
            </span>
          )}

          <span className="text-[11px] text-gray-400 ml-auto">
            {timeAgo(n.time)}
          </span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
          {n.link && (
            <div
              className="p-1 rounded hover:bg-white dark:hover:bg-gray-700 text-gray-400"
              title="Open"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              remove(n.id);
            }}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-gray-400 hover:text-red-500"
            title="Delete"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}