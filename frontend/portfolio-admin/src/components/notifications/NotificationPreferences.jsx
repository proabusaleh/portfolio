import { useEffect, useState } from 'react';
import { Bell, Mail, Monitor, Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import { getPreferences, savePreferences } from '../../api/notificationsApi';
import { NOTIFICATION_TYPES } from '../../data/notificationsData';
import { cn } from '../../lib/utils';

export default function NotificationPreferences({ browserPerm, onRequestPermission }) {
  const [prefs, setPrefs]     = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [dirty, setDirty]     = useState(false);

  useEffect(() => {
    getPreferences().then((p) => {
      setPrefs(p);
      setLoading(false);
    });
  }, []);

  const update = (type, channel, value) => {
    setPrefs((p) => ({
      ...p,
      [type]: { ...p[type], [channel]: value },
    }));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePreferences(prefs);
      toast.success('Preferences saved ✓');
      setDirty(false);
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Browser permission banner */}
      {browserPerm !== 'granted' && (
        <Card>
          <CardBody>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Enable Browser Notifications</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Get instant desktop alerts even when the app is in another tab
                </p>
              </div>
              <Button
                icon={Bell}
                onClick={onRequestPermission}
                disabled={browserPerm === 'unsupported' || browserPerm === 'denied'}
              >
                {browserPerm === 'denied'
                  ? 'Blocked'
                  : browserPerm === 'unsupported'
                    ? 'Unsupported'
                    : 'Enable'}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Preferences matrix */}
      <Card>
        <CardBody className="p-0">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold">Notification Preferences</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose how you want to be notified for each type
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {NOTIFICATION_TYPES.map((type, i) => (
              <motion.div
                key={type.value}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                      type.bg
                    )}>
                      <span className={cn('text-lg', type.text)}>
                        {type.value === 'message' && '💬'}
                        {type.value === 'comment' && '💭'}
                        {type.value === 'testimonial' && '⭐'}
                        {type.value === 'subscriber' && '👥'}
                        {type.value === 'system' && '⚙️'}
                        {type.value === 'security' && '🔒'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{type.label}</p>
                      <p className="text-xs text-gray-500 truncate">{type.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pl-13 sm:pl-0">
                    <ChannelToggle
                      icon={Bell}
                      label="In-app"
                      checked={prefs[type.value]?.inApp}
                      onChange={(v) => update(type.value, 'inApp', v)}
                    />
                    <ChannelToggle
                      icon={Monitor}
                      label="Browser"
                      checked={prefs[type.value]?.browser}
                      onChange={(v) => update(type.value, 'browser', v)}
                      disabled={browserPerm !== 'granted'}
                    />
                    <ChannelToggle
                      icon={Mail}
                      label="Email"
                      checked={prefs[type.value]?.email}
                      onChange={(v) => update(type.value, 'email', v)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Save bar */}
          {dirty && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="sticky bottom-0 flex items-center justify-between gap-3 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                ⚠ You have unsaved preferences
              </p>
              <Button icon={Save} onClick={handleSave} loading={saving}>
                Save Preferences
              </Button>
            </motion.div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function ChannelToggle({ icon: Icon, label, checked, onChange, disabled }) {
  return (
    <label className={cn(
      'inline-flex items-center gap-2',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      <div className={cn(
        'w-6 h-6 rounded flex items-center justify-center',
        checked ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-500' : 'text-gray-400'
      )}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
        {label}
      </span>
      <Toggle checked={!!checked} onChange={onChange} disabled={disabled} />
    </label>
  );
}