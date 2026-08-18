import { motion } from 'framer-motion';
import { Radio, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RealtimeIndicator({ active, onToggle, newCount = 0 }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
        active
          ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
          : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      <div className="relative">
        {active ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
            <Radio className="w-4 h-4 relative" />
          </>
        ) : (
          <Pause className="w-4 h-4" />
        )}
      </div>
      <span className="text-sm font-medium">
        {active ? 'Live' : 'Paused'}
      </span>
      {active && newCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500 text-white font-bold"
        >
          +{newCount}
        </motion.span>
      )}
    </button>
  );
}