import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Send, LogIn, LogOut,
  UserPlus, Upload, Download, Database, Settings, Shield,
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { timeAgo, cn } from '../../lib/utils';
import { ACTION_TYPES } from '../../data/activityData';

const ICONS = { Plus, Edit, Trash2, Send, LogIn, LogOut, UserPlus, Upload, Download, Database, Settings, Shield };

export default function ActivityItem({ log, isNew = false, showTime = true }) {
  const action = ACTION_TYPES.find((a) => a.value === log.action) || ACTION_TYPES[0];
  const Icon = ICONS[action.icon] || Edit;

  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, scale: 0.95, y: -20 } : { opacity: 0, x: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative flex gap-3 p-3 rounded-lg transition-all',
        'hover:bg-gray-50 dark:hover:bg-gray-900/50',
        isNew && 'bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-800'
      )}
    >
      {/* New indicator */}
      {isNew && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -top-1 -right-1 z-10"
        >
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500 text-white font-bold uppercase">
            New
          </span>
        </motion.div>
      )}

      {/* Icon */}
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
        action.bg
      )}>
        <Icon className={cn('w-4 h-4', action.text)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {/* User */}
          {log.user?.isSystem ? (
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              🤖 System
            </span>
          ) : log.user ? (
            <div className="flex items-center gap-1.5">
              <Avatar src={log.user.avatar} name={log.user.name} size="xs" />
              <span className="text-sm font-semibold">{log.user.name}</span>
            </div>
          ) : null}

          {/* Action label */}
          <span className={cn('text-xs font-medium capitalize', action.text)}>
            {action.label}d
          </span>

          {/* Module badge */}
          <Badge variant="default" size="sm">
            {log.module}
          </Badge>

          {showTime && (
            <span className="text-[11px] text-gray-400 ml-auto shrink-0">
              {timeAgo(log.time)}
            </span>
          )}
        </div>

        {/* Target */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
          {log.target}
        </p>

        {/* Details */}
        {log.details && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {log.details}
          </p>
        )}

        {/* Meta */}
        {log.ip && (
          <p className="text-[10px] text-gray-400 font-mono mt-1 opacity-0 group-hover:opacity-100 transition">
            IP: {log.ip}
          </p>
        )}
      </div>
    </motion.div>
  );
}