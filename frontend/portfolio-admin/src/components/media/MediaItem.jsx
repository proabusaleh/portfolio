import { motion } from 'framer-motion';
import { Play, FileText, File, CheckCircle } from 'lucide-react';
import { formatBytes } from '../../api/mediaApi';
import { cn } from '../../lib/utils';

const TYPE_ICONS = {
  video: Play,
  document: FileText,
  file: File,
};

const TYPE_COLORS = {
  video:    'from-red-500 to-pink-500',
  document: 'from-blue-500 to-indigo-500',
  file:     'from-gray-500 to-gray-600',
};

export default function MediaItem({ item: media, selected, onSelect, onPreview }) {
  const isImage = media.type === 'image';
  const TypeIcon = TYPE_ICONS[media.type] || File;
  const typeColor = TYPE_COLORS[media.type] || TYPE_COLORS.file;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -3 }}
      onClick={() => onPreview(media)}
      className={cn(
        'group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white dark:bg-gray-900',
        selected
          ? 'border-indigo-500 ring-2 ring-indigo-500/30'
          : 'border-gray-200 dark:border-gray-800 hover:border-indigo-400'
      )}
    >
      {/* Selection checkbox */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(media.id);
        }}
        className={cn(
          'absolute top-2 left-2 z-10 w-6 h-6 rounded-md flex items-center justify-center transition',
          selected
            ? 'bg-indigo-500 text-white'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-gray-300 dark:border-gray-700 opacity-0 group-hover:opacity-100'
        )}
      >
        {selected && <CheckCircle className="w-4 h-4" />}
      </div>

      {/* Preview area */}
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        {isImage && media.thumbnail ? (
          <img
            src={media.thumbnail}
            alt={media.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${typeColor}`}>
            <TypeIcon className="w-12 h-12 text-white" />
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-2 right-2">
          <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold rounded bg-black/70 backdrop-blur text-white">
            {media.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-xs font-medium truncate" title={media.name}>
          {media.name}
        </p>
        <div className="flex items-center justify-between mt-0.5 text-[10px] text-gray-500">
          <span>{formatBytes(media.size)}</span>
          {media.dimensions && (
            <span>{media.dimensions.w}×{media.dimensions.h}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}