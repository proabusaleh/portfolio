import { Link } from 'react-router-dom';
import { Reply, ArrowRight, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardBody } from '../ui/Card';
import Avatar from '../ui/Avatar';
import { timeAgo, truncate, cn } from '../../lib/utils';
import { PATHS } from '../../router/routes';

export default function RecentMessages({ messages }) {
  return (
    <Card>
      <CardHeader
        action={
          <Link
            to={PATHS.MESSAGES}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {messages.map((msg, i) => (
            <motion.li
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-start gap-3 p-4 group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition',
                msg.unread && 'bg-indigo-50/30 dark:bg-indigo-950/10'
              )}
            >
              <Avatar name={msg.name} size="md" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-semibold text-sm truncate">{msg.name}</p>
                    {msg.unread && (
                      <Circle className="w-2 h-2 fill-indigo-500 text-indigo-500 shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 shrink-0">
                    {timeAgo(msg.time)}
                  </span>
                </div>
                <p className="text-xs font-medium mt-0.5 truncate">{msg.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {truncate(msg.preview, 70)}
                </p>
              </div>

              <button
                className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 shrink-0"
                title="Quick reply"
              >
                <Reply className="w-4 h-4 text-indigo-500" />
              </button>
            </motion.li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}