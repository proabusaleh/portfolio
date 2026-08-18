import { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../ui/Button';
import SectionCard from '../SectionCard';
import { useResumeStore } from '../../../store/resumeStore';

export default function HobbiesEditor() {
  const hobbies = useResumeStore((s) => s.resume.hobbies);
  const setHobbies = useResumeStore((s) => s.setHobbies);
  const [input, setInput] = useState('');

  const addHobby = () => {
    const val = input.trim();
    if (val && !hobbies.includes(val)) { setHobbies([...hobbies, val]); setInput(''); }
  };

  return (
    <SectionCard icon={Heart} title="Hobbies & Interests" description="Personal interests and activities">
      <div className="pt-3">
        <div className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHobby(); } }}
            placeholder="Add a hobby..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />
          <Button size="sm" variant="primary" onClick={addHobby} disabled={!input.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {hobbies.map((hobby) => (
              <motion.span key={hobby} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                {hobby}
                <button onClick={() => setHobbies(hobbies.filter((h) => h !== hobby))} className="hover:text-red-500 transition"><X className="w-3 h-3" /></button>
              </motion.span>
            ))}
          </AnimatePresence>
          {hobbies.length === 0 && <p className="text-xs text-gray-400">No hobbies added yet.</p>}
        </div>
      </div>
    </SectionCard>
  );
}
