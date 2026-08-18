import { useState } from 'react';
import { Plus, Trash2, Download, RefreshCw, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import Card, { CardBody } from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { updateSitemap, generateSitemapXml } from '../../api/seoApi';
import { copyToClipboard, formatDate, cn } from '../../lib/utils';

const CHANGE_FREQS = [
  { value: 'always',  label: 'Always'  },
  { value: 'hourly',  label: 'Hourly'  },
  { value: 'daily',   label: 'Daily'   },
  { value: 'weekly',  label: 'Weekly'  },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly',  label: 'Yearly'  },
];

export default function SitemapGenerator({ urls: initialUrls, onSave }) {
  const [urls, setUrls]       = useState(initialUrls || []);
  const [showXml, setShowXml] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [newUrl, setNewUrl]   = useState('');

  const xml = generateSitemapXml(urls);

  const addUrl = () => {
    if (!newUrl.trim()) return;
    setUrls([
      ...urls,
      {
        url: newUrl.trim(),
        priority: 0.5,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
      },
    ]);
    setNewUrl('');
  };

  const removeUrl = (i) => {
    setUrls(urls.filter((_, idx) => idx !== i));
  };

  const updateField = (i, field, value) => {
    setUrls(urls.map((u, idx) => idx === i ? { ...u, [field]: value } : u));
  };

  const handleSave = async () => {
    await updateSitemap(urls);
    toast.success('Sitemap saved ✓');
    onSave?.();
  };

  const handleDownload = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('sitemap.xml downloaded');
  };

  const handleCopy = async () => {
    await copyToClipboard(xml);
    setCopied(true);
    toast.success('XML copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* URL list */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Sitemap URLs</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {urls.length} URLs in your sitemap
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" icon={showXml ? RefreshCw : Copy} onClick={() => setShowXml(!showXml)}>
                {showXml ? 'Hide XML' : 'Show XML'}
              </Button>
              <Button size="sm" icon={Download} onClick={handleDownload}>Download</Button>
            </div>
          </div>

          {/* Add form */}
          <div className="flex gap-2 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <Input
              placeholder="https://yourportfolio.com/new-page"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
              className="flex-1"
            />
            <Button icon={Plus} onClick={addUrl} disabled={!newUrl.trim()}>Add URL</Button>
          </div>

          {/* URLs table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="text-left px-3 py-2">URL</th>
                  <th className="text-left px-3 py-2 w-32">Priority</th>
                  <th className="text-left px-3 py-2 w-36">Frequency</th>
                  <th className="text-left px-3 py-2 w-32">Last Modified</th>
                  <th className="w-10 px-2"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {urls.map((url, i) => (
                    <motion.tr
                      key={`${url.url}-${i}`}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-3 py-2">
                        <input
                          value={url.url}
                          onChange={(e) => updateField(i, 'url', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-indigo-500 focus:outline-none bg-transparent"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.1}
                          value={url.priority}
                          onChange={(e) => updateField(i, 'priority', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 text-xs rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-indigo-500 focus:outline-none bg-transparent"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={url.changefreq}
                          onChange={(e) => updateField(i, 'changefreq', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-indigo-500 focus:outline-none bg-transparent"
                        >
                          {CHANGE_FREQS.map((f) => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">
                        {formatDate(url.lastmod)}
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => removeUrl(i)}
                          className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <Button onClick={handleSave}>Save Sitemap</Button>
          </div>
        </CardBody>
      </Card>

      {/* XML preview */}
      {showXml && (
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">sitemap.xml</h3>
              <button
                onClick={handleCopy}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 text-xs rounded transition',
                  copied
                    ? 'bg-green-500 text-white'
                    : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-gray-900 text-gray-100 text-xs overflow-x-auto max-h-96 font-mono">
              <code>{xml}</code>
            </pre>
          </CardBody>
        </Card>
      )}
    </div>
  );
}