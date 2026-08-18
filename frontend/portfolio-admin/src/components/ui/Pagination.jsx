import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import Select from './Select';
import { PAGINATION } from '../../lib/constants';

export default function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  /* Build compact page numbers: 1 ... 4 5 6 ... 12 */
  const getPages = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
      {/* Info + page size */}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>
          Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{start}-{end}</span> of{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">{total}</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Rows:</span>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={PAGINATION.PAGE_SIZES.map((n) => ({ value: n, label: String(n) }))}
            placeholder=""
            className="w-16 py-1 text-xs"
          />
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        <PageBtn onClick={() => onPageChange(1)} disabled={!canPrev} icon={ChevronsLeft} />
        <PageBtn onClick={() => onPageChange(page - 1)} disabled={!canPrev} icon={ChevronLeft} />

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={i} className="px-2 text-gray-400 text-sm">…</span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={cn(
                'min-w-[32px] h-8 rounded-lg text-xs font-medium transition',
                p === page
                  ? 'bg-gradient-primary text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {p}
            </button>
          )
        )}

        <PageBtn onClick={() => onPageChange(page + 1)} disabled={!canNext} icon={ChevronRight} />
        <PageBtn onClick={() => onPageChange(totalPages)} disabled={!canNext} icon={ChevronsRight} />
      </div>
    </div>
  );
}

function PageBtn({ icon: Icon, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-lg text-gray-500',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'disabled:opacity-40 disabled:cursor-not-allowed'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}