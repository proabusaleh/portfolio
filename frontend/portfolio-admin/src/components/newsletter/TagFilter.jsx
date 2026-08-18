import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getAvailableTags } from '../../api/newsletterApi';

export default function TagFilter({ value, onChange }) {
  const tags = getAvailableTags();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-gray-500 uppercase mr-1">
        Filter by tag:
      </span>

      {value && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => onChange('')}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <X className="w-3 h-3" /> Clear
        </motion.button>
      )}

      {tags.map((tag) => {
        const selected = value === tag.value;
        return (
          <button
            key={tag.value}
            onClick={() => onChange(selected ? '' : tag.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
              selected
                ? 'bg-gradient-primary text-white shadow-md scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span className={cn('w-2 h-2 rounded-full', tag.color)} />
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}