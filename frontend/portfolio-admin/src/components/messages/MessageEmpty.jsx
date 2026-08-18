import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessageEmpty() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/40 dark:to-purple-950/40 mb-4">
          <Mail className="w-12 h-12 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Select a message</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choose a conversation from the list to view details and reply
        </p>
      </motion.div>
    </div>
  );
}