import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ACTION_TYPES } from '../../data/activityData';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#8b5cf6', '#14b8a6', '#f59e0b', '#3b82f6', '#ec4899', '#f97316', '#06b6d4', '#a855f7', '#64748b'];

export default function ActionBreakdown({ actionCounts = {} }) {
  const data = Object.entries(actionCounts)
    .map(([action, count]) => ({
      name: ACTION_TYPES[action]?.label || action,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return <p className="text-sm text-gray-400 text-center py-8">No data</p>;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <h4 className="text-sm font-semibold mb-3">Action Breakdown</h4>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" iconSize={8} formatter={(val) => <span className="text-xs">{val}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
