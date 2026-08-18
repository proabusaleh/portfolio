import { Link } from 'react-router-dom';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatNumber, timeAgo } from '../../lib/utils';
import { PATHS } from '../../router/routes';

const CATEGORY_COLORS = {
  WordPress:   'primary',
  Flutter:     'default',
  WooCommerce: 'warning',
  'UI/UX':     'danger',
  React:       'info',
  Laravel:     'danger',
  'Vue.js':    'success',
  'Node.js':   'success',
  PHP:         'primary',
  Mobile:      'warning',
};

export default function RecentProjects({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardHeader
          action={
            <Link
              to={PATHS.PROJECTS}
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-400 text-center py-8">No projects yet</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        action={
          <Link
            to={PATHS.PROJECTS}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              {/* Image */}
              <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={project.status === 'published' ? 'success' : 'default'}
                    dot
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm truncate flex-1">
                    {project.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <Badge variant={CATEGORY_COLORS[project.category] || 'default'}>
                    {project.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatNumber(project.views || 0)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 mt-2">
                  {timeAgo(project.created_at)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
