import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber } from '../../lib/utils';

export default function ActionBreakdown({ data }) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Action Breakdown</CardTitle>
        <CardDescription>Distribution of action types</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <div className="relative h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(v) => formatNumber(v)}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xl font-bold">{formatNumber(total)}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Actions</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {data.map((item, i) => {
            const percent = ((item.count / total) * 100).toFixed(1);
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between text-xs py-1"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="font-medium truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-500 tabular-nums">{formatNumber(item.count)}</span>
                  <span className="font-semibold tabular-nums w-10 text-right">{percent}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}