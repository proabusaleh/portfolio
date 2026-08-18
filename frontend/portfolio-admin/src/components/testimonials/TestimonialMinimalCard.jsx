import { Edit, Trash2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

export default function TestimonialMinimalCard({ testimonial, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl',
        'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
        'hover:shadow-sm transition-all group'
      )}
    >
      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200 dark:border-gray-700" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold truncate">{testimonial.name}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('w-3 h-3', i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600')} />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-1.5">{testimonial.role} at {testimonial.company}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">"{testimonial.quote}"</p>
      </div>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition shrink-0">
        <Badge variant={testimonial.featured ? 'primary' : 'default'} size="sm">{testimonial.project_type}</Badge>
        <button onClick={() => onEdit(testimonial)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
          <Edit className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(testimonial)} className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
