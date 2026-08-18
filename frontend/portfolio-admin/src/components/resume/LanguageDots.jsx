import { cn } from '../../lib/utils';

export default function LanguageDots({ level, max = 5, size = 'md', onLevelChange, readOnly = false }) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div className="inline-flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onLevelChange?.(i + 1)}
          className={cn(
            'rounded-full transition',
            sizes[size],
            i < level ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-700',
            !readOnly && 'hover:scale-125 cursor-pointer'
          )}
        />
      ))}
    </div>
  );
}