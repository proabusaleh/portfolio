import { useState, useEffect, useCallback } from 'react';
import { Plus, GripVertical, Trash2, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import Input from '../../components/ui/Input';
import { ConfirmModal } from '../../components/ui/Modal';
import Modal from '../../components/ui/Modal';

import { getMenus, createMenu, deleteMenu, reorderMenus } from '../../api/menusApi';

function SortableItem({ item, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.label}</p>
        <p className="text-xs text-gray-400 font-mono">{item.url}</p>
      </div>
      {item.target === '_blank' && <ExternalLink className="w-3.5 h-3.5 text-gray-400" />}
      <button
        onClick={() => onDelete(item)}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function MenuFormModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({ label: '', url: '', target: '_self' });
  const [saving, setSaving] = useState(false);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.label || !form.url) {
      toast.error('Label and URL are required');
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
      setForm({ label: '', url: '', target: '_self' });
      onClose();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Menu Item" size="sm">
      <div className="space-y-4 p-5">
        <Input
          label="Label"
          value={form.label}
          onChange={(e) => update('label', e.target.value)}
          placeholder="Home, About, Services..."
        />
        <Input
          label="URL"
          value={form.url}
          onChange={(e) => update('url', e.target.value)}
          placeholder="/about, https://example.com"
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Open in</label>
          <select
            value={form.target}
            onChange={(e) => update('target', e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg transition-all bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          >
            <option value="_self">Same tab</option>
            <option value="_blank">New tab</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 pb-5">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} loading={saving}>Add Item</Button>
      </div>
    </Modal>
  );
}

export default function MenusList() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchMenus = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getMenus();
      setMenus(list);
    } catch {
      toast.error('Failed to load menus');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

  const handleAdd = async (form) => {
    await createMenu(form);
    toast.success('Menu item added');
    fetchMenus();
  };

  const handleDelete = (item) => setDeleting(item);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteMenu(deleting.id);
      toast.success('Menu item deleted');
      setDeleting(null);
      fetchMenus();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = menus.findIndex((m) => m.id === active.id);
    const newIdx = menus.findIndex((m) => m.id === over.id);
    const reordered = arrayMove(menus, oldIdx, newIdx);
    setMenus(reordered);
    try {
      await reorderMenus(reordered.map((m) => m.id));
      toast.success('Order updated');
    } catch {
      toast.error('Failed to save order');
      fetchMenus();
    }
  };

  return (
    <div>
      <PageHeader
        title="Menus"
        subtitle={`${menus.length} menu item${menus.length !== 1 ? 's' : ''}`}
        actions={
          <Button icon={Plus} onClick={() => setFormOpen(true)}>
            Add Item
          </Button>
        }
      />

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span>Navigation Menu</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="p-4">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : menus.length === 0 ? (
              <EmptyState
                title="No menu items yet"
                description="Add navigation items for your portfolio."
                action={
                  <Button icon={Plus} onClick={() => setFormOpen(true)}>
                    Add Item
                  </Button>
                }
              />
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={menus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {menus.map((item) => (
                      <SortableItem key={item.id} item={item} onDelete={handleDelete} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </div>

      <MenuFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} onSave={handleAdd} />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete "${deleting?.label}"?`}
        description="This will remove this item from the menu."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
