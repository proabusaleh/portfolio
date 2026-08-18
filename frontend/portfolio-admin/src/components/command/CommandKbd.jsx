import { cn } from '../../lib/utils';

export default function CommandKbd({ children, className }) {
  return (
    <kbd className={cn(
      'inline-flex items-center justify-center px-1.5 min-w-[20px] h-5 rounded',
      'bg-gray-100 dark:bg-gray-800',
      'border border-gray-200 dark:border-gray-700',
      'text-[10px] font-mono font-semibold',
      'text-gray-600 dark:text-gray-400',
      'shadow-sm',
      className
    )}>
      {children}
    </kbd>
  );
}