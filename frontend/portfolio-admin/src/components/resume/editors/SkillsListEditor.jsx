import { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../ui/Button';
import SectionCard from '../SectionCard';
import { useResumeStore } from '../../../store/resumeStore';

export default function SkillsListEditor() {
  const skills = useResumeStore((s) => s.resume.skills);
  const setSkills = useResumeStore((s) => s.setSkills);
  const [input, setInput] = useState('');

  const addSkill = () => {
    const val = input.trim();
    if (val && !skills.includes(val)) { setSkills([...skills, val]); setInput(''); }
  };

  return (
    <SectionCard icon={Sparkles} title="Skills" description="Technical and professional skills">
      <div className="pt-3">
        <div className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            placeholder="Add a skill..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />
          <Button size="sm" variant="primary" onClick={addSkill} disabled={!input.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.span key={skill} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                {skill}
                <button onClick={() => setSkills(skills.filter((s) => s !== skill))} className="hover:text-red-500 transition"><X className="w-3 h-3" /></button>
              </motion.span>
            ))}
          </AnimatePresence>
          {skills.length === 0 && <p className="text-xs text-gray-400">No skills added yet.</p>}
        </div>
      </div>
    </SectionCard>
  );
}
