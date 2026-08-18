import { X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { ACTION_TYPES, MODULES } from '../../data/activityData';
import { cn } from '../../lib/utils';

export default function ActivityFilters({
  filters, onChange, onClear, users = [], showAdvanced, onToggleAdvanced,
}) {
  const hasFilters = Object.values(filters).some((v) => v);

  return (
    <div className="space-y-3">
      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase mr-1 self-center">
          Quick:
        </span>

        {ACTION_TYPES.slice(0, 8).map((a) => {
          const active = filters.action === a.value;
          return (
            <button
              key={a.value}
              onClick={() => onChange('action', active ? '' : a.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                active
                  ? 'text-white shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
              style={active ? { backgroundColor: a.color } : {}}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full')} style={{ backgroundColor: active ? '#fff' : a.color }} />
              {a.label}
            </button>
          );
        })}

        <button
          onClick={onToggleAdvanced}
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition',
            showAdvanced
              ? 'bg-indigo-500 text-white'
              : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <Filter className="w-3 h-3" />
          {showAdvanced ? 'Hide' : 'More'}
        </button>

        {hasFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Advanced filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <Select
                value={filters.module}
                onChange={(e) => onChange('module', e.target.value)}
                options={MODULES.map((m) => ({ value: m, label: m }))}
                placeholder="All modules"
              />

              <Select
                value={filters.userId}
                onChange={(e) => onChange('userId', e.target.value)}
                options={users.map((u) => ({ value: u.id, label: u.name }))}
                placeholder="All users"
              />

              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onChange('dateFrom', e.target.value)}
                placeholder="From date"
              />

              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onChange('dateTo', e.target.value)}
                placeholder="To date"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}