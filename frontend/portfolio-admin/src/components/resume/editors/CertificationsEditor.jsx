import { Award, Plus } from 'lucide-react';
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

export default function CertificationsEditor() {
  const certs = useResumeStore((s) => s.resume.certifications) || [];
  const updateSection = useResumeStore((s) => s.updateSection);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const addNew = () => {
    updateSection('certifications', [...certs, {
      id: Date.now(), name: '', issuer: '', date: '', url: '',
    }]);
  };

  const updateItem = (id, field, value) => {
    updateSection('certifications', certs.map((c) => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeItem = (id) => {
    updateSection('certifications', certs.filter((c) => c.id !== id));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = certs.findIndex((c) => c.id === active.id);
    const newIdx = certs.findIndex((c) => c.id === over.id);
    updateSection('certifications', arrayMove(certs, oldIdx, newIdx));
  };

  return (
    <SectionCard
      icon={Award}
      title="Certifications"
      description="Professional certifications and licenses"
      actions={<Button size="xs" variant="primary" onClick={addNew}><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>}
    >
      {certs.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400">No certifications added yet.</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={certs.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 pt-3">
              <AnimatePresence>
                {certs.map((item) => (
                  <TimelineItem
                    key={item.id}
                    id={item.id}
                    title={item.name || 'New certification'}
                    subtitle={item.issuer}
                    meta={item.date}
                    onDelete={() => removeItem(item.id)}
                    defaultOpen={!item.name}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input label="Certification Name" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
                      <Input label="Issuing Organization" value={item.issuer} onChange={(e) => updateItem(item.id, 'issuer', e.target.value)} />
                      <Input label="Date" type="month" value={item.date} onChange={(e) => updateItem(item.id, 'date', e.target.value)} />
                      <Input label="Verification URL" value={item.url} onChange={(e) => updateItem(item.id, 'url', e.target.value)} />
                    </div>
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
