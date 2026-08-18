import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Checkbox = forwardRef(function Checkbox(
  { label, className, id, checked, onChange, ...props },
  ref
) {
  const checkboxId = id || props.name;

  return (
    <label
      htmlFor={checkboxId}
      className={cn('inline-flex items-center gap-2 cursor-pointer select-none', className)}
    >
      <div className="relative flex items-center justify-center">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            'w-4 h-4 rounded border transition-all flex items-center justify-center',
            checked
              ? 'bg-indigo-500 border-indigo-500'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'
          )}
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
});

export default Checkbox;