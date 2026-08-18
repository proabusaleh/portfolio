import { Settings, Globe } from 'lucide-react';
import SectionCard from '../resume/SectionCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import LogoUploader from './LogoUploader';
import { LANGUAGES } from '../../data/settingsData';
import { TIMEZONES } from '../../data/contactData';

export default function GeneralSettings({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  return (
    <SectionCard
      icon={Settings}
      title="General Settings"
      description="Basic site information & preferences"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Site Name"
          value={data.siteName}
          onChange={(e) => update('siteName', e.target.value)}
        />
        <Input
          label="Site Tagline"
          value={data.siteTagline}
          onChange={(e) => update('siteTagline', e.target.value)}
        />
      </div>

      <Input
        label="Site URL"
        icon={Globe}
        placeholder="https://yourportfolio.com"
        value={data.siteUrl}
        onChange={(e) => update('siteUrl', e.target.value)}
      />

      <Input
        label="Admin Email"
        type="email"
        value={data.adminEmail}
        onChange={(e) => update('adminEmail', e.target.value)}
        hint="Where system notifications will be sent"
      />

      {/* Logo & Favicon */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">
          Branding
        </h4>
        <div className="space-y-4">
          <LogoUploader
            label="Site Logo"
            value={data.logo}
            onChange={(v) => update('logo', v)}
            aspect="rect"
            hint="Recommended: 300×100 (transparent PNG or SVG)"
          />
          <LogoUploader
            label="Favicon"
            value={data.favicon}
            onChange={(v) => update('favicon', v)}
            aspect="square"
            hint="Recommended: 512×512 square"
          />
        </div>
      </div>

      {/* Locale */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">
          Localization
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Timezone"
            value={data.timezone}
            onChange={(val) => update('timezone', val)}
            options={TIMEZONES}
            placeholder=""
          />
          <Select
            label="Language"
            value={data.language}
            onChange={(val) => update('language', val)}
            options={LANGUAGES}
            placeholder=""
          />
          <Select
            label="Date Format"
            value={data.dateFormat}
            onChange={(val) => update('dateFormat', val)}
            options={[
              { value: 'MMM DD, YYYY', label: 'May 30, 2024' },
              { value: 'DD/MM/YYYY',   label: '30/05/2024' },
              { value: 'MM/DD/YYYY',   label: '05/30/2024' },
              { value: 'YYYY-MM-DD',   label: '2024-05-30 (ISO)' },
            ]}
            placeholder=""
          />
          <Select
            label="Time Format"
            value={data.timeFormat}
            onChange={(val) => update('timeFormat', val)}
            options={[
              { value: '24', label: '24-hour (14:30)' },
              { value: '12', label: '12-hour (2:30 PM)' },
            ]}
            placeholder=""
          />
        </div>
      </div>
    </SectionCard>
  );
}