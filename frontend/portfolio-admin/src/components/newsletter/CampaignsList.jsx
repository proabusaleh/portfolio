import CampaignCard from './CampaignCard';

export default function CampaignsList({ campaigns = [], onEdit, onDelete, onSend, onPreview }) {
  if (!campaigns.length) {
    return <p className="text-sm text-gray-400 text-center py-8">No campaigns yet</p>;
  }

  return (
    <div className="space-y-2">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onEdit={onEdit} onDelete={onDelete} onSend={onSend} onPreview={onPreview} />
      ))}
    </div>
  );
}
