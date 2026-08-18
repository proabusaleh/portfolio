import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by {APP_CONFIG.author}
        </p>
      </div>
    </footer>
  );
}