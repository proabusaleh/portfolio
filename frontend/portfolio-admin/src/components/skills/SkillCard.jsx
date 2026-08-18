import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Edit, Trash2, MoreVertical } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import Dropdown from '../ui/Dropdown';
import { cn } from '../../lib/utils';

export default function SkillCard({ skill, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: skill.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  // Determine gradient color from proficiency
  const gradient = skill.proficiency >= 85
    ? 'from-emerald-500 to-teal-500'
    : skill.proficiency >= 70
      ? 'from-blue-500 to-indigo-500'
      : skill.proficiency >= 50
        ? 'from-yellow-500 to-orange-500'
        : 'from-orange-500 to-red-500';

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={cn(
        'group rounded-xl p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all',
        isDragging && 'shadow-2xl'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white"
          style={{ backgroundColor: skill.color || '#6366f1' }}
        >
          <i className={`bx ${skill.icon} text-2xl`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-semibold text-sm truncate">{skill.name}</h4>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
              <button
                {...attributes}
                {...listeners}
                className="p-1 rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-grab active:cursor-grabbing"
                title="Drag to reorder"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </button>
              <Dropdown
                align="right"
                width="w-36"
                trigger={
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                }
              >
                <div className="p-1">
                  <button
                    onClick={() => onEdit(skill)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(skill)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </Dropdown>
            </div>
          </div>

          <ProgressBar value={skill.proficiency} color={gradient} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}