import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Palette, Mail, Database, Key, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
  { value: 'general',    label: 'General',     icon: SettingsIcon },
  { value: 'appearance', label: 'Appearance',  icon: Palette },
  { value: 'email',      label: 'Email SMTP',  icon: Mail },
  { value: 'apiKeys',    label: 'API Keys',    icon: Key },
  { value: 'backup',     label: 'Backup',      icon: Database },
  { value: 'danger',     label: 'Danger Zone', icon: AlertTriangle, danger: true },
];

export default function SettingsSidebar({ active, onChange }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-2">
      <nav className="space-y-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : tab.danger
                    ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
