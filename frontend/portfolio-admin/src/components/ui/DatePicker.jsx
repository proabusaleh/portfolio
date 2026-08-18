import { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import 'react-day-picker/dist/style.css';

export default function DatePicker({ label, value, onChange, error, hint }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('09:00');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setTime(format(d, 'HH:mm'));
    }
  }, [value]);

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleDateSelect = (date) => {
    if (!date) return;
    const [h, m] = time.split(':');
    date.setHours(Number(h), Number(m), 0, 0);
    onChange(date.toISOString());
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    if (value) {
      const d = new Date(value);
      const [h, m] = newTime.split(':');
      d.setHours(Number(h), Number(m), 0, 0);
      onChange(d.toISOString());
    }
  };

  const displayValue = value
    ? format(new Date(value), 'MMM dd, yyyy · HH:mm')
    : '';

  return (
    <div className="space-y-1.5" ref={wrapperRef}>
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'w-full px-3 py-2.5 text-sm rounded-lg text-left flex items-center gap-2',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/30',
            error && 'border-red-500'
          )}
        >
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className={displayValue ? '' : 'text-gray-400'}>
            {displayValue || 'Pick date & time'}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-3"
            >
              <DayPicker
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={handleDateSelect}
                fromDate={new Date()}
                classNames={{
                  months: 'text-sm',
                  caption: 'flex justify-between items-center mb-3',
                  caption_label: 'font-semibold',
                  nav_button: 'p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800',
                  head_cell: 'text-xs text-gray-500 font-medium',
                  cell: 'text-center p-0.5',
                  day: 'h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition',
                  day_selected: 'bg-gradient-primary text-white hover:opacity-90',
                  day_today: 'font-bold text-indigo-500',
                  day_disabled: 'text-gray-300 dark:text-gray-700 cursor-not-allowed',
                }}
              />

              {/* Time picker */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <label className="text-xs text-gray-500 shrink-0">Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm rounded border border-gray-200 dark:border-gray-800 bg-transparent focus:outline-none focus:border-indigo-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}