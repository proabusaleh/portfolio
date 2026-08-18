import { useMemo } from 'react';

export default function ActivityHeatmap({ heatmap = {} }) {
  const weeks = useMemo(() => {
    const result = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 83);
    start.setDate(start.getDate() - start.getDay());

    let currentWeek = [];
    const d = new Date(start);
    while (d <= today) {
      const key = d.toISOString().split('T')[0];
      const count = heatmap[key] || 0;
      currentWeek.push({ date: key, count, dayOfWeek: d.getDay() });
      if (d.getDay() === 6) {
        result.push(currentWeek);
        currentWeek = [];
      }
      d.setDate(d.getDate() + 1);
    }
    if (currentWeek.length) result.push(currentWeek);
    return result;
  }, [heatmap]);

  const maxCount = Math.max(...Object.values(heatmap), 1);

  const getLevel = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    const ratio = count / maxCount;
    if (ratio < 0.25) return 'bg-green-200 dark:bg-green-900/40';
    if (ratio < 0.5) return 'bg-green-300 dark:bg-green-700/60';
    if (ratio < 0.75) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <h4 className="text-sm font-semibold mb-3">Activity Heatmap</h4>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {[0, 1, 2, 3, 4, 5, 6].map((di) => {
                const cell = week.find((c) => c.dayOfWeek === di);
                if (!cell) return <div key={di} className="w-[14px] h-[14px]" />;
                return (
                  <div
                    key={di}
                    className={`w-[14px] h-[14px] rounded-[3px] ${getLevel(cell.count)} transition`}
                    title={`${cell.date}: ${cell.count} events`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400">
          <span>Less</span>
          <div className="w-[14px] h-[14px] rounded-[3px] bg-gray-100 dark:bg-gray-800" />
          <div className="w-[14px] h-[14px] rounded-[3px] bg-green-200 dark:bg-green-900/40" />
          <div className="w-[14px] h-[14px] rounded-[3px] bg-green-300 dark:bg-green-700/60" />
          <div className="w-[14px] h-[14px] rounded-[3px] bg-green-400 dark:bg-green-600" />
          <div className="w-[14px] h-[14px] rounded-[3px] bg-green-500" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
