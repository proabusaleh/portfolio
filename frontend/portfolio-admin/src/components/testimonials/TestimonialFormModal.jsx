import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import RatingInput from '../ui/RatingInput';
import { createTestimonial, updateTestimonial } from '../../api/testimonialsApi';

const schema = z.object({
  name:        z.string().min(2, 'Name required'),
  role:        z.string().min(2, 'Role required'),
  company:     z.string().min(1, 'Company required'),
  email:       z.string().email('Invalid email').or(z.literal('')),
  website:     z.string().optional(),
  avatar:      z.string().optional(),
  rating:      z.number().min(1, 'Please rate').max(5),
  quote:       z.string().min(20, 'Quote must be at least 20 characters').max(500, 'Max 500 chars'),
  project_type: z.string().min(1, 'Project type required'),
  status:      z.enum(['pending', 'approved', 'rejected']),
  featured:    z.boolean(),
});

const DEFAULTS = {
  name: '', role: '', company: '', email: '', website: '',
  avatar: '', rating: 5, quote: '',
  project_type: 'WordPress',
  status: 'pending',
  featured: false,
};

const PROJECT_TYPES = [
  'WordPress', 'WooCommerce', 'Flutter', 'UI/UX', 'SEO', 'General',
].map((v) => ({ value: v, label: v }));

export default function TestimonialFormModal({ isOpen, onClose, testimonial, onSuccess }) {
  const isEdit = Boolean(testimonial);
  const [loading, setLoading] = useState(false);

  const {
    control, register, handleSubmit, reset, watch, setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  const name = watch('name');
  const quote = watch('quote') || '';

  useEffect(() => {
    if (isOpen) {
      const data = testimonial ? {
        ...testimonial,
        project_type: testimonial.project_type || 'WordPress',
      } : DEFAULTS;
      reset(data);
    }
  }, [isOpen, testimonial, reset]);

  // Generate random avatar
  const generateAvatar = () => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    setValue('avatar', `https://i.pravatar.cc/150?img=${randomId}`);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateTestimonial(testimonial.id, data);
        toast.success('Testimonial updated ✓');
      } else {
        await createTestimonial(data);
        toast.success('Testimonial created ✓');
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Testimonial' : 'Add Testimonial'}
      description="Fill in the details to add a client testimonial"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

        {/* Avatar */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
          {watch('avatar') ? (
            <img
              src={watch('avatar')}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
              {name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
          <div className="flex-1">
            <Input
              placeholder="https://example.com/avatar.jpg"
              {...register('avatar')}
              className="mb-2"
            />
            <button
              type="button"
              onClick={generateAvatar}
              className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Generate random avatar
            </button>
          </div>
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Role / Job Title"
            placeholder="CEO"
            error={errors.role?.message}
            {...register('role')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Company"
            placeholder="TechStart Inc."
            error={errors.company?.message}
            {...register('company')}
          />
          <Input
            label="Website (optional)"
            placeholder="example.com"
            {...register('website')}
          />
        </div>

        <Input
          label="Email (optional)"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Rating */}
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <RatingInput
              label="Rating"
              value={field.value}
              onChange={field.onChange}
              size="lg"
              error={errors.rating?.message}
            />
          )}
        />

        {/* Quote */}
        <Textarea
          label="Testimonial Quote"
          placeholder="Share what the client said about your work..."
          rows={5}
          error={errors.quote?.message}
          hint={`${quote.length} / 500 characters`}
          {...register('quote')}
        />

        {/* Project type + Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            control={control}
            name="project_type"
            render={({ field }) => (
              <Select
                label="Project Type"
                options={PROJECT_TYPES}
                placeholder=""
                error={errors.project_type?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                label="Status"
                options={[
                  { value: 'pending',  label: '🟡 Pending' },
                  { value: 'approved', label: '✅ Approved' },
                  { value: 'rejected', label: '❌ Rejected' },
                ]}
                placeholder=""
                {...field}
              />
            )}
          />
        </div>

        {/* Featured toggle */}
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <Toggle
                checked={field.value}
                onChange={field.onChange}
                label="⭐ Feature on homepage"
                description="Only approved testimonials can be featured"
                disabled={watch('status') !== 'approved'}
              />
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? 'Update' : 'Create'} Testimonial
          </Button>
        </div>
      </form>
    </Modal>
  );
}