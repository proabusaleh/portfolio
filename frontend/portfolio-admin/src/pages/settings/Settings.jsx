import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Settings as SettingsIcon, Palette, Mail, Database, Key, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import GeneralSettings from '../../components/settings/GeneralSettings';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import EmailSettings from '../../components/settings/EmailSettings';
import ApiKeysSettings from '../../components/settings/ApiKeysSettings';
import BackupSettings from '../../components/settings/BackupSettings';
import DangerZone from '../../components/settings/DangerZone';
import { getSettings, saveSettings, resetSettings } from '../../api/settingsApi';
import { DEFAULT_SETTINGS } from '../../data/settingsData';

const DEFAULT_STRUCTURE = {
  general: {
    siteName: DEFAULT_SETTINGS.siteName,
    siteTagline: DEFAULT_SETTINGS.siteTagline,
    siteUrl: DEFAULT_SETTINGS.siteUrl,
    adminEmail: DEFAULT_SETTINGS.adminEmail,
    logo: DEFAULT_SETTINGS.logo,
    favicon: DEFAULT_SETTINGS.favicon,
    timezone: DEFAULT_SETTINGS.timezone,
    language: DEFAULT_SETTINGS.language,
    dateFormat: DEFAULT_SETTINGS.dateFormat,
    timeFormat: DEFAULT_SETTINGS.timeFormat,
  },
  appearance: {
    themeMode: DEFAULT_SETTINGS.themeMode,
    primaryColor: DEFAULT_SETTINGS.primaryColor,
    accentColor: DEFAULT_SETTINGS.accentColor,
    fontFamily: DEFAULT_SETTINGS.fontFamily,
    borderRadius: DEFAULT_SETTINGS.borderRadius,
    layout: DEFAULT_SETTINGS.layout,
    animations: DEFAULT_SETTINGS.animations,
    compactMode: DEFAULT_SETTINGS.compactMode,
  },
  email: {
    smtpEnabled: DEFAULT_SETTINGS.smtpEnabled,
    smtpHost: DEFAULT_SETTINGS.smtpHost,
    smtpPort: DEFAULT_SETTINGS.smtpPort,
    smtpSecure: DEFAULT_SETTINGS.smtpSecure,
    smtpUser: DEFAULT_SETTINGS.smtpUser,
    smtpPassword: DEFAULT_SETTINGS.smtpPassword,
    smtpFromEmail: DEFAULT_SETTINGS.smtpFromEmail,
    smtpFromName: DEFAULT_SETTINGS.smtpFromName,
  },
  apiKeys: {
    googleApiKey: DEFAULT_SETTINGS.googleApiKey,
    googleAnalyticsId: DEFAULT_SETTINGS.googleAnalyticsId,
    mailchimpKey: DEFAULT_SETTINGS.mailchimpKey,
    stripeKey: DEFAULT_SETTINGS.stripeKey,
    stripeSecret: DEFAULT_SETTINGS.stripeSecret,
    openaiKey: DEFAULT_SETTINGS.openaiKey,
    githubToken: DEFAULT_SETTINGS.githubToken,
    cloudinaryUrl: DEFAULT_SETTINGS.cloudinaryUrl,
  },
  backup: {
    autoBackup: DEFAULT_SETTINGS.autoBackup,
    backupSchedule: DEFAULT_SETTINGS.backupSchedule,
    backupRetention: DEFAULT_SETTINGS.backupRetention,
  },
};

const TABS = [
  { value: 'general',    label: 'General',      icon: SettingsIcon },
  { value: 'appearance', label: 'Appearance',   icon: Palette },
  { value: 'email',      label: 'Email SMTP',   icon: Mail },
  { value: 'apiKeys',    label: 'API Keys',     icon: Key },
  { value: 'backup',     label: 'Backup',       icon: Database },
  { value: 'danger',     label: 'Danger Zone',  icon: AlertTriangle },
];

function mergeSettings(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return DEFAULT_STRUCTURE;
  return {
    general: { ...DEFAULT_STRUCTURE.general, ...(raw.general || raw) },
    appearance: { ...DEFAULT_STRUCTURE.appearance, ...(raw.appearance || {}) },
    email: { ...DEFAULT_STRUCTURE.email, ...(raw.email || {}) },
    apiKeys: { ...DEFAULT_STRUCTURE.apiKeys, ...(raw.apiKeys || {}) },
    backup: { ...DEFAULT_STRUCTURE.backup, ...(raw.backup || {}) },
  };
}

export default function Settings() {
  const [section, setSection] = useState('general');
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then((raw) => setSettings(mergeSettings(raw)))
      .catch(() => setSettings(DEFAULT_STRUCTURE));
  }, []);

  const update = (key, val) => setSettings((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings(settings);
      toast.success('Settings saved');
    } catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const handleReset = async () => {
    await resetSettings();
    setSettings(DEFAULT_STRUCTURE);
  };

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your application preferences"
        actions={<Button size="sm" icon={Save} onClick={handleSave} loading={saving}>Save Changes</Button>}
      />

      <Card>
        <Tabs tabs={TABS} active={section} onChange={setSection} />
        <CardBody className="p-6">
          {section === 'general' && <GeneralSettings data={settings.general} onChange={(v) => update('general', v)} />}
          {section === 'appearance' && <AppearanceSettings data={settings.appearance} onChange={(v) => update('appearance', v)} />}
          {section === 'email' && <EmailSettings data={settings.email} onChange={(v) => update('email', v)} />}
          {section === 'apiKeys' && <ApiKeysSettings data={settings.apiKeys} onChange={(v) => update('apiKeys', v)} />}
          {section === 'backup' && <BackupSettings data={settings.backup} onChange={(v) => update('backup', v)} />}
          {section === 'danger' && <DangerZone onReset={handleReset} />}
        </CardBody>
      </Card>
    </div>
  );
}
