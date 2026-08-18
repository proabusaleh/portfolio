import { useEffect, useState, useCallback } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

import FilterTabs from '../../components/messages/FilterTabs';
import MessageList from '../../components/messages/MessageList';
import MessageDetail from '../../components/messages/MessageDetail';
import MessageEmpty from '../../components/messages/MessageEmpty';

import {
  getMessages, getCounts, markAsRead, toggleStar,
} from '../../api/messagesApi';
import { useDebounce } from '../../hooks/useDebounce';

export default function MessagesInbox() {
  const [folder, setFolder]           = useState('inbox');
  const [messages, setMessages]       = useState([]);
  const [counts, setCounts]           = useState({});
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [search, setSearch]           = useState('');
  const debouncedSearch = useDebounce(search, 300);

  /* ── Fetch data ── */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const isUnread  = folder === 'unread';
      const isStarred = folder === 'starred';

      const [msgs, cnt] = await Promise.all([
        getMessages({
          folder: isUnread ? 'inbox' : (isStarred ? '' : folder),
          starred: isStarred,
          search: debouncedSearch,
        }),
        getCounts(),
      ]);

      const filtered = isUnread ? msgs.filter((m) => m.unread) : msgs;
      setMessages(filtered);
      setCounts(cnt);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [folder, debouncedSearch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /* ── Handlers ── */
  const handleSelect = async (msg) => {
    setSelected(msg);
    if (msg.unread) {
      await markAsRead(msg.id);
      fetchAll();
    }
  };

  const handleStarToggle = async (id) => {
    await toggleStar(id);
    if (selected?.id === id) {
      setSelected((s) => ({ ...s, starred: !s.starred }));
    }
    fetchAll();
  };

  const handleFolderChange = (newFolder) => {
    setFolder(newFolder);
    setSelected(null);
  };

  /* ── Export as CSV ── */
  const exportCsv = () => {
    if (messages.length === 0) {
      toast.error('No messages to export');
      return;
    }

    const headers = ['Name', 'Email', 'Company', 'Phone', 'Subject', 'Message', 'Date'];
    const rows = messages.map((m) => [
      m.name,
      m.email,
      m.company,
      m.phone,
      m.subject,
      m.message.replace(/\n/g, ' ').replace(/"/g, '""'),
      new Date(m.time).toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((c) => `"${c || ''}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `messages-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success(`Exported ${messages.length} messages`);
  };

  return (
    <div>
      <PageHeader
        title="Inbox"
        subtitle={`${counts.unread || 0} unread · ${counts.inbox || 0} total`}
        actions={
          <>
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={fetchAll}
              size="md"
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              icon={Download}
              onClick={exportCsv}
              size="md"
            >
              Export CSV
            </Button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 h-[calc(100vh-240px)] min-h-[500px]">

          {/* ─── Column 1: Filter Tabs ─── */}
          <div className="col-span-12 lg:col-span-2 border-r border-gray-200 dark:border-gray-800 overflow-y-auto hidden lg:block">
            <FilterTabs active={folder} onChange={handleFolderChange} counts={counts} />
          </div>

          {/* Mobile: tabs as horizontal scroll */}
          <div className="col-span-12 lg:hidden border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
            <div className="flex p-2 gap-1 min-w-max">
              {[
                { value: 'inbox',    label: 'Inbox',    count: counts.inbox },
                { value: 'unread',   label: 'Unread',   count: counts.unread },
                { value: 'starred',  label: 'Starred',  count: counts.starred },
                { value: 'archived', label: 'Archived', count: counts.archived },
                { value: 'spam',     label: 'Spam',     count: counts.spam },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleFolderChange(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                    folder === t.value
                      ? 'bg-gradient-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {t.label} {t.count ? `(${t.count})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Column 2: Message List ─── */}
          <div className={`col-span-12 lg:col-span-4 border-r border-gray-200 dark:border-gray-800 ${
            selected ? 'hidden lg:flex flex-col' : 'flex flex-col'
          }`}>
            <MessageList
              messages={messages}
              loading={loading}
              activeId={selected?.id}
              search={search}
              onSearchChange={setSearch}
              onSelect={handleSelect}
              onStarToggle={handleStarToggle}
            />
          </div>

          {/* ─── Column 3: Message Detail ─── */}
          <div className={`col-span-12 lg:col-span-6 ${
            selected ? 'flex flex-col' : 'hidden lg:flex flex-col'
          }`}>
            {selected ? (
              <MessageDetail
                message={selected}
                onBack={() => setSelected(null)}
                onRefresh={fetchAll}
              />
            ) : (
              <MessageEmpty />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}