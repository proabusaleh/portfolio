import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function TagsInput({ label, value = [], onChange, placeholder = 'Add tag & press Enter', error, hint }) {
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const addTag = (tag) => {
    tag = tag.trim().toLowerCase();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput('');
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'flex flex-wrap gap-1.5 p-2 min-h-[42px] rounded-lg cursor-text',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500',
          error && 'border-red-500'
        )}
      >
        <AnimatePresence>
          {value.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-indigo-200 dark:hover:bg-indigo-900 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
        />
      </div>

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}