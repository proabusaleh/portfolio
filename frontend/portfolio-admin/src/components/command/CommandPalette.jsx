import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandStore } from '../../store/commandStore';
import useCommands from '../../hooks/useCommands';
import { useKeyPress } from '../../hooks/useKeyPress';
import CommandInput from './CommandInput';
import CommandGroup from './CommandGroup';
import CommandFooter from './CommandFooter';
import { cn } from '../../lib/utils';

export default function CommandPalette() {
  const open           = useCommandStore((s) => s.isOpen);
  const closePalette   = useCommandStore((s) => s.closePalette);
  const togglePalette  = useCommandStore((s) => s.togglePalette);
  const selectedIndex  = useCommandStore((s) => s.selectedIndex);
  const incrementIndex = useCommandStore((s) => s.incrementIndex);
  const decrementIndex = useCommandStore((s) => s.decrementIndex);
  const { filteredGroups, allFiltered } = useCommands();
  const navigate = useNavigate();

  const executeCommand = useCallback((cmd) => {
    if (cmd.path) {
      navigate(cmd.path);
    } else if (cmd.action === 'toggleTheme') {
      document.documentElement.classList.toggle('dark');
    } else if (cmd.action === 'toggleSidebar') {
      window.dispatchEvent(new CustomEvent('toggle-sidebar'));
    }
    closePalette();
  }, [navigate, closePalette]);

  useKeyPress('Escape', closePalette);
  useKeyPress('ArrowDown', useCallback(() => { if (open) incrementIndex(allFiltered.length); }, [open, allFiltered.length, incrementIndex]));
  useKeyPress('ArrowUp', useCallback(() => { if (open) decrementIndex(); }, [open, decrementIndex]));
  useKeyPress('Enter', useCallback(() => {
    if (open && allFiltered[selectedIndex]) executeCommand(allFiltered[selectedIndex]);
  }, [open, allFiltered, selectedIndex, executeCommand]));

  useEffect(() => {
    const listener = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [togglePalette]);

  if (!open) return null;

  let startIndex = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closePalette} />
      <div className={cn(
        'relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden',
      )}>
        <CommandInput />

        <div className="max-h-[320px] overflow-y-auto py-2">
          {filteredGroups.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No commands found</p>
          ) : (
            filteredGroups.map((group) => {
              const groupStart = startIndex;
              startIndex += group.commands.length;
              return (
                <CommandGroup
                  key={group.id}
                  group={group}
                  selectedIndex={selectedIndex}
                  onExecute={executeCommand}
                  startIndex={groupStart}
                />
              );
            })
          )}
        </div>

        <CommandFooter />
      </div>
    </div>
  );
}
