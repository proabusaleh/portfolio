import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Button from '../ui/Button';

export default function UpdatePrompt() {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
  });

  if (!needRefresh || dismissed) return null;

  const handleUpdate = () => updateServiceWorker(true);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
      >
        <div className="rounded-xl shadow-2xl border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white shrink-0"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold">{t('update.title')}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t('update.description')}
                </p>
              </div>

              <button
                onClick={() => { setDismissed(true); setNeedRefresh(false); }}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" fullWidth onClick={() => setDismissed(true)}>
                {t('update.later')}
              </Button>
              <Button size="sm" fullWidth icon={RefreshCw} onClick={handleUpdate}>
                {t('update.reload')}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
