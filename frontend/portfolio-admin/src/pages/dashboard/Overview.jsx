import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentMessages from '../../components/dashboard/RecentMessages';
import RecentProjects from '../../components/dashboard/RecentProjects';
import VisitorsChart from '../../components/charts/VisitorsChart';
import CategoryChart from '../../components/charts/CategoryChart';
import TrafficChart from '../../components/charts/TrafficChart';
import { STATS, RECENT_MESSAGES, RECENT_PROJECTS } from '../../data/dashboardData';
import { PATHS } from '../../router/routes';

export default function Overview() {
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
        {STATS.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Quick actions + visitors */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <QuickActions />
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Visitors
          </h3>
          <VisitorsChart />
        </Card>
      </div>

      {/* Category + traffic charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Projects by Category
          </h3>
          <CategoryChart />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Traffic Sources
          </h3>
          <TrafficChart />
        </Card>
      </div>

      {/* Recent projects + messages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects projects={RECENT_PROJECTS} />
        <RecentMessages messages={RECENT_MESSAGES} />
      </div>
    </div>
  );
}
