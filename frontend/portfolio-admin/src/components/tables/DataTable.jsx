import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { TableRowSkeleton } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { cn } from '../../lib/utils';

export default function DataTable({
  columns,
  data,
  loading = false,
  sortBy,
  sortOrder,
  onSort,
  selectable = false,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  onRowClick,
  emptyState,
}) {
  const allSelected = data.length > 0 && data.every((row) => selectedIds.includes(row.id));
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Header */}
        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400',
                  col.align === 'right' ? 'text-right' : 'text-left'
                )}
              >
                {col.sortable ? (
                  <button
                    onClick={() => onSort(col.key)}
                    className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100 transition"
                  >
                    {col.label}
                    <SortIcon active={sortBy === col.key} order={sortOrder} />
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} columns={columns.length + (selectable ? 1 : 0)} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyState || <EmptyState />}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-gray-100 dark:border-gray-800/50 group',
                  'hover:bg-gray-50 dark:hover:bg-gray-800/30 transition',
                  onRowClick && 'cursor-pointer',
                  selectedIds.includes(row.id) && 'bg-indigo-50/40 dark:bg-indigo-950/20'
                )}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onChange={(e) => onSelectRow(row.id, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-sm',
                      col.align === 'right' ? 'text-right' : 'text-left'
                    )}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({ active, order }) {
  if (!active) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
  return order === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
}