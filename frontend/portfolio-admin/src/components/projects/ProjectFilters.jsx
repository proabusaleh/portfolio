import { X } from 'lucide-react';
import Select from '../ui/Select';
import { PROJECT_CATEGORIES, PROJECT_STATUS } from '../../lib/constants';

export default function ProjectFilters({ filters, onChange, onReset }) {
  const YEARS = [2024, 2023, 2022, 2021, 2020].map((y) => ({
    value: y,
    label: String(y),
  }));

  const hasActive = Object.values(filters).some((v) => v !== '' && v !== null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <Select
        value={filters.category}
        onChange={(e) => onChange('category', e.target.value)}
        options={PROJECT_CATEGORIES.map((c) => ({ value: c.label, label: c.label }))}
        placeholder="All Categories"
      />
      <Select
        value={filters.status}
        onChange={(e) => onChange('status', e.target.value)}
        options={PROJECT_STATUS.map((s) => ({ value: s.value, label: s.label }))}
        placeholder="All Statuses"
      />
      <Select
        value={filters.year}
        onChange={(e) => onChange('year', e.target.value)}
        options={YEARS}
        placeholder="All Years"
      />
      <Select
        value={filters.featured}
        onChange={(e) => onChange('featured', e.target.value)}
        options={[
          { value: 'true', label: 'Featured only' },
          { value: 'false', label: 'Not featured' },
        ]}
        placeholder="Featured?"
      />
      <div className="flex items-center">
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-red-500 hover:underline"
          >
            <X className="w-3 h-3" />
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}