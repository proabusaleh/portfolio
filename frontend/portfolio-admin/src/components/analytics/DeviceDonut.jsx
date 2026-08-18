import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber } from '../../lib/utils';

const ICON_MAP = { Monitor, Smartphone, Tablet };

export default function DeviceDonut({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Devices</CardTitle>
        <CardDescription>Visitor breakdown by device type</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
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
            <p className="text-lg font-bold">{formatNumber(total)}</p>
            <p className="text-[10px] text-gray-500">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {data.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />}
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{formatNumber(item.value)}</span>
                  <span className="font-semibold tabular-nums w-10 text-right">{percent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}