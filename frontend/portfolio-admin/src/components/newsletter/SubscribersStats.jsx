import { Users, UserPlus, UserMinus, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { formatNumber, cn } from '../../lib/utils';

export default function SubscribersStats({ stats }) {
  if (!stats) return null;

  const CARDS = [
    {
      icon: Users,
      label: 'Total Subscribers',
      value: stats.total,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: UserPlus,
      label: 'Active',
      value: stats.active,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: TrendingUp,
      label: 'New This Month',
      value: stats.thisMonth,
      badge: `+${stats.growthRate}%`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: UserMinus,
      label: 'Unsubscribed',
      value: stats.unsubscribed + stats.bounced,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card hover className="p-5 relative overflow-hidden group">
            <div className={cn(
              'absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity',
              `bg-gradient-to-br ${c.color}`
            )} />
            <div className="relative">
              <div className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center text-white mb-3 bg-gradient-to-br',
                c.color
              )}>
                <c.icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {c.label}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{formatNumber(c.value)}</p>
                {c.badge && (
                  <span className="text-xs font-semibold text-green-500">
                    {c.badge}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}