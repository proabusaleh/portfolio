import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function InviteLink() {
  const [link] = useState(() => `${window.location.origin}/invite/new`);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Invite link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-semibold mb-2">Share Invite Link</h3>
      <p className="text-xs text-gray-500 mb-3">Anyone with this link can create an account</p>
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <code className="flex-1 text-xs text-gray-600 dark:text-gray-300 truncate font-mono">{link}</code>
        <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition shrink-0">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
    </div>
  );
}
