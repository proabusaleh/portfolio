import { GraduationCap, Plus } from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';

import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SectionCard from '../SectionCard';
import TimelineItem from '../TimelineItem';
import { useResumeStore } from '../../../store/resumeStore';

export default function EducationEditor() {
  const education = useResumeStore((s) => s.resume.education) || [];
  const updateSection = useResumeStore((s) => s.updateSection);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const addNew = () => {
    updateSection('education', [...education, {
      id: Date.now(), degree: '', institution: '', location: '', startDate: '', endDate: '', description: '',
    }]);
  };

  const updateItem = (id, field, value) => {
    updateSection('education', education.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeItem = (id) => {
    updateSection('education', education.filter((e) => e.id !== id));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = education.findIndex((e) => e.id === active.id);
    const newIdx = education.findIndex((e) => e.id === over.id);
    updateSection('education', arrayMove(education, oldIdx, newIdx));
  };

  return (
    <SectionCard
      icon={GraduationCap}
      title="Education"
      description="Academic qualifications"
      actions={<Button size="xs" variant="primary" onClick={addNew}><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>}
    >
      {education.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400">No education added yet.</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 pt-3">
              <AnimatePresence>
                {education.map((item) => (
                  <TimelineItem
                    key={item.id}
                    id={item.id}
                    title={item.degree || 'New qualification'}
                    subtitle={item.institution}
                    meta={item.startDate ? `${item.startDate} — ${item.endDate || '...'}` : ''}
                    onDelete={() => removeItem(item.id)}
                    defaultOpen={!item.degree}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input label="Degree / Program" value={item.degree} onChange={(e) => updateItem(item.id, 'degree', e.target.value)} />
                      <Input label="Institution" value={item.institution} onChange={(e) => updateItem(item.id, 'institution', e.target.value)} />
                      <Input label="Location" value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <Input label="Start Date" type="month" value={item.startDate} onChange={(e) => updateItem(item.id, 'startDate', e.target.value)} />
                        <Input label="End Date" type="month" value={item.endDate} onChange={(e) => updateItem(item.id, 'endDate', e.target.value)} />
                      </div>
                    </div>
                    <Input
                      label="Description"
                      value={item.description || ''}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="mt-3"
                    />
                  </TimelineItem>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      )}
    </SectionCard>
  );
}
