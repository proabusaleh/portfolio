import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function TemplateCard({ template, active, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(template.id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative p-5 rounded-xl border-2 text-left transition-all w-full',
        active
          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-500/10 dark:to-indigo-500/5 shadow-md shadow-indigo-500/10'
          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-sm'
      )}
    >
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm"
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </motion.div>
      )}

      {/* Template preview */}
      <div className={cn(
        'w-full h-24 rounded-lg mb-4 flex items-center justify-center transition-colors',
        active
          ? 'bg-indigo-100 dark:bg-indigo-500/10'
          : 'bg-gray-100 dark:bg-gray-800'
      )}>
        <div className={cn(
          'w-12 h-16 rounded-lg border shadow-sm',
          active
            ? 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-900'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
        )}>
          <div className="h-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
            <div className={cn('h-1 m-1 rounded-full', active ? 'bg-indigo-400' : 'bg-gray-300 dark:bg-gray-600')} />
          </div>
          <div className="p-1 space-y-0.5">
            <div className={cn('h-0.5 rounded-full w-full', active ? 'bg-indigo-300 dark:bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600')} />
            <div className={cn('h-0.5 rounded-full w-3/4', active ? 'bg-indigo-200 dark:bg-indigo-700' : 'bg-gray-200 dark:bg-gray-700')} />
            <div className={cn('h-0.5 rounded-full w-5/6', active ? 'bg-indigo-200 dark:bg-indigo-700' : 'bg-gray-200 dark:bg-gray-700')} />
            <div className={cn('h-0.5 rounded-full w-2/3', active ? 'bg-indigo-200 dark:bg-indigo-700' : 'bg-gray-200 dark:bg-gray-700')} />
          </div>
        </div>
      </div>

      <p className={cn(
        'text-sm font-semibold',
        active
          ? 'text-indigo-700 dark:text-indigo-300'
          : 'text-gray-900 dark:text-gray-100'
      )}>
        {template.label}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {template.description}
      </p>
    </motion.button>
  );
}
