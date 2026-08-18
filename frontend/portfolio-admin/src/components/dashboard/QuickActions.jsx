import { Link } from 'react-router-dom';
import { Plus, FileText, Briefcase, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardBody } from '../ui/Card';
import { PATHS } from '../../router/routes';

const ACTIONS = [
  { label: 'New Project', to: PATHS.PROJECT_NEW, icon: Plus,           color: 'from-indigo-500 to-purple-500' },
  { label: 'Write Blog',  to: PATHS.BLOG,        icon: FileText,       color: 'from-emerald-500 to-teal-500'  },
  { label: 'Add Service', to: PATHS.SERVICES,    icon: Briefcase,      color: 'from-orange-500 to-red-500'    },
  { label: 'View Inbox',  to: PATHS.MESSAGES,    icon: MessageSquare,  color: 'from-cyan-500 to-blue-500'     },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardBody className="grid grid-cols-2 gap-3">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={a.to}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br ${a.color} text-white text-center hover:opacity-90 shadow-md transition-all`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{a.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
}