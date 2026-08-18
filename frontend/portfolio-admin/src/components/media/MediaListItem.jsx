import { FileImage, Video, FileText, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatNumber, formatDate } from '../../lib/utils';
import { FILE_TYPES } from '../../data/mediaData';

const ICONS = { image: FileImage, video: Video, document: FileText };

export default function MediaListItem({ item, selected, onSelect, onPreview, onDelete }) {
  const cfg = FILE_TYPES[item.type] || FILE_TYPES.document;
  const Icon = ICONS[item.type] || FileText;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all cursor-pointer',
        selected
          ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-500/5'
          : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
      )}
      onClick={() => onPreview(item)}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => { e.stopPropagation(); onSelect(item.id); }}
        className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
        onClick={(e) => e.stopPropagation()}
      />

      {item.thumbnail ? (
        <img src={item.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
      ) : (
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', cfg.bg)}>
          <Icon className={cn('w-5 h-5', cfg.color)} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <p className="text-xs text-gray-500 truncate">{item.alt || 'No description'}</p>
      </div>

      <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded hidden sm:inline-block', cfg.bg, cfg.color)}>
        {cfg.label}
      </span>

      <span className="text-xs text-gray-400 w-20 text-right hidden md:block">{formatNumber(item.size)} B</span>

      <span className="text-xs text-gray-400 w-24 text-right hidden lg:block">{formatDate(item.uploadedAt)}</span>

      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
        <button onClick={(e) => { e.stopPropagation(); onPreview(item); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
