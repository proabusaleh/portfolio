import { Users, Eye, MousePointerClick, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '../ui/Card';
import { formatNumber } from '../../lib/utils';

const STATS = [
  { key: 'visitors', label: 'Visitors',  icon: Users,            color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { key: 'sessions', label: 'Sessions',  icon: MousePointerClick, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { key: 'pageviews', label: 'Pageviews', icon: Eye,              color: 'text-pink-500',   bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { key: 'avgSession', label: 'Avg Session', icon: Timer,         color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function AnalyticsStats({ overview, summary }) {
  const stats = overview || summary || {};
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        const value = stats[stat.key];
        const formatted = stat.key === 'avgSession' ? (value || '0:00') : formatNumber(value || 0);

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold tabular-nums">{formatted}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
