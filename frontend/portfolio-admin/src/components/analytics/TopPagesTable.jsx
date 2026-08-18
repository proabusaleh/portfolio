import { ExternalLink, Eye, Clock, MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../ui/Card';
import { formatNumber, cn } from '../../lib/utils';

export default function TopPagesTable({ data }) {
  const maxViews = Math.max(...data.map((p) => p.views));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>Most-viewed pages on your portfolio</CardDescription>
      </CardHeader>

      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
              <tr className="text-xs uppercase text-gray-500">
                <th className="text-left px-4 py-2 font-semibold">Page</th>
                <th className="text-right px-4 py-2 font-semibold">
                  <Eye className="w-3 h-3 inline mr-1" /> Views
                </th>
                <th className="text-right px-4 py-2 font-semibold hidden sm:table-cell">
                  <Clock className="w-3 h-3 inline mr-1" /> Avg Time
                </th>
                <th className="text-right px-4 py-2 font-semibold hidden md:table-cell">
                  <MousePointer className="w-3 h-3 inline mr-1" /> Bounce
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((page, i) => {
                const barWidth = (page.views / maxViews) * 100;
                const mins = Math.floor(page.avgTime / 60);
                const secs = page.avgTime % 60;
                const bounceColor = page.bounce < 30 ? 'text-green-500' : page.bounce < 50 ? 'text-yellow-500' : 'text-red-500';

                return (
                  <motion.tr
                    key={page.path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition"
                  >
                    <td className="px-4 py-3 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{page.title}</p>
                          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                            {page.path}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 shrink-0" />
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-semibold tabular-nums">{formatNumber(page.views)}</span>
                        <div className="w-16 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}%` }}
                            className="h-full bg-gradient-primary rounded-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell tabular-nums">
                      {mins > 0 ? `${mins}m ${secs}s` : `${secs}s`}
                    </td>
                    <td className={cn('px-4 py-3 text-right hidden md:table-cell font-semibold tabular-nums', bounceColor)}>
                      {page.bounce}%
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}