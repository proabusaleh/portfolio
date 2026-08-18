import { useState, useEffect, useCallback } from 'react';
import { Plus, Info } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import { ConfirmModal } from '../../components/ui/Modal';

import SkillCategory from '../../components/skills/SkillCategory';
import SkillFormModal from '../../components/skills/SkillFormModal';

import {
  getSkills, deleteSkill, reorderSkills, SKILL_CATEGORIES,
} from '../../api/skillsApi';

export default function SkillsList() {
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen]         = useState(false);
  const [editing, setEditing]           = useState(null);
  const [defaultCat, setDefaultCat]     = useState(null);
  const [deleting, setDeleting]         = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getSkills();
      setSkills(list);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleAddInCategory = (category) => {
    setEditing(null);
    setDefaultCat(category);
    setFormOpen(true);
  };

  const handleAddNew = () => {
    setEditing(null);
    setDefaultCat(null);
    setFormOpen(true);
  };

  const handleEdit = (skill) => {
    setEditing(skill);
    setDefaultCat(null);
    setFormOpen(true);
  };

  const handleDelete = (skill) => setDeleting(skill);

  const confirmDelete = async () => {
    if (!deleting) return;
    setConfirmLoading(true);
    try {
      await deleteSkill(deleting.id);
      toast.success('Skill removed');
      setDeleting(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReorderCategory = async (category, reorderedSkills) => {
    // Optimistically update UI
    setSkills((all) => {
      const others = all.filter((s) => s.category !== category);
      const updated = reorderedSkills.map((s, i) => ({ ...s, order: i + 1 }));
      return [...others, ...updated];
    });

    try {
      await reorderSkills(category, reorderedSkills.map((s) => s.id));
      toast.success('Order updated');
    } catch {
      toast.error('Failed to save order');
      fetch();
    }
  };

  // Group skills by category
  const grouped = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    skills: skills
      .filter((s) => s.category === cat.value)
      .sort((a, b) => a.order - b.order),
  }));

  const totalSkills = skills.length;
  const avgOverall = totalSkills
    ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / totalSkills)
    : 0;

  return (
    <div>
      <PageHeader
        title="Skills / Tech Stack"
        subtitle={`${totalSkills} skill${totalSkills !== 1 ? 's' : ''} across ${SKILL_CATEGORIES.length} categories · Avg proficiency ${avgOverall}%`}
        actions={<Button icon={Plus} onClick={handleAddNew}>Add Skill</Button>}
      />

      {/* Hint */}
      <div className="mb-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-2">
        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          <strong>Tip:</strong> Drag any skill by its grip icon to reorder within its category.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-xl" />
          ))}
        </div>
      ) : totalSkills === 0 ? (
        <EmptyState
          title="No skills added yet"
          description="Add your first skill to showcase your expertise."
          action={<Button icon={Plus} onClick={handleAddNew}>Add Skill</Button>}
        />
      ) : (
        <div className="space-y-4">
          {grouped.map(({ category, skills: catSkills }) => (
            <SkillCategory
              key={category.value}
              category={category}
              skills={catSkills}
              onAdd={handleAddInCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReorder={handleReorderCategory}
            />
          ))}
        </div>
      )}

      <SkillFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        skill={editing}
        defaultCategory={defaultCat}
        onSuccess={fetch}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Remove "${deleting?.name}"?`}
        description="This skill will be permanently removed from your portfolio."
        confirmText="Remove"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}