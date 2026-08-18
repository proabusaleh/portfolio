import MessageItem from './MessageItem';
import EmptyState from '../ui/EmptyState';
import { MailOpen } from 'lucide-react';

export default function MessageList({ messages, activeId, onSelect, loading }) {
  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={MailOpen}
        title="No messages found"
        description="No messages match your current filter."
      />
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isActive={msg.id === activeId}
          onClick={() => onSelect(msg.id)}
        />
      ))}
    </div>
  );
}
