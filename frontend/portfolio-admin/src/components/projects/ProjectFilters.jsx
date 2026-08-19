import { X } from 'lucide-react';
import Select from '../ui/Select';
import { PROJECT_CATEGORIES, PROJECT_STATUS } from '../../lib/constants';

export default function ProjectFilters({ filters, onChange, onReset }) {
  const YEARS = [2025, 2024, 2023, 2022, 2021, 2020].map((y) => ({
    value: String(y),
    label: String(y),
  }));

  const hasActive = Object.values(filters).some((v) => v !== '' && v !== null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <Select
        value={filters.category}
        onChange={(val) => onChange('category', val)}
        options={PROJECT_CATEGORIES.map((c) => ({ value: c.label, label: c.label }))}
        placeholder="All Categories"
      />
      <Select
        value={filters.status}
        onChange={(val) => onChange('status', val)}
        options={PROJECT_STATUS.map((s) => ({ value: s.value, label: s.label }))}
        placeholder="All Statuses"
      />
      <Select
        value={filters.year}
        onChange={(val) => onChange('year', val)}
        options={YEARS}
        placeholder="All Years"
      />
      <Select
        value={filters.featured}
        onChange={(val) => onChange('featured', val)}
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