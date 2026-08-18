import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, Globe } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { truncate } from '../../lib/utils';

export default function FacebookPreview({ title, description, image, url }) {
  const displayUrl = url?.replace(/^https?:\/\//, '').toUpperCase() || 'YOURPORTFOLIO.COM';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📘</span> Facebook Preview
        </CardTitle>
        <CardDescription>How your link appears when shared on Facebook</CardDescription>
      </CardHeader>

      <CardBody className="pt-2">
        <motion.div
          key={title + description + image}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="max-w-md rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {/* Image */}
          <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
            {image ? (
              <img src={image} alt="OG" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                <Globe className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/60">
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">
              {displayUrl}
            </p>
            <h4 className="font-semibold text-[15px] mt-1 leading-tight">
              {truncate(title || 'Your Title Here', 70)}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {truncate(description || 'Your description...', 100)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around py-2 border-t border-gray-200 dark:border-gray-800 text-gray-500 text-xs">
            <button className="flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <ThumbsUp className="w-3.5 h-3.5" /> Like
            </button>
            <button className="flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <MessageCircle className="w-3.5 h-3.5" /> Comment
            </button>
            <button className="flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </motion.div>
      </CardBody>
    </Card>
  );
}