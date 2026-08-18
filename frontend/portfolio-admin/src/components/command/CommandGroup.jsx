import CommandItem from './CommandItem';

export default function CommandGroup({ group, selectedIndex, onExecute, startIndex }) {
  return (
    <div>
      <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {group.label}
      </p>
      {group.commands.map((cmd, i) => (
        <CommandItem
          key={cmd.id}
          command={cmd}
          isSelected={selectedIndex === startIndex + i}
          onClick={() => onExecute(cmd)}
        />
      ))}
    </div>
  );
}
