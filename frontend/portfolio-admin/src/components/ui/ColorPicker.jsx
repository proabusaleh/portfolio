import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const PRESET_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981',
  '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#ffffff', '#94a3b8', '#64748b', '#475569', '#1e293b',
  '#0f172a', '#000000',
];

const GRADIENT_PRESETS = [
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-cyan-500',
  'from-rose-500 to-pink-500',
];

export default function ColorPicker({ value, onChange, mode = 'solid', className }) {
  const [custom, setCustom] = useState(value || '#6366f1');

  if (mode === 'gradient') {
    return (
      <div className={cn('space-y-1.5', className)}>
        <label className="text-sm font-medium">Color</label>
        <div className="grid grid-cols-5 gap-2">
          {GRADIENT_PRESETS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange(g)}
              className={cn(
                'w-full h-8 rounded-lg bg-gradient-to-r transition-all',
                g,
                value === g ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
              )}
            />
          ))}
        </div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="from-color to-color"
          className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
        />
      </div>
    );
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-sm font-medium">Color</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); onChange(e.target.value); }}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#6366f1"
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setCustom(c); onChange(c); }}
            className={cn(
              'w-6 h-6 rounded-full border transition-all flex items-center justify-center',
              c === '#ffffff' || c === '#eab308' ? 'border-gray-300' : 'border-transparent',
              value === c && 'ring-2 ring-offset-1 ring-indigo-500 scale-110'
            )}
            style={{ backgroundColor: c }}
          >
            {value === c && <Check className="w-3 h-3 text-white drop-shadow" />}
          </button>
        ))}
      </div>
    </div>
  );
}
