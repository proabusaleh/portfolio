import { motion } from 'framer-motion';

export default function EmailPreview({ subject, preheader, from, content, recipientName = 'John' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto"
    >
      {/* Email client header */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-3 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">📧 Inbox Preview</p>
      </div>

      {/* Email content */}
      <div className="bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {from || 'Your Name <you@example.com>'}
              </p>
              <p className="text-xs text-gray-500">to {recipientName}</p>
            </div>
          </div>
          <h2 className="font-bold text-lg mt-2 leading-tight">
            {subject || 'Your email subject'}
          </h2>
          {preheader && (
            <p className="text-xs text-gray-500 mt-1 italic">
              {preheader}
            </p>
          )}
        </div>

        {/* Body */}
        <div
          className="p-6 prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 italic">Your email body will appear here...</p>' }}
        />

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-center text-xs text-gray-500">
          <p>You received this email because you subscribed to our newsletter.</p>
          <p className="mt-1">
            <a href="#" className="text-indigo-500 hover:underline">Unsubscribe</a> ·{' '}
            <a href="#" className="text-indigo-500 hover:underline">View in browser</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}