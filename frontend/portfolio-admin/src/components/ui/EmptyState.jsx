import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'Try adjusting your search or filters.',
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-4">
        {description}
      </p>
      {action}
    </motion.div>
  );
}