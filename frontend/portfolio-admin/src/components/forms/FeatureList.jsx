import { useState } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function FeatureList({ label, value = [], onChange, error, hint, max = 10 }) {
  const [newItem, setNewItem] = useState('');

  const items = value.map((v, i) => ({ id: `${i}-${v}`, text: v }));

  const addItem = () => {
    if (!newItem.trim()) return;
    if (value.length >= max) return;
    onChange([...value, newItem.trim()]);
    setNewItem('');
  };

  const removeItem = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleReorder = (newOrder) => {
    onChange(newOrder.map((i) => i.text));
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          <span className="text-xs text-gray-400">{value.length} / {max}</span>
        </div>
      )}

      {/* Add input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder="Add a feature..."
          className={cn(
            'flex-1 px-3 py-2 text-sm rounded-lg',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
            error && 'border-red-500'
          )}
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!newItem.trim() || value.length >= max}
          className="px-3 py-2 rounded-lg bg-gradient-primary text-white text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Items list (reorderable) */}
      {items.length > 0 && (
        <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-1.5">
          <AnimatePresence>
            {items.map((item, i) => (
              <Reorder.Item
                key={item.id}
                value={item}
                as={motion.div}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2 p-2 pr-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                <span className="text-xs text-gray-400 w-5">{i + 1}.</span>
                <span className="flex-1 text-sm">{item.text}</span>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}