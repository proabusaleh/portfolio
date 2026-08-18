import { Edit, Trash2, GripVertical, Star } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

export default function ServiceCard({ service, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: service.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800',
        'shadow-sm hover:shadow-md transition-all group',
        isDragging && 'shadow-2xl'
      )}
    >
      <div className={cn('h-1.5 rounded-t-xl bg-gradient-to-r', service.color)} />

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center shrink-0', service.color)}>
            <i className={cn(service.icon, 'text-white text-lg')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{service.title}</h3>
              {service.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
              {service.description}
            </p>
          </div>
        </div>

        {service.features?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((f) => (
              <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {f}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
                +{service.features.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xs text-gray-500">
            {service.priceFrom != null && (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                ${Number(service.priceFrom).toLocaleString()}
                {service.priceTo != null ? ` – $${Number(service.priceTo).toLocaleString()}` : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Badge variant={service.published ? 'success' : 'default'} size="sm" dot>
              {service.published ? 'Live' : 'Draft'}
            </Badge>
            <button onClick={() => onEdit(service)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition opacity-0 group-hover:opacity-100">
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(service)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
