import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Palette } from 'lucide-react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import IconPicker from '../ui/IconPicker';
import ColorPicker from '../ui/ColorPicker';
import FeatureList from '../forms/FeatureList';
import { createService, updateService } from '../../api/servicesApi';

const schema = z.object({
  icon:        z.string().min(1, 'Icon required'),
  title:       z.string().min(3, 'Title required'),
  description: z.string().min(10, 'Description too short').max(300),
  features:    z.array(z.string()).min(1, 'Add at least 1 feature').max(10),
  priceFrom:   z.number().min(0),
  priceTo:     z.number().min(0),
  color:       z.string(),
  featured:    z.boolean(),
  published:   z.boolean(),
});

const DEFAULTS = {
  icon: 'bx-briefcase',
  title: '',
  description: '',
  features: [],
  priceFrom: 500,
  priceTo: 5000,
  color: 'from-indigo-500 to-purple-500',
  featured: false,
  published: true,
};

export default function ServiceFormModal({ isOpen, onClose, service, onSuccess }) {
  const isEdit = Boolean(service);
  const [loading, setLoading] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const {
    control, register, handleSubmit, reset, watch, setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  const icon = watch('icon');
  const color = watch('color');
  const title = watch('title');

  useEffect(() => {
    if (isOpen) {
      reset(service || DEFAULTS);
    }
  }, [isOpen, service, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateService(service.id, data);
        toast.success('Service updated ✓');
      } else {
        await createService(data);
        toast.success('Service created ✓');
      }
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? 'Edit Service' : 'New Service'}
        description="Fill in the details to add a service to your portfolio"
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

          {/* Preview + Icon */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIconPickerOpen(true)}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${color} hover:opacity-90 transition shrink-0`}
            >
              <i className={`bx ${icon} text-3xl`} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">Preview</p>
              <h3 className="font-semibold truncate">{title || 'Service Title'}</h3>
              <button
                type="button"
                onClick={() => setIconPickerOpen(true)}
                className="text-xs text-indigo-500 hover:underline mt-1"
              >
                <Palette className="w-3 h-3 inline mr-1" />
                Change icon
              </button>
            </div>
          </div>

          {/* Title */}
          <Input
            label="Title"
            placeholder="e.g. WordPress Development"
            error={errors.title?.message}
            {...register('title')}
          />

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Short description of what this service offers..."
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />

          {/* Features */}
          <Controller
            control={control}
            name="features"
            render={({ field }) => (
              <FeatureList
                label="Key Features"
                value={field.value}
                onChange={field.onChange}
                error={errors.features?.message}
                hint="Add up to 10 key features. Drag to reorder."
              />
            )}
          />

          {/* Price range */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price From ($)"
              type="number"
              min={0}
              step={50}
              error={errors.priceFrom?.message}
              {...register('priceFrom', { valueAsNumber: true })}
            />
            <Input
              label="Price To ($)"
              type="number"
              min={0}
              step={50}
              error={errors.priceTo?.message}
              {...register('priceTo', { valueAsNumber: true })}
            />
          </div>

          {/* Color */}
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <ColorPicker
                label="Card Color"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <Toggle
                  checked={field.value}
                  onChange={field.onChange}
                  label="⭐ Featured"
                  description="Show on homepage"
                />
              )}
            />
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <Toggle
                  checked={field.value}
                  onChange={field.onChange}
                  label="✅ Published"
                  description="Visible to visitors"
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>

      <IconPicker
        isOpen={iconPickerOpen}
        onClose={() => setIconPickerOpen(false)}
        current={icon}
        onSelect={(newIcon) => setValue('icon', newIcon)}
      />
    </>
  );
}