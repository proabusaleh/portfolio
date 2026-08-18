import { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { SOCIAL_PLATFORMS } from '../../data/contactData';

export default function SocialLinksEditor({ value = [], onChange }) {
  const [platform, setPlatform] = useState('GitHub');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (!url) return;
    const p = SOCIAL_PLATFORMS.find((s) => s.platform === platform);
    onChange([...value, { id: Date.now(), platform, url, icon: p?.icon || 'bxl-globe' }]);
    setUrl('');
  };

  const handleRemove = (id) => onChange(value.filter((s) => s.id !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {value.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
            <i className={`bx ${s.icon} text-lg w-6 text-center`} />
            <span className="text-sm font-medium w-24 shrink-0">{s.platform}</span>
            <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-500 hover:underline truncate flex-1">
              {s.url} <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
            <button onClick={() => handleRemove(s.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <Select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          options={SOCIAL_PLATFORMS.map((p) => ({ value: p.platform, label: p.platform }))}
          className="w-36"
        />
        <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="flex-1" />
        <Button size="sm" icon={Plus} onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
