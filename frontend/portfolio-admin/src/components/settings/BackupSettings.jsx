import { useState, useEffect, useCallback } from 'react';
import { Database, Download, Upload, Play, Trash2, Clock, Shield, ArrowDownToLine, CloudUpload } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { ConfirmModal } from '../ui/Modal';
import {
  getBackups, createBackup, deleteBackup, restoreBackup,
  downloadBackup, exportAllData, importAllData,
} from '../../api/settingsApi';
import { formatBytes } from '../../api/mediaApi';
import { formatDate, timeAgo } from '../../lib/utils';

export default function BackupSettings({ data, onChange }) {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const update = (field, value) => onChange({ ...data, [field]: value });

  const fetchBackups = useCallback(async () => {
    setLoading(true);
    const list = await getBackups();
    setBackups(list);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBackups(); }, [fetchBackups]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      await createBackup();
      toast.success('Backup created successfully');
      fetchBackups();
    } catch {
      toast.error('Failed to create backup');
    } finally {
      setCreating(false);
    }
  };

  const handleRestore = async () => {
    setConfirmLoading(true);
    try {
      await restoreBackup(restoring.id);
      toast.success('Backup restored — reloading...');
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      toast.error('Restore failed');
    } finally {
      setConfirmLoading(false);
      setRestoring(null);
    }
  };

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteBackup(deleting.id);
      toast.success('Backup deleted');
      setDeleting(null);
      fetchBackups();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleExportAll = async () => {
    try {
      await exportAllData();
      toast.success('Full data export downloaded');
    } catch {
      toast.error('Export failed');
    }
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        await importAllData(ev.target.result);
        toast.success('Data imported — reloading...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        toast.error(err.message || 'Import failed');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Auto Backup */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-visible">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Auto Backup</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatic scheduled backups</p>
            </div>
          </div>
          <Toggle checked={data.autoBackup} onChange={(v) => update('autoBackup', v)} label="Enable" />
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Backup Schedule"
              value={data.backupSchedule}
              onChange={(val) => update('backupSchedule', val)}
              options={[
                { value: 'daily',   label: 'Daily' },
                { value: 'weekly',  label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
              placeholder=""
              disabled={!data.autoBackup}
            />
            <Select
              label="Retention"
              value={data.backupRetention}
              onChange={(val) => update('backupRetention', parseInt(val))}
              options={[
                { value: 5,  label: 'Keep last 5 backups' },
                { value: 10, label: 'Keep last 10 backups' },
                { value: 30, label: 'Keep last 30 backups' },
                { value: 0,  label: 'Keep all backups' },
              ]}
              placeholder=""
              disabled={!data.autoBackup}
            />
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Backup History</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {backups.length} backup{backups.length !== 1 ? 's' : ''} stored
              </p>
            </div>
          </div>
          <Button icon={Database} onClick={handleCreate} loading={creating}>
            Create Backup
          </Button>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : backups.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                <Database className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No backups yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Create your first backup to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {backups.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all bg-gray-50/50 dark:bg-gray-800/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Database className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">{b.name}</p>
                        <Badge variant={b.type === 'auto' ? 'primary' : 'success'} size="sm">
                          {b.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatBytes(b.size)} &middot; {formatDate(b.createdAt)} &middot; {timeAgo(b.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => downloadBackup(b)}
                        title="Download"
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-400 hover:text-indigo-500 transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRestoring(b)}
                        title="Restore"
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-400 hover:text-green-500 transition-colors shadow-sm"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(b)}
                        title="Delete"
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Export & Import */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Export & Import All Data</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Move all data between installations</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export */}
            <div className="relative group rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-950/20 dark:to-indigo-950/10 p-5 transition-all hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 dark:bg-indigo-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mb-3">
                  <ArrowDownToLine className="w-5 h-5 text-indigo-500" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">Export Everything</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Download all settings, resume, SEO, and contact data as JSON
                </p>
                <Button fullWidth onClick={handleExportAll} icon={Download}>
                  Download JSON
                </Button>
              </div>
            </div>

            {/* Import */}
            <div className="relative group rounded-xl border border-purple-200 dark:border-purple-900/40 bg-gradient-to-br from-purple-50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/10 p-5 transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-800">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mb-3">
                  <CloudUpload className="w-5 h-5 text-purple-500" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">Import from File</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Restore from a previously exported JSON file
                </p>
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <div className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:opacity-90 shadow-md transition-opacity cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restore confirmation */}
      <ConfirmModal
        isOpen={!!restoring}
        onClose={() => setRestoring(null)}
        onConfirm={handleRestore}
        title={`Restore "${restoring?.name}"?`}
        description="Your current data will be REPLACED with the backup. The app will reload after restore."
        confirmText="Yes, Restore Now"
        variant="danger"
        loading={confirmLoading}
      />

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleting?.name}"?`}
        description="This backup will be permanently removed. This cannot be undone."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
