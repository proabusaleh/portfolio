import { Star, MessageSquare, CheckCircle, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatNumber } from '../../lib/utils';

export default function TestimonialStats({ counts }) {
  const STATS = [
    {
      icon: MessageSquare,
      label: 'Total',
      value: counts.all || 0,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: counts.approved || 0,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: counts.pending || 0,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Award,
      label: 'Featured',
      value: counts.featured || 0,
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Star,
      label: 'Avg. Rating',
      value: `${counts.avgRating || 0}/5`,
      color: 'from-amber-500 to-yellow-500',
      isRating: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden group hover:shadow-md transition-all"
        >
          {/* Decorative blob */}
          <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition bg-gradient-to-br ${stat.color}`} />

          <div className="relative">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${stat.color} mb-2`}>
              <stat.icon className={`w-4 h-4 ${stat.isRating ? 'fill-white' : ''}`} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-lg font-bold mt-0.5">
              {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}