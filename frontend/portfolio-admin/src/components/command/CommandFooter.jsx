import CommandKbd from './CommandKbd';

export default function CommandFooter() {
  return (
    <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-400">
      <span className="flex items-center gap-1"><CommandKbd>↑</CommandKbd><CommandKbd>↓</CommandKbd> Navigate</span>
      <span className="flex items-center gap-1"><CommandKbd>↵</CommandKbd> Select</span>
      <span className="flex items-center gap-1"><CommandKbd>Esc</CommandKbd> Close</span>
    </div>
  );
}
