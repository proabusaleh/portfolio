import { useState, useEffect } from 'react';
import { Search, Link as LinkIcon, TrendingUp, MousePointerClick, Eye, Target, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Card, { CardBody, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatNumber, cn } from '../../lib/utils';
import { getGscData } from '../../api/seoApi';

export default function GoogleSearchConsole() {
  const [connected, setConnected] = useState(false);
  const [data, setData]           = useState(null);
  const [loading, setLoading]     = useState(false);
  const [verifCode, setVerifCode] = useState('');

  useEffect(() => {
    if (connected) fetchData();
    // eslint-disable-next-line
  }, [connected]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const d = await getGscData();
      setData(d);
    } catch {
      toast.error('Failed to fetch GSC data');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    if (!verifCode.trim()) {
      toast.error('Please enter verification code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
      toast.success('🎉 Connected to Google Search Console!');
    }, 1200);
  };

  if (!connected) {
    return (
      <Card>
        <CardBody className="text-center py-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-1">Google Search Console</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Connect to see search queries, clicks, and impressions for your site.
          </p>

          <div className="max-w-sm mx-auto space-y-3">
            <Input
              placeholder="Enter verification code"
              value={verifCode}
              onChange={(e) => setVerifCode(e.target.value)}
              hint="Get this from Google Search Console → Ownership verification"
            />
            <Button fullWidth loading={loading} onClick={handleConnect} icon={LinkIcon}>
              Connect Search Console
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (loading || !data) {
    return (
      <Card>
        <CardBody className="text-center py-12">
          <RefreshCw className="w-8 h-8 mx-auto text-indigo-500 animate-spin" />
          <p className="text-sm text-gray-500 mt-2">Loading Search Console data...</p>
        </CardBody>
      </Card>
    );
  }

  const STATS = [
    { icon: MousePointerClick, label: 'Total Clicks',      value: data.totalClicks,      color: 'from-indigo-500 to-purple-500', format: formatNumber },
    { icon: Eye,               label: 'Total Impressions', value: data.totalImpressions, color: 'from-blue-500 to-cyan-500',     format: formatNumber },
    { icon: Target,            label: 'Avg CTR',            value: data.avgCtr,           color: 'from-emerald-500 to-teal-500',   format: (v) => `${v}%` },
    { icon: TrendingUp,        label: 'Avg Position',       value: data.avgPosition,      color: 'from-orange-500 to-red-500',     format: (v) => `#${v}` },
  ];

  return (
    <div className="space-y-4">
      {/* Connected banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Connected to Google Search Console</p>
            <p className="text-xs opacity-90">Data updates every hour</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          icon={RefreshCw}
          onClick={fetchData}
          className="!bg-white/20 !border-white/30 !text-white hover:!bg-white/30"
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 bg-gradient-to-br',
                stat.color
              )}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-0.5">{stat.format(stat.value)}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top queries */}
      <Card>
        <CardHeader>
          <CardTitle>Top Search Queries</CardTitle>
          <CardDescription>Keywords bringing visitors from Google</CardDescription>
        </CardHeader>

        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">Query</th>
                  <th className="text-right px-4 py-2 font-semibold">Clicks</th>
                  <th className="text-right px-4 py-2 font-semibold hidden sm:table-cell">Impressions</th>
                  <th className="text-right px-4 py-2 font-semibold">CTR</th>
                  <th className="text-right px-4 py-2 font-semibold">Position</th>
                </tr>
              </thead>
              <tbody>
                {data.topQueries.map((q, i) => (
                  <motion.tr
                    key={q.query}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <td className="px-4 py-3 font-medium">{q.query}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatNumber(q.clicks)}</td>
                    <td className="px-4 py-3 text-right text-gray-500 tabular-nums hidden sm:table-cell">{formatNumber(q.impressions)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span className={cn(
                        'text-xs font-semibold px-2 py-0.5 rounded',
                        q.ctr > 5 ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' :
                        q.ctr > 2 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400' :
                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      )}>
                        {q.ctr}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold">
                      #{q.position}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}