import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, RefreshCw } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import StatCard from '../../components/dashboard/StatCard';
import VisitorsChart from '../../components/charts/VisitorsChart';
import CategoryChart from '../../components/charts/CategoryChart';
import TrafficChart from '../../components/charts/TrafficChart';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentMessages from '../../components/dashboard/RecentMessages';
import RecentProjects from '../../components/dashboard/RecentProjects';

import { getDashboard } from '../../api/dashboardApi';
import { useAuth } from '../../hooks/useAuth';

const STAT_META = {
  projects:  { label: 'Total Projects',      icon: 'FolderKanban', color: 'from-indigo-500 to-purple-500', period: 'vs last month' },
  blog:      { label: 'Blog Posts',           icon: 'FileText',     color: 'from-emerald-500 to-teal-500', period: 'vs last month' },
  messages:  { label: 'New Messages',         icon: 'MessageSquare', color: 'from-orange-500 to-red-500',   period: 'vs last month' },
  visitors:  { label: 'Portfolio Visitors',   icon: 'Users',        color: 'from-cyan-500 to-blue-500',    period: 'vs last month' },
};

export default function Overview() {
  const { user } = useAuth();
  const greeting = getGreeting();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboard();
      setData(res);
    } catch (err) {
      console.error('Dashboard fetch failed:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse lg:col-span-2" />
          <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-sm text-gray-500">{error}</p>
        <Button variant="outline" onClick={fetchData} icon={RefreshCw}>
          Retry
        </Button>
      </div>
    );
  }

  const stats = data?.stats
    ? Object.entries(data.stats).map(([id, s]) => ({
        id,
        value: s.current,
        change: s.change,
        trend: s.trend,
        ...STAT_META[id],
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <PageHeader
        title={`${greeting}, ${user?.name?.split(' ')[0] || 'there'}! 👋`}
        subtitle="Here's what's happening with your portfolio today."
        actions={
          <>
            <Button variant="outline" size="md" icon={Calendar}>
              Last 30 days
            </Button>
            <Button variant="primary" size="md" icon={Download}>
              Export Report
            </Button>
          </>
        }
      />

      {/* ── Stat Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatCard stat={stat} index={i} />
          </motion.div>
        ))}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <VisitorsChart data={data?.blogActivity || []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TrafficChart data={data?.trafficData || []} />
        </motion.div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <CategoryChart data={data?.categoryData || []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* ── Bottom Row: Messages + Projects ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <RecentMessages messages={data?.recentMessages || []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RecentProjects projects={data?.recentProjects || []} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────── */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
