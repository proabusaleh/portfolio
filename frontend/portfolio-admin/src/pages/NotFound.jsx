import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { PATHS } from '../router/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to={PATHS.DASHBOARD}
          className="inline-flex items-center gap-2 btn-primary"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}