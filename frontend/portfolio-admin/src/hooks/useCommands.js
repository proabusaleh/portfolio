import { useMemo } from 'react';
import { COMMAND_GROUPS } from '../data/commandsData';
import { fuzzySearch } from '../lib/fuzzySearch';
import { useCommandStore } from '../store/commandStore';

export default function useCommands() {
  const { query } = useCommandStore();

  const filteredGroups = useMemo(() => {
    if (!query) return COMMAND_GROUPS;

    return COMMAND_GROUPS.map((group) => ({
      ...group,
      commands: group.commands
        .map((cmd) => {
          const text = `${cmd.label} ${(cmd.keywords || []).join(' ')}`;
          const result = fuzzySearch(query, text);
          return { ...cmd, ...result };
        })
        .filter((cmd) => cmd.match)
        .sort((a, b) => b.score - a.score),
    })).filter((group) => group.commands.length > 0);
  }, [query]);

  const allFiltered = useMemo(() => filteredGroups.flatMap((g) => g.commands), [filteredGroups]);

  return { filteredGroups, allFiltered, query };
}
