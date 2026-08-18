import { useState, useEffect, useCallback } from 'react';
import { CheckCheck, Trash2, Bell, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import { ConfirmModal } from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';

import NotificationGroup from '../../components/notifications/NotificationGroup';
import NotificationFilters from '../../components/notifications/NotificationFilters';
import NotificationPreferences from '../../components/notifications/NotificationPreferences';
import EmptyNotifications from '../../components/notifications/EmptyNotifications';

import { useNotificationsStore } from '../../store/notificationsStore';
import { getTypeCounts } from '../../api/notificationsApi';
import { useRealtimeNotifications } from '../../hooks/useNotifications';

const TABS = [
  { value: 'inbox',       label: 'Inbox',       icon: Bell          },
  { value: 'preferences', label: 'Preferences', icon: SettingsIcon  },
];

export default function NotificationsPage() {
  const list         = useNotificationsStore((s) => s.list);
  const loading      = useNotificationsStore((s) => s.loading);
  const unreadCount  = useNotificationsStore((s) => s.unreadCount);
  const fetch        = useNotificationsStore((s) => s.fetch);
  const markAllRead  = useNotificationsStore((s) => s.markAllRead);
  const clearAll     = useNotificationsStore((s) => s.clearAll);

  const [tab, setTab]       = useState('inbox');
  const [typeFilter, setTypeFilter]     = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [counts, setCounts] = useState({});
  const [clearOpen, setClearOpen] = useState(false);
  const [clearing, setClearing]   = useState(false);

  const { browserPerm, requestBrowserPermission } = useRealtimeNotifications();

  const fetchAll = useCallback(async () => {
    await Promise.all([
      fetch({ type: typeFilter, unread: showUnreadOnly }),
      getTypeCounts().then(setCounts),
    ]);
  }, [fetch, typeFilter, showUnreadOnly]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleClearAll = async () => {
    setClearing(true);
    try {
      await clearAll();
      toast.success('All notifications cleared');
      setClearOpen(false);
    } catch {
      toast.error('Failed to clear');
    } finally {
      setClearing(false);
    }
  };

  const handleRequestBrowser = async () => {
    const perm = await requestBrowserPermission();
    if (perm === 'granted') {
      toast.success('🔔 Browser notifications enabled!');
    } else if (perm === 'denied') {
      toast.error('Permission denied. Enable in browser settings.');
    }
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
            : "You're all caught up! 🎉"
        }
        actions={
          tab === 'inbox' && list.length > 0 && (
            <>
              {unreadCount > 0 && (
                <Button variant="outline" icon={CheckCheck} onClick={markAllRead}>
                  Mark all read
                </Button>
              )}
              <Button
                variant="outline"
                icon={Trash2}
                onClick={() => setClearOpen(true)}
                className="!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-950/30"
              >
                Clear all
              </Button>
            </>
          )
        }
      />

      <Card className="mb-6 overflow-hidden">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </Card>

      {/* ─── INBOX ─── */}
      {tab === 'inbox' && (
        <Card>
          <CardBody className="border-b border-gray-200 dark:border-gray-800">
            <NotificationFilters
              active={typeFilter}
              onChange={setTypeFilter}
              counts={counts}
              showUnreadOnly={showUnreadOnly}
              onToggleUnread={() => setShowUnreadOnly(!showUnreadOnly)}
            />
          </CardBody>

          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <EmptyNotifications
              celebrating={unreadCount === 0 && counts.all === 0}
              title={
                showUnreadOnly
                  ? 'No unread notifications'
                  : typeFilter
                    ? 'No notifications in this category'
                    : "You're all caught up!"
              }
              description={
                showUnreadOnly || typeFilter
                  ? 'Try adjusting your filters'
                  : 'New notifications will appear here'
              }
            />
          ) : (
            <NotificationGroup notifications={list} />
          )}
        </Card>
      )}

      {/* ─── PREFERENCES ─── */}
      {tab === 'preferences' && (
        <NotificationPreferences
          browserPerm={browserPerm}
          onRequestPermission={handleRequestBrowser}
        />
      )}

      {/* Clear all confirmation */}
      <ConfirmModal
        isOpen={clearOpen}
        onClose={() => setClearOpen(false)}
        onConfirm={handleClearAll}
        title="Clear all notifications?"
        description="This will permanently delete all notifications. This action cannot be undone."
        confirmText="Clear All"
        variant="danger"
        loading={clearing}
      />
    </div>
  );
}