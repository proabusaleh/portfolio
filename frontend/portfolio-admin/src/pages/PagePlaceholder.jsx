import { Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PagePlaceholder({
  title = 'Coming Soon',
  description = 'This page is under construction.',
  icon: Icon = Construction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[70vh] flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-primary text-white mb-4">
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}