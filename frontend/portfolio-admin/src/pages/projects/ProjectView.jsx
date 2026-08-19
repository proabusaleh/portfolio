import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Edit, Trash2, Eye, ExternalLink, Star, Calendar,
  Clock, Folder, Users, Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ConfirmModal } from '../../components/ui/Modal';

import { getProject, deleteProjects, updateProjects } from '../../api/projectsApi';
import { formatDate, formatNumber } from '../../lib/utils';

const STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  archived: 'default',
};

const CATEGORY_VARIANT = {
  WordPress: 'primary',
  Flutter: 'default',
  WooCommerce: 'warning',
  'UI/UX': 'danger',
};

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch {
        toast.error('Project not found');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProjects([id]);
      toast.success('Project deleted');
      navigate('/projects');
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  const handleFeatureToggle = async () => {
    try {
      await updateProjects([id], { featured: !project.featured });
      setProject((p) => ({ ...p, featured: !p.featured }));
      toast.success(project.featured ? 'Removed from featured' : 'Marked as featured');
    } catch {
      toast.error('Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!project) return null;

  const images = project.images?.length ? project.images : project.image ? [project.image] : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.title}
        subtitle="Single project view"
        actions={
          <>
            <Link to="/projects">
              <Button variant="outline" size="sm" icon={ArrowLeft}>Back</Button>
            </Link>
            <Button size="sm" icon={Edit} onClick={() => navigate(`/projects/${id}/edit`)}>
              Edit
            </Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleting(true)}>
              Delete
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <img
                src={images[activeImage]}
                alt={project.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
              {images.length > 1 && (
                <div className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-900 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                        i === activeImage
                          ? 'border-indigo-500'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Description */}
          <Card>
            <CardBody>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Description
              </h3>
              {project.content ? (
                <div
                  className="prose dark:prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              )}
            </CardBody>
          </Card>

          {/* Tech stack */}
          {project.tags?.length > 0 && (
            <Card>
              <CardBody>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* SEO preview */}
          {(project.seo?.metaTitle || project.seo?.metaDescription) && (
            <Card>
              <CardBody className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  SEO Preview
                </h3>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate">
                    {project.seo.metaTitle || project.title}
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-xs mt-0.5 truncate">
                    yourportfolio.com/project/{project.slug}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                    {project.seo.metaDescription || project.description}
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
            <CardBody className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Project Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-center">
                  <Eye className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                  <p className="text-lg font-bold">{formatNumber(project.views || 0)}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Views</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-center">
                  <Folder className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                  <p className="text-lg font-bold">{project.category}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Category</p>
                </div>
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
                  <span className="text-gray-500">Status</span>
                  <Badge variant={STATUS_VARIANT[project.status]} dot size="sm">
                    {project.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <Badge variant={CATEGORY_VARIANT[project.category] || 'default'} size="sm">
                    {project.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Featured</span>
                  <span className="font-medium flex items-center gap-1">
                    {project.featured && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                    {project.featured ? 'Yes' : 'No'}
                  </span>
                </div>
                {project.client && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client</span>
                    <span className="font-medium flex items-center gap-1">
                      <Users className="w-3 h-3" /> {project.client}
                    </span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.duration}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Year</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {project.year}
                  </span>
                </div>
                {project.created_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium">{formatDate(project.created_at)}</span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Links */}
          {(project.demoUrl || project.repoUrl) && (
            <Card>
              <CardBody className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Links
                </h3>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                  >
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 truncate">Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                  >
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 truncate">Repository</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                )}
              </CardBody>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardBody className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Actions
              </h3>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Edit}
                className="justify-start"
                onClick={() => navigate(`/projects/${id}/edit`)}
              >
                Edit Project
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Eye}
                className="justify-start"
                onClick={() => window.open(`/project/${project.slug}`, '_blank')}
              >
                View Live
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Star}
                className={`justify-start ${project.featured ? '!text-yellow-500 hover:!bg-yellow-50 dark:hover:!bg-yellow-500/10' : ''}`}
                onClick={handleFeatureToggle}
              >
                {project.featured ? 'Unfeature' : 'Feature'}
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Trash2}
                className="justify-start !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10"
                onClick={() => setDeleting(true)}
              >
                Delete Project
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDelete}
        title={`Delete "${project.title}"?`}
        description="This action cannot be undone. The project will be permanently removed."
        confirmText="Delete Project"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
