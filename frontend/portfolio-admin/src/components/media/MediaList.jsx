import { motion } from 'framer-motion';
import { Play, FileText, File, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '../../api/mediaApi';
import { formatDate, cn } from '../../lib/utils';

const TYPE_ICONS = {
  image:    ImageIcon,
  video:    Play,
  document: FileText,
};

export default function MediaList({ items = [], selectedIds = [], onSelect, onPreview, _onDelete, loading }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }
  if (!items.length) return null;

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <MediaListItem
          key={item.id}
          media={item}
          selected={selectedIds.includes(item.id)}
          onClick={onPreview}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function MediaListItem({ media, selected, onClick, onSelect }) {
  const isImage = media.type === 'image';
  const TypeIcon = TYPE_ICONS[media.type] || File;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      onClick={() => onClick(media)}
      className={cn(
        'group flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition',
        selected
          ? 'bg-indigo-50 dark:bg-indigo-950/30 ring-1 ring-indigo-500'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
      )}
    >
      {/* Checkbox */}
      <div
        onClick={(e) => { e.stopPropagation(); onSelect(media.id); }}
        className={cn(
          'w-5 h-5 rounded flex items-center justify-center transition shrink-0',
          selected
            ? 'bg-indigo-500 text-white'
            : 'border border-gray-300 dark:border-gray-700 opacity-0 group-hover:opacity-100'
        )}
      >
        {selected && <CheckCircle className="w-3.5 h-3.5" />}
      </div>

      {/* Thumbnail */}
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        {isImage && media.thumbnail ? (
          <img src={media.thumbnail} alt={media.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <TypeIcon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{media.name}</p>
        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
          <span className="uppercase font-semibold">{media.type}</span>
          <span>·</span>
          <span>{formatBytes(media.size)}</span>
          {media.dimensions && (
            <>
              <span>·</span>
              <span>{media.dimensions.w}×{media.dimensions.h}</span>
            </>
          )}
        </div>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-400 shrink-0 hidden sm:block">
        {formatDate(media.uploadedAt)}
      </div>
    </motion.div>
  );
}