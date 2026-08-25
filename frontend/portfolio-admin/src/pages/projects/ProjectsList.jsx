import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Eye, Copy, Trash2, Star, Archive, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import { ConfirmModal } from '../../components/ui/Modal';

import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import RowActions from '../../components/tables/RowActions';
import ProjectFilters from '../../components/projects/ProjectFilters';
import ProjectStatusBadge from '../../components/projects/ProjectStatusBadge';

import { getProjects, deleteProjects, updateProjects, duplicateProject } from '../../api/projectsApi';
import { useDebounce } from '../../hooks/useDebounce';
import { formatNumber, formatDate } from '../../lib/utils';
import { PAGINATION } from '../../lib/constants';
import { PATHS as ROUTE_PATHS } from '../../router/routes';

const CATEGORY_VARIANT = {
  WordPress:   'primary',
  Flutter:     'default',
  WooCommerce: 'warning',
  'UI/UX':     'danger',
};

export default function ProjectsList() {
  const navigate = useNavigate();

  /* ── State ── */
  const [loading, setLoading]   = useState(true);
  const [projects, setProjects] = useState([]);
  const [total, setTotal]       = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [filters, setFilters] = useState({
    category: '', status: '', year: '', featured: '',
  });

  const [sortBy, setSortBy]       = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

  const [selectedIds, setSelectedIds] = useState([]);

  // Confirmation modal
  const [confirmModal, setConfirmModal] = useState({ open: false, action: null });

  /* ── Fetch data ── */
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProjects({
        search: debouncedSearch,
        ...filters,
        sortBy,
        sortOrder,
        page,
        pageSize,
      });
      setProjects(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters, sortBy, sortOrder, page, pageSize]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset to page 1 when search/filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, pageSize]);

  /* ── Handlers ── */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const resetFilters = () => {
    setFilters({ category: '', status: '', year: '', featured: '' });
    setSearch('');
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleSelectRow = (id, checked) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(checked ? projects.map((p) => p.id) : []);
  };

  /* ── Bulk actions ── */
  const openConfirm = (action) => setConfirmModal({ open: true, action });
  const closeConfirm = () => setConfirmModal({ open: false, action: null });

  const executeBulkAction = async () => {
    const { action } = confirmModal;
    if (!action) return;

    try {
      if (action === 'delete') {
        await deleteProjects(selectedIds);
        toast.success(`Deleted ${selectedIds.length} project(s)`);
      } else if (action === 'publish') {
        await updateProjects(selectedIds, { status: 'published' });
        toast.success(`Published ${selectedIds.length} project(s)`);
      } else if (action === 'unpublish') {
        await updateProjects(selectedIds, { status: 'draft' });
        toast.success(`Unpublished ${selectedIds.length} project(s)`);
      } else if (action === 'feature') {
        await updateProjects(selectedIds, { featured: true });
        toast.success(`Featured ${selectedIds.length} project(s)`);
      }
      setSelectedIds([]);
      fetchProjects();
    } catch (err) {
      toast.error('Action failed');
    } finally {
      closeConfirm();
    }
  };

  /* ── Row actions ── */
  const handleViewPage = (item) => navigate(`/projects/${item.id}/view`);
  const handleEdit = (item) => navigate(`/projects/${item.id}/edit`);
  const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';
  const handleView = (item) => window.open(`${PUBLIC_URL}/project/${item.slug}`, '_blank');
  const handleDuplicate = async (item) => {
    try {
      await duplicateProject(item.id);
      toast.success('Project duplicated');
      fetchProjects();
    } catch {
      toast.error('Failed to duplicate');
    }
  };
  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await deleteProjects([item.id]);
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Failed to delete');
    }
  };
  const handleFeatureToggle = async (item) => {
    try {
      await updateProjects([item.id], { featured: !item.featured });
      toast.success(item.featured ? 'Removed from featured' : 'Marked as featured');
      fetchProjects();
    } catch {
      toast.error('Failed to update');
    }
  };
  const handleArchive = async (item) => {
    try {
      await updateProjects([item.id], { status: 'archived' });
      toast.success('Project archived');
      fetchProjects();
    } catch {
      toast.error('Failed to archive');
    }
  };

  /* ── Table columns ── */
  const columns = [
    {
      key: 'title',
      label: 'Project',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={row.image}
            alt={row.title}
            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200 dark:border-gray-800"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); handleViewPage(row); }}
                className="font-medium text-sm truncate hover:text-indigo-500 transition text-left"
              >
                {row.title}
              </button>
              {row.featured && (
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{row.client}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (row) => (
        <Badge variant={CATEGORY_VARIANT[row.category] || 'default'}>
          {row.category}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <ProjectStatusBadge status={row.status} />,
    },
    {
      key: 'year',
      label: 'Year',
      sortable: true,
      align: 'right',
    },
    {
      key: 'views',
      label: 'Views',
      sortable: true,
      align: 'right',
      render: (row) => <span className="tabular-nums">{formatNumber(row.views)}</span>,
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (row) => (
        <span className="text-xs text-gray-500">{formatDate(row.created_at)}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      width: '60px',
      render: (row) => (
        <RowActions
          item={row}
          actions={[
            { label: 'View',       icon: Eye,     onClick: handleViewPage },
            { label: 'Edit',       icon: Edit,    onClick: handleEdit },
            { label: 'View live',  icon: ExternalLink,     onClick: handleView },
            { label: 'Duplicate', icon: Copy,    onClick: handleDuplicate },
            { divider: true },
            {
              label: row.featured ? 'Unfeature' : 'Feature',
              icon: Star,
              onClick: handleFeatureToggle,
            },
            { label: 'Archive',   icon: Archive, onClick: handleArchive },
            { divider: true },
            { label: 'Delete',    icon: Trash2,  onClick: handleDelete, danger: true },
          ]}
        />
      ),
    },
  ];

  /* ── Confirm modal config ── */
  const confirmConfig = {
    delete:    { title: `Delete ${selectedIds.length} project(s)?`, desc: 'This action cannot be undone.',        btn: 'Delete',    variant: 'danger'  },
    publish:   { title: `Publish ${selectedIds.length} project(s)?`, desc: 'They will become visible on your portfolio.', btn: 'Publish',   variant: 'primary' },
    unpublish: { title: `Unpublish ${selectedIds.length} project(s)?`, desc: 'They will be moved back to drafts.',        btn: 'Unpublish', variant: 'primary' },
    feature:   { title: `Feature ${selectedIds.length} project(s)?`,  desc: 'They will appear on your homepage.',         btn: 'Feature',   variant: 'primary' },
  };

  const currentConfirm = confirmModal.action ? confirmConfig[confirmModal.action] : null;

  /* ── Render ── */
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${total} total project${total !== 1 ? 's' : ''}`}
        actions={
          <Link to={ROUTE_PATHS.PROJECT_NEW}>
            <Button icon={Plus}>Add Project</Button>
          </Link>
        }
      />

      <Card>
        <div className="p-4 space-y-4">
          {/* Toolbar */}
          <TableToolbar
            search={search}
            onSearchChange={setSearch}
            selectedCount={selectedIds.length}
            onBulkDelete={() => openConfirm('delete')}
            onBulkPublish={() => openConfirm('publish')}
            onBulkUnpublish={() => openConfirm('unpublish')}
            onBulkFeature={() => openConfirm('feature')}
          />

          {/* Filters */}
          <ProjectFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* Data table */}
        <DataTable
          columns={columns}
          data={projects}
          loading={loading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          onRowClick={handleViewPage}
          selectable
          selectedIds={selectedIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          emptyState={
            <EmptyState
              title="No projects found"
              description="Try adjusting your filters or add a new project."
              action={
                <Link to={ROUTE_PATHS.PROJECT_NEW}>
                  <Button icon={Plus}>Add Project</Button>
                </Link>
              }
            />
          }
        />

        {/* Pagination */}
        {!loading && projects.length > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </Card>

      {/* Bulk action confirmation */}
      {currentConfirm && (
        <ConfirmModal
          isOpen={confirmModal.open}
          onClose={closeConfirm}
          onConfirm={executeBulkAction}
          title={currentConfirm.title}
          description={currentConfirm.desc}
          confirmText={currentConfirm.btn}
          variant={currentConfirm.variant}
        />
      )}
    </div>
  );
}