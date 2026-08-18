import { useState, useEffect, useCallback } from 'react';
import { Plus, Sparkles, CheckCircle, Clock, FileEdit } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import { ConfirmModal } from '../../components/ui/Modal';

import CampaignCard from '../../components/newsletter/CampaignCard';
import ComposeModal from '../../components/newsletter/ComposeModal';

import {
  getCampaigns, getCampaignsCounts, deleteCampaign, saveCampaign,
} from '../../api/newsletterApi';

export default function Campaigns() {
  const [items, setItems]   = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState('');

  const [composeOpen, setComposeOpen] = useState(false);
  const [editing, setEditing]         = useState(null);
  const [deleting, setDeleting]       = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [list, cnt] = await Promise.all([
        getCampaigns({ status }),
        getCampaignsCounts(),
      ]);
      setItems(list);
      setCounts(cnt);
    } catch {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleNew = () => {
    setEditing(null);
    setComposeOpen(true);
  };

  const handleEdit = (c) => {
    setEditing(c);
    setComposeOpen(true);
  };

  const handleDelete = (c) => setDeleting(c);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteCampaign(deleting.id);
      toast.success('Campaign deleted');
      setDeleting(null);
      fetch();
    } catch {
      toast.error('Failed');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDuplicate = async (c) => {
    try {
      await saveCampaign({
        subject: `${c.subject} (Copy)`,
        preheader: c.preheader,
        from: c.from,
        content: c.content,
        tags: c.tags,
        status: 'draft',
      });
      toast.success('Campaign duplicated as draft');
      fetch();
    } catch {
      toast.error('Failed to duplicate');
    }
  };

  const TABS = [
    { value: '',          label: 'All',       icon: Sparkles,     count: counts.all       },
    { value: 'sent',      label: 'Sent',      icon: CheckCircle,  count: counts.sent      },
    { value: 'scheduled', label: 'Scheduled', icon: Clock,        count: counts.scheduled },
    { value: 'draft',     label: 'Drafts',    icon: FileEdit,     count: counts.draft     },
  ];

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4">
          <div className="flex-1">
            <Tabs tabs={TABS} active={status} onChange={setStatus} className="border-none" />
          </div>
          <Button icon={Plus} onClick={handleNew}>New Campaign</Button>
        </div>
      </Card>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No campaigns yet"
          description="Create your first email campaign to engage your subscribers."
          action={<Button icon={Plus} onClick={handleNew}>New Campaign</Button>}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((c) => (
              <CampaignCard
                key={c.id}
                campaign={c}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ComposeModal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        campaign={editing}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete "${deleting?.subject}"?`}
        description="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}