import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Save, ArrowLeft, Eye, Clock as ClockIcon } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

import RichTextEditor from '../../components/forms/RichTextEditor';
import ImageUploader from '../../components/forms/ImageUploader';
import TagsInput from '../../components/forms/TagsInput';
import SlugInput from '../../components/forms/SlugInput';
import FormSection from '../../components/forms/FormSection';
import DatePicker from '../../components/ui/DatePicker';

import { getPost, createPost, updatePost, calculateReadTime } from '../../api/blogApi';

const schema = z.object({
  title:       z.string().min(3, 'Title required'),
  slug:        z.string().min(3, 'Slug required'),
  excerpt:     z.string().min(10, 'Excerpt must be at least 10 chars').max(200, 'Max 200 chars'),
  content:     z.string().min(20, 'Content required'),
  coverImage:  z.string().min(1, 'Cover image required'),
  category:    z.string().min(1, 'Category required'),
  tags:        z.array(z.string()),
  author:      z.string().min(1, 'Author required'),
  status:      z.enum(['draft', 'published', 'scheduled']),
  scheduledAt: z.string().nullable().optional(),
  seo: z.object({
    metaTitle:       z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
  }),
});

const CATEGORIES = [
  'WordPress', 'Flutter', 'WooCommerce', 'UI/UX', 'SEO', 'General',
].map((c) => ({ value: c, label: c }));

const DEFAULTS = {
  title: '', slug: '', excerpt: '', content: '', coverImage: '',
  category: '', tags: [], author: 'Abu Saleh',
  status: 'draft', scheduledAt: null,
  seo: { metaTitle: '', metaDescription: '' },
};

export default function BlogPostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const {
    control, register, handleSubmit, watch, reset, getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  const title      = watch('title');
  const content    = watch('content');
  const status     = watch('status');
  const excerpt    = watch('excerpt');
  const metaTitle  = watch('seo.metaTitle') || '';
  const metaDesc   = watch('seo.metaDescription') || '';
  const readTime   = calculateReadTime(content);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const post = await getPost(id);
        reset({
          ...DEFAULTS,
          ...post,
          seo: {
            metaTitle: post.seo?.metaTitle || '',
            metaDescription: post.seo?.metaDescription || '',
          },
        });
      } catch {
        toast.error('Post not found');
        navigate('/blog');
      } finally {
        setFetching(false);
      }
    })();
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data, action = null) => {
    setLoading(true);
    try {
      let payload = { ...data };
      if (action === 'publish') {
        payload.status = 'published';
        payload.publishedAt = new Date().toISOString();
        payload.scheduledAt = null;
      } else if (action === 'draft') {
        payload.status = 'draft';
      } else if (data.status === 'scheduled' && data.scheduledAt) {
        payload.publishedAt = null;
      }

      if (isEdit) {
        await updatePost(id, payload);
        toast.success('Post updated ✓');
      } else {
        const created = await createPost(payload);
        toast.success('Post created ✓');
        navigate(`/blog/${created.id}/edit`, { replace: true });
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

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
        title={isEdit ? 'Edit Post' : 'New Post'}
        subtitle={isEdit ? `${readTime} min read · ${content.replace(/<[^>]+>/g,'').split(/\s+/).length} words` : 'Create a new blog post'}
        actions={
          <>
            <Link to="/blog">
              <Button variant="outline" icon={ArrowLeft} type="button">Back</Button>
            </Link>
            {isEdit && (
              <Button
                variant="outline"
                icon={Eye}
                type="button"
                onClick={() => window.open(`/blog/${getValues('slug')}`, '_blank')}
              >
                Preview
              </Button>
            )}
            <Button
              variant="outline"
              type="button"
              onClick={handleSubmit((d) => onSubmit(d, 'draft'))}
              loading={loading}
            >
              Save Draft
            </Button>
            <Button
              icon={Save}
              type="button"
              onClick={handleSubmit((d) => onSubmit(d, 'publish'))}
              loading={loading}
            >
              {status === 'scheduled' ? 'Schedule' : 'Publish'}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <Input
                label="Post Title"
                placeholder="e.g. Building Fast WordPress Sites"
                error={errors.title?.message}
                className="text-lg font-medium"
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
                    baseUrl="yourportfolio.com/blog/"
                  />
                )}
              />

              <Textarea
                label="Excerpt"
                placeholder="A short summary for post previews..."
                rows={3}
                error={errors.excerpt?.message}
                hint={`${excerpt?.length || 0} / 200`}
                {...register('excerpt')}
              />

              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <RichTextEditor
                    label={`Content · ~${readTime} min read`}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.content?.message}
                    placeholder="Start writing your amazing post..."
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* SEO Card */}
          <Card>
            <CardBody className="space-y-4">
              <FormSection
                title="SEO Settings"
                description="Optimize how this post appears in search engines"
              >
                <Input
                  label="Meta Title"
                  placeholder="SEO-optimized title"
                  hint={`${metaTitle.length} / 60`}
                  error={errors.seo?.metaTitle?.message}
                  {...register('seo.metaTitle')}
                />
                <Textarea
                  label="Meta Description"
                  placeholder="Brief description for search results..."
                  rows={3}
                  hint={`${metaDesc.length} / 160`}
                  error={errors.seo?.metaDescription?.message}
                  {...register('seo.metaDescription')}
                />
              </FormSection>
            </CardBody>
          </Card>
        </div>

        {/* RIGHT: sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
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
                      { value: 'scheduled', label: '📅 Scheduled' },
                    ]}
                    placeholder=""
                    {...field}
                  />
                )}
              />

              {status === 'scheduled' && (
                <Controller
                  control={control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <DatePicker
                      label="Publish Date & Time"
                      value={field.value}
                      onChange={field.onChange}
                      hint="Post will auto-publish at this time"
                    />
                  )}
                />
              )}

              <Input
                label="Author"
                error={errors.author?.message}
                {...register('author')}
              />
            </CardBody>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardBody>
              <Controller
                control={control}
                name="coverImage"
                render={({ field }) => (
                  <ImageUploader
                    label="Cover Image"
                    value={field.value ? [field.value] : []}
                    onChange={(urls) => field.onChange(urls[0] || '')}
                    multiple={false}
                    maxFiles={1}
                    error={errors.coverImage?.message}
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardBody className="space-y-4">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    label="Category"
                    options={CATEGORIES}
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
                    hint="Press Enter or comma to add"
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* Read time indicator */}
          <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
            <ClockIcon className="w-3 h-3" />
            Estimated read time: <strong>{readTime} min</strong>
          </div>
        </div>
      </div>
    </form>
  );
}