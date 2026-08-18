import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MailOpen, Star, Trash2, Reply,
  ArrowLeft,
} from 'lucide-react';
import { cn, formatDate, timeAgo } from '../../lib/utils';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ReplyBox from './ReplyBox';
import SmartInsights from './SmartInsights';

export default function MessageDetail({
  message,
  onToggleStar,
  onDelete,
  onReply,
  onBack,
}) {
  const [showReply, setShowReply] = useState(false);

  if (!message) return null;

  const handleReply = async (body) => {
    await onReply(message.id, body);
    setShowReply(false);
  };

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold truncate">{message.subject}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            {message.read ? (
              <MailOpen className="w-3.5 h-3.5 text-gray-400" />
            ) : (
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
            )}
            <span className="text-xs text-gray-500">
              {formatDate(message.date, { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon={Reply}
            onClick={() => setShowReply((s) => !s)}
          >
            Reply
          </Button>
          <button
            onClick={() => onToggleStar(message.id)}
            className={cn(
              'p-2 rounded-md transition',
              message.starred
                ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/20'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <Star className="w-4 h-4" fill={message.starred ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sender info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {message.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{message.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &lt;{message.email}&gt;
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{timeAgo(message.date)}</p>
          <div className="flex gap-1 mt-1">
            {message.labels.map((label) => (
              <Badge key={label} variant="default" size="sm">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.message}
          </p>
        </div>

        {/* Smart Insights */}
        <div className="mt-6">
          <SmartInsights message={message} />
        </div>
      </div>

      {/* Reply Box */}
      {showReply && (
        <ReplyBox
          message={message}
          onSend={handleReply}
          onCancel={() => setShowReply(false)}
        />
      )}
    </motion.div>
  );
}
