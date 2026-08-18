import { cn } from '../../lib/utils';

const variants = {
  default:   'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  primary:   'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  success:   'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  warning:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  danger:    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  gradient:  'bg-gradient-primary text-white',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
  dot = false,
}) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}