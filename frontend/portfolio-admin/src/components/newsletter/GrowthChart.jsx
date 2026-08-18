import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function GrowthChart({ data }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriber Growth</CardTitle>
        <CardDescription>Subscribers & unsubscribes over last 12 months</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="subG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="unsubG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '5px' }} iconType="circle" />
              <Area type="monotone" dataKey="subscribers"  name="New Subscribers" stroke="#10b981" strokeWidth={2.5} fill="url(#subG)" />
              <Area type="monotone" dataKey="unsubscribes" name="Unsubscribes"    stroke="#ef4444" strokeWidth={2.5} fill="url(#unsubG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}