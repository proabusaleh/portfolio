import { MoreVertical, Edit, Eye, Copy, Trash2, Star, Archive } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

export default function RowActions({ item, actions }) {
  return (
    <Dropdown
      align="right"
      width="w-48"
      trigger={
        <button
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 opacity-60 hover:opacity-100 transition"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      }
    >
      <div className="p-1">
        {actions.map((action, i) =>
          action.divider ? (
            <div key={i} className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
          ) : (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(item);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                action.danger ? 'text-red-600 dark:text-red-400' : ''
              }`}
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </button>
          )
        )}
      </div>
    </Dropdown>
  );
}

// Preset icons for common project actions
export const PROJECT_ACTION_ICONS = { Edit, Eye, Copy, Trash2, Star, Archive };