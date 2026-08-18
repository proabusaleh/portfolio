import { useState } from 'react';
import { AlertTriangle, Trash2, RotateCcw, LogOut, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal, { ConfirmModal } from '../ui/Modal';
import { resetSettings, nukeAllData } from '../../api/settingsApi';
import { useAuth } from '../../hooks/useAuth';

export default function DangerZone({ onReset }) {
  const { logout } = useAuth();

  const [resetOpen, setResetOpen]   = useState(false);
  const [nukeOpen, setNukeOpen]     = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading]       = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const d = await resetSettings();
      onReset?.(d);
      setResetOpen(false);
      toast.success('Settings reset to defaults');
    } catch {
      toast.error('Reset failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNuke = async () => {
    if (confirmText !== 'DELETE ALL') {
      toast.error('Type "DELETE ALL" to confirm');
      return;
    }
    setLoading(true);
    try {
      await nukeAllData();
      toast.success('All data deleted. Logging out...');
      setTimeout(() => {
        logout();
        window.location.reload();
      }, 2000);
    } catch {
      toast.error('Failed to delete');
    }
  };

  const actions = [
    {
      icon: RotateCcw,
      title: 'Reset Settings to Defaults',
      description: 'Restore all settings to their default values',
      detail: 'All your current settings will be replaced. Your content (projects, blog, etc.) will NOT be affected.',
      buttonLabel: 'Reset Settings',
      buttonVariant: 'outline',
      borderColor: 'border-orange-200 dark:border-orange-900/40',
      hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-700',
      iconBg: 'bg-orange-100 dark:bg-orange-500/10',
      iconColor: 'text-orange-500',
      onClick: () => setResetOpen(true),
    },
    {
      icon: LogOut,
      title: 'Sign Out',
      description: 'Log out from your admin account',
      detail: "You'll need to sign in again to access the dashboard.",
      buttonLabel: 'Sign Out',
      buttonVariant: 'outline',
      borderColor: 'border-gray-200 dark:border-gray-800',
      hoverBorder: 'hover:border-gray-400 dark:hover:border-gray-600',
      iconBg: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-gray-500',
      onClick: logout,
    },
    {
      icon: Trash2,
      title: 'Delete All Data',
      description: 'Permanently remove ALL app data',
      detail: 'Settings, resume, SEO, contact, backups — all gone. Cannot be undone.',
      buttonLabel: 'Delete Everything',
      buttonVariant: 'danger',
      borderColor: 'border-red-200 dark:border-red-900/40',
      hoverBorder: 'hover:border-red-400 dark:hover:border-red-700',
      iconBg: 'bg-red-100 dark:bg-red-500/10',
      iconColor: 'text-red-500',
      isDestructive: true,
      onClick: () => setNukeOpen(true),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Warning banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-r from-red-50 via-red-50 to-orange-50 dark:from-red-950/30 dark:via-red-950/20 dark:to-orange-950/20 p-5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-1">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600/80 dark:text-red-400/80">
                These actions are <strong className="text-red-700 dark:text-red-300">irreversible</strong>. Make sure you have backups before proceeding.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action cards */}
        <div className="space-y-3">
          {actions.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative rounded-xl border ${item.borderColor} ${item.hoverBorder} bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
                <div className={`shrink-0 w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-0.5">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.description}</p>
                  <p className={`text-xs ${item.isDestructive ? 'text-red-500 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
                    {item.detail}
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Button variant={item.buttonVariant} icon={item.icon} onClick={item.onClick} className={item.isDestructive ? 'border-red-300 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30' : ''}>
                    {item.buttonLabel}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reset confirmation */}
      <ConfirmModal
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
        title="Reset all settings?"
        description="Every setting will return to defaults. This cannot be undone."
        confirmText="Yes, Reset Settings"
        variant="danger"
        loading={loading}
      />

      {/* Nuke modal */}
      <Modal
        isOpen={nukeOpen}
        onClose={() => { setNukeOpen(false); setConfirmText(''); }}
        title="Delete ALL Data"
        description="This is a destructive action that cannot be reversed."
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                This will permanently delete:
              </p>
            </div>
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1 ml-6 list-disc">
              <li>All settings & preferences</li>
              <li>Resume / CV data</li>
              <li>SEO configuration</li>
              <li>Contact information</li>
              <li>All backups</li>
            </ul>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Type <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-red-500">DELETE ALL</code> to confirm:
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE ALL"
              className="font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <Button variant="outline" onClick={() => { setNukeOpen(false); setConfirmText(''); }}>
              Cancel
            </Button>
            <Button
              variant="danger"
              icon={Trash2}
              onClick={handleNuke}
              loading={loading}
              disabled={confirmText !== 'DELETE ALL'}
            >
              Delete Everything Forever
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
