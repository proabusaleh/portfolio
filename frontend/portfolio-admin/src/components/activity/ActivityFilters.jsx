import { Search, X } from 'lucide-react';
import Select from '../ui/Select';
import { ACTION_TYPES, RESOURCE_TYPES } from '../../data/activityData';

const ACTION_OPTIONS = [
  { value: '', label: 'All Actions' },
  ...Object.entries(ACTION_TYPES).map(([value, { label }]) => ({ value, label })),
];

const RESOURCE_OPTIONS = RESOURCE_TYPES.map((r) => ({ value: r === 'All' ? '' : r, label: r }));

export default function ActivityFilters({ filters, onChange }) {
  const update = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search activity..."
          value={filters.search || ''}
          onChange={(e) => update('search', e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {filters.search && (
          <button onClick={() => update('search', '')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>
      <Select value={filters.action || ''} onChange={(val) => update('action', val)} options={ACTION_OPTIONS} className="w-40" />
      <Select value={filters.resource || ''} onChange={(val) => update('resource', val)} options={RESOURCE_OPTIONS} className="w-36" />
    </div>
  );
}
