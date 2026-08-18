import { formatNumber } from '../../lib/utils';
import { cn } from '../../lib/utils';

export default function StorageBar({ used, total }) {
  const percent = total ? Math.min((used / total) * 100, 100) : 0;
  const isHigh = percent > 80;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold uppercase text-gray-500">Storage</h3>
        <span className={cn('text-xs font-medium', isHigh ? 'text-red-500' : 'text-gray-500')}>
          {formatNumber(used)} / {formatNumber(total)} B
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', isHigh ? 'bg-red-500' : 'bg-indigo-500')}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5">{Math.round(percent)}% used</p>
    </div>
  );
}
