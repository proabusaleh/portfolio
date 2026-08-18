import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { timeAgo } from '../../lib/utils';
import RoleBadge from './RoleBadge';
import { getActivity } from '../../api/usersApi';
import { Plus, Edit, Trash2, Send, UserPlus, Upload, LogIn } from 'lucide-react';

const ICONS = { create: Plus, update: Edit, delete: Trash2, publish: Send, invite: UserPlus, upload: Upload, login: LogIn };
const COLORS = { create: 'text-green-500', update: 'text-blue-500', delete: 'text-red-500', publish: 'text-purple-500', invite: 'text-indigo-500', upload: 'text-teal-500', login: 'text-gray-500' };

export default function UserActivityDrawer({ user, isOpen, onClose }) {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (isOpen && user?.id) {
      getActivity(user.id).then(setActivity);
    } else {
      setActivity([]);
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 z-50 shadow-xl overflow-y-auto">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div>
            <h3 className="font-semibold text-sm">{user.name || user.email}</h3>
            <div className="flex items-center gap-2 mt-1">
              <RoleBadge role={user.role} />
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium capitalize">{user.status}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500">2FA</p>
              <p className="text-sm font-medium">{user.twoFactor ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm font-medium">{timeAgo(user.joinedAt)}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500">Last Active</p>
              <p className="text-sm font-medium">{user.lastLogin ? timeAgo(user.lastLogin) : 'Never'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Activity</h4>
            {activity.length === 0 ? (
              <p className="text-xs text-gray-400">No activity recorded</p>
            ) : (
              <div className="space-y-3">
                {activity.map((a) => {
                  const IconComp = ICONS[a.type] || Edit;
                  const color = COLORS[a.type] || 'text-gray-500';
                  return (
                    <div key={a.id} className="flex gap-3">
                      <div className={`mt-1 shrink-0 ${color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm">{a.action}</p>
                        {a.target && <p className="text-xs text-gray-500">{a.target}</p>}
                        <p className="text-[10px] text-gray-400 mt-0.5">{timeAgo(a.time)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
