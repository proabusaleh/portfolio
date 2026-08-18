import { useState, useEffect } from 'react';
import { Save, Eye, RotateCcw, User, Briefcase, GraduationCap, Award, Languages, Heart, Sparkles, Layout } from 'lucide-react';
import { toast } from 'sonner';
import { useResumeStore } from '../../store/resumeStore';
import { getResume, saveResume, resetResume } from '../../api/resumeApi';
import { CV_TEMPLATES } from '../../data/resumeData';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import TemplateCard from '../../components/resume/TemplateCard';
import PersonalEditor from '../../components/resume/editors/PersonalEditor';
import ExperienceEditor from '../../components/resume/editors/ExperienceEditor';
import EducationEditor from '../../components/resume/editors/EducationEditor';
import CertificationsEditor from '../../components/resume/editors/CertificationsEditor';
import LanguagesEditor from '../../components/resume/editors/LanguagesEditor';
import HobbiesEditor from '../../components/resume/editors/HobbiesEditor';
import SkillsListEditor from '../../components/resume/editors/SkillsListEditor';
import CVPreviewModal from '../../components/resume/preview/CVPreviewModal';

const TABS = [
  { value: 'personal', label: 'Personal', icon: User },
  { value: 'experience', label: 'Experience', icon: Briefcase },
  { value: 'education', label: 'Education', icon: GraduationCap },
  { value: 'certifications', label: 'Certifications', icon: Award },
  { value: 'languages', label: 'Languages', icon: Languages },
  { value: 'hobbies', label: 'Hobbies', icon: Heart },
  { value: 'skills', label: 'Skills', icon: Sparkles },
  { value: 'template', label: 'Template', icon: Layout },
];

export default function ResumeEdit() {
  const { resume, isDirty, saving, loadResume, setSaving, markSaved, setTemplate } = useResumeStore();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    (async () => {
      try {
        const data = await getResume();
        loadResume(data);
      } catch {
        toast.error('Failed to load resume');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveResume(resume);
      markSaved();
      toast.success('Resume saved successfully');
    } catch {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset resume to defaults? This cannot be undone.')) return;
    try {
      const data = await resetResume();
      loadResume(data);
      toast.success('Resume reset to defaults');
    } catch {
      toast.error('Failed to reset resume');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal': return <PersonalEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'education': return <EducationEditor />;
      case 'certifications': return <CertificationsEditor />;
      case 'languages': return <LanguagesEditor />;
      case 'hobbies': return <HobbiesEditor />;
      case 'skills': return <SkillsListEditor />;
      case 'template':
        return (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                <Layout className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Choose Template</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Select a layout for your CV preview</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CV_TEMPLATES.map((t) => (
                <TemplateCard key={t.id} template={t} active={resume.template === t.id} onSelect={setTemplate} />
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Editor"
        description="Build and manage your CV with live preview"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
              <Eye className="w-4 h-4 mr-1.5" /> Preview
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} loading={saving} disabled={!isDirty}>
              <Save className="w-4 h-4 mr-1.5" /> Save
            </Button>
          </div>
        }
      />

      <Card>
        <Tabs tabs={TABS} active={activeSection} onChange={setActiveSection} />
        <CardBody className="p-6">
          {renderSection()}
        </CardBody>
      </Card>

      <CVPreviewModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}
