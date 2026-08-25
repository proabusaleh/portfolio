import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, LogOut, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, PATHS } from '../../router/routes';
import { useLayoutStore } from '../../store/layoutStore';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

const SITE_URL = import.meta.env.VITE_SITE_URL || '/';

export default function Sidebar() {
  const { collapsed, toggleCollapsed } = useLayoutStore();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={cn(
        'hidden lg:flex flex-col',
        'h-screen sticky top-0',
        'bg-white dark:bg-gray-900',
        'border-r border-gray-200 dark:border-gray-800',
        'overflow-hidden'
      )}
    >
      {/* ── Logo ── */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        {!collapsed && (
          <Link
            to={PATHS.DASHBOARD}
            className="flex items-center gap-2 min-w-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
            <span className="font-bold text-base truncate">
              Portfolio
            </span>
          </Link>
        )}

        {collapsed && (
          <Link
            to={PATHS.DASHBOARD}
            className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm mx-auto"
          >
            A
          </Link>
        )}

        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_ITEMS.map((section) => (
          <div key={section.sectionKey}>
            {!collapsed && (
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
                {section.sectionKey ? t(section.sectionKey) : section.section}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  active={location.pathname === item.path}
                  t={t}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom: View Site / Collapse toggle / Logout ── */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3 shrink-0 space-y-2">
        {/* View Site */}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={collapsed ? 'View Site' : undefined}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span>View Site</span>}
        </a>

        {collapsed ? (
          <button
            onClick={toggleCollapsed}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Expand sidebar"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        ) : (
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        )}
      </div>
    </motion.aside>
  );
}

/* ─────────────────────────────────────────────────────────── */

function SidebarItem({ item, collapsed, active, t }) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.path}
        title={collapsed ? t(item.labelKey) : undefined}
        className={cn(
          'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
          active
            ? 'bg-gradient-primary text-white shadow-md shadow-indigo-500/20'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <Icon className={cn('w-4 h-4 shrink-0', active && 'text-white')} />

        {!collapsed && (
          <>
            <span className="flex-1 truncate">{t(item.labelKey)}</span>
            {item.badge && (
              <Badge
                variant={active ? 'default' : 'danger'}
                size="sm"
                className={active ? 'bg-white/20 text-white' : ''}
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}

        {collapsed && item.badge && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        )}
      </Link>
    </li>
  );
}
