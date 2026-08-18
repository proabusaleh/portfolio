import Select from '../ui/Select';
import { TIME_RANGES } from '../../data/analyticsData';

export default function TimeRangeSelector({ value, onChange }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={TIME_RANGES.map((r) => ({ value: r.value, label: r.label }))}
      className="w-40"
    />
  );
}
