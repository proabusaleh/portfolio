import { useState } from 'react';
import { Languages, Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '../../ui/Button';
import SectionCard from '../SectionCard';
import LanguageDots from '../LanguageDots';
import LanguageFormModal from './LanguageFormModal';
import { useResumeStore } from '../../../store/resumeStore';
import { LANGUAGE_LEVELS } from '../../../data/resumeData';

export default function LanguagesEditor() {
  const languages = useResumeStore((s) => s.resume.languages);
  const addLang = useResumeStore((s) => s.addLanguage);
  const updateLang = useResumeStore((s) => s.updateLanguage);
  const removeLang = useResumeStore((s) => s.removeLanguage);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const levelLabel = (lv) => LANGUAGE_LEVELS.find((l) => l.value === lv)?.label || '';

  return (
    <>
      <SectionCard
        icon={Languages}
        title="Languages"
        description="Languages and proficiency levels"
        actions={
          <Button size="xs" variant="primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        }
      >
        <div className="space-y-2 pt-3">
          <AnimatePresence>
            {languages.map((lang) => (
              <motion.div
                key={lang.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{lang.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <LanguageDots level={lang.level} size="sm" readOnly />
                    <span className="text-[11px] text-gray-400">{levelLabel(lang.level)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => { setEditing(lang); setModalOpen(true); }} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                    <Languages className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeLang(lang.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {languages.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No languages added yet.</p>}
        </div>
      </SectionCard>

      <LanguageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) => {
          if (editing) updateLang(editing.id, data);
          else addLang(data);
          setModalOpen(false);
        }}
        language={editing}
      />
    </>
  );
}
