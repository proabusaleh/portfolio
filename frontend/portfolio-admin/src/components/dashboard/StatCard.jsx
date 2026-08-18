import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  FolderKanban,
  MessageSquare,
  Users,
} from 'lucide-react';
import Card from '../ui/Card';
import { cn, formatNumber } from '../../lib/utils';

const ICONS = {
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
};

export default function StatCard({
  label,
  value,
  change,
  trend = 'up',
  icon,
  color,
  period,
  className,
}) {
  const Icon = ICONS[icon] || FolderKanban;
  const up = trend === 'up';
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;
  const displayChange = `${change > 0 ? '+' : ''}${change}%`;

  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white',
            color
          )}
        >
          <Icon size={20} />
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium',
            up
              ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
              : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
          )}
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {displayChange}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">{displayValue}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
      {period && <p className="mt-0.5 text-[10px] text-gray-400">{period}</p>}
    </Card>
  );
}
