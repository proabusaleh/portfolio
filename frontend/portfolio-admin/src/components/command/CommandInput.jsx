import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

const CommandInput = forwardRef(function CommandInput(
  { value, onChange, onKeyDown, onClear, placeholder = 'Type a command or search...' },
  ref
) {
  return (
    <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200 dark:border-gray-800">
      <Search className="w-5 h-5 text-gray-400 shrink-0" />

      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none focus:outline-none text-base placeholder:text-gray-400"
        autoFocus
      />

      {value && (
        <button
          onClick={onClear}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0"
          title="Clear"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
});

export default CommandInput;