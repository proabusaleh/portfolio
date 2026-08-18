import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Save, ArrowLeft, Eye } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Toggle from '../../components/ui/Toggle';
import Button from '../../components/ui/Button';

import RichTextEditor from '../../components/forms/RichTextEditor';
import TagsInput from '../../components/forms/TagsInput';
import SlugInput from '../../components/forms/SlugInput';

import DatePicker from '../../components/ui/DatePicker';

import { getPost, createPost, updatePost } from '../../api/blogApi';
import { PATHS } from '../../router/routes';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  image: z.string().url('Must be a valid URL').or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean(),
  publishedAt: z.string().nullable().optional(),
});

const DEFAULT_VALUES = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  image: '',
  status: 'draft',
  featured: false,
  publishedAt: null,
};

const CATEGORIES = [
  'React', 'Mobile', 'CSS', 'WordPress', 'Design',
  'Backend', 'SEO', 'Architecture', 'JavaScript', 'DevOps',
].map((c) => ({ value: c, label: c }));

export default function BlogPostForm({ postId }) {
  const navigate = useNavigate();
  const isEdit = Boolean(postId);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const {
    control, register, handleSubmit, watch, reset, getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const title = watch('title');

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const post = await getPost(postId);
        reset({
          ...DEFAULT_VALUES,
          ...post,
          publishedAt: post.publishedAt || null,
        });
      } catch {
        toast.error('Post not found');
        navigate(PATHS.BLOG);
      } finally {
        setFetching(false);
      }
    })();
  }, [postId, isEdit, reset, navigate]);

  const onSubmit = async (data, publishAction = null) => {
    setLoading(true);
    try {
      const payload = { ...data };
      if (publishAction) payload.status = publishAction;

      if (isEdit) {
        await updatePost(postId, payload);
        toast.success('Post updated!');
      } else {
        const created = await createPost(payload);
        toast.success('Post created!');
        navigate(`/blog/${created.id}/edit`, { replace: true });
      }
    } catch {
      toast.error('Something went wrong');
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
        subtitle={isEdit ? 'Update your blog post' : 'Write a new blog post'}
        actions={
          <>
            <Button variant="outline" icon={ArrowLeft} type="button" onClick={() => navigate(PATHS.BLOG)}>
              Back
            </Button>
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
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <Input
                label="Title"
                placeholder="Enter post title..."
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
                label="Excerpt"
                placeholder="A short summary for previews..."
                rows={2}
                error={errors.excerpt?.message}
                hint="This appears in post cards and SEO previews"
                {...register('excerpt')}
              />

              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <RichTextEditor
                    label="Content"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.content?.message}
                    placeholder="Write your post content..."
                  />
                )}
              />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
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
                      { value: 'draft', label: 'Draft' },
                      { value: 'published', label: 'Published' },
                      { value: 'archived', label: 'Archived' },
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
                    label="Featured Post"
                    description="Show this post on your homepage"
                  />
                )}
              />

              <Controller
                control={control}
                name="publishedAt"
                render={({ field }) => (
                  <DatePicker
                    label="Publish Date"
                    value={field.value}
                    onChange={field.onChange}
                    showTime
                    placeholder="Pick publish date..."
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* Media */}
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Media
              </h3>
              <Input
                label="Cover Image URL"
                placeholder="https://example.com/image.jpg"
                type="url"
                error={errors.image?.message}
                hint="1200×630 recommended"
                {...register('image')}
              />
              {watch('image') && (
                <img
                  src={watch('image')}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
                />
              )}
            </CardBody>
          </Card>

          {/* Categories & Tags */}
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Taxonomy
              </h3>

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
                    hint="Type & press Enter to add tags"
                  />
                )}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </form>
  );
}
