import { cn } from '../../lib/utils';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800',
        'shadow-sm',
        hover && 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, action }) {
  return (
    <div className={cn('flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800', className)}>
      <div className="min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('font-semibold text-base', className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={cn('text-xs text-gray-500 dark:text-gray-400 mt-0.5', className)}>{children}</p>;
}

export function CardBody({ children, className }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}