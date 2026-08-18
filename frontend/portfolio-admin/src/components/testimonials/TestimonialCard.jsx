import { Edit, Trash2, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '../../lib/utils';
import Badge from '../ui/Badge';

export default function TestimonialCard({ testimonial, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800',
        'shadow-sm hover:shadow-md transition-all group p-5 space-y-4'
      )}
    >
      <div className="absolute top-4 right-4 text-gray-200 dark:text-gray-800">
        <Quote className="w-8 h-8 fill-current" />
      </div>

      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn('w-4 h-4', i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600')} />
        ))}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{testimonial.name}</p>
          <p className="text-xs text-gray-500 truncate">{testimonial.role} at {testimonial.company}</p>
        </div>
        <Badge variant={testimonial.featured ? 'primary' : 'default'} size="sm">{testimonial.project_type}</Badge>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-gray-400">{formatDate(testimonial.date)}</span>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
          <button onClick={() => onEdit(testimonial)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onDelete(testimonial)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
