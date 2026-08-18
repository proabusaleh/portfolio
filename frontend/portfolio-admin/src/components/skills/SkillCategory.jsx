import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

export default function SkillCategory({ category, skills, onAdd, onEdit, onDelete, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = skills.findIndex((s) => s.id === active.id);
    const newIdx = skills.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(skills, oldIdx, newIdx);
    onReorder(category.value, reordered);
  };

  const avgProficiency = skills.length
    ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length)
    : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Header */}
      <div className={cn(
        'p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r',
        category.color, 'text-white'
      )}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h3 className="font-semibold">{category.label}</h3>
            <p className="text-xs opacity-80">
              {skills.length} skill{skills.length !== 1 ? 's' : ''} · Avg: {avgProficiency}%
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          icon={Plus}
          onClick={() => onAdd(category.value)}
          className="!bg-white/20 !border-white/30 !text-white hover:!bg-white/30"
        >
          Add
        </Button>
      </div>

      {/* Skills grid */}
      <div className="p-4">
        {skills.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-400">
            No skills in this category yet
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={skills.map((s) => s.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </motion.section>
  );
}