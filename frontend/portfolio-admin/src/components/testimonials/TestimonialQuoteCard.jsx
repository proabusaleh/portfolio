import { Edit, Trash2, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '../../lib/utils';
import Badge from '../ui/Badge';

export default function TestimonialQuoteCard({ testimonial, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'relative rounded-xl overflow-hidden group',
        'bg-gradient-to-br from-indigo-500 to-purple-600',
        'shadow-sm hover:shadow-lg transition-all'
      )}
    >
      <div className="p-6 space-y-4 text-white">
        <Quote className="w-10 h-10 text-white/30 fill-current" />

        <p className="text-sm leading-relaxed text-white/90 italic line-clamp-5">
          "{testimonial.quote}"
        </p>

        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-4 h-4', i < testimonial.rating ? 'text-amber-300 fill-amber-300' : 'text-white/30')} />
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-white/20">
          <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-white/70 truncate">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="gradient" size="sm">{testimonial.project_type}</Badge>
          <span className="text-[11px] text-white/50">{formatDate(testimonial.date)}</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => onEdit(testimonial)} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition">
          <Edit className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(testimonial)} className="p-1.5 rounded-lg bg-white/20 hover:bg-red-500/80 text-white transition">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
