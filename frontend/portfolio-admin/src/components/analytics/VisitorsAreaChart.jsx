import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500 capitalize">{p.name}:</span>
          <span className="font-semibold">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

export default function VisitorsAreaChart({ data = [] }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  const chartData = data.map((d) => ({
    ...d,
    dateLabel: d.date,
    pageViews: d.pageViews ?? d.pageviews,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Overview</CardTitle>
        <CardDescription>Visitors, page views, and sessions over time</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="visitorsG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pageViewsG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sessionsG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="dateLabel" stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />

              <Area type="monotone" dataKey="visitors"  name="Visitors"   stroke="#6366f1" strokeWidth={2.5} fill="url(#visitorsG)"  />
              <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#pageViewsG)" />
              <Area type="monotone" dataKey="sessions"  name="Sessions"   stroke="#ec4899" strokeWidth={2.5} fill="url(#sessionsG)"  />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}