import { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';

export default function ReplyBox({ message, onSend, onCancel }) {
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const quickReplies = [
    'Thank you for reaching out! I will review your project details and get back to you within 24 hours.',
    'Hi! I appreciate your interest. Let us schedule a call to discuss further.',
    'Thanks for the inquiry! I am available to start this week.',
  ];

  const handleSend = async () => {
    if (!body.trim()) return;
    setSending(true);
    try {
      await onSend(body);
      setBody('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickReplies.map((qr, i) => (
          <button
            key={i}
            onClick={() => setBody(qr)}
            className="shrink-0 text-[11px] px-2.5 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition whitespace-nowrap"
          >
            {qr.length > 50 ? qr.slice(0, 50) + '...' : qr}
          </button>
        ))}
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`Reply to ${message?.name || ''}...`}
        rows={3}
        className={cn(
          'w-full px-3 py-2.5 text-sm rounded-lg resize-none',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500'
        )}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 transition"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 transition"
            title="Emoji"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            size="sm"
            icon={Send}
            loading={sending}
            disabled={!body.trim()}
            onClick={handleSend}
          >
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
