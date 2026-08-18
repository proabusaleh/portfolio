import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RatingInput({ value = 0, onChange, size = 'md', readOnly = false, showLabel = false, className }) {
  const [hover, setHover] = useState(0);

  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={cn('focus:outline-none transition-transform', !readOnly && 'hover:scale-110')}
        >
          <Star
            className={cn(
              sizes[size],
              'transition-colors',
              (hover || value) >= star
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            )}
          />
        </button>
      ))}
      {showLabel && <span className="text-xs text-gray-500 ml-1">{value}/5</span>}
    </div>
  );
}
