import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ColorSwatch({ label, value, onChange, presets = [] }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1.5">{label}</label>}

      <div className="flex items-center gap-2">
        {/* Color input */}
        <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <div className="w-full h-full" style={{ backgroundColor: value }} />
        </div>

        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-2 text-sm font-mono rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          placeholder="#000000"
        />

        {/* Presets */}
        {presets.length > 0 && (
          <div className="flex gap-1 ml-1">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onChange(p)}
                className={cn(
                  'w-7 h-7 rounded-md transition-transform hover:scale-110 relative',
                  value.toLowerCase() === p.toLowerCase() && 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900'
                )}
                style={{ backgroundColor: p }}
              >
                {value.toLowerCase() === p.toLowerCase() && (
                  <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}