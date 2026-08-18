import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function OfflineIndicator() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline]     = useState(navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const online = () => {
      setIsOnline(true);
      setShowRestored(true);
      toast.success(t('offline.restored'), { icon: '\uD83C\uDF10' });
      setTimeout(() => setShowRestored(false), 3000);
    };
    const offline = () => {
      setIsOnline(false);
      toast.error(t('offline.title'), { icon: '\uD83D\uDCE1', duration: 5000 });
    };

    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, [t]);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-4 py-2 text-sm">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WifiOff className="w-4 h-4" />
            </motion.div>
            <span className="font-semibold">{t('offline.title')}</span>
            <span className="opacity-90 hidden sm:inline">— {t('offline.description')}</span>
          </div>
        </motion.div>
      )}

      {showRestored && isOnline && (
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-4 py-2 text-sm">
            <Wifi className="w-4 h-4" />
            <span className="font-semibold">{t('offline.restored')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
