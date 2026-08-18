import { MoreHorizontal, Edit, Trash2, Eye, Ban, RotateCcw } from 'lucide-react';
import { timeAgo, cn } from '../../lib/utils';
import RoleBadge from './RoleBadge';
import Dropdown from '../ui/Dropdown';
import Skeleton from '../ui/Skeleton';

export default function UsersTable({ users = [], loading, onEdit, onDelete, onSuspend, onActivate, onViewActivity }) {
  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-400">No users found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <th className="text-left px-4 py-3 font-medium text-gray-500">User</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Role</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Last Active</th>
            <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {u.name?.charAt(0) || u.email?.charAt(0) || '?'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{u.name || 'Unnamed'}</p>
                      {u.isYou && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium">You</span>}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
              <td className="px-4 py-3">
                <span className={cn(
                  'inline-flex items-center gap-1.5 text-xs font-medium capitalize',
                  u.status === 'active' && 'text-green-600',
                  u.status === 'pending' && 'text-yellow-600',
                  u.status === 'inactive' && 'text-gray-400',
                  u.status === 'suspended' && 'text-red-500',
                )}>
                  <span className={cn('w-1.5 h-1.5 rounded-full',
                    u.status === 'active' && 'bg-green-500',
                    u.status === 'pending' && 'bg-yellow-500',
                    u.status === 'inactive' && 'bg-gray-300',
                    u.status === 'suspended' && 'bg-red-500',
                  )} />
                  {u.status}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">
                {u.lastActive ? timeAgo(u.lastActive) : '—'}
              </td>
              <td className="px-4 py-3 text-right">
                <Dropdown
                  align="right"
                  width="w-44"
                  trigger={
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  }
                >
                  <div className="p-1">
                    <DropItem icon={Eye} label="Activity" onClick={() => onViewActivity(u)} />
                    {!u.isYou && <DropItem icon={Edit} label="Edit" onClick={() => onEdit(u)} />}
                    {!u.isYou && u.status !== 'suspended' && (
                      <DropItem icon={Ban} label="Suspend" onClick={() => onSuspend(u)} />
                    )}
                    {!u.isYou && u.status === 'suspended' && (
                      <DropItem icon={RotateCcw} label="Reactivate" onClick={() => onActivate(u)} />
                    )}
                    {!u.isYou && (
                      <>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
                        <DropItem icon={Trash2} label="Delete" danger onClick={() => onDelete(u)} />
                      </>
                    )}
                  </div>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DropItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left',
        danger && 'text-red-500',
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
