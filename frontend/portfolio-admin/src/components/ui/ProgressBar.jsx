import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'from-indigo-500 to-purple-500',
  showLabel = true,
  size = 'md',
  animated = true,
  className,
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {value}%
          </span>
        </div>
      )}
      <div className={cn(
        'w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800',
        heights[size]
      )}>
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', color)}
        />
      </div>
    </div>
  );
}