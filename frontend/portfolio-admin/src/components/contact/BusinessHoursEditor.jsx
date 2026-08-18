export default function BusinessHoursEditor({ value = [], onChange, timezone: _timezone, onTimezoneChange: _onTimezoneChange }) {
  const hours = Array.isArray(value) ? value : [];

  const update = (index, field, val) => {
    const updated = hours.map((h, i) => i === index ? { ...h, [field]: val } : h);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {hours.map((h, i) => (
        <div key={h.day} className="flex items-center gap-3">
          <label className="flex items-center gap-2 w-32 shrink-0">
            <input
              type="checkbox"
              checked={h.open}
              onChange={(e) => update(i, 'open', e.target.checked)}
              className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium">{h.label}</span>
          </label>
          {h.open ? (
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={h.from}
                onChange={(e) => update(i, 'from', e.target.value)}
                className="px-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-400">to</span>
              <input
                type="time"
                value={h.to}
                onChange={(e) => update(i, 'to', e.target.value)}
                className="px-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <span className="text-xs text-gray-400">Closed</span>
          )}
        </div>
      ))}
    </div>
  );
}
