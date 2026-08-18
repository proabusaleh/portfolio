import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Save, Clock, Eye, TestTube } from 'lucide-react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Tabs from '../ui/Tabs';
import DatePicker from '../ui/DatePicker';
import RichTextEditor from '../forms/RichTextEditor';
import MultiSelect from '../forms/MultiSelect';
import EmailPreview from './EmailPreview';
import { saveCampaign, sendCampaign, sendTestEmail, getAvailableTags } from '../../api/newsletterApi';

const schema = z.object({
  subject:     z.string().min(3, 'Subject required'),
  preheader:   z.string().max(150).optional(),
  from:        z.string().min(5, 'From required'),
  content:     z.string().min(20, 'Content too short'),
  tags:        z.array(z.string()).default([]),
  scheduledAt: z.string().nullable().optional(),
});

const DEFAULTS = {
  subject:     '',
  preheader:   '',
  from:        'Abu Saleh <abu@yourportfolio.com>',
  content:     '',
  tags:        [],
  scheduledAt: null,
};

const TABS = [
  { value: 'compose', label: 'Compose', icon: Eye },
  { value: 'preview', label: 'Preview', icon: Eye },
];

export default function ComposeModal({ isOpen, onClose, campaign, onSuccess }) {
  const isEdit = Boolean(campaign);
  const [tab, setTab] = useState('compose');
  const [saving, setSaving]   = useState(false);
  const [sending, setSending] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const availableTags = getAvailableTags();

  const {
    control, register, handleSubmit, watch, reset, getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  const subject   = watch('subject');
  const preheader = watch('preheader');
  const from      = watch('from');
  const content   = watch('content');
  const _tags = watch('tags');

  useEffect(() => {
    if (isOpen) {
      reset(campaign || DEFAULTS);
      setTab('compose');
      setShowSchedule(campaign?.scheduledAt);
    }
  }, [isOpen, campaign, reset]);

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await saveCampaign({ ...getValues(), status: 'draft', id: campaign?.id });
      toast.success('Draft saved ✓');
      onSuccess();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSchedule = async () => {
    const data = getValues();
    if (!data.scheduledAt) {
      toast.error('Please pick a date & time');
      return;
    }
    setSaving(true);
    try {
      await saveCampaign({ ...data, status: 'scheduled', id: campaign?.id });
      toast.success(`📅 Scheduled for ${new Date(data.scheduledAt).toLocaleString()}`);
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to schedule');
    } finally {
      setSaving(false);
    }
  };

  const handleSendNow = async () => {
    const data = getValues();
    setSending(true);
    try {
      let camp;
      if (isEdit) camp = await saveCampaign({ ...data, id: campaign.id });
      else        camp = await saveCampaign(data);
      await sendCampaign(camp.id, data.tags);
      toast.success('🚀 Campaign sent successfully!');
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to send');
    } finally {
      setSending(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail || !/\S+@\S+\.\S+/.test(testEmail)) {
      toast.error('Enter a valid test email');
      return;
    }
    try {
      await sendTestEmail(getValues(), testEmail);
      toast.success(`✉️ Test sent to ${testEmail}`);
    } catch {
      toast.error('Test failed');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Campaign' : 'Compose Newsletter'}
      description="Create and send emails to your subscribers"
      size="xl"
    >
      <form onSubmit={handleSubmit(handleSendNow)}>
        <Tabs tabs={TABS} active={tab} onChange={setTab} className="mb-4 -mx-5 px-5" />

        <div className="max-h-[65vh] overflow-y-auto pr-2">
          {/* ── COMPOSE TAB ── */}
          {tab === 'compose' && (
            <div className="space-y-4">
              {/* From */}
              <Input
                label="From"
                placeholder="Your Name <you@example.com>"
                error={errors.from?.message}
                {...register('from')}
              />

              {/* Subject */}
              <Input
                label="Subject line"
                placeholder="Your email subject..."
                error={errors.subject?.message}
                hint={`${subject?.length || 0}/60 (recommended)`}
                {...register('subject')}
              />

              {/* Preheader */}
              <Input
                label="Preheader (optional)"
                placeholder="Short preview text shown in inbox"
                hint={`${preheader?.length || 0}/150`}
                {...register('preheader')}
              />

              {/* Content */}
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <RichTextEditor
                    label="Email content"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.content?.message}
                    placeholder="Write your email..."
                  />
                )}
              />

              {/* Segment / Tags */}
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <MultiSelect
                      label="🎯 Send to segment (optional)"
                      options={availableTags.map((t) => ({ value: t.value, label: t.label }))}
                      value={field.value}
                      onChange={field.onChange}
                      hint="Leave empty to send to ALL active subscribers"
                    />
                  )}
                />
              </div>

              {/* Schedule toggle */}
              {showSchedule && (
                <Controller
                  control={control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <DatePicker
                      label="📅 Schedule for"
                      value={field.value}
                      onChange={field.onChange}
                      hint="Campaign will be sent automatically at this time"
                    />
                  )}
                />
              )}

              {/* Test email */}
              <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
                <label className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2 block">
                  🧪 Send test email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="test@example.com"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-gray-900"
                  />
                  <Button size="sm" variant="outline" icon={TestTube} type="button" onClick={handleTest}>
                    Send Test
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ── PREVIEW TAB ── */}
          {tab === 'preview' && (
            <EmailPreview
              subject={subject}
              preheader={preheader}
              from={from}
              content={content}
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
          <Button
            type="button"
            variant="outline"
            icon={Clock}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            {showSchedule ? 'Cancel schedule' : 'Schedule later'}
          </Button>

          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <Button type="button" variant="outline" icon={Save} onClick={handleSaveDraft} loading={saving}>
              Save Draft
            </Button>
            {showSchedule ? (
              <Button type="button" icon={Clock} onClick={handleSchedule} loading={saving}>
                Schedule
              </Button>
            ) : (
              <Button type="submit" icon={Send} loading={sending}>
                Send Now
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}