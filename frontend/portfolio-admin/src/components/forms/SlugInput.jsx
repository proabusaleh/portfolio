import { useEffect, useState } from 'react';
import { RefreshCw, Link as LinkIcon } from 'lucide-react';
import Input from '../ui/Input';
import { slugify } from '../../lib/utils';

export default function SlugInput({
  title,
  value,
  onChange,
  error,
  baseUrl = 'yourportfolio.com/project/',
}) {
  const [manualEdit, setManualEdit] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!manualEdit && title) {
      onChange(slugify(title));
    }
  }, [title, manualEdit]); // eslint-disable-line

  const handleRegenerate = () => {
    if (title) {
      onChange(slugify(title));
      setManualEdit(false);
    }
  };

  return (
    <div className="space-y-1">
      <Input
        label="URL Slug"
        icon={LinkIcon}
        value={value}
        onChange={(e) => {
          setManualEdit(true);
          onChange(slugify(e.target.value));
        }}
        placeholder="my-awesome-project"
        error={error}
        rightElement={
          <button
            type="button"
            onClick={handleRegenerate}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
            title="Regenerate from title"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        }
      />
      {value && (
        <p className="text-xs text-gray-500">
          🔗 {baseUrl}<span className="font-mono text-indigo-500">{value}</span>
        </p>
      )}
    </div>
  );
}