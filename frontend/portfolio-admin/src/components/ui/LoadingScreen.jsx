import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function LoadingScreen({ className, fullscreen = true }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullscreen && 'min-h-screen',
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-indigo-500"
        />
        {/* Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-gray-500 dark:text-gray-400 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}