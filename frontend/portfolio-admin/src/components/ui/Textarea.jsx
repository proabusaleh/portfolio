import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(function Textarea(
  { label, error, hint, className, id, ...props },
  ref
) {
  const textareaId = id || props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-lg resize-none min-h-[80px]',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
});

export default Textarea;