import { cn } from '../../lib/utils';

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'starred', label: 'Starred' },
  { value: 'replied', label: 'Replied' },
];

export default function FilterTabs({ active, onChange, counts = {} }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        const count = tab.value === 'all' ? counts.total : counts[tab.value];

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
              isActive
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            {tab.label}
            {count > 0 && (
              <span
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-semibold rounded-full leading-none',
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
