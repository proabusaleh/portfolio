import { useState, useEffect } from 'react';
import {
  X, Copy, Trash2, Edit, ExternalLink,
  Check, Calendar, HardDrive, Image as ImageIcon,
  Play, FileText, File,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TagsInput from '../forms/TagsInput';
import { formatBytes } from '../../api/mediaApi';
import { formatDate, copyToClipboard, cn } from '../../lib/utils';

const TYPE_ICONS = { image: ImageIcon, video: Play, document: FileText };

export default function MediaPreviewModal({ isOpen, file: media, onClose, onDelete, onUpdate }) {
  const [editing, setEditing]   = useState(false);
  const [name, setName]         = useState('');
  const [tags, setTags]         = useState([]);
  const [copied, setCopied]     = useState(false);
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    if (media) {
      setName(media.name || '');
      setTags(media.tags || []);
      setEditing(false);
    }
  }, [media]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!media) return null;

  const isImage = media.type === 'image';
  const TypeIcon = TYPE_ICONS[media.type] || File;

  const handleCopy = async () => {
    const ok = await copyToClipboard(media.url || media.name);
    if (ok) {
      setCopied(true);
      toast.success('URL copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(media.id, { name, tags });
      toast.success('Updated');
      setEditing(false);
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${media.name}"?`)) {
      onDelete(media.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-5xl h-full max-h-[85vh] pointer-events-auto flex flex-col lg:flex-row rounded-xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
            >
              {/* ── Left: Preview ── */}
              <div className="flex-1 min-h-0 bg-gray-100 dark:bg-gray-950 flex items-center justify-center relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {isImage && media.url ? (
                  <img
                    src={media.url}
                    alt={media.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                      <TypeIcon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-lg font-semibold">{media.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {media.type.toUpperCase()} · {formatBytes(media.size)}
                    </p>
                  </div>
                )}
              </div>

              {/* ── Right: Details ── */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    File Details
                  </p>
                  {editing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-sm"
                    />
                  ) : (
                    <h2 className="font-semibold text-sm truncate" title={media.name}>
                      {media.name}
                    </h2>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
                  <MetaRow icon={HardDrive}  label="Size"       value={formatBytes(media.size)} />
                  <MetaRow icon={TypeIcon}   label="Type"       value={media.mime} />
                  {media.dimensions && (
                    <MetaRow icon={ImageIcon} label="Dimensions" value={`${media.dimensions.w} × ${media.dimensions.h}`} />
                  )}
                  <MetaRow icon={Calendar}   label="Uploaded"   value={formatDate(media.uploadedAt)} />

                  {/* Tags */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1.5">Tags</p>
                    {editing ? (
                      <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
                    ) : tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No tags</p>
                    )}
                  </div>

                  {/* URL */}
                  {media.url && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1.5">URL</p>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          readOnly
                          value={media.url}
                          className="flex-1 px-2 py-1.5 text-xs rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 truncate"
                        />
                        <button
                          onClick={handleCopy}
                          title="Copy URL"
                          className={cn(
                            'p-2 rounded transition',
                            copied
                              ? 'bg-green-500 text-white'
                              : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  {editing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" fullWidth onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" fullWidth onClick={handleSave} loading={saving}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" icon={Edit} onClick={() => setEditing(true)}>
                          Edit
                        </Button>
                        {media.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={ExternalLink}
                            onClick={() => window.open(media.url, '_blank')}
                          >
                            Open
                          </Button>
                        )}
                      </div>
                      <Button variant="danger" size="sm" fullWidth icon={Trash2} onClick={handleDelete}>
                        Delete file
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <span className="text-gray-500 shrink-0">{label}:</span>
      <span className="font-medium truncate">{value}</span>
    </div>
  );
}