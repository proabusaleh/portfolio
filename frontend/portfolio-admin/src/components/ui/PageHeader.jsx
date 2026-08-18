import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function PageHeader({ title, subtitle, actions, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6', className)}
    >
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}