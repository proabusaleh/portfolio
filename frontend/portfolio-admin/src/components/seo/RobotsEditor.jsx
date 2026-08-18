import { useState, useEffect } from 'react';
import { Save, Download, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { updateRobots } from '../../api/seoApi';
import { DEFAULT_ROBOTS } from '../../data/seoData';

export default function RobotsEditor({ initialText, onSave }) {
  const [text, setText]       = useState(initialText || '');
  const [saving, setSaving]   = useState(false);
  const [validation, setValidation] = useState({ valid: true, errors: [] });

  useEffect(() => {
    if (initialText !== undefined) setText(initialText);
  }, [initialText]);

  useEffect(() => {
    // Basic validation
    const errors = [];
    const lines = text.split('\n');
    let hasUserAgent = false;

    lines.forEach((line, i) => {
      const l = line.trim();
      if (!l || l.startsWith('#')) return;

      if (l.toLowerCase().startsWith('user-agent:')) hasUserAgent = true;
      else if (!/(allow|disallow|sitemap|crawl-delay):/i.test(l)) {
        errors.push({ line: i + 1, message: `Unknown directive: "${l}"` });
      }
    });

    if (!hasUserAgent && text.trim().length > 0) {
      errors.push({ line: 0, message: 'Missing User-agent directive' });
    }

    setValidation({ valid: errors.length === 0, errors });
  }, [text]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateRobots(text);
      toast.success('robots.txt saved ✓');
      onSave?.();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setText(DEFAULT_ROBOTS);
    toast.success('Reset to default');
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('robots.txt downloaded');
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold">robots.txt</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Tell search engine crawlers which pages to access
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" icon={RotateCcw} onClick={handleReset}>Reset</Button>
            <Button size="sm" variant="outline" icon={Download} onClick={handleDownload}>Download</Button>
            <Button size="sm" icon={Save} onClick={handleSave} loading={saving}>Save</Button>
          </div>
        </div>

        {/* Editor */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <span className="text-xs font-mono text-gray-500">robots.txt</span>
            {validation.valid ? (
              <span className="flex items-center gap-1 text-xs text-green-500 font-semibold">
                <CheckCircle className="w-3 h-3" /> Valid
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                <AlertCircle className="w-3 h-3" /> {validation.errors.length} issue{validation.errors.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={16}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs bg-white dark:bg-gray-900 focus:outline-none resize-y"
            placeholder="User-agent: *&#10;Allow: /"
          />
        </div>

        {/* Validation errors */}
        {!validation.valid && (
          <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
              Validation Issues:
            </p>
            <ul className="text-xs text-red-600 dark:text-red-400 space-y-0.5">
              {validation.errors.map((e, i) => (
                <li key={i}>
                  {e.line > 0 && `Line ${e.line}: `}{e.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Help */}
        <div className="mt-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
          <p className="text-xs text-indigo-700 dark:text-indigo-300">
            <strong>💡 Quick reference:</strong>
          </p>
          <ul className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 space-y-0.5 font-mono">
            <li><code>User-agent: *</code> — Rules for all bots</li>
            <li><code>Allow: /</code> — Allow access to path</li>
            <li><code>Disallow: /admin/</code> — Block a path</li>
            <li><code>Sitemap: https://...</code> — Reference your sitemap</li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}