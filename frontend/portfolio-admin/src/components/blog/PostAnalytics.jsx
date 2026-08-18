import { Eye, Heart, MessageSquare, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PostAnalytics({ stats }) {
  if (!stats) return null;

  const cards = [
    { icon: FileText, label: 'Total Posts', value: stats.total, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
    { icon: Eye, label: 'Total Views', value: stats.totalViews.toLocaleString(), color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: Heart, label: 'Total Likes', value: stats.totalLikes.toLocaleString(), color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/30' },
    { icon: MessageSquare, label: 'Total Shares', value: stats.totalShares.toLocaleString(), color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
  ];

  const statusCards = [
    { label: 'Published', value: stats.published, color: 'text-green-600 dark:text-green-400' },
    { label: 'Draft', value: stats.draft, color: 'text-gray-500' },
    { label: 'Archived', value: stats.archived, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={cn('p-3 rounded-xl', card.bg)}
          >
            <div className="flex items-center gap-2 mb-1">
              <card.icon className={cn('w-4 h-4', card.color)} />
              <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
            </div>
            <p className={cn('text-xl font-bold', card.color)}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="flex items-center gap-6 text-sm">
        {statusCards.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className={cn('font-semibold', s.color)}>{s.value}</span>
            <span className="text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
