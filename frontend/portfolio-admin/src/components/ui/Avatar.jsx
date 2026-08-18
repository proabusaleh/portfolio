import { cn, getInitials } from '../../lib/utils';

export default function Avatar({
  src,
  name = '',
  size = 'md',
  className,
  status,   // 'online' | 'offline' | 'away'
}) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const statusColors = {
    online:  'bg-green-500',
    offline: 'bg-gray-400',
    away:    'bg-yellow-500',
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover ring-2 ring-white dark:ring-gray-900',
            sizes[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-primary text-white font-semibold',
            'flex items-center justify-center ring-2 ring-white dark:ring-gray-900',
            sizes[size]
          )}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-gray-900',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}