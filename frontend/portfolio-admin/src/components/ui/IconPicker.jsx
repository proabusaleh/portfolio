import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const COMMON_ICONS = [
  'bx-code-alt', 'bx-world', 'bx-data', 'bx-cloud', 'bx-server',
  'bx-mobile-alt', 'bx-palette', 'bx-trending-up', 'bx-bar-chart',
  'bx-shield', 'bx-cog', 'bx-bulb', 'bx-star', 'bx-heart',
  'bx-flag', 'bx-rocket', 'bx-globe', 'bx-lock', 'bx-link',
  'bx-image', 'bx-music', 'bx-video', 'bx-file', 'bx-folder',
  'bx-check-circle', 'bx-error', 'bx-info-circle', 'bx-message',
  'bx-phone', 'bx-envelope', 'bx-map', 'bx-time', 'bx-calculator',
  'bx-dollar', 'bx-cart', 'bx-package', 'bx-truck', 'bx-store',
  'bx-search', 'bx-edit', 'bx-trash', 'bx-plus', 'bx-minus',
  'bx-upload', 'bx-download', 'bx-refresh', 'bx-send', 'bx-printer',
  'bx-laptop', 'bx-desktop', 'bx-tablet', 'bx-chip',
  'bx-food', 'bx-diamond', 'bx-sun', 'bx-moon', 'bx-fire',
  'bx-database', 'bx-network', 'bx-sitemap', 'bx-terminal',
  'bx-git-branch', 'bx-pull-request', 'bx-label', 'bx-bookmark',
  'bx-copy', 'bx-archive', 'bx-briefcase', 'bx-bot',
  'bx-user', 'bx-group', 'bx-dots-vertical-rounded',
  'bxl-wordpress', 'bxl-react', 'bxl-nodejs',
  'bxl-flutter', 'bxl-php', 'bxl-javascript', 'bxl-html5',
  'bxl-css3', 'bxl-git', 'bxl-figma', 'bxl-tailwind-css',
  'bxl-firebase', 'bxl-python', 'bxl-typescript', 'bxl-docker',
];

function PickerContent({ search, setSearch, filtered, onSelect, current, onClose }) {
  return (
    <>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Choose Icon</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>
      <div className="p-4 max-h-72 overflow-y-auto">
        <div className="grid grid-cols-8 gap-2">
          {filtered.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => { onSelect(icon); onClose(); }}
              className={cn(
                'p-2 rounded-lg text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center',
                current === icon && 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500'
              )}
              title={icon}
            >
              <i className={icon} />
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No icons found</p>
        )}
      </div>
    </>
  );
}

/**
 * Supports two modes:
 * 1. Inline: <IconPicker value="..." onChange={fn} className="..." />
 * 2. Modal:  <IconPicker isOpen onClose current="..." onSelect={fn} />
 */
export default function IconPicker({ value, onChange, isOpen: externalOpen, onClose: externalOnClose, current, onSelect, className }) {
  const isModal = typeof externalOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const open = isModal ? externalOpen : internalOpen;
  const selectedIcon = isModal ? current : value;
  const handleSelect = isModal ? onSelect : onChange;

  const filtered = useMemo(() => {
    if (!search) return COMMON_ICONS;
    const q = search.toLowerCase();
    return COMMON_ICONS.filter((i) => i.toLowerCase().includes(q));
  }, [search]);

  const handleClose = () => {
    setSearch('');
    if (isModal) externalOnClose?.();
    else setInternalOpen(false);
  };

  // Modal mode (no trigger, just the overlay)
  if (isModal) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg pointer-events-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
              >
                <PickerContent
                  search={search}
                  setSearch={setSearch}
                  filtered={filtered}
                  onSelect={handleSelect}
                  current={selectedIcon}
                  onClose={handleClose}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Inline mode (trigger button + modal)
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-sm font-medium">Icon</label>
      <button
        type="button"
        onClick={() => setInternalOpen(true)}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition',
          'bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        )}
      >
        {value ? (
          <i className={cn(value, 'text-lg text-indigo-500')} />
        ) : (
          <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-800" />
        )}
        <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 text-left">
          {value || 'Select an icon...'}
        </span>
        {value && (
          <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); }} className="text-gray-400 hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg pointer-events-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
              >
                <PickerContent
                  search={search}
                  setSearch={setSearch}
                  filtered={filtered}
                  onSelect={handleSelect}
                  current={selectedIcon}
                  onClose={handleClose}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
