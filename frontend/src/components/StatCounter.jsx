import { useEffect, useState } from 'react';
import { useCountersOnView } from '../lib/hooks.js';

export default function StatCounter({ target, suffix = '+', label, icon, delay = 0 }) {
  const { ref, inView } = useCountersOnView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const duration = 1800;
    const step = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div className="stats-item" data-aos="zoom-in" data-aos-delay={delay} ref={ref}>
      {icon && (
        <span className="stat-icon">
          <i className={`bx ${icon}`} />
        </span>
      )}
      <span className="stat-number">{value}</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
