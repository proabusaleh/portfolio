import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { ConfirmModal } from '../../components/ui/Modal';

import SubscribersStats from '../../components/newsletter/SubscribersStats';
import GrowthChart from '../../components/newsletter/GrowthChart';
import SubscribersTable from '../../components/newsletter/SubscribersTable';
import SubscriberFormModal from '../../components/newsletter/SubscriberFormModal';
import TagFilter from '../../components/newsletter/TagFilter';

import {
  getSubscribers, getSubscribersStats, getGrowthData,
  deleteSubscribers, exportSubscribersCsv,
} from '../../api/newsletterApi';
import { useDebounce } from '../../hooks/useDebounce';

export default function SubscribersList() {
  const [subs, setSubs]     = useState([]);
  const [stats, setStats]   = useState(null);
  const [growth, setGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('');
  const [tag, setTag]         = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [selectedIds, setSelectedIds] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [list, s, g] = await Promise.all([
        getSubscribers({ search: debouncedSearch, status, tag }),
        getSubscribersStats(),
        getGrowthData(),
      ]);
      setSubs(list);
      setStats(s);
      setGrowth(g);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, tag]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (sub) => {
    setEditing(sub);
    setFormOpen(true);
  };

  const handleDelete = (sub) => {
    setSelectedIds([sub.id]);
    setDeleteOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteSubscribers(selectedIds);
      toast.success(`Deleted ${selectedIds.length} subscriber(s)`);
      setSelectedIds([]);
      setDeleteOpen(false);
      fetch();
    } catch {
      toast.error('Failed');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleExport = () => {
    exportSubscribersCsv(subs);
    toast.success('CSV downloaded ✓');
  };

  const toggleSelect = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const selectAll = (checked) => {
    setSelectedIds(checked ? subs.map((s) => s.id) : []);
  };

  return (
    <div className="space-y-6">
      <SubscribersStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <GrowthChart data={growth} />
        </div>
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button fullWidth icon={Plus} onClick={handleAdd}>Add Subscriber</Button>
            <Button fullWidth variant="outline" icon={Download} onClick={handleExport}>
              Export CSV
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-1 text-xs text-gray-500">
            <p>💡 <strong>Tip:</strong> Tag subscribers to send targeted campaigns.</p>
            <p>💡 Export CSV to import into Mailchimp, ConvertKit, etc.</p>
          </div>
        </Card>
      </div>

      <Card>
        <CardBody className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            <div className="flex-1 max-w-md">
              <Input
                icon={Search}
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-500">
                    {selectedIds.length} selected
                  </span>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={handleBulkDelete}>
                    Delete
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 lg:ml-auto">
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: 'active',       label: 'Active' },
                  { value: 'unsubscribed', label: 'Unsubscribed' },
                  { value: 'bounced',      label: 'Bounced' },
                ]}
                placeholder="All statuses"
                className="w-40"
              />
            </div>
          </div>

          {/* Tag filter */}
          <TagFilter value={tag} onChange={setTag} />
        </CardBody>

        <SubscribersTable
          subscribers={subs}
          loading={loading}
          selectedIds={selectedIds}
          onSelectAll={selectAll}
          onSelectRow={toggleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <SubscriberFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        subscriber={editing}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete ${selectedIds.length} subscriber(s)?`}
        description="This action cannot be undone. They will need to re-subscribe."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}