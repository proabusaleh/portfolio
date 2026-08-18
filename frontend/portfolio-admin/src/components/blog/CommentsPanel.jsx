import { Check, Trash2, X, MessageSquare, Clock } from 'lucide-react';
import { cn, timeAgo } from '../../lib/utils';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function CommentsPanel({
  comments,
  onApprove,
  onDelete,
  onMarkSpam,
  loading,
}) {
  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-sm font-medium text-gray-500">No comments to review</p>
        <p className="text-xs text-gray-400 mt-1">All caught up!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={cn(
            'p-4 space-y-2 transition',
            comment.status === 'spam' && 'opacity-50'
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold">{comment.author}</span>
                <span className="text-xs text-gray-400">&lt;{comment.email}&gt;</span>
                <Badge
                  variant={
                    comment.status === 'approved'
                      ? 'success'
                      : comment.status === 'spam'
                      ? 'danger'
                      : 'warning'
                  }
                  size="sm"
                >
                  {comment.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo(comment.createdAt)} · on "{comment.postIdTitle}"
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {comment.body}
          </p>

          {comment.status !== 'approved' && comment.status !== 'spam' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="success"
                icon={Check}
                onClick={() => onApprove(comment.id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                icon={X}
                onClick={() => onMarkSpam(comment.id)}
              >
                Spam
              </Button>
              <Button
                size="sm"
                variant="ghost"
                icon={Trash2}
                onClick={() => onDelete(comment.id)}
                className="text-red-500"
              >
                Delete
              </Button>
            </div>
          )}

          {comment.status === 'approved' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                icon={Trash2}
                onClick={() => onDelete(comment.id)}
                className="text-red-500"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
