import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import FolderSidebar from '../../components/media/FolderSidebar';
import StorageBar from '../../components/media/StorageBar';
import UploadZone from '../../components/media/UploadZone';
import MediaToolbar from '../../components/media/MediaToolbar';
import MediaGrid from '../../components/media/MediaGrid';
import MediaList from '../../components/media/MediaList';
import MediaPreviewModal from '../../components/media/MediaPreviewModal';
import { getMedia, getFolders, getFolderCounts, uploadFile, deleteFile, deleteFiles, updateFile, createFolder, deleteFolder, getStorageInfo } from '../../api/mediaApi';

export default function MediaGallery() {
  const [items, setItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [storage, setStorage] = useState({ used: 0, total: 1, count: 0 });
  const [folderCounts, setFolderCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [typeFilter, setTypeFilter] = useState('');
  const [activeFolder, setActiveFolder] = useState('root');
  const [selectedIds, setSelectedIds] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [mediaData, folderData, storageData, countsData] = await Promise.all([
        getMedia({ search, folderId: activeFolder, type: typeFilter }),
        getFolders(),
        getStorageInfo(),
        getFolderCounts(),
      ]);
      setItems(mediaData);
      setFolders(folderData);
      setStorage(storageData);
      setFolderCounts(countsData);
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [search, activeFolder, typeFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDelete = async (id) => {
    try { await deleteFile(id); toast.success('File deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} files?`)) return;
    try { await deleteFiles(selectedIds); setSelectedIds([]); toast.success('Files deleted'); fetchData(); } catch { toast.error('Delete failed'); }
  };

  const handleUpload = async (fileData) => {
    try { await uploadFile(fileData); toast.success('File uploaded'); fetchData(); } catch { toast.error('Upload failed'); }
  };

  const handleAddFolder = async (name, parentId) => {
    try { await createFolder(name, parentId); toast.success('Folder created'); fetchData(); } catch { toast.error('Failed'); }
  };

  const handleDeleteFolder = async (id) => {
    if (!window.confirm('Delete this folder? Files will be moved to root.')) return;
    try { await deleteFolder(id); toast.success('Folder deleted'); fetchData(); } catch { toast.error('Failed'); }
  };

  const handleUpdateFile = async (id, data) => {
    try { await updateFile(id, data); setPreviewFile((prev) => (prev?.id === id ? { ...prev, ...data } : prev)); fetchData(); } catch { toast.error('Update failed'); }
  };

  const handleBulkMove = () => {
    toast.info('Move functionality — select a target folder');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Upload and organize images, videos, and documents"
        actions={
          <Button variant="primary" size="sm" onClick={() => setShowUpload(!showUpload)}>
            <Upload className="w-4 h-4 mr-1.5" /> Upload Files
          </Button>
        }
      />

      {showUpload && <UploadZone onUpload={handleUpload} folderId={activeFolder} />}

      <div className="flex gap-6">
        <div className="w-52 shrink-0 hidden lg:block space-y-4">
          <FolderSidebar
            folders={folders}
            activeFolder={activeFolder}
            onSelect={setActiveFolder}
            onAdd={handleAddFolder}
            onDelete={handleDeleteFolder}
            counts={folderCounts}
          />
          <StorageBar used={storage.used} total={storage.total} />
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          <MediaToolbar
            search={search}
            onSearchChange={setSearch}
            view={view}
            onViewChange={setView}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            selectedCount={selectedIds.length}
            onBulkDelete={handleBulkDelete}
            onBulkMove={handleBulkMove}
          />

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-gray-400">No files found</p>
            </div>
          ) : view === 'grid' ? (
            <MediaGrid items={items} selectedIds={selectedIds} onSelect={toggleSelect} onPreview={setPreviewFile} onDelete={handleDelete} />
          ) : (
            <MediaList items={items} selectedIds={selectedIds} onSelect={toggleSelect} onPreview={setPreviewFile} onDelete={handleDelete} />
          )}

          <p className="text-xs text-gray-400 text-center">{items.length} file{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <MediaPreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        file={previewFile}
        onDelete={handleDelete}
        onUpdate={handleUpdateFile}
      />
    </div>
  );
}
