import { Link, useLocation } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, PATHS } from '../../router/routes';
import { useLayoutStore } from '../../store/layoutStore';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

export default function MobileDrawer() {
  const { mobileOpen, closeMobile } = useLayoutStore();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <Link
                to={PATHS.DASHBOARD}
                onClick={closeMobile}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span className="font-bold">Portfolio Admin</span>
              </Link>
              <button
                onClick={closeMobile}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
              {NAV_ITEMS.map((section) => (
                <div key={section.sectionKey}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2">
                    {t(section.sectionKey)}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={closeMobile}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                              active
                                ? 'bg-gradient-primary text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="flex-1">{t(item.labelKey)}</span>
                            {item.badge && (
                              <Badge
                                variant={active ? 'default' : 'danger'}
                                className={active ? 'bg-white/20 text-white' : ''}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-3">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}