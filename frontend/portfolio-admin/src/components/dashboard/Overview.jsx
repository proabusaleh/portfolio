import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import StatCard from '../../components/dashboard/StatCard';
import VisitorsChart from '../../components/charts/VisitorsChart';
import CategoryChart from '../../components/charts/CategoryChart';
import TrafficChart from '../../components/charts/TrafficChart';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentMessages from '../../components/dashboard/RecentMessages';
import RecentProjects from '../../components/dashboard/RecentProjects';

import {
  STATS,
  VISITORS_DATA,
  CATEGORY_DATA,
  TRAFFIC_DATA,
  RECENT_MESSAGES,
  RECENT_PROJECTS,
} from '../../data/dashboardData';
import { useAuth } from '../../hooks/useAuth';

export default function Overview() {
  const { user } = useAuth();
  const greeting = getGreeting();

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
        {STATS.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
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
          <VisitorsChart data={VISITORS_DATA} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TrafficChart data={TRAFFIC_DATA} />
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
          <CategoryChart data={CATEGORY_DATA} />
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
          <RecentMessages messages={RECENT_MESSAGES} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RecentProjects projects={RECENT_PROJECTS} />
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