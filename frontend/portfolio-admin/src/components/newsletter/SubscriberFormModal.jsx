import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import MultiSelect from '../forms/MultiSelect';
import { createSubscriber, updateSubscriber, getAvailableTags } from '../../api/newsletterApi';

const schema = z.object({
  name:   z.string().min(2, 'Name required'),
  email:  z.string().email('Invalid email'),
  status: z.enum(['active', 'unsubscribed', 'bounced']),
  tags:   z.array(z.string()),
});

const DEFAULTS = { name: '', email: '', status: 'active', tags: [] };

export default function SubscriberFormModal({ isOpen, onClose, subscriber, onSuccess }) {
  const isEdit = Boolean(subscriber);
  const [loading, setLoading] = useState(false);
  const tags = getAvailableTags();

  const {
    control, register, handleSubmit, reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (isOpen) reset(subscriber || DEFAULTS);
  }, [isOpen, subscriber, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateSubscriber(subscriber.id, data);
        toast.success('Subscriber updated ✓');
      } else {
        await createSubscriber(data);
        toast.success('Subscriber added ✓');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Subscriber' : 'Add Subscriber'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              label="Status"
              options={[
                { value: 'active',       label: '✅ Active' },
                { value: 'unsubscribed', label: '⏸ Unsubscribed' },
                { value: 'bounced',      label: '❌ Bounced' },
              ]}
              placeholder=""
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <MultiSelect
              label="Tags"
              options={tags.map((t) => ({ value: t.value, label: t.label }))}
              value={field.value}
              onChange={field.onChange}
              hint="Select all relevant tags"
            />
          )}
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>
            {isEdit ? 'Update' : 'Add'} Subscriber
          </Button>
        </div>
      </form>
    </Modal>
  );
}