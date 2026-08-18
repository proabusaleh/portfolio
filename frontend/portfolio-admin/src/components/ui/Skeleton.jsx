import { cn } from '../../lib/utils';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-800 rounded',
        className
      )}
    />
  );
}

export function TableRowSkeleton({ columns = 6 }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}