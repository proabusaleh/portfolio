import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
      {[
        { value: 'list', icon: List },
        { value: 'grid', icon: LayoutGrid },
      ].map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            'p-1.5 rounded-md transition-all',
            view === value
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          )}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
