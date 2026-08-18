import { useState, useEffect, useCallback } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { ConfirmModal } from '../../components/ui/Modal';

import SkillCategory from '../../components/skills/SkillCategory';
import SkillFormModal from '../../components/skills/SkillFormModal';

import { getSkillsGrouped, deleteSkill, SKILL_CATEGORIES } from '../../api/skillsApi';

export default function SkillsList() {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [defaultCategory, setDefaultCategory] = useState('frontend');

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSkillsGrouped();
      setGrouped(data);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const totalSkills = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  const handleAdd = (category) => {
    setEditing(null);
    setDefaultCategory(category || 'frontend');
    setFormOpen(true);
  };

  const handleEdit = (skill) => {
    setEditing(skill);
    setFormOpen(true);
  };

  const handleDelete = (skill) => setDeleting(skill);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteSkill(deleting.id);
      toast.success('Skill deleted');
      setDeleting(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const categories = filterCat
    ? SKILL_CATEGORIES.filter((c) => c.value === filterCat)
    : SKILL_CATEGORIES;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skills"
        subtitle={`${totalSkills} skills across ${SKILL_CATEGORIES.length} categories`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetch}>Refresh</Button>
            <Button size="sm" icon={Plus} onClick={() => handleAdd(filterCat || 'frontend')}>New Skill</Button>
          </div>
        }
      />

      {/* Category filter */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg w-fit">
        <button
          onClick={() => setFilterCat('')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            !filterCat ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          All
        </button>
        {SKILL_CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilterCat(c.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              filterCat === c.value ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mt-2" />
              </div>
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-14 bg-gray-200 dark:bg-gray-800 rounded-lg ml-2" />
              ))}
            </div>
          ))}
        </div>
      ) : totalSkills === 0 ? (
        <EmptyState
          title="No skills yet"
          description="Add skills to showcase your expertise."
          action={<Button icon={Plus} onClick={() => handleAdd('frontend')}>New Skill</Button>}
        />
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => (
            <SkillCategory
              key={cat.value}
              category={cat}
              skills={grouped[cat.value] || []}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <SkillFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        skill={editing}
        defaultCategory={defaultCategory}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete "${deleting?.name}"?`}
        description="This will permanently remove this skill."
        confirmText="Delete Skill"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}
