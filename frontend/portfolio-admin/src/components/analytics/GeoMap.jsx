import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber, cn } from '../../lib/utils';

export default function GeoMap({ data }) {
  const maxVisitors = Math.max(...data.map((c) => c.visitors));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-500" />
          Visitors by Country
        </CardTitle>
        <CardDescription>Geographic distribution of your audience</CardDescription>
      </CardHeader>

      <CardBody className="p-0">
        {/* World summary banner */}
        <div className="mx-5 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/50 dark:border-indigo-900/30 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Global Reach
              </p>
              <p className="text-2xl font-bold mt-1">
                {data.length} Countries
              </p>
            </div>
            <div className="text-4xl">🌍</div>
          </div>
        </div>

        {/* Country list */}
        <div className="px-5 pb-5 space-y-2 max-h-96 overflow-y-auto">
          {data.map((country, i) => {
            const barWidth = (country.visitors / maxVisitors) * 100;
            return (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
              >
                <span className="text-2xl shrink-0">{country.flag}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{country.name}</p>
                    <span className="text-xs text-gray-500 tabular-nums shrink-0">
                      {formatNumber(country.visitors)}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.8, delay: i * 0.03 }}
                      className="h-full bg-gradient-primary rounded-full"
                    />
                  </div>
                </div>

                <span className={cn(
                  'text-xs font-bold w-12 text-right tabular-nums px-2 py-0.5 rounded shrink-0',
                  i === 0
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400'
                    : 'text-gray-600 dark:text-gray-400'
                )}>
                  {country.percent}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}