import { Search, Trash2, CheckCircle, Circle, Star } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function TableToolbar({
  search,
  onSearchChange,
  selectedCount = 0,
  onBulkDelete,
  onBulkPublish,
  onBulkUnpublish,
  onBulkFeature,
  rightAction,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <Input
          icon={Search}
          placeholder="Search by title or tag..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Bulk actions (appear when selection > 0) */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {selectedCount} selected
            </span>
            <Button size="sm" variant="outline" icon={CheckCircle} onClick={onBulkPublish}>
              Publish
            </Button>
            <Button size="sm" variant="outline" icon={Circle} onClick={onBulkUnpublish}>
              Unpublish
            </Button>
            <Button size="sm" variant="outline" icon={Star} onClick={onBulkFeature}>
              Feature
            </Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={onBulkDelete}>
              Delete
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right action (e.g. "Add Project" button) */}
      {rightAction && <div className="sm:ml-auto">{rightAction}</div>}
    </div>
  );
}