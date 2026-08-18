import { useEffect } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import LanguageDots from '../LanguageDots';
import { LANGUAGE_LEVELS } from '../../../data/resumeData';
import { useState } from 'react';

export default function LanguageFormModal({ isOpen, onClose, onSave, language }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(3);

  useEffect(() => {
    if (isOpen) {
      if (language) { setName(language.name); setLevel(language.level); }
      else { setName(''); setLevel(3); }
    }
  }, [isOpen, language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), level });
  };

  const levelLabel = LANGUAGE_LEVELS.find((l) => l.value === level)?.label || '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={language ? 'Edit Language' : 'Add Language'} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Language</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. English"
            autoFocus
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Proficiency — {levelLabel}
          </label>
          <LanguageDots level={level} size="lg" onChange={setLevel} />
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={!name.trim()}>{language ? 'Update' : 'Add'}</Button>
        </div>
      </form>
    </Modal>
  );
}
