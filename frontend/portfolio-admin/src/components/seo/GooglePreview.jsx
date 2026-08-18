import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { truncate } from '../../lib/utils';

export default function GooglePreview({ title, description, url }) {
  const displayUrl = url?.replace(/^https?:\/\//, '') || 'yourportfolio.com';
  const breadcrumb = displayUrl.split('/').slice(0, 3).join(' › ');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">🔍</span> Google Search Preview
        </CardTitle>
        <CardDescription>How your page appears in Google results</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <motion.div
          key={title + description}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 max-w-2xl"
          style={{ fontFamily: 'arial, sans-serif' }}
        >
          {/* Site URL breadcrumb */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[8px] font-bold">
              A
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {displayUrl.split('/')[0]}
              </p>
              <p className="text-[11px] text-gray-500">
                https://{breadcrumb}
              </p>
            </div>
          </div>

          {/* Title (blue like Google) */}
          <h3 className="text-[20px] leading-tight text-[#1a0dab] dark:text-blue-400 mb-1 mt-2 hover:underline cursor-pointer">
            {truncate(title || 'Your Page Title', 60)}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
            {truncate(description || 'Your meta description will appear here...', 160)}
          </p>
        </motion.div>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span className={title?.length > 60 ? 'text-red-500 font-semibold' : ''}>
            Title: {title?.length || 0}/60
          </span>
          <span className={description?.length > 160 ? 'text-red-500 font-semibold' : ''}>
            Desc: {description?.length || 0}/160
          </span>
        </div>
      </CardBody>
    </Card>
  );
}