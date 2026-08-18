import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { cn } from '../../lib/utils';

const STATUS_ICONS = {
  good:    { icon: CheckCircle,    color: 'text-green-500'  },
  warning: { icon: AlertTriangle,  color: 'text-yellow-500' },
  error:   { icon: XCircle,        color: 'text-red-500'    },
};

export default function SeoScore({ analysis }) {
  if (!analysis) return null;

  const { score, checks, good, total } = analysis;

  const scoreColor =
    score >= 80 ? 'from-green-500 to-emerald-500' :
    score >= 60 ? 'from-yellow-500 to-orange-500' :
                  'from-red-500 to-rose-500';

  const scoreLabel =
    score >= 80 ? 'Excellent' :
    score >= 60 ? 'Good' :
    score >= 40 ? 'Needs Work' :
                  'Poor';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-500" />
          SEO Score
        </CardTitle>
        <CardDescription>Analysis of your site's SEO health</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        {/* Circular score */}
        <div className="flex flex-col items-center py-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 327', pathLength: 0 }}
                animate={{ strokeDasharray: `${(score / 100) * 327} 327` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold"
              >
                {score}
              </motion.p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">/ 100</p>
            </div>
          </div>

          <div className={cn('mt-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r', scoreColor)}>
            {scoreLabel}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {good} of {total} checks passed
          </p>
        </div>

        {/* Checks list */}
        <div className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {checks.map((check, i) => {
            const { icon: Icon, color } = STATUS_ICONS[check.status];
            return (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.03 }}
                className="flex items-center gap-2 text-xs p-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                <Icon className={cn('w-4 h-4 shrink-0', color)} />
                <span className="font-medium flex-1 truncate">{check.label}</span>
                <span className="text-gray-500 truncate">{check.message}</span>
              </motion.div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}