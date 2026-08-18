import { ROLES } from '../../data/usersData';
import { cn } from '../../lib/utils';

const VARIANTS = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
  editor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  author: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  viewer: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function RoleBadge({ role, size = 'sm' }) {
  const r = ROLES.find((r) => r.id === role);
  if (!r) return null;
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      VARIANTS[role] || VARIANTS.viewer,
    )}>
      {r.label}
    </span>
  );
}
