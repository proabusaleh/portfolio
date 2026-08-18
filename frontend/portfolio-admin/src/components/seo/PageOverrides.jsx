import { useState } from 'react';
import { Plus, Edit, Trash2, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Toggle from '../ui/Toggle';
import Modal, { ConfirmModal } from '../ui/Modal';
import Badge from '../ui/Badge';
import { saveOverride, deleteOverride } from '../../api/seoApi';

export default function PageOverrides({ overrides: initialOverrides, onSave }) {
  const [overrides, setOverrides] = useState(initialOverrides || []);
  const [editing, setEditing]     = useState(null);
  const [formOpen, setFormOpen]   = useState(false);
  const [deleteId, setDeleteId]   = useState(null);

  const handleEdit = (item) => {
    setEditing({ ...item });
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditing({ id: null, path: '', title: '', description: '', ogImage: '', noindex: false });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!editing?.path) {
      toast.error('Path is required');
      return;
    }
    try {
      const saved = await saveOverride(editing);
      if (editing.id) {
        setOverrides(overrides.map((o) => o.id === saved.id ? saved : o));
      } else {
        setOverrides([...overrides, saved]);
      }
      setFormOpen(false);
      toast.success('Override saved ✓');
      onSave?.();
    } catch {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async () => {
    await deleteOverride(deleteId);
    setOverrides(overrides.filter((o) => o.id !== deleteId));
    setDeleteId(null);
    toast.success('Override deleted');
    onSave?.();
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Per-Page Overrides</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Override default SEO settings for specific pages
            </p>
          </div>
          <Button icon={Plus} onClick={handleNew}>Add Override</Button>
        </div>

        {overrides.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400">
            No custom overrides. Default settings apply to all pages.
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {overrides.map((o) => (
                <motion.div
                  key={o.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-indigo-500 font-mono">
                        {o.path}
                      </code>
                      {o.noindex && (
                        <Badge variant="danger" size="sm">
                          <EyeOff className="w-3 h-3 inline mr-0.5" /> No-index
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{o.title}</p>
                    <p className="text-xs text-gray-500 truncate">{o.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(o)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(o.id)}
                      className="p-2 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardBody>

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing?.id ? 'Edit Override' : 'New Page Override'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Page Path"
            placeholder="/about-us"
            value={editing?.path || ''}
            onChange={(e) => setEditing({ ...editing, path: e.target.value })}
            hint="e.g. /about, /contact, /blog/my-post"
          />
          <Input
            label="Meta Title"
            placeholder="Custom title for this page"
            value={editing?.title || ''}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            hint={`${editing?.title?.length || 0}/60 characters`}
          />
          <Textarea
            label="Meta Description"
            rows={3}
            placeholder="Custom description..."
            value={editing?.description || ''}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            hint={`${editing?.description?.length || 0}/160 characters`}
          />
          <Input
            label="OG Image URL (optional)"
            placeholder="https://..."
            value={editing?.ogImage || ''}
            onChange={(e) => setEditing({ ...editing, ogImage: e.target.value })}
          />
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
            <Toggle
              checked={!!editing?.noindex}
              onChange={(v) => setEditing({ ...editing, noindex: v })}
              label="🚫 No-index (hide from search engines)"
              description="Use for admin, private, or duplicate pages"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Override</Button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete override?"
        description="Default settings will apply to this page again."
        confirmText="Delete"
        variant="danger"
      />
    </Card>
  );
}