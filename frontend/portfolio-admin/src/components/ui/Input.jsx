import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(function Input(
  { label, error, icon: Icon, rightElement, className, id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2.5 text-sm rounded-lg transition-all',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            Icon && 'pl-10',
            rightElement && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
});

export default Input;