import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  error,
  disabled,
  className,
  id,
  fullWidth,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('space-y-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          id={selectId}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm rounded-lg transition-all',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            !selected && 'text-gray-400 dark:text-gray-500'
          )}
        >
          <span className="truncate text-left">{selected ? selected.label : placeholder}</span>
          <ChevronDown
            className={cn('w-4 h-4 text-gray-400 shrink-0 transition-transform', open && 'rotate-180')}
          />
        </button>

        {open && (
          <ul className="absolute z-30 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
            {options.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No options</li>
            )}
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    opt.value === value && 'text-indigo-600 dark:text-indigo-400 font-medium',
                    opt.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {opt.label}
                  {opt.value === value && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
