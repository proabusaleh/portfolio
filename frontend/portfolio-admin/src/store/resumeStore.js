import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_RESUME } from '../data/resumeData';

let nextId = 100;

export const useResumeStore = create(
  persist(
    (set) => ({
      resume: JSON.parse(JSON.stringify(DEFAULT_RESUME)),
      isDirty: false,
      saving: false,

      loadResume: (data) => set({ resume: JSON.parse(JSON.stringify(data)), isDirty: false }),

      updatePersonal: (field, value) =>
        set((s) => ({
          resume: { ...s.resume, personal: { ...s.resume.personal, [field]: value } },
          isDirty: true,
        })),

      updateSection: (section, data) =>
        set((s) => ({
          resume: { ...s.resume, [section]: data },
          isDirty: true,
        })),

      addTimelineItem: (section, item) =>
        set((s) => ({
          resume: { ...s.resume, [section]: [...s.resume[section], { id: ++nextId, ...item }] },
          isDirty: true,
        })),

      updateTimelineItem: (section, id, updates) =>
        set((s) => ({
          resume: {
            ...s.resume,
            [section]: s.resume[section].map((item) => (item.id === id ? { ...item, ...updates } : item)),
          },
          isDirty: true,
        })),

      removeTimelineItem: (section, id) =>
        set((s) => ({
          resume: { ...s.resume, [section]: s.resume[section].filter((item) => item.id !== id) },
          isDirty: true,
        })),

      addLanguage: (lang) =>
        set((s) => ({
          resume: { ...s.resume, languages: [...s.resume.languages, { id: ++nextId, ...lang }] },
          isDirty: true,
        })),

      updateLanguage: (id, updates) =>
        set((s) => ({
          resume: { ...s.resume, languages: s.resume.languages.map((l) => (l.id === id ? { ...l, ...updates } : l)) },
          isDirty: true,
        })),

      removeLanguage: (id) =>
        set((s) => ({
          resume: { ...s.resume, languages: s.resume.languages.filter((l) => l.id !== id) },
          isDirty: true,
        })),

      setHobbies: (hobbies) => set((s) => ({ resume: { ...s.resume, hobbies }, isDirty: true })),
      setSkills: (skills) => set((s) => ({ resume: { ...s.resume, skills }, isDirty: true })),
      setTemplate: (template) => set((s) => ({ resume: { ...s.resume, template }, isDirty: true })),
      setSaving: (saving) => set({ saving }),
      markSaved: () => set({ isDirty: false }),
    }),
    {
      name: 'portfolio-resume',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ resume: state.resume }),
    }
  )
);
