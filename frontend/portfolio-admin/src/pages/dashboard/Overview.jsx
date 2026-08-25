import { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentMessages from '../../components/dashboard/RecentMessages';
import RecentProjects from '../../components/dashboard/RecentProjects';
import VisitorsChart from '../../components/charts/VisitorsChart';
import CategoryChart from '../../components/charts/CategoryChart';
import TrafficChart from '../../components/charts/TrafficChart';
import { getDashboard } from '../../api/dashboardApi';
import { PATHS } from '../../router/routes';

const STAT_META = {
  projects:  { label: 'Total Projects',      icon: 'FolderKanban', color: 'from-indigo-500 to-purple-500', period: 'vs last month' },
  blog:      { label: 'Blog Posts',           icon: 'FileText',     color: 'from-emerald-500 to-teal-500', period: 'vs last month' },
  messages:  { label: 'New Messages',         icon: 'MessageSquare', color: 'from-orange-500 to-red-500',   period: 'vs last month' },
  visitors:  { label: 'Portfolio Visitors',   icon: 'Users',        color: 'from-cyan-500 to-blue-500',    period: 'vs last month' },
};

export default function Overview() {
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse lg:col-span-2" />
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
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your portfolio today."
        actions={
          <Link to={PATHS.PROJECT_NEW} className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} />
            New Project
          </Link>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Quick actions + visitors */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <QuickActions />
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Visitors
          </h3>
          <VisitorsChart data={data?.blogActivity || []} />
        </Card>
      </div>

      {/* Category + traffic charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Projects by Category
          </h3>
          <CategoryChart data={data?.categoryData || []} />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Traffic Sources
          </h3>
          <TrafficChart data={data?.trafficData || []} />
        </Card>
      </div>

      {/* Recent projects + messages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects projects={data?.recentProjects || []} />
        <RecentMessages messages={data?.recentMessages || []} />
      </div>
    </div>
  );
}
