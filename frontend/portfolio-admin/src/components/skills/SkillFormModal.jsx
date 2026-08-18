import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Palette } from 'lucide-react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import IconPicker from '../ui/IconPicker';
import ProgressBar from '../ui/ProgressBar';
import { createSkill, updateSkill, SKILL_CATEGORIES } from '../../api/skillsApi';

const schema = z.object({
  name:        z.string().min(2, 'Name required'),
  icon:        z.string().min(1, 'Icon required'),
  category:    z.string().min(1, 'Category required'),
  proficiency: z.number().min(0).max(100),
  color:       z.string(),
});

const DEFAULTS = {
  name: '',
  icon: 'bx-code-curly',
  category: 'frontend',
  proficiency: 75,
  color: '#6366f1',
};

export default function SkillFormModal({ isOpen, onClose, skill, defaultCategory, onSuccess }) {
  const isEdit = Boolean(skill);
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
  const proficiency = watch('proficiency');

  useEffect(() => {
    if (isOpen) {
      reset(skill || { ...DEFAULTS, category: defaultCategory || 'frontend' });
    }
  }, [isOpen, skill, defaultCategory, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateSkill(skill.id, data);
        toast.success('Skill updated ✓');
      } else {
        await createSkill(data);
        toast.success('Skill added ✓');
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
        title={isEdit ? 'Edit Skill' : 'Add Skill'}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIconPickerOpen(true)}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition shrink-0"
              style={{ backgroundColor: color }}
            >
              <i className={`bx ${icon} text-2xl`} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Preview</p>
              <p className="font-semibold text-sm truncate">
                {watch('name') || 'Skill name'}
              </p>
              <div className="mt-1">
                <ProgressBar
                  value={proficiency}
                  size="sm"
                  showLabel={false}
                  color="from-indigo-500 to-purple-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIconPickerOpen(true)}
              className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
            >
              <Palette className="w-3 h-3" /> Icon
            </button>
          </div>

          {/* Name */}
          <Input
            label="Skill Name"
            placeholder="e.g. React"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Category */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                label="Category"
                options={SKILL_CATEGORIES.map((c) => ({ value: c.value, label: `${c.icon} ${c.label}` }))}
                placeholder=""
                error={errors.category?.message}
                {...field}
              />
            )}
          />

          {/* Proficiency slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Proficiency</label>
              <span className="text-sm font-bold text-indigo-500">{proficiency}%</span>
            </div>
            <Controller
              control={control}
              name="proficiency"
              render={({ field }) => (
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              )}
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Brand Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setValue('color', e.target.value)}
                className="w-12 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-700"
              />
              <Input
                value={color}
                onChange={(e) => setValue('color', e.target.value)}
                placeholder="#6366f1"
                className="font-mono"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? 'Update Skill' : 'Add Skill'}
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