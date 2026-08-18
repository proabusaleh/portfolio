import { Search, Trash2, FolderInput } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import ViewToggle from '../ui/ViewToggle';

export default function MediaToolbar({
  search, onSearchChange,
  view, onViewChange,
  typeFilter, onTypeFilterChange,
  selectedCount, onBulkDelete, onBulkMove,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <Input
          icon={Search}
          placeholder="Search files by name or tag..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Bulk actions (appears on selection) */}
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
            <Button size="sm" variant="outline" icon={FolderInput} onClick={onBulkMove}>
              Move
            </Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={onBulkDelete}>
              Delete
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters + View toggle */}
      <div className="flex items-center gap-2 lg:ml-auto">
        <Select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          options={[
            { value: 'image',    label: 'Images' },
            { value: 'video',    label: 'Videos' },
            { value: 'document', label: 'Documents' },
          ]}
          placeholder="All types"
          className="w-32"
        />
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}