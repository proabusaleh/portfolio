import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle, ArrowLeft, Check, X, AlertOctagon, Trash2, Heart, Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';

import { getComments, getCommentsCounts, updateCommentStatus, deleteComment } from '../../api/blogApi';
import { timeAgo, cn } from '../../lib/utils';

export default function BlogComments() {
  const [comments, setComments] = useState([]);
  const [counts, setCounts]     = useState({});
  const [loading, setLoading]   = useState(true);
  const [status, setStatus]     = useState('pending');

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [list, cnt] = await Promise.all([
        getComments({ status }),
        getCommentsCounts(),
      ]);
      setComments(list.data || []);
      setCounts(cnt);
    } catch {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleAction = async (id, action) => {
    try {
      if (action === 'delete') {
        if (!window.confirm('Delete this comment?')) return;
        await deleteComment(id);
        toast.success('Comment deleted');
      } else {
        await updateCommentStatus(id, action);
        toast.success(`Comment ${action}`);
      }
      fetch();
    } catch {
      toast.error('Action failed');
    }
  };

  const TABS = [
    { value: 'pending',  label: 'Pending',  icon: Clock,          count: counts.pending  },
    { value: 'approved', label: 'Approved', icon: Check,          count: counts.approved },
    { value: 'spam',     label: 'Spam',     icon: AlertOctagon,   count: counts.spam     },
  ];

  return (
    <div>
      <PageHeader
        title="Comments Moderation"
        subtitle={`${counts.pending || 0} awaiting review`}
        actions={
          <Link to="/blog">
            <Button variant="outline" icon={ArrowLeft}>Back to Blog</Button>
          </Link>
        }
      />

      <Card>
        <Tabs tabs={TABS} active={status} onChange={setStatus} />

        <CardBody className="p-0">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <EmptyState
              icon={MessageCircle}
              title={`No ${status} comments`}
              description={
                status === 'pending'
                  ? 'You\'re all caught up! No comments waiting for review.'
                  : `No ${status} comments to show.`
              }
            />
          ) : (
            <AnimatePresence initial={false}>
              {comments.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition"
                >
                  <div className="flex gap-3">
                    <Avatar name={c.author} size="md" />

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-sm">{c.author}</span>
                        <a
                          href={`mailto:${c.email}`}
                          className="text-xs text-gray-500 hover:text-indigo-500"
                        >
                          {c.email}
                        </a>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
                        {c.status === 'spam' && (
                          <Badge variant="danger" size="sm">Spam</Badge>
                        )}
                      </div>

                      {/* Post reference */}
                      <p className="text-xs text-gray-500 mt-0.5">
                        on <span className="font-medium text-indigo-500">"{c.post?.title || 'Unknown Post'}"</span>
                      </p>

                      {/* Comment text */}
                      <p className={cn(
                        'text-sm mt-2 leading-relaxed',
                        c.status === 'spam' && 'text-gray-400 italic'
                      )}>
                        {c.content}
                      </p>

                      {/* Meta + actions */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {c.likes} likes
                        </span>
                        <div className="flex items-center gap-1">
                          {c.status !== 'approved' && (
                            <Button
                              size="sm"
                              variant="success"
                              icon={Check}
                              onClick={() => handleAction(c.id, 'approved')}
                            >
                              Approve
                            </Button>
                          )}
                          {c.status !== 'spam' && (
                            <Button
                              size="sm"
                              variant="outline"
                              icon={AlertOctagon}
                              onClick={() => handleAction(c.id, 'spam')}
                            >
                              Spam
                            </Button>
                          )}
                          {c.status !== 'pending' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              icon={X}
                              onClick={() => handleAction(c.id, 'pending')}
                            >
                              Unapprove
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={Trash2}
                            onClick={() => handleAction(c.id, 'delete')}
                            className="!text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </CardBody>
      </Card>
    </div>
  );
}