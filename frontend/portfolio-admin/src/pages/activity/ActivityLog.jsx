import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import ActivityStats from '../../components/activity/ActivityStats';
import ActivityFilters from '../../components/activity/ActivityFilters';
import ActivityTimeline from '../../components/activity/ActivityTimeline';
import ActionBreakdown from '../../components/activity/ActionBreakdown';
import ActivityHeatmap from '../../components/activity/ActivityHeatmap';
import UserActivityLeaderboard from '../../components/activity/UserActivityLeaderboard';
import RealtimeIndicator from '../../components/activity/RealtimeIndicator';
import { getActivityLog, getActivityStats, getActivityHeatmap, getLeaderboard, exportActivityLog } from '../../api/activityApi';
import { getUsers, SAMPLE_ACTIVITY } from '../../data/activityData';

const TABS = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'analytics', label: 'Analytics' },
];

export default function ActivityLog() {
  const [tab, setTab] = useState('timeline');
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [heatmap, setHeatmap] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', action: '', resource: '' });
  const users = getUsers();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [log, s, hm, lb] = await Promise.all([
        getActivityLog(filters),
        getActivityStats(),
        getActivityHeatmap(),
        getLeaderboard(),
      ]);
      setActivities(log || []);
      setStats(s);
      setHeatmap(hm || {});
      setLeaderboard(lb || []);
    } catch {
      setActivities(SAMPLE_ACTIVITY);
      setStats({ total: SAMPLE_ACTIVITY.length, thisWeek: SAMPLE_ACTIVITY.length, today: 0, byAction: {}, byUser: [] });
      setHeatmap({});
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const handleExport = async (fmt) => {
    await exportActivityLog(fmt);
    toast.success(`Exported as ${fmt.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Log"
        description="Monitor all system activity"
        actions={
          <div className="flex items-center gap-3">
            <RealtimeIndicator />
            <Button size="sm" icon={Download} onClick={() => handleExport('csv')} variant="outline">Export CSV</Button>
          </div>
        }
      />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'timeline' && (
        <div className="space-y-6">
          {stats && <ActivityStats stats={stats} />}
          <Card>
            <CardBody className="p-4">
              <ActivityFilters filters={filters} onChange={setFilters} />
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <ActivityTimeline activities={activities} users={users} />
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityHeatmap heatmap={heatmap} />
          <ActionBreakdown actionCounts={stats?.actionCounts} />
          <div className="lg:col-span-2">
            <UserActivityLeaderboard leaderboard={leaderboard} />
          </div>
        </div>
      )}
    </div>
  );
}
