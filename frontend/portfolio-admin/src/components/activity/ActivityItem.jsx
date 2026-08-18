import { timeAgo } from '../../lib/utils';
import { ACTION_TYPES } from '../../data/activityData';
import { LogIn, LogOut, Plus, Edit, Trash2, Send, Upload, UserPlus, Settings, Download, MessageCircle, FileDown } from 'lucide-react';

const ICON_MAP = { LogIn, LogOut, Plus, Edit, Trash2, Send, Upload, UserPlus, Settings, Download, MessageCircle, FileDown };

export default function ActivityItem({ activity, users = [] }) {
  const a = activity;
  const type = ACTION_TYPES[a.action] || ACTION_TYPES.update;
  const IconComp = ICON_MAP[type.icon] || Edit;
  const user = users.find((u) => u.id === a.userId);

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`p-2 rounded-lg shrink-0 ${type.bg}`}>
        <IconComp className={`w-4 h-4 ${type.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{user?.name || 'System'}</span>
          <span className="text-xs text-gray-400 lowercase">{type.label}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">{a.resource}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 truncate">{a.detail}</p>
        <p className="text-[11px] text-gray-400 mt-1">{timeAgo(a.timestamp)}</p>
      </div>
    </div>
  );
}
