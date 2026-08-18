import { Activity, TrendingUp, Calendar, Users } from 'lucide-react';

export default function ActivityStats({ stats = {} }) {
  const cards = [
    { label: 'Total Events', value: stats.total || 0, icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { label: 'Today', value: stats.today || 0, icon: Calendar, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
    { label: 'This Week', value: stats.thisWeek || 0, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Active Users', value: Object.keys(stats.userCounts || {}).length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${c.bg}`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{c.value}</p>
              <p className="text-xs text-gray-500">{c.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
