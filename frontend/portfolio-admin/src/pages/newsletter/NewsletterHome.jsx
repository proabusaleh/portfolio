import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import SubscribersStats from '../../components/newsletter/SubscribersStats';
import GrowthChart from '../../components/newsletter/GrowthChart';
import SubscribersTable from '../../components/newsletter/SubscribersTable';
import SubscriberFormModal from '../../components/newsletter/SubscriberFormModal';
import TagFilter from '../../components/newsletter/TagFilter';
import CampaignsList from '../../components/newsletter/CampaignsList';
import ComposeModal from '../../components/newsletter/ComposeModal';
import CampaignAnalytics from '../../components/newsletter/CampaignAnalytics';
import EmailPreview from '../../components/newsletter/EmailPreview';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { getSubscribers, addSubscriber, updateSubscriber, deleteSubscriber, deleteSubscribers, getSubscriberStats, getGrowthData, getCampaigns, createCampaign, updateCampaign, sendCampaign, deleteCampaign } from '../../api/newsletterApi';
import { ALL_TAGS } from '../../data/newsletterData';

export default function NewsletterHome() {
  const [tab, setTab] = useState('subscribers');
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({});
  const [growth, setGrowth] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editSub, setEditSub] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);
  const [previewCampaign, setPreviewCampaign] = useState(null);

  const TABS = [
    { value: 'subscribers', label: 'Subscribers' },
    { value: 'campaigns', label: 'Campaigns' },
  ];

  const fetchSubscribers = useCallback(async () => {
    const data = await getSubscribers({ search, tags: activeTags });
    setSubscribers(data);
  }, [search, activeTags]);

  const fetchAll = useCallback(async () => {
    const [s, g, c] = await Promise.all([getSubscriberStats(), getGrowthData(), getCampaigns()]);
    setStats(s); setGrowth(g); setCampaigns(c);
    await fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const handleToggleSelect = (checked) => setSelectedIds(checked ? subscribers.map((s) => s.id) : []);
  const handleToggleTag = (tag) => setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleSaveSubscriber = async (data) => {
    try {
      if (editSub) await updateSubscriber(editSub.id, data);
      else await addSubscriber(data);
      toast.success(editSub ? 'Updated' : 'Added');
      setFormOpen(false); setEditSub(null);
      fetchAll();
    } catch { toast.error('Failed'); }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm('Delete subscriber?')) return;
    try { await deleteSubscriber(id); toast.success('Deleted'); fetchAll(); } catch { toast.error('Failed'); }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} subscribers?`)) return;
    try { await deleteSubscribers(selectedIds); setSelectedIds([]); toast.success('Deleted'); fetchAll(); } catch { toast.error('Failed'); }
  };

  const handleSaveCampaign = async (data) => {
    try {
      if (editCampaign) await updateCampaign(editCampaign.id, data);
      else await createCampaign(data);
      toast.success(editCampaign ? 'Updated' : 'Created');
      setComposeOpen(false); setEditCampaign(null);
      const c = await getCampaigns(); setCampaigns(c);
    } catch { toast.error('Failed'); }
  };

  const handleSendCampaign = async (id) => {
    if (!window.confirm('Send this campaign to all active subscribers?')) return;
    try { await sendCampaign(id); toast.success('Campaign sent!'); const c = await getCampaigns(); setCampaigns(c); } catch { toast.error('Failed'); }
  };

  const handleDeleteCampaign = async (id) => {
    if (!window.confirm('Delete campaign?')) return;
    try { await deleteCampaign(id); toast.success('Deleted'); const c = await getCampaigns(); setCampaigns(c); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter"
        description="Manage subscribers and email campaigns"
        actions={
          tab === 'subscribers' ? (
            <div className="flex gap-2">
              {selectedIds.length > 0 && <Button variant="danger" size="sm" icon={Trash2} onClick={handleBulkDelete}>Delete {selectedIds.length}</Button>}
              <Button size="sm" icon={Plus} onClick={() => { setEditSub(null); setFormOpen(true); }}>Add Subscriber</Button>
            </div>
          ) : (
            <Button size="sm" icon={Plus} onClick={() => { setEditCampaign(null); setComposeOpen(true); }}>New Campaign</Button>
          )
        }
      />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'subscribers' && (
        <>
          <SubscribersStats stats={stats} />
          <GrowthChart data={growth} />

          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 max-w-sm">
                <Input placeholder="Search subscribers..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <TagFilter tags={ALL_TAGS} activeTags={activeTags} onToggle={handleToggleTag} />
            </div>
            <SubscribersTable
              subscribers={subscribers}
              selectedIds={selectedIds}
              onSelect={(id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])}
              onToggleSelect={handleToggleSelect}
              onEdit={(sub) => { setEditSub(sub); setFormOpen(true); }}
              onDelete={handleDeleteSubscriber}
            />
          </div>
        </>
      )}

      {tab === 'campaigns' && (
        <CampaignsList
          campaigns={campaigns}
          onEdit={(c) => { setEditCampaign(c); setComposeOpen(true); }}
          onDelete={handleDeleteCampaign}
          onSend={handleSendCampaign}
          onPreview={setPreviewCampaign}
        />
      )}

      <SubscriberFormModal isOpen={formOpen} onClose={() => { setFormOpen(false); setEditSub(null); }} onSave={handleSaveSubscriber} subscriber={editSub} />
      <ComposeModal isOpen={composeOpen} onClose={() => { setComposeOpen(false); setEditCampaign(null); }} onSave={handleSaveCampaign} campaign={editCampaign} />

      <Modal isOpen={!!previewCampaign} onClose={() => setPreviewCampaign(null)} title="Campaign Preview" size="md">
        {previewCampaign && (
          <div className="space-y-4">
            <CampaignAnalytics campaign={previewCampaign} />
            <EmailPreview subject={previewCampaign.subject} content={previewCampaign.content} />
          </div>
        )}
      </Modal>
    </div>
  );
}
