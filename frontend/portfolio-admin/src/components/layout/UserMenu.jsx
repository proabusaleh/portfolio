import { User, Settings, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { SAMPLE_USER } from '../../data/notifications';
import { PATHS } from '../../router/routes';

export default function UserMenu() {
  const user = SAMPLE_USER;

  return (
    <Dropdown
      align="right"
      width="w-64"
      trigger={
        <button className="flex items-center gap-2 p-1.5 pr-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Avatar name={user.name} size="sm" status="online" />
          <div className="hidden md:block text-left leading-tight">
            <p className="text-sm font-medium truncate max-w-[100px]">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
        </button>
      }
    >
      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size="lg" />
          <div className="min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <Badge variant="primary" size="sm" className="mt-1 capitalize">
              {user.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-2">
        <MenuLink to={PATHS.PROFILE} icon={User}>My Profile</MenuLink>
        <MenuLink to={PATHS.SETTINGS} icon={Settings}>Settings</MenuLink>
        <MenuLink to="#" icon={HelpCircle}>Help & Support</MenuLink>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 p-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </Dropdown>
  );
}

function MenuLink({ to, icon: Icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Icon className="w-4 h-4 text-gray-500" />
      {children}
    </Link>
  );
}