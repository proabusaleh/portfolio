import { Activity, Calendar, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { formatNumber, cn } from '../../lib/utils';

export default function ActivityStats({ stats }) {
  if (!stats) return null;

  const CARDS = [
    { icon: Activity, label: 'Total Actions',  value: stats.total, color: 'from-indigo-500 to-purple-500' },
    { icon: Zap,      label: 'Today',           value: stats.today, color: 'from-emerald-500 to-teal-500'  },
    { icon: Calendar, label: 'This Week',       value: stats.week,  color: 'from-blue-500 to-cyan-500'     },
    { icon: Users,    label: 'Active Users',    value: stats.users, color: 'from-orange-500 to-red-500'    },
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
              <p className="text-3xl font-bold mt-1">{formatNumber(c.value)}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}