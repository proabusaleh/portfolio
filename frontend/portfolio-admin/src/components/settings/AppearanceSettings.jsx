import { Palette, Type, Layout, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionCard from '../resume/SectionCard';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import ColorSwatch from './ColorSwatch';
import { FONTS, COLOR_PRESETS } from '../../data/settingsData';
import { cn } from '../../lib/utils';

export default function AppearanceSettings({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  const applyPreset = (preset) => {
    onChange({ ...data, primaryColor: preset.primary, accentColor: preset.accent });
  };

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <SectionCard
        icon={Palette}
        title="Theme Mode"
        description="Choose how your dashboard looks"
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light',  label: 'Light',  icon: '☀️', gradient: 'from-yellow-50 to-orange-50' },
            { value: 'dark',   label: 'Dark',   icon: '🌙', gradient: 'from-indigo-950 to-purple-950' },
            { value: 'system', label: 'System', icon: '💻', gradient: 'from-gray-50 to-gray-100' },
          ].map((t) => {
            const isActive = data.themeMode === t.value;
            return (
              <motion.button
                key={t.value}
                type="button"
                onClick={() => update('themeMode', t.value)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'relative p-4 rounded-xl border-2 transition-all text-center',
                  isActive
                    ? 'border-indigo-500 shadow-md'
                    : 'border-gray-200 dark:border-gray-800 hover:border-indigo-300'
                )}
              >
                <div className={`aspect-square max-w-[60px] mx-auto rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-3xl mb-2`}>
                  {t.icon}
                </div>
                <p className="text-sm font-semibold">{t.label}</p>
                {isActive && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </SectionCard>

      {/* Colors */}
      <SectionCard
        icon={Palette}
        title="Brand Colors"
        description="Customize your accent colors"
      >
        {/* Presets */}
        <div>
          <label className="text-sm font-medium mb-2 block">Quick presets</label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {COLOR_PRESETS.map((p) => {
              const isActive = data.primaryColor === p.primary;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  title={p.name}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden transition-all relative',
                    isActive && 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900 scale-105'
                  )}
                >
                  <div className="w-full h-full flex">
                    <div className="w-1/2" style={{ backgroundColor: p.primary }} />
                    <div className="w-1/2" style={{ backgroundColor: p.accent }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
          <ColorSwatch
            label="Primary Color"
            value={data.primaryColor}
            onChange={(v) => update('primaryColor', v)}
          />
          <ColorSwatch
            label="Accent Color"
            value={data.accentColor}
            onChange={(v) => update('accentColor', v)}
          />

          {/* Preview */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <p className="text-xs uppercase font-semibold text-gray-500 mb-3">Preview</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md"
                style={{ background: `linear-gradient(135deg, ${data.primaryColor}, ${data.accentColor})` }}
              >
                Gradient Button
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md"
                style={{ backgroundColor: data.primaryColor }}
              >
                Primary
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md"
                style={{ backgroundColor: data.accentColor }}
              >
                Accent
              </button>
              <div
                className="w-10 h-10 rounded-full"
                style={{ background: `linear-gradient(135deg, ${data.primaryColor}, ${data.accentColor})` }}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Typography */}
      <SectionCard
        icon={Type}
        title="Typography"
        description="Choose your dashboard font"
      >
        <Select
          label="Font Family"
          value={data.fontFamily}
          onChange={(val) => update('fontFamily', val)}
          options={FONTS}
          placeholder=""
        />

        {/* Font preview */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800" style={{ fontFamily: data.fontFamily }}>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Preview · {data.fontFamily}</p>
          <p className="text-3xl font-bold mb-1">Aa Bb Cc</p>
          <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
          <p className="text-xs text-gray-500 mt-1">1234567890 !@#$%^&*()</p>
        </div>
      </SectionCard>

      {/* Layout */}
      <SectionCard
        icon={Layout}
        title="Layout & UX"
        description="Fine-tune the dashboard experience"
      >
        <Select
          label="Border Radius"
          value={data.borderRadius}
          onChange={(val) => update('borderRadius', val)}
          options={[
            { value: 'small',  label: 'Small (4px)' },
            { value: 'medium', label: 'Medium (8px) - default' },
            { value: 'large',  label: 'Large (12px)' },
          ]}
          placeholder=""
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <Toggle
              checked={data.animations}
              onChange={(v) => update('animations', v)}
              label="✨ Enable animations"
              description="Smooth transitions & motion"
            />
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <Toggle
              checked={data.compactMode}
              onChange={(v) => update('compactMode', v)}
              label="📐 Compact mode"
              description="Denser spacing everywhere"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}