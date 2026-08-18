import { Trophy } from 'lucide-react';

export default function UserActivityLeaderboard({ leaderboard = [] }) {
  if (leaderboard.length === 0) return <p className="text-sm text-gray-400 text-center py-4">No data</p>;

  const maxCount = leaderboard[0]?.count || 1;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-500" /> Top Contributors
      </h4>
      <div className="space-y-3">
        {leaderboard.map((u, i) => (
          <div key={u.userId} className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 w-4 text-center">{i + 1}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {u.name?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{u.name}</p>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${(u.count / maxCount) * 100}%` }} />
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500 shrink-0">{u.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
