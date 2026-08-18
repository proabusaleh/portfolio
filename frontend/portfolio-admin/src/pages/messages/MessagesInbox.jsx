import { useState, useEffect, useCallback } from 'react';
import {
  Search, Trash2, MailCheck,
  Download, RefreshCw,
} from 'lucide-react';

import { cn } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';

import FilterTabs from '../../components/messages/FilterTabs';
import MessageList from '../../components/messages/MessageList';
import MessageDetail from '../../components/messages/MessageDetail';
import MessageEmpty from '../../components/messages/MessageEmpty';

import {
  getMessages,
  getMessage,
  markAsRead,
  markMultipleAsRead,
  toggleStar,
  deleteMessage,
  deleteMessages,
  sendReply,
  exportMessages,
} from '../../api/messagesApi';
import { useDebounce } from '../../hooks/useDebounce';
import { toast } from 'sonner';

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState({ total: 0, unread: 0, starred: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(new Set());

  const debouncedSearch = useDebounce(search, 300);

  /* ── Fetch messages ── */
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMessages({ search: debouncedSearch, filter });
      setMessages(res.data);
      setMeta(res.meta);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /* ── Select message ── */
  const handleSelect = useCallback(
    async (id) => {
      setActiveId(id);
      try {
        const msg = await getMessage(id);
        setActiveMessage(msg);
        if (msg.unread) {
          await markAsRead(id);
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
          );
          setMeta((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
        }
      } catch {
        toast.error('Message not found');
      }
    },
    []
  );

  /* ── Toggle star ── */
  const handleToggleStar = useCallback(async (id) => {
    try {
      const updated = await toggleStar(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, starred: updated.starred } : m))
      );
      setMeta((prev) => ({
        ...prev,
        starred: updated.starred ? prev.starred + 1 : prev.starred - 1,
      }));
      setActiveMessage((prev) =>
        prev?.id === id ? { ...prev, starred: updated.starred } : prev
      );
    } catch {
      toast.error('Failed to update star');
    }
  }, []);

  /* ── Delete ── */
  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteMessage(id);
        toast.success('Message deleted');
        if (activeId === id) {
          setActiveId(null);
          setActiveMessage(null);
        }
        fetchMessages();
      } catch {
        toast.error('Failed to delete');
      }
    },
    [activeId, fetchMessages]
  );

  /* ── Bulk delete ── */
  const handleBulkDelete = useCallback(async () => {
    if (selected.size === 0) return;
    try {
      await deleteMessages([...selected]);
      toast.success(`${selected.size} message(s) deleted`);
      setSelected(new Set());
      if (selected.has(activeId)) {
        setActiveId(null);
        setActiveMessage(null);
      }
      fetchMessages();
    } catch {
      toast.error('Failed to delete messages');
    }
  }, [selected, activeId, fetchMessages]);

  /* ── Bulk mark as read ── */
  const handleBulkMarkRead = useCallback(async () => {
    if (selected.size === 0) return;
    try {
      await markMultipleAsRead([...selected]);
      toast.success(`${selected.size} message(s) marked as read`);
      setSelected(new Set());
      fetchMessages();
    } catch {
      toast.error('Failed to mark as read');
    }
  }, [selected, fetchMessages]);

  /* ── Reply ── */
  const handleReply = useCallback(
    async (id, body) => {
      try {
        await sendReply(id, { body });
        toast.success('Reply sent!');
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, replied: true } : m))
        );
        setActiveMessage((prev) =>
          prev?.id === id ? { ...prev, replied: true } : prev
        );
      } catch {
        toast.error('Failed to send reply');
      }
    },
    []
  );

  /* ── Export ── */
  const handleExport = useCallback(async () => {
    try {
      const ids = selected.size > 0 ? [...selected] : null;
      const csv = await exportMessages(ids);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'messages-export.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Messages exported');
    } catch {
      toast.error('Export failed');
    }
  }, [selected]);

  /* ── Select all toggle ── */
  const allSelected = messages.length > 0 && selected.size === messages.length;
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(messages.map((m) => m.id)));
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader
        title="Messages"
        subtitle={`${meta.unread} unread of ${meta.total} total`}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={fetchMessages}
            >
              Refresh
            </Button>
          </>
        }
      />

      <div className="flex-1 flex flex-col lg:flex-row gap-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-0">
        {/* ─── LEFT PANEL ─── */}
        <div
          className={cn(
            'w-full lg:w-[400px] xl:w-[440px] flex flex-col border-r border-gray-200 dark:border-gray-800',
            activeId ? 'hidden lg:flex' : 'flex'
          )}
        >
          {/* Toolbar */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-800 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  'w-full pl-9 pr-3 py-2 text-sm rounded-lg',
                  'bg-gray-50 dark:bg-gray-800/50',
                  'border border-gray-200 dark:border-gray-700',
                  'placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500'
                )}
              />
            </div>

            {/* Filter tabs + bulk actions */}
            <div className="flex items-center justify-between gap-2">
              <FilterTabs active={filter} onChange={setFilter} counts={meta} />

              {selected.size > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 mr-1">
                    {selected.size} selected
                  </span>
                  <button
                    onClick={handleBulkMarkRead}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition"
                    title="Mark as read"
                  >
                    <MailCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition"
                    title="Delete selected"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Select all checkbox */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 dark:border-gray-800/50">
            <Checkbox
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <span className="text-xs text-gray-500">
              {messages.length} conversation{messages.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto">
            <MessageList
              messages={messages.map((m) => ({
                ...m,
                _onToggleStar: () => handleToggleStar(m.id),
              }))}
              activeId={activeId}
              onSelect={handleSelect}
              loading={loading}
            />
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div
          className={cn(
            'flex-1 flex flex-col min-h-0',
            !activeId ? 'hidden lg:flex' : 'flex'
          )}
        >
          {activeMessage ? (
            <MessageDetail
              message={activeMessage}
              onMarkAsRead={markAsRead}
              onToggleStar={handleToggleStar}
              onDelete={handleDelete}
              onReply={handleReply}
              onBack={() => {
                setActiveId(null);
                setActiveMessage(null);
              }}
            />
          ) : (
            <MessageEmpty />
          )}
        </div>
      </div>
    </div>
  );
}
