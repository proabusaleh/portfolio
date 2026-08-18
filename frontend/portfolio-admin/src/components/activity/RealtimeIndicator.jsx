import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export default function RealtimeIndicator() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="relative flex h-2.5 w-2.5">
        <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', active ? 'bg-green-400' : 'bg-green-300')} />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      Live
    </div>
  );
}
