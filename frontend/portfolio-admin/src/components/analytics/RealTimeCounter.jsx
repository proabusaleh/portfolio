import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Circle, Users } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import Card, { CardBody } from '../ui/Card';
import { getRealTimeData } from '../../api/analyticsApi';

export default function RealTimeCounter() {
  const [data, setData] = useState({ activeUsers: 0, history: [] });

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      const d = await getRealTimeData();
      if (mounted) setData(d);
    };

    fetch();
    const interval = setInterval(fetch, 5000); // Update every 5s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardBody className="p-0">
        <div className="p-5 flex items-center gap-4">
          {/* Live pulse indicator */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
            <Circle className="w-3 h-3 fill-green-500 text-green-500 relative" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                Real-time
              </p>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500 text-white font-bold uppercase animate-pulse">
                Live
              </span>
            </div>
            <motion.p
              key={data.activeUsers}
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: 'currentColor' }}
              className="text-2xl font-bold mt-0.5"
            >
              {data.activeUsers}
            </motion.p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-3 h-3" /> active users right now
            </p>
          </div>
        </div>

        {/* Mini sparkline chart */}
        <div className="h-16 -mx-1 -mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.history}>
              <defs>
                <linearGradient id="realtimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ display: 'none' }}
                cursor={{ stroke: '#10b981', strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#realtimeGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}