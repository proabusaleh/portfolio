import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Tabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn('border-b border-gray-200 dark:border-gray-800', className)}>
      <div className="flex flex-wrap gap-0.5 px-5 pt-3">
        {tabs.map((tab) => {
          const isActive = active === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-xl transition-all duration-200',
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm shadow-indigo-500/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon && (
                  <tab.icon className={cn(
                    'w-4 h-4 transition-colors',
                    isActive
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-gray-400 dark:text-gray-500'
                  )} />
                )}
                {tab.label}
                {tab.count !== undefined && (
                  <span className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center',
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  )}>
                    {tab.count}
                  </span>
                )}
              </span>
              {isActive && (
                <motion.div
                  layoutId={`tab-underline-${tabs[0]?.value}`}
                  className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
