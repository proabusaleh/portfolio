import { cn } from '../../lib/utils';
import { highlightMatch } from '../../lib/fuzzySearch';
import {
  LayoutDashboard, FolderKanban, FileText, Wrench, Sparkles,
  MessageSquareQuote, Inbox, FileUser, Images, Mail, PhoneCall,
  Search, BarChart3, Users, Activity, Settings, Plus, UserPlus,
  Download, Moon, PanelLeftClose,
} from 'lucide-react';

const ICONS = {
  LayoutDashboard, FolderKanban, FileText, Wrench, Sparkles,
  MessageSquareQuote, Inbox, FileUser, Images, Mail, PhoneCall,
  Search, BarChart3, Users, Activity, Settings, Plus, UserPlus,
  Download, Moon, PanelLeftClose,
};

export default function CommandItem({ command, isSelected, onClick }) {
  const IconComp = ICONS[command.icon] || LayoutDashboard;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition',
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
      )}
    >
      <IconComp className="w-4 h-4 shrink-0 opacity-60" />
      <span
        className="flex-1 truncate"
        dangerouslySetInnerHTML={{ __html: highlightMatch(command.label, command.indices || []) }}
      />
      {command.keywords && (
        <span className="text-[10px] text-gray-400 hidden sm:inline">
          {command.keywords[0]}
        </span>
      )}
    </button>
  );
}
