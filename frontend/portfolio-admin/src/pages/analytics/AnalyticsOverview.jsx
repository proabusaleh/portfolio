import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import RealTimeCounter from '../../components/analytics/RealTimeCounter';
import AnalyticsStats from '../../components/analytics/AnalyticsStats';
import VisitorsAreaChart from '../../components/analytics/VisitorsAreaChart';
import SessionsChart from '../../components/analytics/SessionsChart';
import DeviceDonut from '../../components/analytics/DeviceDonut';
import BrowserChart from '../../components/analytics/BrowserChart';
import TopPagesTable from '../../components/analytics/TopPagesTable';
import TopReferrersList from '../../components/analytics/TopReferrersList';
import GeoMap from '../../components/analytics/GeoMap';
import TimeRangeSelector from '../../components/analytics/TimeRangeSelector';
import ExportMenu from '../../components/analytics/ExportMenu';
import { getAnalytics } from '../../api/analyticsApi';

export default function AnalyticsOverview() {
  const [range, setRange] = useState('7d');
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await getAnalytics(range);
      setData(result);
    } catch {
      toast.error('Failed to load analytics');
    }
  }, [range]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Track visitor activity and performance"
        actions={
          <div className="flex items-center gap-3">
            <RealTimeCounter />
            <TimeRangeSelector value={range} onChange={setRange} />
            <ExportMenu analytics={data} />
          </div>
        }
      />

      <AnalyticsStats summary={data?.summary ?? {}} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Visitors</h3>
            <VisitorsAreaChart data={data?.chart ?? []} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Sessions</h3>
            <SessionsChart data={data?.chart ?? []} />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Devices</h3>
            <DeviceDonut data={data?.devices ?? []} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Browsers</h3>
            <BrowserChart data={data?.browsers ?? []} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Top Pages</h3>
            <TopPagesTable data={data?.topPages ?? []} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4">
            <h3 className="text-sm font-semibold mb-3">Referrers</h3>
            <TopReferrersList data={data?.referrers ?? []} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody className="p-4">
          <h3 className="text-sm font-semibold mb-3">Visitors by Country</h3>
          <GeoMap data={data?.geo ?? []} />
        </CardBody>
      </Card>
    </div>
  );
}
