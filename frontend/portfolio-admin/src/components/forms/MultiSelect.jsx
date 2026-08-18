import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MultiSelect({ label, options = [], value = [], onChange, error, hint }) {
  const toggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition',
                selected
                  ? 'bg-gradient-primary text-white border-transparent shadow-md'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {selected && <Check className="w-3 h-3" />}
              {opt.label}
            </button>
          );
        })}
      </div>

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}