import { useEffect } from 'react';

export function useKeyPress(targetKey, handler, options = {}) {
  const { ctrl = false, meta = false, shift = false } = options;

  useEffect(() => {
    const listener = (e) => {
      if (e.key !== targetKey) return;
      if (ctrl && !e.ctrlKey && !e.metaKey) return;
      if (meta && !e.metaKey) return;
      if (shift && !e.shiftKey) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          handler(e);
        }
        return;
      }
      handler(e);
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [targetKey, handler, ctrl, meta, shift]);
}
