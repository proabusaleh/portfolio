import { Briefcase, Plus } from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';

import Input from '../../ui/Input';
import Toggle from '../../ui/Toggle';
import Button from '../../ui/Button';
import SectionCard from '../SectionCard';
import TimelineItem from '../TimelineItem';
import { useResumeStore } from '../../../store/resumeStore';

export default function ExperienceEditor() {
  const experience = useResumeStore((s) => s.resume.experience) || [];
  const updateSection = useResumeStore((s) => s.updateSection);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const addNew = () => {
    updateSection('experience', [...experience, {
      id: Date.now(), role: '', company: '', location: '', startDate: '', endDate: '', current: false, highlights: [],
    }]);
  };

  const updateItem = (id, field, value) => {
    updateSection('experience', experience.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeItem = (id) => {
    updateSection('experience', experience.filter((e) => e.id !== id));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = experience.findIndex((e) => e.id === active.id);
    const newIdx = experience.findIndex((e) => e.id === over.id);
    updateSection('experience', arrayMove(experience, oldIdx, newIdx));
  };

  return (
    <SectionCard
      icon={Briefcase}
      title="Professional Experience"
      description="Your work history, most recent first"
      actions={<Button size="xs" variant="primary" onClick={addNew}><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>}
    >
      {experience.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400">No experience added yet.</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 pt-3">
              <AnimatePresence>
                {experience.map((item, i) => (
                  <TimelineItem
                    key={item.id}
                    id={item.id}
                    title={item.role || 'New position'}
                    subtitle={item.company}
                    meta={item.current ? 'Present' : (item.endDate || '')}
                    onDelete={() => removeItem(item.id)}
                    defaultOpen={i === experience.length - 1 && !item.role}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input label="Role / Position" value={item.role} onChange={(e) => updateItem(item.id, 'role', e.target.value)} />
                      <Input label="Company" value={item.company} onChange={(e) => updateItem(item.id, 'company', e.target.value)} />
                      <Input label="Location" value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <Input label="Start Date" type="month" value={item.startDate} onChange={(e) => updateItem(item.id, 'startDate', e.target.value)} />
                        <Input label="End Date" type="month" value={item.endDate} disabled={item.current} onChange={(e) => updateItem(item.id, 'endDate', e.target.value)} />
                      </div>
                    </div>
                    <Toggle checked={item.current} onChange={(v) => updateItem(item.id, 'current', v)} label="I currently work here" />
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
