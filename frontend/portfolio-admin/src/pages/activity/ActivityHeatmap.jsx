import { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatDate, cn } from '../../lib/utils';

export default function ActivityHeatmap({ data }) {
  const [hovered, setHovered] = useState(null);

  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.count));

  const getIntensity = (count) => {
    if (count === 0) return 0;
    const ratio = count / max;
    if (ratio > 0.75) return 4;
    if (ratio > 0.5)  return 3;
    if (ratio > 0.25) return 2;
    return 1;
  };

  const colors = [
    'bg-gray-100 dark:bg-gray-800',                     // 0
    'bg-indigo-200 dark:bg-indigo-900/60',              // 1
    'bg-indigo-400 dark:bg-indigo-700',                 // 2
    'bg-indigo-500 dark:bg-indigo-500',                 // 3
    'bg-indigo-600 dark:bg-indigo-400',                 // 4
  ];

  // Group by week (7 columns)
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const totalActions = data.reduce((sum, d) => sum + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
        <CardDescription>
          {totalActions} actions across {activeDays} active days (last 90 days)
        </CardDescription>
      </CardHeader>

      <CardBody>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 shrink-0">
              {week.map((day, di) => {
                const intensity = getIntensity(day.count);
                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (wi * 7 + di) * 0.005 }}
                    onMouseEnter={() => setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      'w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125',
                      colors[intensity]
                    )}
                    title={`${day.date}: ${day.count} action${day.count !== 1 ? 's' : ''}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Hover info */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-xs"
          >
            <span className="font-semibold">{formatDate(hovered.date)}:</span>{' '}
            <span className="text-indigo-500 font-bold">
              {hovered.count} action{hovered.count !== 1 ? 's' : ''}
            </span>
          </motion.div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-0.5">
            {colors.map((c, i) => (
              <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />
            ))}
          </div>
          <span>More</span>
        </div>
      </CardBody>
    </Card>
  );
}