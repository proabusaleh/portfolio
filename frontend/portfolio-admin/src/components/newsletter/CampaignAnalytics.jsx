import { Send, Eye, MousePointerClick } from 'lucide-react';

export default function CampaignAnalytics({ campaign }) {
  if (!campaign) return null;

  const openRate = campaign.recipients ? ((campaign.opens / campaign.recipients) * 100).toFixed(1) : 0;
  const clickRate = campaign.recipients ? ((campaign.clicks / campaign.recipients) * 100).toFixed(1) : 0;

  const stats = [
    { label: 'Recipients', value: campaign.recipients, icon: Send, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Opened', value: `${openRate}%`, icon: Eye, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Clicked', value: `${clickRate}%`, icon: MousePointerClick, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="text-center p-3 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className={`w-8 h-8 mx-auto rounded-lg ${bg} flex items-center justify-center mb-2`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <p className="text-lg font-bold">{value}</p>
          <p className="text-[10px] text-gray-500 uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
}
