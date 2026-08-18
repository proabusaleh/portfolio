import { motion } from 'framer-motion';
import { Send, Calendar, FileEdit, Eye, MousePointerClick, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import Badge from '../ui/Badge';
import Dropdown from '../ui/Dropdown';
import { timeAgo, formatDate, formatNumber, cn } from '../../lib/utils';

const STATUS_CONFIG = {
  sent:      { variant: 'success', label: 'Sent',      icon: Send     },
  scheduled: { variant: 'primary', label: 'Scheduled', icon: Calendar },
  draft:     { variant: 'warning', label: 'Draft',     icon: FileEdit },
};

export default function CampaignCard({ campaign: c, onEdit, onDelete, onDuplicate, _onView }) {
  const cfg = STATUS_CONFIG[c.status];
  const StatusIcon = cfg.icon;

  const openRate  = c.recipients ? ((c.opens  / c.recipients) * 100).toFixed(1) : 0;
  const clickRate = c.recipients ? ((c.clicks / c.recipients) * 100).toFixed(1) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        'rounded-xl border bg-white dark:bg-gray-900 hover:shadow-md transition',
        c.status === 'scheduled'
          ? 'border-indigo-300 dark:border-indigo-900/60'
          : 'border-gray-200 dark:border-gray-800'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
            cfg.variant === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400' :
            cfg.variant === 'primary' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' :
                                        'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400'
          )}>
            <StatusIcon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3
                onClick={() => onEdit?.(c)}
                className="font-semibold text-sm cursor-pointer hover:text-indigo-500 line-clamp-1 flex-1"
              >
                {c.subject}
              </h3>
              <Badge variant={cfg.variant} size="sm" dot>{cfg.label}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              {c.status === 'sent' && c.sentAt && (
                <span>Sent {timeAgo(c.sentAt)}</span>
              )}
              {c.status === 'scheduled' && c.sentAt && (
                <span className="text-indigo-500 font-medium">
                  {formatDate(c.sentAt)}
                </span>
              )}
              {c.status === 'draft' && <span>Draft</span>}
              {c.recipients > 0 && (
                <span>{formatNumber(c.recipients)} recipients</span>
              )}
            </div>
          </div>

          <Dropdown
            align="right"
            width="w-40"
            trigger={
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreVertical className="w-4 h-4" />
              </button>
            }
          >
            <div className="p-1">
              <MenuBtn icon={Edit}   label="Edit"      onClick={() => onEdit?.(c)} />
              <MenuBtn icon={Copy}   label="Duplicate" onClick={() => onDuplicate?.(c)} />
              <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
              <MenuBtn icon={Trash2} label="Delete"    danger onClick={() => onDelete?.(c)} />
            </div>
          </Dropdown>
        </div>

        {c.status === 'sent' && c.recipients > 0 && (
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Metric icon={Eye} label="Open rate" value={`${openRate}%`} count={c.opens} color="text-indigo-500" />
            <Metric icon={MousePointerClick} label="Click rate" value={`${clickRate}%`} count={c.clicks} color="text-emerald-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Metric({ icon: Icon, label, value, count, color }) {
  return (
    <div className="text-center">
      <Icon className={cn('w-4 h-4 mx-auto mb-1', color)} />
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
      {count !== undefined && (
        <p className="text-[10px] text-gray-400">({count})</p>
      )}
    </div>
  );
}

function MenuBtn({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left',
        danger && 'text-red-500'
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
