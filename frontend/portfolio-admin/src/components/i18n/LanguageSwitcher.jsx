import { Globe, Check } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { useI18nStore } from '../../store/i18nStore';
import { AVAILABLE_LANGUAGES } from '../../i18n';
import { cn } from '../../lib/utils';

export default function LanguageSwitcher({ compact = false }) {
  const currentLang = useI18nStore((s) => s.currentLang);
  const setLanguage = useI18nStore((s) => s.setLanguage);

  const current = AVAILABLE_LANGUAGES.find((l) => l.code === currentLang) || AVAILABLE_LANGUAGES[0];

  return (
    <Dropdown
      align="right"
      width="w-48"
      trigger={
        <button
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm',
            compact && '!px-2'
          )}
          aria-label="Change language"
          title={`Language: ${current.nativeName}`}
        >
          <span className="text-lg leading-none">{current.flag}</span>
          {!compact && (
            <span className="text-xs font-medium hidden sm:block">
              {current.nativeName}
            </span>
          )}
        </button>
      }
    >
      <div className="p-1">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Globe className="w-3 h-3" /> Choose language
        </p>

        {AVAILABLE_LANGUAGES.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/30'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{lang.nativeName}</p>
                <p className="text-[10px] text-gray-500">{lang.label}</p>
              </div>
              {isActive && (
                <Check className="w-4 h-4 text-indigo-500" />
              )}
            </button>
          );
        })}
      </div>
    </Dropdown>
  );
}
