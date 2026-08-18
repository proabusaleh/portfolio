import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

export default function SessionsChart({ data = [] }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  const chartData = data.map((d) => ({
    day: d.day ?? d.date,
    sessions: d.sessions ?? 0,
  }));

  const max = Math.max(...chartData.map((d) => d.sessions), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions by Day of Week</CardTitle>
        <CardDescription>Discover your peak traffic days</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="day" stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: isDark ? '#111827' : '#fff',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                cursor={{ fill: gridColor, fillOpacity: 0.5 }}
              />
              <Bar dataKey="sessions" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.sessions === max ? '#6366f1' : '#a5b4fc'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}