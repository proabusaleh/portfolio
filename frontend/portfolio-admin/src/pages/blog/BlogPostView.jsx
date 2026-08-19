import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Eye, Heart, MessageCircle, Clock, Share2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ConfirmModal } from '../../components/ui/Modal';

import { getPost, deletePost } from '../../api/blogApi';
import { formatDate, formatNumber } from '../../lib/utils';

const STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  scheduled: 'primary',
};

export default function BlogPostView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch {
        toast.error('Post not found');
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deletePost(id);
      toast.success('Post deleted');
      navigate('/blog');
    } catch {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={post.title}
        subtitle={`Single post view`}
        actions={
          <>
            <Link to="/blog">
              <Button variant="outline" size="sm" icon={ArrowLeft}>
                Back
              </Button>
            </Link>
            <Link to={`/blog/${id}/edit`}>
              <Button size="sm" icon={Edit}>
                Edit
              </Button>
            </Link>
            <Button
              size="sm"
              variant="danger"
              icon={Trash2}
              onClick={() => setDeleting(true)}
            >
              Delete
            </Button>
          </>
        }
      />

      {/* Cover image */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={STATUS_VARIANT[post.status]} dot size="sm">
                  {post.status}
                </Badge>
                <Badge variant="default" size="sm">{post.category}</Badge>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime || 0} min read
                </span>
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic border-l-4 border-indigo-500 pl-4 mb-4">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              <div
                className="prose dark:prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardBody>
          </Card>

          {/* SEO preview */}
          {(post.seo?.metaTitle || post.seo?.metaDescription) && (
            <Card>
              <CardBody className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  SEO Preview
                </h3>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate">
                    {post.seo.metaTitle || post.title}
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-xs mt-0.5 truncate">
                    yourportfolio.com/blog/{post.slug}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                    {post.seo.metaDescription || post.excerpt}
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Post Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Eye, label: 'Views', value: post.views || 0 },
                  { icon: Heart, label: 'Likes', value: post.likes || 0 },
                  { icon: MessageCircle, label: 'Comments', value: post.comments || 0 },
                  { icon: Share2, label: 'Shares', value: post.shares || 0 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-center"
                  >
                    <s.icon className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                    <p className="text-lg font-bold">{formatNumber(s.value)}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Details */}
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Author</span>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant={STATUS_VARIANT[post.status]} dot size="sm">
                    {post.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium">{post.category}</span>
                </div>
                {post.publishedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Published</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                )}
                {post.scheduledAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.scheduledAt)}
                    </span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Actions */}
          <Card>
            <CardBody className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Actions
              </h3>
              <Link to={`/blog/${id}/edit`}>
                <Button variant="outline" fullWidth size="sm" icon={Edit} className="justify-start">
                  Edit Post
                </Button>
              </Link>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Eye}
                className="justify-start"
                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
              >
                View Live
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Trash2}
                className="justify-start !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10"
                onClick={() => setDeleting(true)}
              >
                Delete Post
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDelete}
        title="Delete Post?"
        description="This action cannot be undone. All comments for this post will also be deleted."
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}
