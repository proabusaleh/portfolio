import { useState, useEffect } from 'react';
import { Clock, LogIn, Settings, Shield, MessageSquare, Activity, Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { getActivityLog } from '../../api/activityApi';
import { useAuthStore } from '../../store/authStore';

const ACTION_ICONS = {
  logged_in: { icon: LogIn, color: 'text-green-500 bg-green-50 dark:bg-green-500/10' },
  updated_profile: { icon: Pencil, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
  changed_password: { icon: Shield, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
  created: { icon: Plus, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
  updated: { icon: Pencil, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
  deleted: { icon: Trash2, color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  viewed: { icon: Eye, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' },
  replied: { icon: MessageSquare, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' },
  settings: { icon: Settings, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10' },
};

function getActionStyle(action) {
  if (!action) return ACTION_ICONS.updated;
  const key = Object.keys(ACTION_ICONS).find((k) => action.includes(k));
  return key ? ACTION_ICONS[key] : ACTION_ICONS.updated;
}

function formatAction(action) {
  if (!action) return 'Unknown action';
  return action
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ProfileActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      try {
        const data = await getActivityLog({ user_id: user?.id, pageSize: 20 });
        if (!cancelled) setActivities(data.data || data || []);
      } catch {
        if (!cancelled) setActivities([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, [user?.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-sm shadow-green-500/20">
            <Activity className="w-4 h-4 text-white" />
          </div>
          Recent Activity
        </h3>
        <p className="text-xs text-gray-500 mt-1 ml-10">Your recent actions and sign-in history</p>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Clock className="w-5 h-5 mr-2 animate-pulse" />
            <span className="text-sm">Loading activity...</span>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Activity className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm">No activity yet</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {activities.map((item, i) => {
              const style = getActionStyle(item.action);
              const Icon = style.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 p-3 mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${style.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{formatAction(item.action)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {item.module && <span className="capitalize">{item.module}</span>}
                      {item.target && <span> &middot; {item.target}</span>}
                      {item.details && <span> &middot; {item.details}</span>}
                    </p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5">{formatTime(item.created_at)}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
