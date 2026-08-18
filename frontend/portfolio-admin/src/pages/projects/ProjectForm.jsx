import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Save, ArrowLeft, Eye, Info, Image as ImageIcon,
  Settings as SettingsIcon, Search,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Toggle from '../../components/ui/Toggle';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';

import FormSection from '../../components/forms/FormSection';
import RichTextEditor from '../../components/forms/RichTextEditor';
import ImageUploader from '../../components/forms/ImageUploader';
import TagsInput from '../../components/forms/TagsInput';
import MultiSelect from '../../components/forms/MultiSelect';
import SlugInput from '../../components/forms/SlugInput';

import { getProject, createProject, updateProject } from '../../api/projectsApi';
import { PATHS } from '../../router/routes';
import { PROJECT_CATEGORIES } from '../../lib/constants';

/* ── Validation schema ─────────────────────────────────────── */
const schema = z.object({
  title:       z.string().min(3, 'Title must be at least 3 characters'),
  slug:        z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content:     z.string().optional(),
  images:      z.array(z.string()).min(1, 'At least one image is required'),
  category:    z.string().min(1, 'Category is required'),
  tags:        z.array(z.string()).default([]),
  techStack:   z.array(z.string()).default([]),
  demoUrl:     z.string().url('Must be a valid URL').or(z.literal('')),
  repoUrl:     z.string().url('Must be a valid URL').or(z.literal('')),
  client:      z.string().optional(),
  duration:    z.string().optional(),
  year:        z.number().min(2000).max(2100),
  status:      z.enum(['draft', 'published', 'archived']),
  featured:    z.boolean(),
  seo: z.object({
    metaTitle:       z.string().max(60, 'Max 60 chars').optional(),
    metaDescription: z.string().max(160, 'Max 160 chars').optional(),
    ogImage:         z.string().optional(),
  }),
});

const DEFAULT_VALUES = {
  title: '', slug: '', description: '', content: '',
  images: [], category: '', tags: [], techStack: [],
  demoUrl: '', repoUrl: '', client: '', duration: '',
  year: new Date().getFullYear(),
  status: 'draft', featured: false,
  seo: { metaTitle: '', metaDescription: '', ogImage: '' },
};

const TECH_OPTIONS = [
  'WordPress', 'PHP', 'MySQL', 'WooCommerce',
  'Flutter', 'Dart', 'Firebase',
  'React', 'Node.js', 'Figma', 'HTML', 'CSS', 'JavaScript',
].map((t) => ({ value: t, label: t }));

const TABS = [
  { value: 'general', label: 'General',   icon: Info },
  { value: 'media',   label: 'Media',     icon: ImageIcon },
  { value: 'meta',    label: 'Meta',      icon: SettingsIcon },
  { value: 'seo',     label: 'SEO',       icon: Search },
];

