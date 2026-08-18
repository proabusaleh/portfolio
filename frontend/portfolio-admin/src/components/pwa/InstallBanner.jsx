import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Download, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

const DISMISS_KEY = 'pwa-install-dismissed';

export default function InstallBanner() {
  const { t } = useTranslation();
  const { canInstall, promptInstall, installed } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem(DISMISS_KEY) === '1'
  );
  const [installing, setInstalling] = useState(false);

  const handleInstall = async () => {
    setInstalling(true);
    const accepted = await promptInstall();
    if (accepted) {
      toast.success(t('install.installed'));
    }
    setInstalling(false);
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, '1');
  };

  if (installed || !canInstall || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-40"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-gray-900">
          {/* Gradient header */}
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-500 p-4">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-bold">{t('install.title')}</p>
                <p className="text-xs opacity-90">{t('install.description')}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Feature icon={Zap}       label="Fast"       />
              <Feature icon={Download}  label="Offline"    />
              <Feature icon={Smartphone} label="Native feel" />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleDismiss}
              >
                {t('install.later')}
              </Button>
              <Button
                size="sm"
                fullWidth
                icon={Download}
                loading={installing}
                onClick={handleInstall}
              >
                {t('install.install')}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Feature({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <Icon className="w-4 h-4 text-indigo-500" />
      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}
