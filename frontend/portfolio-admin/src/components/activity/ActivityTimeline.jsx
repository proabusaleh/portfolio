import ActivityItem from './ActivityItem';

export default function ActivityTimeline({ activities = [], users = [] }) {
  if (activities.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-8">No activity found</p>;
  }

  const grouped = {};
  activities.forEach((a) => {
    const day = new Date(a.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(a);
  });

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day}>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sticky top-0 bg-white dark:bg-gray-900 py-1">{day}</h4>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.map((a) => <ActivityItem key={a.id} activity={a} users={users} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