/* ─────────────────────────────────────────────────────────── */

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [activeTab, setActiveTab] = useState('general');
  const [lastSaved, setLastSaved] = useState(null);

  const {
    control, register, handleSubmit, watch, setValue, reset, getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';

  const title = watch('title');

  /* ── Fetch existing project ── */
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const project = await getProject(id);
        reset({
          ...DEFAULT_VALUES,
          ...project,
          images: [project.image, project.image].filter(Boolean), // demo
          content: project.description,
          techStack: project.tags || [],
          seo: {
            metaTitle: project.title,
            metaDescription: project.description,
            ogImage: project.image,
          },
        });
      } catch {
        toast.error('Project not found');
        navigate(PATHS.PROJECTS);
      } finally {
        setFetching(false);
      }
    })();
  }, [id, isEdit, reset, navigate]);

  /* ── Auto-save draft every 30s ── */
  useEffect(() => {
    if (!isEdit) return;
    const interval = setInterval(() => {
      if (isDirty) {
        handleAutoSave();
      }
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isDirty]);

  const handleAutoSave = useCallback(async () => {
    if (!isEdit) return;
    try {
      const data = getValues();
      await updateProject(id, data);
      setLastSaved(new Date());
    } catch { /* silent */ }
    // eslint-disable-next-line
  }, [id, isEdit]);

  /* ── Submit ── */
  const onSubmit = async (data, publishAction = null) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        image: data.images[0], // primary image for list view
      };
      if (publishAction) payload.status = publishAction;

      if (isEdit) {
        await updateProject(id, payload);
        toast.success('Project updated ✓');
      } else {
        const created = await createProject(payload);
        toast.success('Project created ✓');
        navigate(`/projects/${created.id}/edit`, { replace: true });
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ── */
  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <PageHeader
        title={isEdit ? 'Edit Project' : 'New Project'}
        subtitle={
          isEdit && lastSaved
            ? `Last auto-saved at ${lastSaved.toLocaleTimeString()}`
            : 'Fill in the details to add a new project to your portfolio'
        }
        actions={
          <>
            <Link to={PATHS.PROJECTS}>
              <Button variant="outline" icon={ArrowLeft} type="button">
                Back
              </Button>
            </Link>
            {isEdit && (
              <Button
                variant="outline"
                icon={Eye}
                type="button"
                onClick={() => window.open(`/portfolio/${getValues('slug')}`, '_blank')}
              >
                Preview
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit((d) => onSubmit(d, 'draft'))}
              loading={loading}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              icon={Save}
              onClick={handleSubmit((d) => onSubmit(d, 'published'))}
              loading={loading}
            >
              {isEdit ? 'Update' : 'Publish'}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── LEFT: Main Content ─── */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

            <CardBody className="space-y-6">

              {/* ── GENERAL TAB ── */}
              {activeTab === 'general' && (
                <FormSection>
                  <Input
                    label="Project Title"
                    placeholder="e.g. E-commerce Fashion Store"
                    error={errors.title?.message}
                    {...register('title')}
                  />

                  <Controller
                    control={control}
                    name="slug"
                    render={({ field }) => (
                      <SlugInput
                        title={title}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.slug?.message}
                      />
                    )}
                  />

                  <Textarea
                    label="Short Description"
                    placeholder="One-line summary for card views..."
                    rows={2}
                    error={errors.description?.message}
                    hint="This appears in project cards and previews (max ~160 chars)"
                    {...register('description')}
                  />

                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                      <RichTextEditor
                        label="Full Description"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.content?.message}
                        placeholder="Describe your project in detail..."
                      />
                    )}
                  />
                </FormSection>
              )}

              {/* ── MEDIA TAB ── */}
              {activeTab === 'media' && (
                <FormSection
                  title="Project Images"
                  description="First image is used as the primary/cover. Drag to reorder."
                >
                  <Controller
                    control={control}
                    name="images"
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.images?.message}
                        maxFiles={10}
                      />
                    )}
                  />
                </FormSection>
              )}

              {/* ── META TAB ── */}
              {activeTab === 'meta' && (
                <FormSection>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        label="Category"
                        options={PROJECT_CATEGORIES.map((c) => ({
                          value: c.label,
                          label: c.label,
                        }))}
                        placeholder="Select category"
                        error={errors.category?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <TagsInput
                        label="Tags"
                        value={field.value}
                        onChange={field.onChange}
                        hint="Type & press Enter or comma to add tags"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="techStack"
                    render={({ field }) => (
                      <MultiSelect
                        label="Tech Stack"
                        options={TECH_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                        hint="Select all technologies used in this project"
                      />
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Live Demo URL"
                      placeholder="https://demo.example.com"
                      type="url"
                      error={errors.demoUrl?.message}
                      {...register('demoUrl')}
                    />
                    <Input
                      label="GitHub / Repository URL"
                      placeholder="https://github.com/..."
                      type="url"
                      error={errors.repoUrl?.message}
                      {...register('repoUrl')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Client Name"
                      placeholder="e.g. Acme Corp."
                      {...register('client')}
                    />
                    <Input
                      label="Duration"
                      placeholder="e.g. 3 months"
                      {...register('duration')}
                    />
                    <Input
                      label="Year"
                      type="number"
                      min="2000"
                      max="2100"
                      error={errors.year?.message}
                      {...register('year', { valueAsNumber: true })}
                    />
                  </div>
                </FormSection>
              )}

              {/* ── SEO TAB ── */}
              {activeTab === 'seo' && (
                <FormSection
                  title="SEO Settings"
                  description="Optimize how this project appears in search results and social shares"
                >
                  <Input
                    label="Meta Title"
                    placeholder="Optimized title for search engines"
                    error={errors.seo?.metaTitle?.message}
                    hint={`${watch('seo.metaTitle')?.length || 0} / 60`}
                    {...register('seo.metaTitle')}
                  />
                  <Textarea
                    label="Meta Description"
                    placeholder="A brief description for search engines and social previews..."
                    rows={3}
                    error={errors.seo?.metaDescription?.message}
                    hint={`${watch('seo.metaDescription')?.length || 0} / 160`}
                    {...register('seo.metaDescription')}
                  />
                  <Input
                    label="OG Image URL"
                    placeholder="https://example.com/og-image.jpg"
                    {...register('seo.ogImage')}
                    hint="1200×630 recommended for social media"
                  />
                </FormSection>
              )}
            </CardBody>
          </Card>
        </div>

        {/* ─── RIGHT: Sidebar ─── */}
        <div className="space-y-6">
          {/* Publish settings */}
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Publishing
              </h3>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    label="Status"
                    options={[
                      { value: 'draft',     label: '📝 Draft' },
                      { value: 'published', label: '✅ Published' },
                      { value: 'archived',  label: '📦 Archived' },
                    ]}
                    placeholder=""
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="featured"
                render={({ field }) => (
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="⭐ Featured Project"
                    description="Show this project on your homepage"
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* Tips */}
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                💡 Quick Tips
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  Use high-quality images (min 1200px wide)
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  Write concise descriptions with keywords
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  Add live demo & repo links for credibility
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  Fill SEO fields for better search ranking
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  Draft auto-saves every 30 seconds
                </li>
              </ul>
            </CardBody>
          </Card>

          {/* Auto-save indicator */}
          {isEdit && (
            <div className="text-xs text-gray-500 text-center">
              {lastSaved
                ? `💾 Auto-saved at ${lastSaved.toLocaleTimeString()}`
                : '💾 Auto-save enabled (every 30s)'}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}