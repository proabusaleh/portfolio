import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function UploadProgress({ uploads = [], onDismiss }) {
  if (!uploads.length) return null;

  const allDone = uploads.every((u) => u.status === 'done' || u.status === 'error');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 right-6 z-50 w-80 rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <p className="text-sm font-semibold">
          {allDone ? 'Uploads complete' : `Uploading ${uploads.filter((u) => u.status === 'uploading').length} file(s)...`}
        </p>
        {allDone && (
          <button onClick={onDismiss} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="max-h-48 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
        {uploads.map((u) => (
          <div key={u.id} className="flex items-center gap-3 px-4 py-2.5">
            <div className="shrink-0">
              {u.status === 'done' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : u.status === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{u.name}</p>
              {u.status === 'uploading' && (
                <div className="mt-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${u.progress || 0}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
