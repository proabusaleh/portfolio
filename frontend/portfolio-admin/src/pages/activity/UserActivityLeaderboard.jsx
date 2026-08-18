import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import Avatar from '../ui/Avatar';
import { formatNumber } from '../../lib/utils';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function UserActivityLeaderboard({ data }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          Top Contributors
        </CardTitle>
        <CardDescription>Most active team members</CardDescription>
      </CardHeader>

      <CardBody className="space-y-3">
        {data.map((item, i) => {
          const barWidth = (item.count / max) * 100;
          return (
            <motion.div
              key={item.user.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-3"
            >
              <span className="text-xl w-6 text-center shrink-0">
                {MEDALS[i] || `#${i + 1}`}
              </span>

              <Avatar src={item.user.avatar} name={item.user.name} size="sm" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{item.user.name}</p>
                  <span className="text-xs font-semibold text-indigo-500 tabular-nums shrink-0">
                    {formatNumber(item.count)}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="h-full bg-gradient-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
}