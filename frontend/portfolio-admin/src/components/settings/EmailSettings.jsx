import { useState } from 'react';
import { Mail, TestTube, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import SectionCard from '../resume/SectionCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import MaskedKeyInput from './MaskedKeyInput';
import { sendTestEmail } from '../../api/settingsApi';

const SMTP_PRESETS = {
  gmail:    { host: 'smtp.gmail.com',      port: 587, secure: 'tls' },
  outlook:  { host: 'smtp-mail.outlook.com', port: 587, secure: 'tls' },
  yahoo:    { host: 'smtp.mail.yahoo.com', port: 587, secure: 'tls' },
  sendgrid: { host: 'smtp.sendgrid.net',   port: 587, secure: 'tls' },
  mailgun:  { host: 'smtp.mailgun.org',    port: 587, secure: 'tls' },
};

export default function EmailSettings({ data, onChange }) {
  const [testEmail, setTestEmail] = useState('');
  const [testing, setTesting]     = useState(false);

  const update = (field, value) => onChange({ ...data, [field]: value });

  const applyPreset = (preset) => {
    const p = SMTP_PRESETS[preset];
    if (p) {
      onChange({ ...data, smtpHost: p.host, smtpPort: p.port, smtpSecure: p.secure });
      toast.success(`${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied`);
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      toast.error('Enter a recipient email');
      return;
    }
    setTesting(true);
    try {
      await sendTestEmail(testEmail, data);
      toast.success(`✉️ Test email sent to ${testEmail}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <SectionCard
      icon={Mail}
      title="Email (SMTP) Settings"
      description="Configure how the app sends emails"
      actions={
        <Toggle
          checked={data.smtpEnabled}
          onChange={(v) => update('smtpEnabled', v)}
          label="Enable SMTP"
        />
      }
    >
      {!data.smtpEnabled && (
        <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 text-xs text-yellow-700 dark:text-yellow-300 mb-4">
          ⚠ SMTP is disabled. Emails will not be sent from the app until enabled.
        </div>
      )}

      {/* Presets */}
      <div>
        <label className="text-sm font-medium mb-2 block">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(SMTP_PRESETS).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-300 transition capitalize"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Input
            label="SMTP Host"
            placeholder="smtp.example.com"
            value={data.smtpHost}
            onChange={(e) => update('smtpHost', e.target.value)}
          />
        </div>
        <Input
          label="Port"
          type="number"
          value={data.smtpPort}
          onChange={(e) => update('smtpPort', parseInt(e.target.value) || 0)}
        />
      </div>

      <Select
        label="Security"
        value={data.smtpSecure}
        onChange={(val) => update('smtpSecure', val)}
        options={[
          { value: 'none', label: 'None' },
          { value: 'tls',  label: 'TLS (recommended)' },
          { value: 'ssl',  label: 'SSL' },
        ]}
        placeholder=""
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Username"
          placeholder="user@example.com"
          value={data.smtpUser}
          onChange={(e) => update('smtpUser', e.target.value)}
        />
        <MaskedKeyInput
          label="Password / App Password"
          value={data.smtpPassword}
          onChange={(v) => update('smtpPassword', v)}
          placeholder="Your SMTP password"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">
          Sender Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="From Name"
            placeholder="Your Name"
            value={data.smtpFromName}
            onChange={(e) => update('smtpFromName', e.target.value)}
          />
          <Input
            label="From Email"
            type="email"
            placeholder="noreply@example.com"
            value={data.smtpFromEmail}
            onChange={(e) => update('smtpFromEmail', e.target.value)}
          />
        </div>
      </div>

      {/* Test email */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-4 h-4 text-indigo-500" />
            <h4 className="text-sm font-semibold">Send Test Email</h4>
          </div>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-3">
            Verify your SMTP configuration is working
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-gray-900"
            />
            <Button icon={TestTube} onClick={handleTest} loading={testing}>
              Send Test
            </Button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}