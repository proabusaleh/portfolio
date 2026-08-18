import { useState } from 'react';
import { Users, Send } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import SubscribersList from './SubscribersList';
import Campaigns from './Campaigns';

const TABS = [
  { value: 'subscribers', label: 'Subscribers', icon: Users },
  { value: 'campaigns',   label: 'Campaigns',   icon: Send  },
];

export default function NewsletterHome() {
  const [tab, setTab] = useState('subscribers');

  return (
    <div>
      <PageHeader
        title="Newsletter"
        subtitle="Manage your subscribers and email campaigns"
      />

      <Card className="mb-6 overflow-hidden">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </Card>

      {tab === 'subscribers' && <SubscribersList />}
      {tab === 'campaigns'   && <Campaigns />}
    </div>
  );
}