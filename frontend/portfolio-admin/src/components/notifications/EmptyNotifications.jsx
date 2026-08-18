import { Bell, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyNotifications({
  title = "You're all caught up!",
  description = 'No new notifications right now',
  celebrating = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-12 px-6"
    >
      <div className="relative w-16 h-16 mx-auto mb-4">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center"
        >
          {celebrating ? (
            <PartyPopper className="w-8 h-8 text-indigo-500" />
          ) : (
            <Bell className="w-8 h-8 text-indigo-500" />
          )}
        </motion.div>
      </div>

      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}