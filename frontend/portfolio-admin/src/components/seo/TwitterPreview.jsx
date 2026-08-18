import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { truncate } from '../../lib/utils';

export default function TwitterPreview({ title, description, image, url, handle }) {
  const displayUrl = url?.replace(/^https?:\/\//, '').split('/')[0] || 'yourportfolio.com';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">🐦</span> Twitter / X Preview
        </CardTitle>
        <CardDescription>How your link appears when shared on X</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <motion.div
          key={title + description + image}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-black"
        >
          {/* Image */}
          <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
            {image ? (
              <img src={image} alt="Twitter card" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px]">
              {displayUrl}
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <p className="text-[11px] text-gray-500">
              {displayUrl}
            </p>
            <h4 className="font-semibold text-sm mt-0.5 leading-tight">
              {truncate(title || 'Your Title', 70)}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {truncate(description || 'Description...', 120)}
            </p>
            {handle && (
              <p className="text-xs text-gray-500 mt-2">
                Posted by <span className="text-blue-500">{handle}</span>
              </p>
            )}
          </div>
        </motion.div>
      </CardBody>
    </Card>
  );
}