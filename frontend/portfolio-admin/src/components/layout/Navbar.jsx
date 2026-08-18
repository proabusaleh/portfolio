import { Menu, Search, Command } from 'lucide-react';
import { useLayoutStore } from '../../store/layoutStore';
import { useCommandStore } from '../../store/commandStore';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import NotificationDropdown from '../notifications/NotificationDropdown';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { openMobile } = useLayoutStore();
  const openPalette = useCommandStore((s) => s.openPalette);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="h-full px-4 lg:px-6 flex items-center gap-3">

        {/* Mobile menu button */}
        <button
          onClick={openMobile}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-xl">
          <button onClick={openPalette} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left group">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="flex-1 text-sm text-gray-400 truncate hidden sm:block">
              Search projects, blog posts, messages...
            </span>
            <span className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 shrink-0">
              <Command className="w-3 h-3" /> K
            </span>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <ThemeToggle />
          <NotificationDropdown />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
