import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy,
} from '@dnd-kit/sortable';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import { ConfirmModal } from '../../components/ui/Modal';

import ServiceCard from '../../components/services/ServiceCard';
import ServiceFormModal from '../../components/services/ServiceFormModal';

import { getServices, deleteService, reorderServices } from '../../api/servicesApi';

export default function ServicesList() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getServices();
      setServices(list);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (service) => { setEditing(service); setFormOpen(true); };
  const handleView = (service) => navigate(`/services/${service.id}/view`);
  const handleDelete = (service) => setDeleting(service);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteService(deleting.id);
      toast.success('Service deleted');
      setDeleting(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = services.findIndex((s) => s.id === active.id);
    const newIdx = services.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(services, oldIdx, newIdx);
    setServices(reordered);
    try {
      await reorderServices(reordered.map((s) => s.id));
      toast.success('Order updated');
    } catch {
      toast.error('Failed to save order');
      fetch();
    }
  };

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle={`${services.length} service${services.length !== 1 ? 's' : ''}`}
        actions={<Button icon={Plus} onClick={handleAdd}>Add Service</Button>}
      />

      <div className="mb-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-2">
        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          <strong>Tip:</strong> Drag the grip icon on any card to reorder services.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState
          title="No services yet"
          description="Add your first service to showcase what you offer."
          action={<Button icon={Plus} onClick={handleAdd}>Add Service</Button>}
        />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={services.map((s) => s.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEdit}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <ServiceFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        service={editing}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete "${deleting?.title}"?`}
        description="This will permanently remove this service from your portfolio."
        confirmText="Delete Service"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
