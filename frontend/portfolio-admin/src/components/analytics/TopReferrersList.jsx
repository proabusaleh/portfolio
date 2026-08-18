import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber, cn } from '../../lib/utils';

export default function TopReferrersList({ data }) {
  const maxVisitors = Math.max(...data.map((r) => r.visitors));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Where your visitors come from</CardDescription>
      </CardHeader>

      <CardBody className="space-y-2">
        {data.map((ref, i) => {
          const barWidth = (ref.visitors / maxVisitors) * 100;
          return (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 transition cursor-pointer"
            >
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0',
                'bg-gradient-to-br', ref.color
              )}>
                {ref.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium truncate">{ref.name}</p>
                  <span className="text-xs text-gray-500 tabular-nums shrink-0">
                    {formatNumber(ref.visitors)}
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                    className={cn('h-full rounded-full bg-gradient-to-r', ref.color)}
                  />
                </div>
              </div>

              <span className="text-xs font-semibold w-10 text-right tabular-nums shrink-0">
                {ref.percent}%
              </span>
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
}