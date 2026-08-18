import { useState, useEffect, useCallback } from 'react';
import { Plus, MoreVertical, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import { ConfirmModal } from '../../components/ui/Modal';

import { getPages, deletePage, updatePage } from '../../api/pagesApi';
import { PATHS } from '../../router/routes';

function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getPages();
      setPages(list);
    } catch {
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);
  useEffect(() => {
    const handler = () => setMenuOpen(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleDelete = (page) => setDeleting(page);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deletePage(deleting.id);
      toast.success('Page deleted');
      setDeleting(null);
      fetchPages();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const toggleStatus = async (page) => {
    try {
      await updatePage(page.id, {
        status: page.status === 'published' ? 'draft' : 'published',
      });
      toast.success(`Page ${page.status === 'published' ? 'unpublished' : 'published'}`);
      fetchPages();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <PageHeader
        title="Pages"
        subtitle={`${pages.length} page${pages.length !== 1 ? 's' : ''}`}
        actions={
          <Button icon={Plus} onClick={() => navigate(PATHS.PAGES_NEW)}>
            Add Page
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : pages.length === 0 ? (
        <EmptyState
          title="No pages yet"
          description="Create your first page to add content to your portfolio."
          action={
            <Button icon={Plus} onClick={() => navigate(PATHS.PAGES_NEW)}>
              Add Page
            </Button>
          }
        />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Updated</th>
                  <th className="px-5 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium">{page.title}</p>
                      {page.meta_title && (
                        <p className="text-xs text-gray-400 truncate max-w-xs">{page.meta_title}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">/{page.slug}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                          page.status === 'published'
                            ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400'
                        }`}
                      >
                        {page.status === 'published'
                          ? <Eye className="w-3 h-3" />
                          : <EyeOff className="w-3 h-3" />}
                        {page.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{formatDate(page.updated_at)}</td>
                    <td className="px-5 py-3 relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === page.id ? null : page.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {menuOpen === page.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={() => { setMenuOpen(null); navigate(PATHS.PAGES_EDIT.replace(':id', page.id)); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => { setMenuOpen(null); toggleStatus(page); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            {page.status === 'published'
                              ? <><EyeOff className="w-3.5 h-3.5" /> Unpublish</>
                              : <><Eye className="w-3.5 h-3.5" /> Publish</>}
                          </button>
                          <button
                            onClick={() => { setMenuOpen(null); handleDelete(page); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete "${deleting?.title}"?`}
        description="This will permanently remove this page."
        confirmText="Delete Page"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
