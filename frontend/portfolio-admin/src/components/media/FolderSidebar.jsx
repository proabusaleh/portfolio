import { useState } from 'react';
import { Plus, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Dropdown from '../ui/Dropdown';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import { ConfirmModal } from '../ui/Modal';

export default function FolderSidebar({
  folders,
  activeFolder,
  onSelect,
  onAdd,
  onDelete,
  counts = {},
}) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName]   = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await onAdd(newName.trim());
      toast.success('Folder created');
      setNewName('');
      setCreating(false);
    } catch {
      toast.error('Failed to create folder');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold uppercase text-gray-500">
          Folders
        </h3>
        <button
          onClick={() => setCreating((c) => !c)}
          title="New folder"
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-indigo-500"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Create input */}
      {creating && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-2 space-y-2"
        >
          <Input
            placeholder="Folder name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <div className="flex gap-1">
            <Button size="sm" fullWidth onClick={handleCreate}>Create</Button>
            <Button size="sm" variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      {/* Folders list */}
      <ul className="space-y-0.5">
        {folders.map((folder) => {
          const isActive = activeFolder === folder.id;
          const count    = counts[folder.id] || 0;

          return (
            <li key={folder.id}>
              <div
                className={cn(
                  'group flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm cursor-pointer transition',
                  isActive
                    ? 'bg-gradient-primary text-white shadow-md'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                onClick={() => onSelect(folder.id)}
              >
                <span className="text-base leading-none shrink-0">{folder.icon}</span>
                <span className="flex-1 truncate">{folder.name}</span>
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                )}>
                  {count}
                </span>
                {!folder.system && (
                  <Dropdown
                    align="right"
                    width="w-32"
                    trigger={
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          'opacity-0 group-hover:opacity-100 p-0.5 rounded transition',
                          isActive ? 'hover:bg-white/20' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    }
                  >
                    <div className="p-1">
                      <button
                        onClick={() => setDeleteId(folder.id)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </Dropdown>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await onDelete(deleteId);
          setDeleteId(null);
        }}
        title="Delete folder?"
        description="Files inside will be moved to All Files. The folder itself will be permanently deleted."
        confirmText="Delete Folder"
        variant="danger"
      />
    </div>
  );
}