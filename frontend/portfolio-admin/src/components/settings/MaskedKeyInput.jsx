import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../ui/Input';
import { copyToClipboard, cn } from '../../lib/utils';

export default function MaskedKeyInput({ label, value, onChange, docsLink, placeholder = 'Enter API key...', hint }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied]   = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await copyToClipboard(value);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium">{label}</label>
        {docsLink && (
          <a
            href={docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
          >
            Get key <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <Input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono"
        rightElement={
          <div className="flex gap-0.5">
            {value && (
              <button
                type="button"
                onClick={handleCopy}
                title="Copy"
                className={cn(
                  'p-1.5 rounded transition',
                  copied ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              title={visible ? 'Hide' : 'Show'}
              className="p-1.5 rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        }
      />

      {value && !visible && (
        <p className="text-[11px] text-gray-400 font-mono mt-1">
          {'•'.repeat(Math.min(value.length, 20))} ({value.length} chars)
        </p>
      )}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}