import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-gradient-primary text-white hover:opacity-90 shadow-md shadow-indigo-500/20',
  outline: 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
  ghost:   'hover:bg-gray-100 dark:hover:bg-gray-800',
  danger:  'bg-red-500 text-white hover:bg-red-600',
  success: 'bg-green-500 text-white hover:bg-green-600',
};

const sizes = {
  xs: 'text-[11px] px-2.5 py-1 rounded-md',
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  xl: 'text-base px-6 py-3',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    icon: Icon,
    iconRight: IconRight,
    fullWidth,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className={cn('animate-spin', size === 'xs' ? 'w-3 h-3' : 'w-4 h-4')} />
      ) : (
        Icon && <Icon className={cn(size === 'xs' ? 'w-3 h-3' : 'w-4 h-4')} />
      )}
      {children}
      {!loading && IconRight && <IconRight className="w-4 h-4" />}
    </button>
  );
});

export default Button;