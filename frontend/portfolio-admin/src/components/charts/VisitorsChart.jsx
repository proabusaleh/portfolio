import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { VISITORS_DATA } from '../../data/dashboardData';

export default function VisitorsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={VISITORS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="date"
          interval={2}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ stroke: '#c7d2fe', strokeDasharray: '3 3' }}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#visitorGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
