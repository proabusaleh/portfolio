import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber } from '../../lib/utils';

const BROWSER_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#6b7280'];

export default function BrowserChart({ data = [] }) {
  const normalizedData = data.map((d, i) => ({
    name: d.name,
    value: d.value ?? d.visitors ?? 0,
    color: d.color ?? BROWSER_COLORS[i % BROWSER_COLORS.length],
  }));

  const max = Math.max(...normalizedData.map((d) => d.value), 0);
  const total = normalizedData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Browsers</CardTitle>
        <CardDescription>Most used browsers by your visitors</CardDescription>
      </CardHeader>

      <CardBody className="pt-2 space-y-3">
        {normalizedData.map((item, i) => {
          const barWidth = (item.value / max) * 100;
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{formatNumber(item.value)}</span>
                  <span className="font-semibold w-10 text-right tabular-nums">{percent}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
}